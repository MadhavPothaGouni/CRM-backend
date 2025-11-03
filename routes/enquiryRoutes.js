const express = require('express');
const router = express.Router();
const protect = require('../middlewares/auth');
const { submitPublic, getPublic, getPrivate, claim } = require('../controllers/enquiryController');

// Public submit enquiry (No authentication needed)
router.post('/public', submitPublic);

// Protected routes (Counselor only)
router.get('/public', protect, getPublic);
router.get('/private', protect, getPrivate);
router.patch('/:id/claim', protect, claim);

module.exports = router;
