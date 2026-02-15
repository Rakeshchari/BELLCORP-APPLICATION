# Project Structure

```
Bellcorp/
│
├── README.md                     # Main documentation
├── SETUP.md                      # Quick setup guide
├── API_DOCUMENTATION.md          # API reference
├── PROJECT_SUMMARY.md            # Project overview
│
├── backend/                      # Backend (Node.js + Express)
│   ├── server.js                # Main server file
│   ├── seed.js                  # Database seeding script
│   ├── package.json             # Backend dependencies
│   ├── .env.example             # Environment variables template
│   ├── .gitignore              # Git ignore file
│   │
│   └── src/
│       ├── config/
│       │   └── database.js      # MongoDB connection
│       │
│       ├── models/
│       │   ├── User.js          # User schema
│       │   └── Event.js         # Event schema
│       │
│       ├── controllers/
│       │   ├── authController.js    # Auth logic
│       │   └── eventController.js   # Event logic
│       │
│       ├── middleware/
│       │   └── auth.js          # JWT authentication middleware
│       │
│       └── routes/
│           ├── authRoutes.js    # Auth endpoints
│           └── eventRoutes.js   # Event endpoints
│
└── frontend/                    # Frontend (React)
    ├── package.json            # Frontend dependencies
    ├── .env.example            # Environment variables template
    ├── .gitignore             # Git ignore file
    │
    ├── public/
    │   └── index.html         # HTML template
    │
    └── src/
        ├── index.js           # React entry point
        ├── App.js            # Main App component
        │
        ├── components/
        │   ├── Navbar.js              # Navigation bar
        │   ├── EventCard.js           # Event card component
        │   ├── SearchFilters.js       # Search/filter component
        │   └── ProtectedRoute.js      # Route protection
        │
        ├── context/
        │   └── AuthContext.js         # Authentication context
        │
        ├── pages/
        │   ├── Events.js              # Events listing page
        │   ├── EventDetail.js         # Event detail page
        │   ├── Login.js               # Login page
        │   ├── Register.js            # Registration page
        │   └── Dashboard.js           # User dashboard
        │
        ├── services/
        │   └── api.js                 # API service layer
        │
        └── styles/
            ├── App.css                # Global styles
            ├── Navbar.css             # Navbar styles
            ├── EventCard.css          # Event card styles
            ├── SearchFilters.css      # Search filter styles
            ├── EventDetail.css        # Event detail styles
            ├── Auth.css               # Auth pages styles
            └── Dashboard.css          # Dashboard styles
```

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│                      (React - Port 3000)                     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Events     │  │ Event Detail │  │  Dashboard   │     │
│  │    Page      │  │     Page     │  │     Page     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │    Login     │  │   Register   │                        │
│  │    Page      │  │     Page     │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │            AuthContext (State)                 │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                   │
│                          │ API Calls                         │
│                          ▼                                   │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP/REST
                           │
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│                  (Express - Port 5000)                       │
│                                                              │
│  ┌────────────────────────────────────────────────┐        │
│  │                   Routes                        │        │
│  │  ┌──────────────┐      ┌──────────────┐       │        │
│  │  │  /api/auth   │      │ /api/events  │       │        │
│  │  └──────────────┘      └──────────────┘       │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                   │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────┐        │
│  │              Middleware (Auth)                 │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                   │
│                          ▼                                   │
│  ┌────────────────────────────────────────────────┐        │
│  │               Controllers                       │        │
│  │  ┌──────────────┐    ┌──────────────┐         │        │
│  │  │     Auth     │    │    Events    │         │        │
│  │  └──────────────┘    └──────────────┘         │        │
│  └────────────────────────────────────────────────┘        │
│                          │                                   │
│                          ▼                                   │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ Mongoose ODM
                           │
┌─────────────────────────────────────────────────────────────┐
│                        DATABASE                              │
│                  (MongoDB - Port 27017)                      │
│                                                              │
│  ┌──────────────┐              ┌──────────────┐            │
│  │     Users    │              │    Events    │            │
│  │  Collection  │◄────────────►│  Collection  │            │
│  └──────────────┘              └──────────────┘            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Registration Flow
```
User Input → Register Component → API Service → Backend Controller 
→ Hash Password → Save to MongoDB → Generate JWT → Return to Frontend 
→ Store Token → Redirect to Events
```

### Event Registration Flow
```
Click Register → Check Auth → API Call with Token → Verify JWT 
→ Check Availability → Update Event & User → Return Updated Data 
→ Refresh UI → Show Success
```

### Dashboard Flow
```
Navigate to Dashboard → Protected Route Check → API Call with Token 
→ Verify JWT → Fetch User's Events → Separate Upcoming/Past 
→ Return Data → Display in Dashboard
```

## Technology Flow

```
                    ┌─────────────┐
                    │    React    │
                    │   Router    │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         ┌────▼───┐   ┌───▼────┐  ┌───▼────┐
         │ Public │   │Protected│  │  Auth  │
         │ Routes │   │ Routes  │  │Context │
         └────────┘   └────┬────┘  └───┬────┘
                           │            │
                      ┌────▼────────────▼────┐
                      │    API Service       │
                      │   (Fetch Calls)      │
                      └──────────┬───────────┘
                                 │
                      ┌──────────▼───────────┐
                      │   Express Server     │
                      └──────────┬───────────┘
                                 │
                      ┌──────────▼───────────┐
                      │   Mongoose ODM       │
                      └──────────┬───────────┘
                                 │
                      ┌──────────▼───────────┐
                      │   MongoDB Database   │
                      └──────────────────────┘
```

## Component Relationships

```
App
├── Navbar
│   └── (Shows: Auth Status, Navigation Links)
│
├── Events Page
│   ├── SearchFilters
│   └── EventCard (multiple)
│
├── EventDetail Page
│   └── (Register/Cancel Buttons)
│
├── Login Page
│   └── (Form)
│
├── Register Page
│   └── (Form)
│
└── Dashboard Page (Protected)
    └── EventCard (multiple - user's events)
```

## API Endpoint Structure

```
/api
├── /auth
│   ├── POST   /register        (Public)
│   ├── POST   /login           (Public)
│   └── GET    /me              (Protected)
│
└── /events
    ├── GET    /                (Public - with filters)
    ├── GET    /:id             (Public)
    ├── POST   /                (Protected - create)
    ├── POST   /:id/register    (Protected)
    ├── DELETE /:id/register    (Protected)
    └── GET    /my/events       (Protected)
```

## File Size Reference

| File | Lines | Purpose |
|------|-------|---------|
| server.js | ~50 | Main server setup |
| User.js | ~40 | User model |
| Event.js | ~50 | Event model |
| authController.js | ~90 | Auth logic |
| eventController.js | ~200 | Event logic |
| auth.js | ~35 | JWT middleware |
| App.js | ~40 | React app setup |
| Events.js | ~110 | Events listing |
| EventDetail.js | ~240 | Event details |
| Dashboard.js | ~180 | User dashboard |
| App.css | ~350 | Global styles |

## Dependencies Count

**Backend**: 7 main dependencies
**Frontend**: 3 main dependencies

Keeping dependencies minimal for easier maintenance!
