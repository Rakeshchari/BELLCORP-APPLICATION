# 📦 Project Files Index

Complete list of all files in the Event Management System project.

## 📚 Documentation Files (7 files)

| File | Purpose | Read Time |
|------|---------|-----------|
| `README.md` | Main project documentation | 15 min |
| `SETUP.md` | Quick setup guide | 5 min |
| `QUICKSTART.md` | 10-minute checklist | 3 min |
| `API_DOCUMENTATION.md` | Complete API reference | 10 min |
| `PROJECT_SUMMARY.md` | Architecture overview | 8 min |
| `STRUCTURE.md` | Visual project structure | 5 min |
| `TROUBLESHOOTING.md` | Common issues & solutions | 10 min |

**📖 Suggested Reading Order:**
1. `QUICKSTART.md` - Get running fast
2. `README.md` - Understand the project
3. `API_DOCUMENTATION.md` - Learn the API
4. `TROUBLESHOOTING.md` - When things break

---

## 🔧 Backend Files (13 files)

### Configuration & Setup (4 files)
```
backend/
├── package.json          # Dependencies and scripts
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
└── server.js           # Main server entry point (50 lines)
```

### Database (3 files)
```
backend/src/
├── config/
│   └── database.js      # MongoDB connection (20 lines)
└── models/
    ├── User.js         # User schema (40 lines)
    └── Event.js        # Event schema (50 lines)
```

### Business Logic (4 files)
```
backend/src/
├── controllers/
│   ├── authController.js    # Auth logic (90 lines)
│   └── eventController.js   # Event logic (200 lines)
└── middleware/
    └── auth.js              # JWT authentication (35 lines)
```

### API Routes (2 files)
```
backend/src/routes/
├── authRoutes.js       # Auth endpoints (15 lines)
└── eventRoutes.js      # Event endpoints (20 lines)
```

### Utilities (1 file)
```
backend/
└── seed.js            # Database seeding script (150 lines)
```

**Backend Total: ~670 lines of code**

---

## 🎨 Frontend Files (25 files)

### Configuration & Setup (4 files)
```
frontend/
├── package.json           # Dependencies and scripts
├── .env.example          # Environment variables template
├── .gitignore           # Git ignore rules
└── public/
    └── index.html       # HTML template (15 lines)
```

### Application Core (2 files)
```
frontend/src/
├── index.js             # React entry point (10 lines)
└── App.js              # Main app component (40 lines)
```

### State Management (1 file)
```
frontend/src/context/
└── AuthContext.js       # Authentication context (70 lines)
```

### API Layer (1 file)
```
frontend/src/services/
└── api.js              # API service functions (130 lines)
```

### Components (4 files)
```
frontend/src/components/
├── Navbar.js            # Navigation bar (60 lines)
├── EventCard.js         # Event card component (80 lines)
├── SearchFilters.js     # Search/filter UI (70 lines)
└── ProtectedRoute.js    # Route protection (20 lines)
```

### Pages (5 files)
```
frontend/src/pages/
├── Events.js            # Events listing (110 lines)
├── EventDetail.js       # Event details (240 lines)
├── Login.js            # Login page (100 lines)
├── Register.js         # Registration page (130 lines)
└── Dashboard.js        # User dashboard (180 lines)
```

### Styles (7 files)
```
frontend/src/styles/
├── App.css             # Global styles (350 lines)
├── Navbar.css          # Navbar styles (90 lines)
├── EventCard.css       # Event card styles (110 lines)
├── SearchFilters.css   # Search/filter styles (80 lines)
├── EventDetail.css     # Event detail styles (150 lines)
├── Auth.css           # Auth pages styles (80 lines)
└── Dashboard.css      # Dashboard styles (140 lines)
```

**Frontend Total: ~2,235 lines of code**

---

## 📊 Project Statistics

### Files by Type
- JavaScript (.js): 23 files
- CSS (.css): 7 files
- JSON (.json): 2 files
- HTML (.html): 1 file
- Markdown (.md): 7 files
- Config (.env.example, .gitignore): 4 files

**Total: 44 files**

### Lines of Code
- Backend: ~670 lines
- Frontend JS: ~1,235 lines
- Frontend CSS: ~1,000 lines
- Documentation: ~40,000 words

**Total Code: ~2,905 lines**

### File Size
- Smallest: `.gitignore` (43 bytes)
- Largest: `EventDetail.js` (7.5 KB)
- Total Project: ~120 KB (excluding node_modules)

---

## 🗂️ File Organization

### Backend Structure
```
backend/
├── Configuration Layer
│   ├── server.js (Express setup)
│   ├── .env (environment)
│   └── database.js (MongoDB)
│
├── Data Layer
│   ├── User.js (schema)
│   └── Event.js (schema)
│
├── Business Logic Layer
│   ├── authController.js
│   └── eventController.js
│
├── API Layer
│   ├── authRoutes.js
│   └── eventRoutes.js
│
└── Security Layer
    └── auth.js (middleware)
```

### Frontend Structure
```
frontend/
├── Entry Point
│   ├── index.html
│   └── index.js
│
├── Application Layer
│   ├── App.js (routing)
│   └── AuthContext.js (state)
│
├── View Layer
│   ├── Pages (5 files)
│   └── Components (4 files)
│
├── Service Layer
│   └── api.js
│
└── Presentation Layer
    └── Styles (7 files)
```

---

## 🎯 Key Files to Understand

### Must Read (Core Functionality)
1. `backend/server.js` - Server setup
2. `backend/src/models/Event.js` - Data structure
3. `backend/src/controllers/eventController.js` - Business logic
4. `frontend/src/context/AuthContext.js` - State management
5. `frontend/src/services/api.js` - API communication
6. `frontend/src/App.js` - Routing

### Should Read (Features)
7. `frontend/src/pages/Events.js` - Main page
8. `frontend/src/pages/EventDetail.js` - Event interaction
9. `frontend/src/pages/Dashboard.js` - User management
10. `backend/src/middleware/auth.js` - Security

### Nice to Read (Polish)
11. `frontend/src/styles/App.css` - Design system
12. `backend/seed.js` - Sample data

---

## 📝 File Purposes at a Glance

### Backend
| File | What it does |
|------|--------------|
| server.js | Starts Express server, connects to MongoDB |
| database.js | Handles MongoDB connection |
| User.js | Defines user data structure |
| Event.js | Defines event data structure |
| authController.js | Handles register/login/token |
| eventController.js | Handles event CRUD operations |
| auth.js | Verifies JWT tokens |
| authRoutes.js | Defines auth API endpoints |
| eventRoutes.js | Defines event API endpoints |
| seed.js | Populates database with sample data |

### Frontend
| File | What it does |
|------|--------------|
| index.js | React entry point |
| App.js | Sets up routing |
| AuthContext.js | Manages user authentication state |
| api.js | Makes API calls to backend |
| Navbar.js | Top navigation bar |
| EventCard.js | Displays event summary |
| SearchFilters.js | Search and filter controls |
| ProtectedRoute.js | Protects routes requiring auth |
| Events.js | Lists all events |
| EventDetail.js | Shows event details |
| Login.js | Login form |
| Register.js | Sign up form |
| Dashboard.js | User's registered events |
| *.css | Styling for components |

---

## 🔄 Data Flow Through Files

### Registration Flow
```
Register.js (form)
  ↓
api.js (authAPI.register)
  ↓
authRoutes.js (POST /register)
  ↓
authController.js (register function)
  ↓
User.js (create user)
  ↓
MongoDB (save)
  ↓
JWT token generated
  ↓
AuthContext.js (store token)
  ↓
localStorage (persist)
```

### Event Browsing Flow
```
Events.js (component)
  ↓
api.js (eventsAPI.getEvents)
  ↓
eventRoutes.js (GET /events)
  ↓
eventController.js (getEvents function)
  ↓
Event.js (query with filters)
  ↓
MongoDB (retrieve)
  ↓
EventCard.js (display each)
```

---

## 🎨 CSS Architecture

Each component has dedicated styling:
- **App.css**: Global variables, utilities, base styles
- **Component.css**: Component-specific styles
- **No conflicts**: Proper class naming
- **Responsive**: Mobile-first approach
- **Modern**: Flexbox & Grid

---

## 📦 Dependencies

### Backend (7 packages)
1. express - Web framework
2. mongoose - MongoDB ODM
3. bcryptjs - Password hashing
4. jsonwebtoken - JWT auth
5. dotenv - Environment variables
6. cors - CORS handling
7. express-validator - Input validation

### Frontend (3 packages)
1. react - UI library
2. react-dom - React renderer
3. react-router-dom - Routing

**Total: 10 direct dependencies** (minimal and maintainable)

---

## 🚀 Next Steps

1. **Start here**: `QUICKSTART.md`
2. **Understand**: `README.md`
3. **Customize**: Modify files to fit your needs
4. **Deploy**: Follow deployment guides
5. **Extend**: Add new features

---

## 💡 File Modification Tips

### To add a new feature:
1. **Backend**: Add controller function → Add route → Test
2. **Frontend**: Add API service → Add component → Add styling
3. **Document**: Update README and API docs

### To change styling:
- Edit corresponding CSS file in `frontend/src/styles/`
- Use CSS variables defined in `App.css`

### To add a new page:
1. Create in `frontend/src/pages/`
2. Add route in `App.js`
3. Create CSS in `frontend/src/styles/`

---

**All files are well-commented and ready to explore!** 🎉
