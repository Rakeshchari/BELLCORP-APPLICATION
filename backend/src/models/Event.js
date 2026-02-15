const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Event name is required'],
    trim: true,
    minlength: 3
  },
  organizer: {
    type: String,
    required: [true, 'Organizer name is required'],
    trim: true
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: 10
  },
  totalSeats: {
    type: Number,
    required: [true, 'Total seats is required'],
    min: 1
  },
  availableSeats: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Technology', 'Business', 'Art', 'Music', 'Sports', 'Education', 'Other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  attendees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Index for search and filter
eventSchema.index({ name: 'text', organizer: 'text', description: 'text' });
eventSchema.index({ date: 1 });
eventSchema.index({ category: 1 });

module.exports = mongoose.model('Event', eventSchema);
