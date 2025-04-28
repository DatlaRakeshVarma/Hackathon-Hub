const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const Hackathon = require('./models/Hackathon');
const hackathonRoutes = require('./routes/hackathons');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/auth', authRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Update hackathon statuses daily at midnight
cron.schedule('0 0 * * *', async () => {
  try {
    const now = new Date();
    await Hackathon.updateMany(
      { 
        status: 'upcoming', 
        startDate: { $lte: now },
        isVerified: true
      },
      { status: 'ongoing' }
    );
    await Hackathon.updateMany(
      { 
        status: 'ongoing', 
        endDate: { $lt: now },
        isVerified: true
      },
      { status: 'completed' }
    );
    console.log('Updated hackathon statuses');
  } catch (error) {
    console.error('Error updating hackathon statuses:', error);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});