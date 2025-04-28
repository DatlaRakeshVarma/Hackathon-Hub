const mongoose = require('mongoose');

const hackathonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  college: { type: String, required: true },
  state: { type: String, required: true },
  district: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  registrationDeadline: { type: Date, required: true },
  description: { type: String, required: true },
  eligibility: { type: String, required: true },
  prizes: { type: String, required: true },
  teamSize: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  tags: [{ type: String }],
  website: { type: String },
  image: { 
    type: String, 
    required: true // Can be a URL (e.g., "https://example.com/image.jpg") or a file path (e.g., "/uploads/filename.jpg")
  },
  contactName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['pending', 'upcoming', 'ongoing', 'completed', 'rejected'], 
    default: 'pending' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hackathon', hackathonSchema);