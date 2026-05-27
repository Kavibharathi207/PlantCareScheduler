import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminCarePlansPage from './components/AdminCarePlansPage';
import GuestDashboard from './components/GuestDashboard';
import CarePlanPage from './components/CarePlanPage';
import MyPlantsPage from './components/MyPlantsPage';
import { PlantProvider } from './context/PlantContext';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="App">
      <Router>
        <PlantProvider user={user}>
          <Routes>
            <Route 
              path="/" 
              element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : user.role === 'USER' ? '/user/dashboard' : '/guest/dashboard'} />} 
            />
            <Route 
              path="/login" 
              element={!user ? <LoginPage onLogin={handleLogin} /> : <Navigate to={user.role === 'ADMIN' ? '/admin/dashboard' : user.role === 'USER' ? '/user/dashboard' : '/guest/dashboard'} />} 
            />
            <Route path="/guest/dashboard" element={<GuestDashboard onLogin={handleLogin} />} />
            <Route 
              path="/user/dashboard" 
              element={user && user.role === 'USER' ? <UserDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/admin/dashboard" 
              element={user && user.role === 'ADMIN' ? <AdminDashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin/careplans" 
              element={user && user.role === 'ADMIN' ? <AdminCarePlansPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/careplan" 
              element={user ? <CarePlanPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/my-plants" 
              element={user ? <MyPlantsPage user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </PlantProvider>
      </Router>
    </div>
  );
}

export default App;