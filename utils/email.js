import nodemailer from 'nodemailer';

export const sendPaymentReminder = async (booking) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this or use SMTP_HOST, SMTP_PORT
      auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com',
        pass: process.env.SMTP_PASS || 'your-app-password'
      }
    });

    const mailOptions = {
      from: `"DreamTrail Explorers" <${process.env.SMTP_USER || 'your-email@gmail.com'}>`,
      to: booking.user.email || booking.paymentDetails?.email,
      subject: `Payment Reminder for ${booking.tripTitle}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #0f172a;">DreamTrail Explorers</h2>
          <p>Dear ${booking.user.name || 'Traveler'},</p>
          <p>This is a gentle reminder regarding your upcoming trip <strong>${booking.tripTitle}</strong>.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0 0 10px 0;"><strong>Departure Date:</strong> ${booking.departureDate}</p>
            <p style="margin: 0 0 10px 0;"><strong>Total Cost:</strong> ₹${booking.totalAmount}</p>
            <p style="margin: 0 0 10px 0;"><strong>Amount Paid:</strong> ₹${booking.paymentDetails?.preBookPaid || 0}</p>
            <p style="margin: 0; color: #ef4444;"><strong>Balance Due:</strong> ₹${booking.paymentDetails?.balanceDue || 0}</p>
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
    return true;
  } catch (error) {
    console.error("Error sending email: ", error);
    return false;
  }
};
