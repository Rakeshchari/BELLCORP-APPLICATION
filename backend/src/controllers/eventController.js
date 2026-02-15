const Event = require('../models/Event');
const User = require('../models/User');

// Get all events with search and filters
exports.getEvents = async (req, res) => {
  try {
    const { search, location, category, date, page = 1, limit = 12 } = req.query;
    
    let query = {};

    // Text search
    if (search) {
      query.$text = { $search: search };
    }

    // Location filter
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    // Category filter
    if (category && category !== 'All') {
      query.category = category;
    }

    // Date filter
    if (date) {
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      query.date = {
        $gte: selectedDate,
        $lt: nextDay
      };
    }

    // Pagination
    const skip = (page - 1) * limit;

    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Event.countDocuments(query);

    res.json({
      events,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / limit),
      total
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Error fetching events', error: error.message });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.json({ event });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Error fetching event', error: error.message });
  }
};

// Create new event (for testing/seeding)
exports.createEvent = async (req, res) => {
  try {
    const { name, organizer, location, date, description, totalSeats, category, tags } = req.body;

    const event = new Event({
      name,
      organizer,
      location,
      date,
      description,
      totalSeats,
      availableSeats: totalSeats,
      category,
      tags: tags || []
    });

    await event.save();

    res.status(201).json({
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Error creating event', error: error.message });
  }
};

// Register for an event
exports.registerForEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if already registered
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Check if seats available
    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    // Add user to event attendees
    event.attendees.push(userId);
    event.availableSeats -= 1;
    await event.save();

    // Add event to user's registered events
    await User.findByIdAndUpdate(userId, {
      $addToSet: { registeredEvents: eventId }
    });

    res.json({
      message: 'Successfully registered for event',
      event
    });
  } catch (error) {
    console.error('Register event error:', error);
    res.status(500).json({ message: 'Error registering for event', error: error.message });
  }
};

// Cancel event registration
exports.cancelRegistration = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is registered
    if (!event.attendees.includes(userId)) {
      return res.status(400).json({ message: 'Not registered for this event' });
    }

    // Remove user from attendees
    event.attendees = event.attendees.filter(id => id.toString() !== userId.toString());
    event.availableSeats += 1;
    await event.save();

    // Remove event from user's registered events
    await User.findByIdAndUpdate(userId, {
      $pull: { registeredEvents: eventId }
    });

    res.json({
      message: 'Registration cancelled successfully',
      event
    });
  } catch (error) {
    console.error('Cancel registration error:', error);
    res.status(500).json({ message: 'Error cancelling registration', error: error.message });
  }
};

// Get user's registered events
exports.getMyEvents = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('registeredEvents');
    
    const now = new Date();
    
    // Separate upcoming and past events
    const upcoming = user.registeredEvents.filter(event => new Date(event.date) >= now);
    const past = user.registeredEvents.filter(event => new Date(event.date) < now);

    res.json({
      upcoming,
      past,
      all: user.registeredEvents
    });
  } catch (error) {
    console.error('Get my events error:', error);
    res.status(500).json({ message: 'Error fetching registered events', error: error.message });
  }
};
