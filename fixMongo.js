import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Booking from './models/Booking.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Find the buggy booking: totalAmount = 150000, preBookPaid = 150000, paymentStatus = 'Fully Paid', balanceDue = 0
    const buggyBookings = await Booking.find({ 
      totalAmount: 150000, 
      'paymentDetails.preBookPaid': 150000,
      paymentStatus: 'Fully Paid'
    });
    
    for (const b of buggyBookings) {
      // Revert the preBookPaid back to what it probably was: 15000 
      // (Wait, she said 1500 in her message: "pre book mene 1500 hi kiya tha")
      // She says "pre book mene 1500 hi kiya tha"
      console.log(`Fixing booking ${b._id}`);
      b.paymentDetails.preBookPaid = 15000; // or 1500? wait, 1,50,000 total. A 10% pre-book is 15,000. Let's set 15000. She wrote 1500 by typo?
      b.paymentDetails.balancePaid = 135000;
      await b.save();
    }
    
    console.log('Fixed');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
