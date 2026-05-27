import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api';

const APP_BG_IMAGE_URL = 'https://img.freepik.com/free-photo/tropical-palm-leaves-pattern-background-green-monstera-tree-foliage-decoration-design-plant-with-exotic-leaf-closeup_90220-1135.jpg';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundImage: `url(${APP_BG_IMAGE_URL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    fontFamily: 'Poppins, sans-serif',
    padding: '20px',
  },
  form: {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 255, 248, 0.95))',
    padding: '50px',
    borderRadius: '25px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1)',
    width: '100%',
    maxWidth: '450px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  title: {
    textAlign: 'center',
    fontSize: '2.8em',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #2e7d32, #4CAF50)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginBottom: '20px',
  },
  input: {
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #a5d6a7',
    outline: 'none',
    fontSize: '1em',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '15px',
    background: 'linear-gradient(135deg, #4CAF50, #45a049)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '1.1em',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
    transform: 'translateY(0)',
  },
  guestBtn: {
    padding: '12px',
    backgroundColor: '#9e9e9e',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '700',
    fontSize: '1em',
  },
  error: {
    color: '#d32f2f',
    textAlign: 'center',
    fontSize: '0.9em',
    backgroundColor: '#ffebee',
    padding: '10px',
    borderRadius: '5px',
  },
  success: {
    color: '#2e7d32',
    textAlign: 'center',
    fontSize: '0.9em',
    backgroundColor: '#e8f5e9',
    padding: '10px',
    borderRadius: '5px',
  },
  link: {
    textAlign: 'center',
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: '600',
  }
};

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    role: '',
    username: '',
    password: '',
    email: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isRegistering) {
        const response = await api.registerUser({
          username: formData.username,
          password: formData.password,
          email: formData.email,
          role: formData.role
        });
        
        onLogin(response.data, false);
        navigate('/');
      } else {
        // Use hardcoded credentials for existing users
        const hardcodedUsers = [
          { username: 'kavii', password: 'Kavii@0712#', role: 'USER' },
          { username: 'user', password: 'user123', role: 'USER' },
          { username: 'admin', password: 'Admin@123', role: 'ADMIN' }
        ];
        
        const user = hardcodedUsers.find(
          u => u.username === formData.username && u.password === formData.password && u.role === formData.role
        );

        if (user) {
          onLogin(user, false);
          navigate('/');
        } else {
          // Check localStorage for registered users
          const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
          const registeredUser = registeredUsers.find(
            u => u.username === formData.username && u.password === formData.password && u.role === formData.role
          );
          
          if (registeredUser) {
            onLogin(registeredUser, false);
            navigate('/');
          } else {
            setError('Invalid username or password.');
          }
        }
      }
    } catch (error) {
      setError('Connection failed. Please try again.');
    }
    
    setLoading(false);
  };

  const handleGuest = () => {
    const guestUser = { username: 'Guest', role: 'GUEST' };
    onLogin(guestUser);
    navigate('/guest/dashboard');
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>
          🌿 {isRegistering ? 'Join Us' : 'Welcome Back'}
        </h2>
        <p style={styles.subtitle}>{isRegistering ? 'Create your Plant Care account' : 'Sign in to your Plant Care account'}</p>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <select
          style={styles.input}
          name="role"
          value={formData.role}
          onChange={(e) => {
            setFormData({ ...formData, role: e.target.value, username: '', password: '', email: '' });
            setShowCredentials(e.target.value !== '');
            setIsRegistering(false);
          }}
          required
        >
          <option value="">Select Role</option>
          <option value="ADMIN">Admin</option>
          <option value="USER">User</option>
          <option value="GUEST">Guest</option>
        </select>
        
        {showCredentials && formData.role !== 'GUEST' && (
          <>
            <input
              style={styles.input}
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            
            {isRegistering && (
              <input
                style={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            )}
            
            <input
              style={styles.input}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </>
        )}
        
        {showCredentials && formData.role !== 'GUEST' && (
          <>
            <button 
              style={styles.button} 
              type="submit" 
              disabled={loading}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
              }}
            >
              {loading ? (isRegistering ? '🌱 Registering...' : '🌱 Signing In...') : (isRegistering ? '🌱 Register' : '🌱 Sign In')}
            </button>
            
            {formData.role === 'USER' && (
              <button
                type="button"
                style={{...styles.guestBtn, backgroundColor: '#2196F3'}}
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                  setFormData({...formData, email: ''});
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#1976D2'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#2196F3'}
              >
                {isRegistering ? '🔄 Switch to Login' : '📝 New User? Register'}
              </button>
            )}
          </>
        )}
        
        {formData.role === 'GUEST' && (
          <button
            type="button"
            style={styles.button}
            onClick={handleGuest}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
            }}
          >
            👁️ Continue as Guest
          </button>
        )}
        

      </form>
    </div>
  );
};

export default LoginPage;