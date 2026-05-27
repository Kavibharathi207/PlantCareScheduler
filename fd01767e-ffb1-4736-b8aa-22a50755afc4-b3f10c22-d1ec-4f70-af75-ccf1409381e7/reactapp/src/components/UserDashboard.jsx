import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PlantForm from "./PlantForm";
import { usePlants } from '../context/PlantContext';

const APP_BG_IMAGE_URL = 'https://img.freepik.com/free-photo/tropical-palm-leaves-pattern-background-green-monstera-tree-foliage-decoration-design-plant-with-exotic-leaf-closeup_90220-1135.jpg';
const PRIMARY_GREEN = '#4CAF50';
const DARK_GREEN = '#2E7D32';

const styles = {
  appContainer: {
    fontFamily: 'Poppins, sans-serif',
    backgroundImage: `url(${APP_BG_IMAGE_URL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    width: '100%',
    padding: '20px',
    boxSizing: 'border-box',
  },
  contentWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '25px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  appHeader: {
    textAlign: 'center',
    marginBottom: '25px',
    padding: '25px',
    background: 'linear-gradient(135deg, #4CAF50, #2E7D32, #1B5E20)',
    color: 'white',
    borderRadius: '15px',
    boxShadow: '0 8px 25px rgba(76, 175, 80, 0.4)',
    position: 'relative',
    overflow: 'hidden',
  },
  headerTitle: {
    marginTop: '0',
    fontSize: '2.8em',
    fontWeight: '900',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
    animation: 'glow 2s ease-in-out infinite alternate',
  },
  headerIcon: {
    fontSize: '1.2em',
    color: '#E8F5E9',
  },
  headerSubtitle: {
    color: '#E8F5E9',
    fontSize: '1.2em',
    fontWeight: '400',
    maxWidth: '600px',
    margin: '8px auto 0',
    lineHeight: '1.4',
  },
  formSection: {
    borderBottom: `1px solid #ddd`,
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  listTitle: {
    color: DARK_GREEN,
    borderBottom: `3px solid ${PRIMARY_GREEN}`,
    paddingBottom: '10px',
    marginTop: '40px',
    marginBottom: '30px',
    fontSize: '2.2em',
    fontWeight: '700',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  loadingMessage: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: '#fffde7',
    border: '1px dashed #ffd54f',
    borderRadius: '4px',
    color: '#6d4c41',
  },
  welcomeMessage: {
    background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '20px',
    textAlign: 'center',
    fontSize: '1.1em',
    color: DARK_GREEN,
    fontWeight: '700',
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.2)',
    border: '2px solid rgba(76, 175, 80, 0.1)',
  }
};





// Add CSS animation for fade effect
if (typeof document !== 'undefined' && !document.head.querySelector('style[data-fade-animation]')) {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  styleSheet.setAttribute('data-fade-animation', 'true');
  document.head.appendChild(styleSheet);
}

const UserDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const { plants: rawPlants, addPlant, updatePlant } = usePlants();
  const [selectedPlant, setSelectedPlant] = useState(null); 
  const [carePlanSearch, setCarePlanSearch] = useState('');
  const [carePlanSuggestion, setCarePlanSuggestion] = useState(null);
  const [carePlanLoading, setCarePlanLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');




  const handleAddPlant = (plant) => {
    if (plant.id) {
      updatePlant(plant);
      setSuccessMessage('Plant updated successfully!');
    } else {
      const existingPlant = rawPlants.find(p => 
        (p.name || p.plantName || '').toLowerCase() === plant.name.toLowerCase()
      );
      
      if (existingPlant) {
        const shouldEdit = window.confirm(
          `A plant named "${plant.name}" already exists. Would you like to edit the existing plant instead?`
        );
        if (shouldEdit) {
          setSelectedPlant(existingPlant);
          return;
        } else {
          return;
        }
      }
      
      addPlant(plant);
      setSuccessMessage('Plant added successfully!');
    }
    setSelectedPlant(null);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleCancelEdit = () => setSelectedPlant(null);



  const handleCarePlanSearch = async () => {
    if (!carePlanSearch.trim()) return;
    
    setCarePlanLoading(true);
    try {
      const response = await fetch(`https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io/api/careplan/suggest/${carePlanSearch}`);
      if (response.ok) {
        const carePlan = await response.json();
        setCarePlanSuggestion(carePlan);
      } else {
        setCarePlanSuggestion(null);
      }
    } catch (error) {
      console.error('Error fetching suggestion:', error);
      setCarePlanSuggestion(null);
    } finally {
      setCarePlanLoading(false);
    }
  };

  return (
    <div style={{...styles.appContainer, animation: 'fadeIn 0.5s ease-in-out'}}>
      <div style={styles.contentWrapper}>
        <header style={styles.appHeader}>
          <h1 style={styles.headerTitle}>
            <span style={{...styles.headerIcon, color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>🌿</span> Plant Care Scheduler <span style={{...styles.headerIcon, color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>💧</span>
          </h1>
          <p style={styles.headerSubtitle}>
            Your ultimate companion for nurturing a thriving indoor garden. 
            Track watering schedules, monitor plant health, and never let a plant go thirsty again!
          </p>
        </header>

        <div style={styles.welcomeMessage}>
          <div style={{fontSize: '1.5em', marginBottom: '10px'}}><span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>👩🌾</span> Welcome back, {user?.username}!</div>
          <div style={{fontSize: '1.1em', opacity: '0.9'}}>Here's your garden today <span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>🌿</span> Ready to nurture your green friends?</div>
          <div style={{marginTop: '15px', display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.9em'}}>
            <span><span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>🌱</span> {rawPlants.length} Plants</span>
            <span><span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>💧</span> {rawPlants.filter(p => p.wateringFrequency <= 3).length} Need Frequent Water</span>
            <span><span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>☀️</span> {rawPlants.filter(p => p.sunlightHours >= 6).length} Sun Lovers</span>
          </div>
        </div>

        {successMessage && (
          <div style={{
            background: 'linear-gradient(135deg, #4CAF50, #45a049)',
            color: 'white',
            padding: '15px 25px',
            borderRadius: '12px',
            marginBottom: '20px',
            textAlign: 'center',
            fontSize: '1.1em',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
            animation: 'fadeIn 0.5s ease-in-out'
          }}>
            ✅ {successMessage}
          </div>
        )}

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
          <div style={{display: 'flex', gap: '15px'}}>
            <button 
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #2196F3, #1976D2)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1em',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate('/careplan')}
            >
              📊 Care Plan
            </button>
            <button 
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1em',
                fontWeight: '600',
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onClick={() => navigate('/my-plants')}
            >
              🌱 My Plants
            </button>
            <button style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #FF9800, #F57C00)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1em',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(255, 152, 0, 0.3)',
              transition: 'all 0.3s ease'
            }}>
              🔔 Reminders
            </button>
          </div>
          <button 
            style={{
              padding: '12px 24px',
              background: 'linear-gradient(135deg, #f44336, #d32f2f)',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1em',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onClick={() => {
              onLogout();
              navigate('/login');
            }}
          >
            🚪 Logout
          </button>
        </div>

        <section style={styles.formSection}> 
          <PlantForm 
            onSubmit={handleAddPlant} 
            selectedPlant={selectedPlant}
            onCancel={handleCancelEdit} 
          />
        </section>





      </div>
    </div>
  );
};

export default UserDashboard;