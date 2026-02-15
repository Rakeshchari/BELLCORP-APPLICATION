# Quick Setup Guide

Follow these steps to get the Event Management System running on your machine.

## Prerequisites Check

```bash
# Check Node.js version (should be v14+)
node --version

# Check npm version
npm --version

# Check if MongoDB is installed
mongod --version
```

## Step-by-Step Setup

### 1. Start MongoDB

**Option A: Local MongoDB**
```bash
# Start MongoDB service
# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Option B: MongoDB Atlas (Cloud)**
- Create account at https://www.mongodb.com/cloud/atlas
- Create a cluster
- Get connection string
- Use it in backend .env file

### 2. Setup Backend

```bash
# Navigate to backend folder
cd backend

# Install all dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your settings
# For local MongoDB:
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event_management
JWT_SECRET=my_super_secret_jwt_key_12345
NODE_ENV=development

# Seed database with sample events
node seed.js

# Start backend server
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📍 Environment: development
```

### 3. Setup Frontend

**Open a NEW terminal window/tab**

```bash
# Navigate to frontend folder
cd frontend

# Install all dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file
REACT_APP_API_URL=http://localhost:5000/api

# Start frontend server
npm start
```

Browser will automatically open at `http://localhost:3000`

## Verify Installation

### Test Backend

Open browser or use curl:
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Should return: {"status":"OK","message":"Server is running"}

# Test events endpoint
curl http://localhost:5000/api/events

# Should return list of events
```

### Test Frontend

1. Open `http://localhost:3000` in browser
2. You should see the events page with 12 sample events
3. Try searching and filtering
4. Click "Sign Up" to create an account

## Common Issues & Solutions

### Issue: MongoDB Connection Failed

**Solution:**
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Start MongoDB if not running
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Issue: Port 5000 or 3000 Already in Use

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Issue: Dependencies Installation Failed

**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Cannot Create .env File

**Solution:**
```bash
# Manually create .env file
# In backend folder:
echo "PORT=5000
MONGODB_URI=mongodb://localhost:27017/event_management
JWT_SECRET=my_super_secret_jwt_key_12345
NODE_ENV=development" > .env

# In frontend folder:
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

## Quick Commands Reference

### Backend Commands
```bash
npm install           # Install dependencies
npm start            # Start server (production)
npm run dev          # Start server (development with nodemon)
node seed.js         # Populate database with sample data
```

### Frontend Commands
```bash
npm install          # Install dependencies
npm start           # Start development server
npm run build       # Build for production
```

## Testing the Application

### 1. Create Account
- Click "Sign Up" button
- Fill in: Name, Email, Password
- Click "Create Account"
- You'll be automatically logged in

### 2. Browse Events
- Use search bar to search events
- Use filters for Location, Category, Date
- Click on event cards to view details

### 3. Register for Event
- Click on any event
- Click "Register for Event" button
- Event will appear in your Dashboard

### 4. View Dashboard
- Click "Dashboard" in navigation
- See all your registered events
- View upcoming vs past events
- Cancel registrations if needed

## Sample Test User

If you want to quickly test with a pre-made account:

```bash
# Register via API
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

Then login with:
- Email: `test@example.com`
- Password: `test123`

## Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event_management
JWT_SECRET=change_this_to_a_random_secret_key
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Verification Checklist

- [ ] MongoDB is running
- [ ] Backend dependencies installed (`backend/node_modules` exists)
- [ ] Backend .env file created and configured
- [ ] Database seeded (see sample events at http://localhost:5000/api/events)
- [ ] Backend server running (http://localhost:5000/api/health returns OK)
- [ ] Frontend dependencies installed (`frontend/node_modules` exists)
- [ ] Frontend .env file created and configured
- [ ] Frontend server running (http://localhost:3000 loads)
- [ ] Can see events on homepage
- [ ] Can create account
- [ ] Can login
- [ ] Can register for events
- [ ] Can view dashboard

## Next Steps

1. **Explore the code**: Check out the clean, modular structure
2. **Test features**: Try all CRUD operations
3. **Customize**: Modify colors, add features, etc.
4. **Deploy**: Consider deploying to Heroku, Vercel, or similar

## Need Help?

Check the main README.md for:
- Detailed API documentation
- Project structure explanation
- Technology stack details
- Troubleshooting guide

---

Happy Coding! 🚀
