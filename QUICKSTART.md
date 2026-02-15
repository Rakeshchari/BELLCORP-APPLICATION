# 🚀 Quick Start Checklist

Use this checklist to get the Event Management System up and running in under 10 minutes!

## ✅ Prerequisites Check

- [ ] Node.js installed (v14+)
- [ ] MongoDB installed (or MongoDB Atlas account)
- [ ] npm or yarn installed
- [ ] Code editor (VS Code recommended)

## 📥 Step 1: Project Setup (30 seconds)

```bash
cd Bellcorp
```

## 🔧 Step 2: Backend Setup (2 minutes)

### 2.1 Install Dependencies
```bash
cd backend
npm install
```

### 2.2 Create Environment File
```bash
# Copy the example file
cp .env.example .env

# Or create manually with:
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/event_management
# JWT_SECRET=my_secret_key_change_this
# NODE_ENV=development
```

- [ ] Dependencies installed
- [ ] .env file created

## 💾 Step 3: Database Setup (1 minute)

### 3.1 Start MongoDB
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB

# Or use MongoDB Atlas (cloud)
```

### 3.2 Seed Database
```bash
# Still in backend folder
node seed.js
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing events
✅ Inserted 12 sample events
✅ Database seeded successfully!
```

- [ ] MongoDB running
- [ ] Database seeded

## 🚀 Step 4: Start Backend (30 seconds)

```bash
# Still in backend folder
npm run dev
```

Expected output:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📍 Environment: development
```

Keep this terminal open!

- [ ] Backend server running on port 5000

## 🎨 Step 5: Frontend Setup (2 minutes)

### 5.1 Open New Terminal
```bash
# From project root
cd frontend
npm install
```

### 5.2 Create Environment File
```bash
# Copy the example file
cp .env.example .env

# Or create manually with:
# REACT_APP_API_URL=http://localhost:5000/api
```

- [ ] Dependencies installed
- [ ] .env file created

## 🌐 Step 6: Start Frontend (30 seconds)

```bash
# Still in frontend folder
npm start
```

Browser should automatically open at `http://localhost:3000`

Expected: Homepage with 12 events displayed

- [ ] Frontend running on port 3000
- [ ] Browser opened automatically
- [ ] Events visible on homepage

## ✨ Step 7: Test Features (2 minutes)

### 7.1 Browse Events
- [ ] Can see event cards
- [ ] Can search events
- [ ] Can filter by category
- [ ] Can click on event to view details

### 7.2 Create Account
- [ ] Click "Sign Up"
- [ ] Fill form: Name, Email, Password
- [ ] Click "Create Account"
- [ ] Redirected to homepage
- [ ] "Hi, [Your Name]" shown in navbar

### 7.3 Register for Event
- [ ] Click any event
- [ ] Click "Register for Event"
- [ ] See success message
- [ ] Available seats decreased

### 7.4 Check Dashboard
- [ ] Click "Dashboard" in navbar
- [ ] See registered event
- [ ] See statistics (1 upcoming event)

### 7.5 Cancel Registration
- [ ] On dashboard, click "Cancel Registration"
- [ ] Confirm cancellation
- [ ] Event removed from dashboard

## 🎉 Success!

If all checkboxes are checked, you're ready to go!

## 🔍 Verification URLs

Open these in your browser to verify:

- [ ] Frontend: http://localhost:3000
- [ ] Backend Health: http://localhost:5000/api/health
- [ ] Events API: http://localhost:5000/api/events

## 📱 Test Different Devices

Try resizing your browser window or opening on:
- [ ] Mobile view (< 640px)
- [ ] Tablet view (640px - 1024px)
- [ ] Desktop view (> 1024px)

## 🐛 Common Issues?

### MongoDB not connecting?
```bash
# Check if MongoDB is running
ps aux | grep mongod

# Restart MongoDB
brew services restart mongodb-community  # macOS
```

### Port already in use?
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Frontend not connecting to backend?
1. Check backend is running on port 5000
2. Verify `.env` has correct API URL
3. Check browser console for CORS errors

## 📚 Next Steps

After completing the checklist:

1. Read `README.md` for full documentation
2. Check `API_DOCUMENTATION.md` for API reference
3. Explore `PROJECT_SUMMARY.md` for architecture details
4. Start customizing and adding features!

## 🎯 Sample Test User

Want to quickly test? Create this user:

```bash
# In a new terminal
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123"
  }'
```

Then login with:
- Email: test@example.com
- Password: test123

## 💡 Quick Tips

1. **Keep both terminals open** - One for backend, one for frontend
2. **Check console logs** - Errors will show here
3. **Use browser DevTools** - Network tab shows API calls
4. **MongoDB Compass** - Great GUI for viewing database
5. **Postman/Insomnia** - Test API endpoints directly

## 🏁 Project Running Checklist

Both servers should be running:

```
Terminal 1 (Backend):
Bellcorp/backend$ npm run dev
→ Server running on port 5000 ✅

Terminal 2 (Frontend):
Bellcorp/frontend$ npm start
→ Compiled successfully ✅
→ Browser at localhost:3000 ✅
```

## 📝 Final Verification

Everything working if you can:
- [x] See events on homepage
- [x] Search works
- [x] Can create account
- [x] Can login
- [x] Can register for event
- [x] Can view dashboard
- [x] Can cancel registration
- [x] Can logout

---

**Time to complete: ~8-10 minutes**

**Enjoy your Event Management System! 🎉**
