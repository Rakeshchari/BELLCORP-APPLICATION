const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);

// Protected routes
router.post('/', auth, eventController.createEvent); // For admin/testing
router.post('/:id/register', auth, eventController.registerForEvent);
router.delete('/:id/register', auth, eventController.cancelRegistration);
router.get('/my/events', auth, eventController.getMyEvents);

module.exports = router;
