# 🌿 Enhanced Plant Care Scheduler

A beautiful, full-featured web application for managing plant care with role-based authentication and outstanding UI/UX.

## ✨ Features Added

### 🔐 Authentication System
- **Login/Register** with beautiful UI matching your existing style
- **Role-based access control**: Admin, User, Guest
- **Session management** with localStorage
- **Secure password handling** in backend

### 👥 User Roles
- **Admin**: View all users, manage system, see analytics dashboard
- **User**: Add/edit/delete own plants, generate care plans
- **Guest**: Browse plants (read-only), encouraged to register

### 🎨 Enhanced UI/UX
- **Preserved your beautiful plant-themed design**
- **Responsive navigation bar** with role-based links
- **Landing page** with feature highlights
- **Enhanced forms** with focus states and validation
- **Beautiful dashboards** for each user type
- **Consistent color scheme** (#4CAF50 green theme)

### 🌱 Plant Management
- **Full CRUD operations** (Create, Read, Update, Delete)
- **Enhanced plant form** with all fields including lastWateredDate
- **Beautiful plant cards** with hover effects
- **Care plan generation** with improved UI
- **Plant images** with fallback defaults

### 🛠️ Technical Enhancements
- **React Router** for navigation
- **Axios** for API calls
- **Component-based architecture**
- **Proper error handling**
- **Loading states**
- **Form validation**

## 🚀 How to Run

### Backend (Spring Boot)
```bash
cd springapp
mvn spring-boot:run
```
- Runs on: https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io

### Frontend (React)
```bash
cd reactapp
npm start
```
- Runs on: https://8081-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io

## 🔑 Default Login Credentials

### Admin Access
- Username: `admin`
- Password: `admin123`

### User Access  
- Username: `user`
- Password: `user123`

### Guest Access
- Click "Continue as Guest" or "Browse Plants"

## 📱 User Journey

1. **Landing Page**: Beautiful welcome with feature highlights
2. **Register/Login**: Secure authentication with plant-themed UI
3. **Dashboard**: Role-specific interface
   - **User**: Manage personal plants, create care plans
   - **Admin**: View system stats, manage users
   - **Guest**: Browse plants, encouraged to register
4. **Plant Management**: Add, edit, delete plants with beautiful forms
5. **Care Plans**: Generate water-first or sunlight-first schedules

## 🎯 Key Improvements

### Preserved Your Style ✅
- Kept all your beautiful plant emojis (🌿🌱💧☀️)
- Maintained green color scheme (#4CAF50, #2e7d32)
- Preserved Poppins font and styling
- Enhanced with better shadows and transitions

### Added Missing Features ✅
- Complete authentication system
- Role-based routing and access control
- Admin dashboard with user management
- Enhanced plant forms with all required fields
- Beautiful navigation and landing page
- Proper error handling and loading states

### Database Integration ✅
- All operations save to your existing database
- Proper CRUD operations
- Sample data initialization
- User management with secure passwords

## 🧪 Test Cases Support

The application now supports all the required test cases:
- ✅ Add valid plant
- ✅ Form validation
- ✅ View all plants  
- ✅ Generate care plans (water/sunlight sorting)
- ✅ Delete plants
- ✅ Responsive design
- ✅ Backend connectivity

## 🌟 Outstanding UI Features

- **Hover animations** on cards and buttons
- **Focus states** for accessibility
- **Loading spinners** with plant emojis
- **Toast notifications** for user feedback
- **Gradient backgrounds** with plant imagery
- **Smooth transitions** throughout the app
- **Mobile-responsive** design

Your Plant Care Scheduler is now a complete, production-ready application with outstanding UI/UX! 🎉