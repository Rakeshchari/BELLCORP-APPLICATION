require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./src/models/Event');

const sampleEvents = [
  {
    name: 'React Conference 2026',
    organizer: 'Tech Events Inc',
    location: 'San Francisco, CA',
    date: new Date('2026-04-15T09:00:00'),
    description: 'Join us for the biggest React conference of the year! Learn about the latest features, best practices, and network with fellow developers.',
    totalSeats: 500,
    availableSeats: 500,
    category: 'Technology',
    tags: ['React', 'JavaScript', 'Frontend']
  },
  {
    name: 'Startup Pitch Night',
    organizer: 'Venture Hub',
    location: 'New York, NY',
    date: new Date('2026-03-20T18:00:00'),
    description: 'Watch innovative startups pitch their ideas to top investors. Great networking opportunity for entrepreneurs and investors alike.',
    totalSeats: 200,
    availableSeats: 200,
    category: 'Business',
    tags: ['Startup', 'Networking', 'Investment']
  },
  {
    name: 'Modern Art Exhibition',
    organizer: 'City Art Gallery',
    location: 'Los Angeles, CA',
    date: new Date('2026-03-25T10:00:00'),
    description: 'Explore contemporary art from emerging artists. Interactive exhibits and artist meet-and-greets throughout the day.',
    totalSeats: 150,
    availableSeats: 150,
    category: 'Art',
    tags: ['Art', 'Exhibition', 'Contemporary']
  },
  {
    name: 'Jazz Night Live',
    organizer: 'Blue Note Productions',
    location: 'Chicago, IL',
    date: new Date('2026-04-05T20:00:00'),
    description: 'An evening of smooth jazz featuring renowned artists. Enjoy great music, food, and drinks in an intimate setting.',
    totalSeats: 300,
    availableSeats: 300,
    category: 'Music',
    tags: ['Jazz', 'Live Music', 'Entertainment']
  },
  {
    name: 'Marathon Training Workshop',
    organizer: 'Fit Life Athletics',
    location: 'Boston, MA',
    date: new Date('2026-03-18T07:00:00'),
    description: 'Learn proper marathon training techniques from professional coaches. Includes nutrition tips and injury prevention strategies.',
    totalSeats: 100,
    availableSeats: 100,
    category: 'Sports',
    tags: ['Running', 'Marathon', 'Fitness']
  },
  {
    name: 'AI & Machine Learning Summit',
    organizer: 'Data Science Institute',
    location: 'Seattle, WA',
    date: new Date('2026-05-10T09:00:00'),
    description: 'Dive deep into artificial intelligence and machine learning. Industry experts share insights on the latest AI trends and applications.',
    totalSeats: 400,
    availableSeats: 400,
    category: 'Technology',
    tags: ['AI', 'Machine Learning', 'Data Science']
  },
  {
    name: 'Digital Marketing Masterclass',
    organizer: 'Marketing Pro Academy',
    location: 'Austin, TX',
    date: new Date('2026-04-22T10:00:00'),
    description: 'Master digital marketing strategies including SEO, social media, and content marketing. Hands-on workshops included.',
    totalSeats: 250,
    availableSeats: 250,
    category: 'Business',
    tags: ['Marketing', 'Digital', 'SEO']
  },
  {
    name: 'Classical Music Concert',
    organizer: 'Symphony Orchestra',
    location: 'Philadelphia, PA',
    date: new Date('2026-03-30T19:30:00'),
    description: 'Experience the beauty of classical music performed by world-class musicians. Program includes works by Mozart, Beethoven, and Tchaikovsky.',
    totalSeats: 600,
    availableSeats: 600,
    category: 'Music',
    tags: ['Classical', 'Orchestra', 'Concert']
  },
  {
    name: 'Photography Workshop',
    organizer: 'Lens Masters',
    location: 'Denver, CO',
    date: new Date('2026-04-12T11:00:00'),
    description: 'Improve your photography skills with hands-on instruction. Topics include composition, lighting, and post-processing.',
    totalSeats: 80,
    availableSeats: 80,
    category: 'Art',
    tags: ['Photography', 'Workshop', 'Creative']
  },
  {
    name: 'Coding Bootcamp Info Session',
    organizer: 'Code Academy',
    location: 'San Diego, CA',
    date: new Date('2026-03-28T18:00:00'),
    description: 'Learn about our intensive coding bootcamp. Meet instructors, alumni, and discover if this program is right for you.',
    totalSeats: 120,
    availableSeats: 120,
    category: 'Education',
    tags: ['Coding', 'Education', 'Career']
  },
  {
    name: 'Basketball Championship Finals',
    organizer: 'City Sports League',
    location: 'Miami, FL',
    date: new Date('2026-04-08T19:00:00'),
    description: 'Watch the most exciting basketball championship finals. Top teams compete for the trophy in this high-energy event.',
    totalSeats: 1000,
    availableSeats: 1000,
    category: 'Sports',
    tags: ['Basketball', 'Sports', 'Championship']
  },
  {
    name: 'Web3 & Blockchain Conference',
    organizer: 'Crypto Innovation Hub',
    location: 'San Francisco, CA',
    date: new Date('2026-05-20T09:00:00'),
    description: 'Explore the future of Web3 and blockchain technology. Featuring keynotes, panels, and networking with industry leaders.',
    totalSeats: 350,
    availableSeats: 350,
    category: 'Technology',
    tags: ['Blockchain', 'Web3', 'Crypto']
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('🗑️  Cleared existing events');

    // Insert sample events
    await Event.insertMany(sampleEvents);
    console.log(`✅ Inserted ${sampleEvents.length} sample events`);

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
