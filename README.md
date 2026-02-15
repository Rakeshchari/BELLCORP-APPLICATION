# Event Management System - MERN Stack

A full-stack event management application built with MongoDB, Express.js, React, and Node.js. Users can browse events, register for them, and manage their registrations through a personalized dashboard.

## 🚀 Features

### Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Persistent login (stays logged in on refresh)

### Event Management
- Browse all events with beautiful card layouts
- Search events by name, organizer, or description
- Filter by location, category, and date
- View detailed event information
- Real-time seat availability tracking
- Register/cancel event registrations
- Prevent duplicate registrations

### User Dashboard
- View all registered events
- Separate upcoming and past events
- Quick access to event details
- One-click registration cancellation
- Registration statistics

### UI/UX
- Fully responsive design
- Beautiful gradient backgrounds
- Smooth animations and transitions
- Interactive hover effects
- Clean and modern interface
- No UI libraries (pure CSS)

## 📁 Project Structure

```
Bellcorp/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── eventController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Event.js
│   │   └── routes/
│   │       ├── authRoutes.js
│   │       └── eventRoutes.js
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env.example
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.js
    │   │   ├── EventCard.js
    │   │   ├── SearchFilters.js
    │   │   └── ProtectedRoute.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── pages/
    │   │   ├── Events.js
    │   │   ├── EventDetail.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   └── Dashboard.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Navbar.css
    │   │   ├── EventCard.css
    │   │   ├── SearchFilters.css
    │   │   ├── EventDetail.css
    │   │   ├── Auth.css
    │   │   └── Dashboard.css
    │   ├── App.js
    │   └── index.js
    ├── package.json
    └── .env.example
```

## 🛠️ Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** - UI library
- **React Router DOM** - Client-side routing
- **Context API** - State management
- **Plain CSS** - Styling (no frameworks)

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher) - Running locally or MongoDB Atlas account
- **npm** or **yarn**

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Bellcorp
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your configuration
# .env should contain:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event_management
JWT_SECRET=your_jwt_secret_key_here_change_in_production
NODE_ENV=development
```

**Note:** If using MongoDB Atlas, replace `MONGODB_URI` with your connection string.

### 3. Seed the Database (Optional but Recommended)

```bash
# Still in backend directory
node seed.js
```

This will populate your database with 12 sample events across different categories.

### 4. Start Backend Server

```bash
# Development mode with auto-reload
npm run dev

# OR production mode
npm start
```

Backend will run on `http://localhost:5000`

### 5. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file
# .env should contain:
REACT_APP_API_URL=http://localhost:5000/api
```

### 6. Start Frontend Application

```bash
# Start React development server
npm start
```

Frontend will run on `http://localhost:3000`

## 🎯 Usage

### For New Users

1. **Sign Up**: Click "Sign Up" button and create an account
2. **Browse Events**: View all available events on the home page
3. **Search & Filter**: Use search bar and filters to find specific events
4. **View Details**: Click on any event card to see full details
5. **Register**: Click "Register for Event" on the event detail page
6. **Dashboard**: View all your registered events in the dashboard

### For Existing Users

1. **Login**: Use your credentials to log in
2. **Dashboard**: Access your personalized dashboard
3. **Manage Events**: View upcoming and past events
4. **Cancel**: Cancel registrations if needed

## 🔌 API Endpoints

### Authentication Routes

```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
GET    /api/auth/me            - Get current user (Protected)
```

### Event Routes

```
GET    /api/events             - Get all events (with filters)
GET    /api/events/:id         - Get single event
POST   /api/events             - Create event (Protected)
POST   /api/events/:id/register - Register for event (Protected)
DELETE /api/events/:id/register - Cancel registration (Protected)
GET    /api/events/my/events   - Get user's registered events (Protected)
```

### Query Parameters for GET /api/events

- `search` - Text search (searches name, organizer, description)
- `location` - Filter by location
- `category` - Filter by category
- `date` - Filter by date
- `page` - Page number for pagination
- `limit` - Number of results per page

## 📝 Sample API Requests

### Register User

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Events

```bash
curl http://localhost:5000/api/events
```

### Get Events with Filters

```bash
curl "http://localhost:5000/api/events?category=Technology&location=San%20Francisco"
```

### Register for Event

```bash
curl -X POST http://localhost:5000/api/events/EVENT_ID/register \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Get My Events

```bash
curl http://localhost:5000/api/events/my/events \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🎨 Design Highlights

- **Color Scheme**: Modern gradient design with primary purple/indigo colors
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins throughout
- **Animations**: Smooth hover effects and transitions
- **Responsiveness**: Mobile-first design that works on all screen sizes
- **Accessibility**: Proper semantic HTML and ARIA labels

## 🔒 Security Features

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Protected API routes
- Input validation
- Secure password requirements (minimum 6 characters)
- CORS enabled for cross-origin requests

## 🐛 Troubleshooting

### MongoDB Connection Issues

```bash
# Make sure MongoDB is running
# For local MongoDB:
mongod

# Check if MongoDB is accessible
mongo --eval "db.stats()"
```

### Port Already in Use

```bash
# Backend (port 5000)
lsof -ti:5000 | xargs kill -9

# Frontend (port 3000)
lsof -ti:3000 | xargs kill -9
```

### CORS Errors

Make sure:
1. Backend is running on port 5000
2. Frontend `.env` has correct API URL
3. CORS is enabled in backend (already configured)

## 📦 Package Versions

### Backend Dependencies
```json
{
  "express": "^4.18.2",
  "mongoose": "^7.0.0",
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.0",
  "dotenv": "^16.0.3",
  "cors": "^2.8.5"
}
```

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.10.0"
}
```

## 🚀 Future Enhancements

- Add event creation UI for organizers
- Implement event ratings and reviews
- Add email notifications
- Event image uploads
- Advanced search with multiple filters
- Social sharing features
- Calendar integration
- Payment processing for paid events

## 👨‍💻 Development Notes

This project follows best practices for a 2-year experience developer:

- **Clean Code**: Readable, well-structured code with meaningful variable names
- **Modular Architecture**: Separation of concerns with controllers, routes, models
- **Error Handling**: Proper try-catch blocks and error messages
- **Comments**: Strategic comments explaining logic where needed
- **No Over-Engineering**: Practical solutions without unnecessary complexity
- **RESTful API**: Standard REST conventions followed
- **Responsive Design**: Mobile-friendly without UI frameworks

## 📄 License

This project is created as an assignment and is free to use for educational purposes.

## 🤝 Support

For issues or questions, please check:
1. MongoDB is running
2. All dependencies are installed
3. Environment variables are correctly set
4. Ports 3000 and 5000 are available

---

**Built with ❤️ using MERN Stack**
