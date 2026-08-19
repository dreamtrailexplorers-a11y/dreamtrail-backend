import cron from 'node-cron';
import moment from 'moment';
import SiteSettings from '../models/SiteSettings.js';
import Booking from '../models/Booking.js';
import Razorpay from 'razorpay';

// This job runs every minute to check if the current time matches the admin's configured reminder times.
cron.schedule('* * * * *', async () => {
  try {
    const settings = await SiteSettings.findOne();
    if (!settings || !settings.preBookingSettings) return;

    const { reminderTime1, reminderTime2, reminderDaysLeft } = settings.preBookingSettings;
    const now = moment().format('HH:mm');

    // Only run if the current time matches Time1 or Time2 precisely
    if (now === reminderTime1 || now === reminderTime2) {
      console.log(`[Cron] Triggering Balance Reminders at ${now}`);
      
      // Find all bookings that are 'Pre-Booked'
      const bookings = await Booking.find({ paymentStatus: 'Pre-Booked' }).populate('user');
      
      const razorpay = new Razorpay({
        key_id: settings.razorpayKeyId,
        key_secret: settings.razorpayKeySecret,
      });

      for (let booking of bookings) {
        if (!booking.departureDate) continue;
        
        // Parse the start date from departureDate string "DD/MM/YYYY to DD/MM/YYYY"
        const dateStr = booking.departureDate.split(' to ')[0];
        const departure = moment(dateStr, ['DD/MM/YYYY', 'YYYY-MM-DD', 'DD-MM-YYYY']);
        
        if (!departure.isValid()) continue;
        
        const daysLeft = departure.diff(moment(), 'days');
        
        // If within the reminder window
        if (daysLeft <= reminderDaysLeft && daysLeft >= 0) {
          
          let paymentLinkUrl = booking.paymentDetails.balancePaymentLinkUrl;
          
          // Generate link if it doesn't exist yet
          if (!paymentLinkUrl) {
            try {
              const paymentLink = await razorpay.paymentLink.create({
                amount: Math.round(booking.paymentDetails.balanceDue * 100),
                currency: 'INR',
                accept_partial: false,
                description: `Balance Payment for ${booking.tripTitle} - ${booking.numberOfPersons} Person(s)`,
                customer: {
                  name: booking.user.name,
                  email: booking.user.email,
                  contact: booking.user.phone
                },
                notify: {
                  sms: true,
                  email: true
                },
                reminder_enable: false, // We handle our own cron
                notes: {
                  booking_id: booking._id.toString()
                }
              });
              
              booking.paymentDetails.balancePaymentLinkId = paymentLink.id;
              booking.paymentDetails.balancePaymentLinkUrl = paymentLink.short_url;
              await booking.save();
              
              paymentLinkUrl = paymentLink.short_url;
              console.log(`[Cron] Created new payment link for booking ${booking._id}`);
            } catch (err) {
              console.error(`[Cron] Error generating link for ${booking._id}:`, err);
              continue; // skip notify if link failed
            }
          }
          
          // Send notification via Razorpay
          if (booking.paymentDetails.balancePaymentLinkId) {
            try {
              await razorpay.paymentLink.notifyBy(booking.paymentDetails.balancePaymentLinkId, 'sms');
              await razorpay.paymentLink.notifyBy(booking.paymentDetails.balancePaymentLinkId, 'email');
              console.log(`[Cron] Sent reminder for booking ${booking._id}`);
            } catch (err) {
              console.error(`[Cron] Error sending reminder for ${booking._id}:`, err);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('[Cron] Error running reminder cron job:', error);
  }
});

console.log('[Cron] Pre-booking Reminder Service Initialized.');
