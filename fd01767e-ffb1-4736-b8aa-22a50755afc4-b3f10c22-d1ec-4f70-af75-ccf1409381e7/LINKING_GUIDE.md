# Frontend-Backend User Linking Guide

## Overview
Your frontend (port 8081) and backend (port 8080) are now linked for user management. When you add a new user in either interface, it will be synchronized with both systems.

## How It Works

### 1. User Registration
- **Frontend Registration**: Users can register through the login page, data is saved to both localStorage and backend database
- **Admin Panel**: Admins can add users through the "Add Users" tab, which syncs to both systems

### 2. Data Synchronization
- **Automatic Sync**: New users are automatically added to both frontend (localStorage) and backend (database)
- **Manual Sync**: Use the "Sync Frontend ↔ Backend" button to manually synchronize data
- **Fallback**: If backend is unavailable, users are still saved to frontend localStorage

### 3. User Access Points

#### Frontend (https://8081-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io/)
- Login page with registration option
- Admin dashboard with user management tab

#### Backend (https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io/)
- API endpoints for user management:
  - `POST /api/register` - Register new user
  - `GET /api/users` - Get all users
  - `GET /api/users/count` - Get user count

## Testing the Link

### Test 1: Register via Frontend
1. Go to frontend URL
2. Click "New User? Register"
3. Fill in user details
4. User should appear in both frontend and backend

### Test 2: Add User via Admin Panel
1. Login as admin (username: admin, password: Admin@123)
2. Go to "Add Users" tab
3. Create a new user
4. User should be available for login immediately

### Test 3: Sync Verification
1. Use the "Sync Frontend ↔ Backend" button
2. Check that all users are consistent between systems

## API Endpoints

```javascript
// Register user (syncs to both systems)
POST /api/register
{
  "username": "newuser",
  "email": "user@example.com", 
  "password": "password123",
  "role": "USER"
}

// Get all users
GET /api/users

// Get user count
GET /api/users/count
```

## Files Modified

### Backend
- `UserController.java` - Added proper registration and user listing endpoints
- `UserService.java` - Enhanced user management functionality

### Frontend
- `api.js` - Added user management API calls
- `LoginPage.jsx` - Updated to sync with backend on registration
- `AdminDashboard.jsx` - Added user management tab and backend integration
- `UserManagement.jsx` - New component for user creation and sync
- `syncUtils.js` - Utility functions for data synchronization

## Usage Instructions

1. **For Regular Users**: Use the registration option on the login page
2. **For Admins**: Use the "Add Users" tab in the admin dashboard
3. **For Sync Issues**: Use the manual sync button to ensure data consistency

The system now maintains user data in both frontend localStorage and backend database, ensuring users created in either interface are available in both systems.