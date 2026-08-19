import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Booking from './models/Booking.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    
    // Find the buggy booking
    const buggyBookings = await Booking.find({ 
      totalAmount: 150000, 
      paymentStatus: 'Fully Paid'
    });
    
    for (const b of buggyBookings) {
      if (b.paymentDetails) {
        // add missing date
        b.paymentDetails.balancePaidAt = new Date();
        // ensure balanceDue is 0
        b.paymentDetails.balanceDue = 0;
        await b.save();
        console.log(`Added date to booking ${b._id}`);
      }
    }
    
    console.log('Fixed');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
