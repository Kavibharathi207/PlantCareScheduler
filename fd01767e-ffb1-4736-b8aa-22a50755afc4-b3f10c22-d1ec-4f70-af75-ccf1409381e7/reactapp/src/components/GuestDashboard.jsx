import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import PlantCard from "./PlantCard";
import * as api from "../services/api";


const GUEST_BG_IMAGE = 'https://img.freepik.com/free-photo/tropical-palm-leaves-pattern-background-green-monstera-tree-foliage-decoration-design-plant-with-exotic-leaf-closeup_90220-1135.jpg';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: `url(${GUEST_BG_IMAGE})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    padding: '40px 20px',
    fontFamily: 'Poppins, sans-serif',
  },
  contentWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
  },
  header: {
    textAlign: 'center',
    color: '#2e7d32',
    marginBottom: '30px',
    fontSize: '2.5em',
    fontWeight: '700',
  },
  welcomeMessage: {
    backgroundColor: '#fff3e0',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '30px',
    textAlign: 'center',
    fontSize: '1.1em',
    color: '#e65100',
    border: '2px dashed #ff9800',
  },
  registerLink: {
    color: '#4CAF50',
    textDecoration: 'none',
    fontWeight: '600',
    padding: '8px 16px',
    backgroundColor: '#e8f5e9',
    borderRadius: '20px',
    margin: '0 5px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '25px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#666',
    marginTop: '20px',
  },
  noPlants: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#666',
    padding: '40px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
  },
  featureList: {
    marginTop: '20px',
    textAlign: 'left',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    border: '2px solid #4CAF50',
  },
  actionButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
    marginTop: '20px',
  },
  signInButton: {
    padding: '12px 24px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1em',
    fontWeight: '600',
  },
  registerButton: {
    padding: '12px 24px',
    backgroundColor: '#2196F3',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1em',
    fontWeight: '600',
  },
  getStartedButton: {
    padding: '15px 30px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '1.2em',
    fontWeight: '700',
    marginTop: '20px',
  },
  plantStats: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: '#e8f5e9',
    borderRadius: '10px',
  },
  statItem: {
    textAlign: 'center',
  },
  statNumber: {
    display: 'block',
    fontSize: '2em',
    fontWeight: '700',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: '0.9em',
    color: '#666',
  },
  guestPlantCard: {
    position: 'relative',
    marginBottom: '20px',
  },
  lockOverlay: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '15px',
    fontSize: '0.8em',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  lockIcon: {
    fontSize: '1em',
  },
  lockText: {
    fontSize: '0.8em',
  }
};

const GuestDashboard = ({ onLogin }) => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuestPlants = async () => {
      try {
        const response = await api.getPlants();
        setPlants(response.data);
      } catch (error) {
        console.error("Error fetching guest plants:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGuestPlants();
  }, []);

  const getDisplayPlants = (rawPlants) => {
    return rawPlants.map((p) => ({
      id: p.id,
      name: p.plantName || "Unnamed Plant", 
      plantName: p.plantName || "Unnamed Plant",
      wateringFrequency: p.wateringFrequency !== null && p.wateringFrequency !== undefined
        ? `${p.wateringFrequency} day(s)`
        : "Not Recorded",
      lastWateredDate: p.lastWateredDate || "Not Recorded",
      imageUrl: p.imageUrl || "",
    }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <h1 style={styles.header}>🌿 Welcome to Plant Care Scheduler 🌱</h1>
        
        <div style={styles.welcomeMessage}>
          👋 You're browsing as a guest! Sign in to unlock full features! 🌿
          <div style={styles.actionButtons}>
            <button 
              style={styles.signInButton}
              onClick={() => {
                onLogin && onLogin();
                navigate('/login', { replace: true });
              }}
            >
              🚀 Sign In
            </button>
            <button 
              style={styles.registerButton}
              onClick={() => {
                onLogin && onLogin();
                navigate('/login', { replace: true });
              }}
            >
              📝 Create Account
            </button>
          </div>
        </div>

        <div style={{...styles.featureList, marginBottom: '30px'}}>
          <h3 style={{color: '#2e7d32', textAlign: 'center', marginBottom: '20px'}}>🌱 Basic Plant Care Guide</h3>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px'}}>
            
            <div style={{padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '10px', border: '2px solid #4CAF50'}}>
              <h4 style={{color: '#2e7d32', margin: '0 0 10px 0'}}>🌹 Rose</h4>
              <p><strong>💧 Water:</strong> Every 2 days</p>
              <p><strong>☀️ Sunlight:</strong> 6 hours daily</p>
              <p><strong>🌱 Fertilize:</strong> Every 14 days</p>
              <p><strong>💡 Tip:</strong> Water early morning. Prune regularly.</p>
            </div>

            <div style={{padding: '15px', backgroundColor: '#fff3e0', borderRadius: '10px', border: '2px solid #ff9800'}}>
              <h4 style={{color: '#e65100', margin: '0 0 10px 0'}}>🌿 Aloe Vera</h4>
              <p><strong>💧 Water:</strong> Every 7 days</p>
              <p><strong>☀️ Sunlight:</strong> 4 hours daily</p>
              <p><strong>🌱 Fertilize:</strong> Every 30 days</p>
              <p><strong>💡 Tip:</strong> Allow soil to dry between waterings.</p>
            </div>

            <div style={{padding: '15px', backgroundColor: '#fff8e1', borderRadius: '10px', border: '2px solid #ffc107'}}>
              <h4 style={{color: '#f57c00', margin: '0 0 10px 0'}}>🌼 Marigold</h4>
              <p><strong>💧 Water:</strong> Daily</p>
              <p><strong>☀️ Sunlight:</strong> 8 hours daily</p>
              <p><strong>🌱 Fertilize:</strong> Every 7 days</p>
              <p><strong>💡 Tip:</strong> Full sun required. Deadhead spent flowers.</p>
            </div>

            <div style={{padding: '15px', backgroundColor: '#f3e5f5', borderRadius: '10px', border: '2px solid #9c27b0'}}>
              <h4 style={{color: '#7b1fa2', margin: '0 0 10px 0'}}>🌺 Lily</h4>
              <p><strong>💧 Water:</strong> Every 3 days</p>
              <p><strong>☀️ Sunlight:</strong> 5 hours daily</p>
              <p><strong>🌱 Fertilize:</strong> Every 21 days</p>
              <p><strong>💡 Tip:</strong> Keep soil moist but not waterlogged.</p>
            </div>

            <div style={{padding: '15px', backgroundColor: '#e0f2f1', borderRadius: '10px', border: '2px solid #009688'}}>
              <h4 style={{color: '#00695c', margin: '0 0 10px 0'}}>🌵 Cactus</h4>
              <p><strong>💧 Water:</strong> Every 14 days</p>
              <p><strong>☀️ Sunlight:</strong> 6 hours daily</p>
              <p><strong>🌱 Fertilize:</strong> Every 60 days</p>
              <p><strong>💡 Tip:</strong> Water sparingly. Avoid overwatering.</p>
            </div>

            <div style={{padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '10px', border: '2px solid #4CAF50'}}>
              <h4 style={{color: '#2e7d32', margin: '0 0 10px 0'}}>🌿 Basil</h4>
              <p><strong>💧 Water:</strong> Every 2 days</p>
              <p><strong>☀️ Sunlight:</strong> 6 hours daily</p>
              <p><strong>🌱 Fertilize:</strong> Every 14 days</p>
              <p><strong>💡 Tip:</strong> Pinch flowers to keep leaves tender.</p>
            </div>

          </div>
          <div style={{textAlign: 'center', marginTop: '20px', padding: '15px', backgroundColor: '#fff3cd', borderRadius: '10px'}}>
            <p style={{margin: 0, color: '#856404'}}><strong>🔓 Sign in to search for specific plant care plans and get personalized recommendations!</strong></p>
          </div>
        </div>

        {loading ? (
          <p style={styles.loading}>🌱 Loading plant collection...</p>
        ) : (
          <div style={styles.grid}>
            {plants.length === 0 ? (
              <div style={styles.noPlants}>
                🌱 No plants available yet. Sign in to start your plant journey! 
                <br />
                <button 
                  style={styles.getStartedButton}
                  onClick={() => {
                    onLogin && onLogin();
                    navigate('/login', { replace: true });
                  }}
                >
                  🌿 Get Started
                </button>
              </div>
            ) : (
              <>
                <div style={styles.plantStats}>
                  <div style={styles.statItem}>
                    <span style={styles.statNumber}>{plants.length}</span>
                    <span style={styles.statLabel}>Plants Available</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statNumber}>{plants.filter(p => p.sunlightHours > 5).length}</span>
                    <span style={styles.statLabel}>High Light Plants</span>
                  </div>
                  <div style={styles.statItem}>
                    <span style={styles.statNumber}>{plants.filter(p => p.wateringFrequency <= 3).length}</span>
                    <span style={styles.statLabel}>Frequent Watering</span>
                  </div>
                </div>
                {getDisplayPlants(plants).map((plant) => (
                  <div key={plant.id} style={styles.guestPlantCard}>
                    <PlantCard
                      plant={plant}
                      onEdit={() => alert('🔒 Sign in to edit plants and unlock full features! 🌱')}
                      onDelete={() => alert('🔒 Sign in to manage your own plant collection! 🌿')}
                    />
                    <div style={styles.lockOverlay}>
                      <span style={styles.lockIcon}>🔒</span>
                      <span style={styles.lockText}>Sign in to manage</span>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestDashboard;