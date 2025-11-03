const { Enquiry } = require('../models');

// Public enquiry submission (no login required)
exports.submitPublic = async (req, res) => {
  try {
    const { name, email, courseInterest } = req.body;

    if (!name || !email || !courseInterest) {
      return res.status(400).json({ message: 'name, email, and courseInterest are required' });
    }

    const enquiry = await Enquiry.create({
      name,
      email,
      courseInterest,
      claimed: false,
      counselorId: null,
    });

    return res.status(201).json({ message: 'Enquiry submitted successfully', enquiry });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get unclaimed enquiries (authenticated)
exports.getPublic = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({ where: { claimed: false } });
    return res.status(200).json({ enquiries });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get private enquiries for logged‐in counselor
exports.getPrivate = async (req, res) => {
  try {
    const enquiries = await Enquiry.findAll({ where: { counselorId: req.user } });
    return res.status(200).json({ enquiries });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Claim enquiry
exports.claim = async (req, res) => {
  try {
    const { id } = req.params;

    const enquiry = await Enquiry.findByPk(id);
    if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });

    if (enquiry.claimed === true) {
      return res.status(409).json({ message: 'This lead has already been claimed.' });
    }

    enquiry.claimed = true;
    enquiry.counselorId = req.user;
    await enquiry.save();

    return res.status(200).json({ message: 'Lead claimed successfully', enquiry });
  } catch (err) {
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};
