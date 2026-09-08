import nodemailer from 'nodemailer';
import SiteSettings from '../models/SiteSettings.js';

export const sendPaymentReminder = async (booking) => {
  try {
    const toEmail = booking.user?.email || booking.paymentDetails?.email;
    if (!toEmail) {
      return { success: false, message: 'Recipient email not found for this booking.' };
    }

    let smtpUser = process.env.SMTP_USER;
    let smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass || smtpUser === 'your-email@gmail.com') {
      try {
        const settings = await SiteSettings.findOne();
        if (settings?.smtpSettings?.user && settings?.smtpSettings?.pass) {
          smtpUser = settings.smtpSettings.user;
          smtpPass = settings.smtpSettings.pass;
        }
      } catch (err) {}
    }

    if (!smtpUser || !smtpPass || smtpUser === 'your-email@gmail.com') {
      return { 
        success: false, 
        message: 'SMTP credentials not configured. Please set SMTP_USER and SMTP_PASS (Gmail App Password) in Vercel environment variables.' 
      };
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    const recipientName = booking.user?.name || booking.paymentDetails?.name || 'Traveler';
    const totalCostFormatted = booking.totalAmount ? Number(booking.totalAmount).toLocaleString('en-IN') : '0';
    const preBookPaidFormatted = booking.paymentDetails?.preBookPaid ? Number(booking.paymentDetails.preBookPaid).toLocaleString('en-IN') : '0';
    const balanceDueFormatted = booking.paymentDetails?.balanceDue ? Number(booking.paymentDetails.balanceDue).toLocaleString('en-IN') : '0';

    const mailOptions = {
      from: `"DreamTrail Explorers" <${smtpUser}>`,
      to: toEmail,
      subject: `Payment Reminder for ${booking.tripTitle || 'Your Trip'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #0f172a;">DreamTrail Explorers</h2>
          <p>Dear ${recipientName},</p>
          <p>This is a gentle reminder regarding your upcoming trip <strong>${booking.tripTitle || 'Trip'}</strong>.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Departure Date:</strong> ${booking.departureDate || 'N/A'}</p>
            <p style="margin: 0 0 10px 0;"><strong>Total Cost:</strong> ₹${totalCostFormatted}</p>
            <p style="margin: 0 0 10px 0;"><strong>Amount Paid:</strong> ₹${preBookPaidFormatted}</p>
            <p style="margin: 0; color: #ef4444;"><strong>Balance Due:</strong> ₹${balanceDueFormatted}</p>
          </div>
          
          <p>Please clear your pending balance at the earliest to confirm your slots.</p>
          <p>If you have already paid, please ignore this email or reply with your transaction details.</p>
          
          <br/>
          <p>Best Regards,</p>
          <p><strong>DreamTrail Explorers Team</strong></p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return { success: true, message: 'Reminder sent successfully' };
  } catch (error) {
    console.error("Error sending email: ", error);
    return { 
      success: false, 
      message: error.message || 'Failed to send email. Check SMTP credentials or Gmail App Password.' 
    };
  }
};
