import mongoose from 'mongoose';

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  date: { type: String },
  travellers: { type: Number },
  message: { type: String },
  tripTitle: { type: String, required: true },
  tripRoute: { type: String },
  destination: { type: String },
  departureDate: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'New' }
});

const Enquiry = mongoose.model('Enquiry', EnquirySchema);
export default Enquiry;
