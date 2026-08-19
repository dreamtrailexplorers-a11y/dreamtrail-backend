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
      tripTitle, pricePerPerson, numberOfPersons, duration, destination, departureDate,
      totalTripCost, paymentType
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
    
    let paymentDetails = null;
    let paymentStatus = 'Pending';
    
    if (paymentType === 'pre-book') {
      paymentDetails = {
        totalTripCost: totalTripCost,
        preBookPaid: amount,
        balanceDue: totalTripCost - amount,
      };
      paymentStatus = 'Pending'; // Will become Pre-Booked on verify
    }

    // Create a pending booking
    const newBooking = new Booking({
      user: req.user.id,
      tripTitle,
      duration,
      destination,
      departureDate,
      pricePerPerson: pricePerPerson || 0,
      numberOfPersons: numberOfPersons || 1,
      totalAmount: totalTripCost || amount,
      paymentStatus: paymentStatus,
      paymentDetails: paymentDetails,
      razorpayOrderId: order.id
    });
    await newBooking.save();

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
      const booking = await Booking.findOne({ razorpayOrderId: razorpay_order_id });
      if (!booking) {
         return res.status(404).json({ success: false, message: 'Booking not found' });
      }
      
      let newStatus = 'Paid';
      if (booking.paymentDetails && booking.paymentDetails.balanceDue > 0) {
        newStatus = 'Pre-Booked';
      } else {
        newStatus = 'Fully Paid';
      }

      booking.paymentStatus = newStatus;
      booking.razorpayPaymentId = razorpay_payment_id;
      await booking.save();
      
      res.status(200).json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const createBalanceOrder = async (req, res) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (!booking.paymentDetails || booking.paymentDetails.balanceDue <= 0) {
      return res.status(400).json({ message: 'No balance due' });
    }

    const settings = await SiteSettings.findOne();
    if (!settings || !settings.razorpayKeyId || !settings.razorpayKeySecret) {
      return res.status(500).json({ message: 'Razorpay keys are not configured.' });
    }

    const razorpay = new Razorpay({
      key_id: settings.razorpayKeyId,
      key_secret: settings.razorpayKeySecret,
    });

    const amount = booking.paymentDetails.balanceDue;
    const options = {
      amount: Math.round(amount * 100),
      currency: 'INR',
      receipt: 'balance_' + booking._id + '_' + Date.now(),
    };

    const order = await razorpay.orders.create(options);
    
    // Save this new order ID in booking to verify later
    booking.paymentDetails.balancePaymentLinkId = order.id;
    await booking.save();

    res.status(200).json({ 
      order, 
      keyId: settings.razorpayKeyId
    });
  } catch (error) {
    console.error('Create Balance Order Error:', error);
    res.status(500).json({ message: error.message || 'Internal Server Error' });
  }
};

export const verifyBalancePayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body;
    
    const settings = await SiteSettings.findOne();
    const secret = settings.razorpayKeySecret;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', secret)
                                    .update(body.toString())
                                    .digest('hex');
                                    
    if (expectedSignature === razorpay_signature) {
      const booking = await Booking.findById(bookingId);
      if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
      
      // Update booking to fully paid
      booking.paymentStatus = 'Fully Paid';
      booking.paymentDetails.balanceDue = 0;
      booking.paymentDetails.balancePaid = booking.paymentDetails.balanceDue;
      booking.paymentDetails.balancePaidAt = new Date(); // or keep track of split
      await booking.save();
      
      res.status(200).json({ success: true, message: 'Balance payment verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
