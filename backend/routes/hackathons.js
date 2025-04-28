const express = require('express');
const router = express.Router();
const Hackathon = require('../models/Hackathon');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

// Submit a new hackathon (no auth required)
router.post('/submit', async (req, res) => {
  try {
    const hackathonData = {
      ...req.body,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      registrationDeadline: new Date(req.body.registrationDeadline)
    };
    const hackathon = new Hackathon(hackathonData);
    await hackathon.save();
    res.status(201).json({ message: 'Hackathon submitted successfully', hackathon });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all verified hackathons (no auth required)
router.get('/', async (req, res) => {
  try {
    const hackathons = await Hackathon.find({ 
      isVerified: true, 
      status: { $in: ['upcoming', 'ongoing', 'completed'] }
    });
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get pending hackathons (admin only)
router.get('/pending', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const hackathons = await Hackathon.find({ status: 'pending' });
    res.json(hackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single hackathon by ID (no auth required)
router.get('/:id', async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon || !hackathon.isVerified) {
      return res.status(404).json({ error: 'Hackathon not found or not verified' });
    }
    res.json(hackathon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve a hackathon (admin only)
router.put('/:id/approve', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      { isVerified: true, status: 'upcoming' },
      { new: true }
    );
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }
    res.json({ message: 'Hackathon approved', hackathon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reject a hackathon (admin only)
router.put('/:id/reject', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const hackathon = await Hackathon.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true }
    );
    if (!hackathon) {
      return res.status(404).json({ error: 'Hackathon not found' });
    }
    res.json({ message: 'Hackathon rejected', hackathon });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;