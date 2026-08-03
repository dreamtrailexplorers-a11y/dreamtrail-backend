import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tripTitle: {
    type: String,
    required: true
  },
  duration: {
    type: String,
  },
  destination: {
    type: String,
  },
  departureDate: {
    type: String,
  },
  pricePerPerson: {
    type: Number,
    required: true
  },
  numberOfPersons: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  razorpayOrderId: {
    type: String
  },
  razorpayPaymentId: {
    type: String
  },
  // Extra booking details the user might fill out later
  travellerDetails: {
    name: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    emergencyContact: String,
    specialRequest: String
  },
  tripPreferences: {
    hotel: String,
    vehicle: String,
    pickupPoint: String,
    dropPoint: String,
    mealPlan: String
  }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
