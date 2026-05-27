import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = ({ user, onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    experience: '',
    interests: []
  });

  const handleComplete = () => {
    onComplete();
    navigate(user?.role === 'ADMIN' ? '/admin/dashboard' : '/user/dashboard');
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #4CAF50, #81C784)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    },
    card: {
      backgroundColor: 'white',
      borderRadius: '15px',
      padding: '40px',
      maxWidth: '500px',
      width: '100%',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '2.5em',
      color: '#2e7d32',
      marginBottom: '20px'
    },
    button: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '12px 30px',
      borderRadius: '8px',
      fontSize: '1.1em',
      cursor: 'pointer',
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🌿 Welcome to Plant Care!</h1>
        <p>Hi {user?.username}! Let's get you started on your plant care journey.</p>
        
        {step === 1 && (
          <div>
            <h3>Step 1: Tell us about yourself</h3>
            <input
              type="text"
              placeholder="First Name"
              value={profile.firstName}
              onChange={(e) => setProfile({...profile, firstName: e.target.value})}
              style={{width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd'}}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={profile.lastName}
              onChange={(e) => setProfile({...profile, lastName: e.target.value})}
              style={{width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd'}}
            />
            <button style={styles.button} onClick={() => setStep(2)}>
              Next →
            </button>
          </div>
        )}
        
        {step === 2 && (
          <div>
            <h3>Step 2: Your plant experience</h3>
            <select
              value={profile.experience}
              onChange={(e) => setProfile({...profile, experience: e.target.value})}
              style={{width: '100%', padding: '10px', margin: '10px 0', borderRadius: '5px', border: '1px solid #ddd'}}
            >
              <option value="">Select your experience level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
            <button style={styles.button} onClick={handleComplete}>
              Get Started! 🚀
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomePage;