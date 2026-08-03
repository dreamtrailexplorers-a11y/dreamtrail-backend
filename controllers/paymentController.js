import Razorpay from 'razorpay';
import SiteSettings from '../models/SiteSettings.js';
import Booking from '../models/Booking.js';
import crypto from 'crypto';

export const createOrder = async (req, res) => {
  try {
    const settings = await SiteSettings.findOne();
    if (!settings || !settings.razorpayKeyId || !settings.razorpayKeySecret) {
      return res.status(500).json({ message: 'Razorpay keys are not configured in Admin Settings.' });
    }

    const { 
      amount, currency = 'INR', receipt = 'receipt_' + Date.now(),
      tripTitle, pricePerPerson, numberOfPersons, duration, destination, departureDate
    } = req.body;

    if (!amount || !tripTitle) {
      return res.status(400).json({ message: 'Amount and trip details are required' });
    }

    const razorpay = new Razorpay({
      key_id: settings.razorpayKeyId,
      key_secret: settings.razorpayKeySecret,
    });

    const options = {
      amount: Math.round(amount * 100), // amount in smallest currency unit (paise)
      currency,
      receipt,
    };

    const order = await razorpay.orders.create(options);
    
    // Create a pending booking
    const newBooking = new Booking({
      user: req.user.id,
      tripTitle,
      duration,
      destination,
      departureDate,
      pricePerPerson: pricePerPerson || 0,
      numberOfPersons: numberOfPersons || 1,
      totalAmount: amount,
      paymentStatus: 'Pending',
      razorpayOrderId: order.id
    });
    await newBooking.save();

    // Send back order details along with keyId so frontend doesn't need to hardcode it
    res.status(200).json({ 
      order, 
      keyId: settings.razorpayKeyId,
      bookingId: newBooking._id
    });
  } catch (error) {
    console.error('Razorpay Create Order Error:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    
    const settings = await SiteSettings.findOne();
    const secret = settings.razorpayKeySecret;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', secret)
                                    .update(body.toString())
                                    .digest('hex');
                                    
    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Payment successful, update booking status
      await Booking.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id },
        { paymentStatus: 'Paid', razorpayPaymentId: razorpay_payment_id },
        { new: true }
      );
      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
