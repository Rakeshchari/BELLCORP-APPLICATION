# 🔧 Troubleshooting Guide

Common issues and their solutions for the Event Management System.

## Table of Contents
1. [Backend Issues](#backend-issues)
2. [Frontend Issues](#frontend-issues)
3. [Database Issues](#database-issues)
4. [Authentication Issues](#authentication-issues)
5. [API Issues](#api-issues)

---

## Backend Issues

### Issue: `npm install` fails in backend

**Symptoms:**
- Error messages during `npm install`
- Missing dependencies

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Try again
npm install

# If still fails, try with legacy peer deps
npm install --legacy-peer-deps
```

### Issue: Cannot connect to MongoDB

**Symptoms:**
```
❌ MongoDB connection error: connect ECONNREFUSED
```

**Solutions:**

**Option 1: Local MongoDB not running**
```bash
# macOS
brew services start mongodb-community
brew services list  # Verify it's running

# Linux
sudo systemctl start mongod
sudo systemctl status mongod

# Windows
net start MongoDB
```

**Option 2: Wrong MongoDB URI**
```bash
# Check your .env file
cat backend/.env

# Should be:
MONGODB_URI=mongodb://localhost:27017/event_management

# Or for MongoDB Atlas:
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/event_management
```

**Option 3: MongoDB not installed**
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Linux (Ubuntu)
sudo apt-get install mongodb

# Or use MongoDB Atlas (cloud) - no installation needed
```

### Issue: Port 5000 already in use

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solutions:**
```bash
# Find what's using port 5000
lsof -ti:5000

# Kill the process
lsof -ti:5000 | xargs kill -9

# Or change port in .env
PORT=5001
```

### Issue: JWT_SECRET warning

**Symptoms:**
- Auth not working
- Token errors

**Solution:**
```bash
# Make sure .env has JWT_SECRET
echo "JWT_SECRET=your_secret_key_at_least_32_characters_long" >> backend/.env
```

---

## Frontend Issues

### Issue: `npm install` fails in frontend

**Symptoms:**
- Dependency conflicts
- Installation errors

**Solutions:**
```bash
# Clear cache
npm cache clean --force

# Remove and reinstall
rm -rf node_modules package-lock.json
npm install

# If React version conflicts
npm install --legacy-peer-deps
```

### Issue: Port 3000 already in use

**Symptoms:**
```
? Something is already running on port 3000
```

**Solutions:**
```bash
# Option 1: Kill process on 3000
lsof -ti:3000 | xargs kill -9
npm start

# Option 2: Run on different port
PORT=3001 npm start
```

### Issue: Blank white screen

**Symptoms:**
- Browser shows white screen
- No errors in terminal

**Solutions:**
1. Check browser console (F12) for errors
2. Verify backend is running
3. Check `.env` file exists in frontend folder
4. Verify `REACT_APP_API_URL` is set correctly

```bash
# Check .env
cat frontend/.env

# Should show:
REACT_APP_API_URL=http://localhost:5000/api
```

### Issue: CORS errors

**Symptoms:**
```
Access to fetch at 'http://localhost:5000/api/events' has been blocked by CORS policy
```

**Solutions:**
1. Verify backend is running
2. Check backend has CORS enabled (it should by default)
3. Verify API URL in frontend `.env`:

```bash
# Should be exactly:
REACT_APP_API_URL=http://localhost:5000/api

# Not:
REACT_APP_API_URL=http://localhost:5000/api/  # (extra slash)
REACT_APP_API_URL=http://localhost:5000       # (missing /api)
```

### Issue: Events not loading

**Symptoms:**
- Homepage is blank
- "Loading..." never finishes

**Solutions:**
```bash
# Test backend directly
curl http://localhost:5000/api/events

# If this returns data, check:
# 1. Browser console for errors
# 2. Network tab in DevTools
# 3. Frontend .env file

# If this doesn't return data:
# 1. Backend not running
# 2. Database not seeded
node backend/seed.js
```

---

## Database Issues

### Issue: Database seeding fails

**Symptoms:**
```
❌ Error seeding database
```

**Solutions:**
```bash
# Make sure MongoDB is running
ps aux | grep mongod

# Check connection string in .env
cat backend/.env

# Try seeding again
cd backend
node seed.js

# If still fails, manually check MongoDB
mongosh  # or mongo (older versions)
> use event_management
> db.events.find()
```

### Issue: Old data in database

**Symptoms:**
- Wrong event data
- Duplicates

**Solutions:**
```bash
# Re-seed the database
cd backend
node seed.js

# This automatically clears old data and inserts fresh data
```

### Issue: Cannot access MongoDB shell

**Symptoms:**
```
mongosh: command not found
```

**Solutions:**
```bash
# For newer MongoDB (>5.0)
brew install mongosh  # macOS
sudo apt install mongodb-mongosh  # Linux

# For older MongoDB (<5.0)
mongo  # Use 'mongo' instead of 'mongosh'

# Or use MongoDB Compass (GUI)
# Download from: https://www.mongodb.com/products/compass
```

---

## Authentication Issues

### Issue: Cannot login/register

**Symptoms:**
- Login form doesn't work
- "Invalid credentials" error

**Solutions:**
```bash
# Test registration API directly
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'

# If this works, issue is frontend
# If this doesn't work, issue is backend

# Common fixes:
# 1. Check backend is running
# 2. Check MongoDB is connected
# 3. Check JWT_SECRET in .env
# 4. Check browser console for errors
```

### Issue: Not staying logged in on refresh

**Symptoms:**
- Logged out after page refresh
- Have to login again

**Solutions:**
1. Check browser localStorage (F12 → Application → Local Storage)
2. Should see `token` stored
3. If not storing token, check `AuthContext.js`
4. Clear browser cache and try again

```bash
# Test if token is being saved
# 1. Login through UI
# 2. Open browser console
# 3. Type:
localStorage.getItem('token')
# Should show a long string (JWT token)
```

### Issue: JWT token expired

**Symptoms:**
```
{
  "message": "Token expired"
}
```

**Solution:**
```bash
# Token expires after 7 days by default
# Just login again

# To change expiration (in authController.js):
# Change '7d' to '30d' for 30 days
```

---

## API Issues

### Issue: API returns 404

**Symptoms:**
```
{"message": "Route not found"}
```

**Solutions:**
1. Check the API endpoint URL
2. Common mistakes:
```bash
# Wrong
http://localhost:5000/events          # Missing /api
http://localhost:5000/api/events/     # Extra trailing slash

# Correct
http://localhost:5000/api/events
```

### Issue: API returns 500 error

**Symptoms:**
```
{"message": "Something went wrong!"}
```

**Solutions:**
1. Check backend terminal for error details
2. Check MongoDB is connected
3. Check data format matches model schema

### Issue: Cannot register for event

**Symptoms:**
- Button doesn't work
- "Already registered" error when not registered

**Solutions:**
```bash
# Check if you're actually registered
curl http://localhost:5000/api/events/my/events \
  -H "Authorization: Bearer YOUR_TOKEN"

# If you see the event, cancel registration first:
curl -X DELETE http://localhost:5000/api/events/EVENT_ID/register \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## General Debugging Tips

### Enable detailed logging

**Backend:**
```javascript
// In server.js, add:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

**Frontend:**
```javascript
// In api.js, add console.logs:
console.log('API Request:', url, options);
console.log('API Response:', data);
```

### Check running processes

```bash
# See what's running on ports
lsof -ti:5000  # Backend
lsof -ti:3000  # Frontend

# See all Node processes
ps aux | grep node
```

### Clear everything and start fresh

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules package-lock.json
npm install
npm start

# Database
cd backend
node seed.js
```

### Test with curl

```bash
# Health check
curl http://localhost:5000/api/health

# Get events
curl http://localhost:5000/api/events

# Register (need token from login)
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"test123"}'
```

---

## Still Having Issues?

### Checklist
- [ ] MongoDB is running
- [ ] Backend .env file exists and is configured
- [ ] Backend dependencies installed
- [ ] Backend server running on port 5000
- [ ] Frontend .env file exists and is configured
- [ ] Frontend dependencies installed
- [ ] Frontend server running on port 3000
- [ ] Database is seeded
- [ ] No firewall blocking ports
- [ ] Using correct Node.js version (14+)

### Get Help
1. Check error messages carefully
2. Read error stack traces
3. Check browser console (F12)
4. Check Network tab in DevTools
5. Look at backend terminal output
6. Review relevant documentation

---

**Most issues are solved by:**
1. Restarting servers
2. Checking environment variables
3. Ensuring MongoDB is running
4. Clearing cache and reinstalling dependencies

Happy debugging! 🐛🔍
