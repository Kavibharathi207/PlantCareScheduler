import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const APP_BG_IMAGE_URL = 'https://img.freepik.com/free-photo/tropical-palm-leaves-pattern-background-green-monstera-tree-foliage-decoration-design-plant-with-exotic-leaf-closeup_90220-1135.jpg';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: `url(${APP_BG_IMAGE_URL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
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
    fontSize: '3em',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #2e7d32, #4CAF50)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '20px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.2em',
    marginBottom: '40px',
    lineHeight: '1.6',
  },
  searchSection: {
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '15px',
    marginBottom: '40px',
    textAlign: 'center',
  },
  searchInput: {
    width: '100%',
    maxWidth: '400px',
    padding: '15px 20px',
    fontSize: '1.1em',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    outline: 'none',
    marginBottom: '20px',
    transition: 'border-color 0.3s ease',
  },
  searchButton: {
    padding: '15px 30px',
    background: 'linear-gradient(135deg, #2196F3, #1976D2)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1.1em',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(33, 150, 243, 0.3)',
  },
  suggestionCard: {
    background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
    border: '2px solid #2196F3',
    borderRadius: '15px',
    padding: '30px',
    marginBottom: '30px',
    boxShadow: '0 8px 25px rgba(33, 150, 243, 0.2)',
  },
  plantTitle: {
    fontSize: '2em',
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  careGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '20px',
  },
  careItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    border: '1px solid rgba(33, 150, 243, 0.2)',
  },
  careIcon: {
    fontSize: '2em',
    marginBottom: '10px',
  },
  careLabel: {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '5px',
  },
  careValue: {
    fontSize: '1.2em',
    fontWeight: '600',
    color: '#1976D2',
  },
  tipsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '10px',
    marginTop: '20px',
  },
  tipsTitle: {
    fontSize: '1.3em',
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  tipsText: {
    fontSize: '1em',
    color: '#333',
    lineHeight: '1.6',
    fontStyle: 'italic',
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1em',
    padding: '40px',
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
    borderRadius: '10px',
  },
  backButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    background: 'linear-gradient(135deg, #4CAF50, #45a049)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
  },
  healthAnalysis: {
    backgroundColor: '#fff8e1',
    border: '2px solid #ffb74d',
    borderRadius: '10px',
    padding: '20px',
    marginTop: '20px',
  },
  healthTitle: {
    fontSize: '1.2em',
    fontWeight: '600',
    color: '#f57c00',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  healthAlert: {
    fontSize: '1em',
    color: '#e65100',
    lineHeight: '1.5',
  }
};

// Add CSS animation for fade effect
if (typeof document !== 'undefined' && !document.head.querySelector('style[data-fade-animation-careplan]')) {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  styleSheet.setAttribute('data-fade-animation-careplan', 'true');
  document.head.appendChild(styleSheet);
}

const CarePlanPage = ({ user }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestion, setSuggestion] = useState(null);
  const [searched, setSearched] = useState(false);
  const [relatedPlants, setRelatedPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userPlants, setUserPlants] = useState([]);

  useEffect(() => {
    // Load user's plants for health analysis
    const plants = JSON.parse(localStorage.getItem(`plants_${user?.username}`) || '[]');
    setUserPlants(plants);
  }, [user?.username]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setSearched(true);
    setSuggestion(null);
    setRelatedPlants([]);
    try {
      const base = searchTerm.trim();
      const variations = [
        base,
        base.toLowerCase(),
        base.charAt(0).toUpperCase() + base.slice(1).toLowerCase(),
        base.replace(/([A-Z])/g, ' $1').trim(),
      ];

      let carePlan = null;
      for (const variation of variations) {
        const response = await fetch(`http://localhost:8080/api/careplan/suggest/${encodeURIComponent(variation)}`);
        if (response.ok) {
          carePlan = await response.json();
          break;
        }
      }

      setSuggestion(carePlan);

      if (!carePlan) {
        const relatedRes = await fetch(`http://localhost:8080/api/careplan/search/${encodeURIComponent(base)}`);
        if (relatedRes.ok) {
          const related = await relatedRes.json();
          setRelatedPlants(related);
        }
      }
    } catch (error) {
      console.error('Error fetching suggestion:', error);
      setSuggestion(null);
    } finally {
      setLoading(false);
    }
  };

  const analyzeUserPlants = () => {
    const alerts = [];
    userPlants.forEach(plant => {
      if (plant.wateringFrequency <= 1) {
        alerts.push(`${plant.name || plant.plantName} might be overwatered - daily watering is usually too much`);
      }
      if (plant.sunlightHours > 12) {
        alerts.push(`${plant.name || plant.plantName} might be getting too much sunlight - consider partial shade`);
      }
      if (plant.wateringFrequency > 14) {
        alerts.push(`${plant.name || plant.plantName} might need more frequent watering`);
      }
    });
    return alerts;
  };

  const healthAlerts = analyzeUserPlants();

  return (
    <div style={{...styles.container, animation: 'fadeIn 0.5s ease-in-out'}}>
      <button 
        style={styles.backButton}
        onClick={() => navigate('/user/dashboard')}
      >
        ← Back to Dashboard
      </button>
      
      <div style={styles.contentWrapper}>
        <h1 style={styles.header}>
          💡 Smart Care Plan Suggestions
        </h1>
        <p style={styles.subtitle}>
          Get personalized care recommendations for your plants based on plant type, season, and expert knowledge.
          Enter any plant name to discover optimal watering, sunlight, and fertilizing schedules.
        </p>

        <div style={styles.searchSection}>
          <h3 style={{marginTop: 0, color: '#2e7d32'}}>🔍 Search Plant Care Tips</h3>
          <input
            type="text"
            placeholder="Enter plant name (e.g., Rose, Aloe Vera, Marigold...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <br />
          <button 
            style={styles.searchButton}
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? '🔄 Searching...' : '💡 Get Care Tips'}
          </button>
        </div>

        {suggestion && (
          <div style={styles.suggestionCard}>
            <h2 style={styles.plantTitle}>
              🌿 {suggestion.plantType} Care Guide
            </h2>
            
            <div style={styles.careGrid}>
              <div style={styles.careItem}>
                <div style={styles.careIcon}>💧</div>
                <div style={styles.careLabel}>Watering Frequency</div>
                <div style={styles.careValue}>Every {suggestion.wateringFrequency} days</div>
              </div>
              
              <div style={styles.careItem}>
                <div style={styles.careIcon}>☀️</div>
                <div style={styles.careLabel}>Sunlight Requirements</div>
                <div style={styles.careValue}>{suggestion.sunlightHours} hours daily</div>
              </div>
              
              <div style={styles.careItem}>
                <div style={styles.careIcon}>🌱</div>
                <div style={styles.careLabel}>Fertilizing Schedule</div>
                <div style={styles.careValue}>Every {suggestion.fertilizingFrequency} days</div>
              </div>
            </div>

            <div style={styles.tipsSection}>
              <h4 style={styles.tipsTitle}>
                💡 Expert Tips & Notes
              </h4>
              <p style={styles.tipsText}>{suggestion.tips}</p>
            </div>
          </div>
        )}

        {searched && suggestion === null && searchTerm && !loading && (
          <div style={styles.noResults}>
            <h3>🤔 No care plan found for "{searchTerm}"</h3>
            {relatedPlants.length > 0 ? (
              <>
                <p>Did you mean one of these?</p>
                <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginTop: '10px'}}>
                  {relatedPlants.map(plant => (
                    <button
                      key={plant.id}
                      onClick={() => { setSearchTerm(plant.plantType); setSuggestion(plant); setRelatedPlants([]); }}
                      style={{padding: '8px 18px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: '600'}}
                    >
                      🌿 {plant.plantType}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p>Try searching for common plants like Rose, Aloe Vera, Marigold, Lily, or Lotus.</p>
            )}
          </div>
        )}

        {healthAlerts.length > 0 && (
          <div style={styles.healthAnalysis}>
            <h3 style={styles.healthTitle}>
              ⚠️ Plant Health Analysis
            </h3>
            {healthAlerts.map((alert, index) => (
              <p key={index} style={styles.healthAlert}>• {alert}</p>
            ))}
          </div>
        )}

        {userPlants.length > 0 && (
          <div style={{marginTop: '40px', textAlign: 'center'}}>
            <h3 style={{color: '#2e7d32'}}>📊 Your Plant Statistics</h3>
            <div style={styles.careGrid}>
              <div style={styles.careItem}>
                <div style={styles.careIcon}>🌱</div>
                <div style={styles.careLabel}>Total Plants</div>
                <div style={styles.careValue}>{userPlants.length}</div>
              </div>
              <div style={styles.careItem}>
                <div style={styles.careIcon}>💧</div>
                <div style={styles.careLabel}>High Maintenance</div>
                <div style={styles.careValue}>{userPlants.filter(p => p.wateringFrequency <= 3).length}</div>
              </div>
              <div style={styles.careItem}>
                <div style={styles.careIcon}>☀️</div>
                <div style={styles.careLabel}>Sun Lovers</div>
                <div style={styles.careValue}>{userPlants.filter(p => p.sunlightHours >= 6).length}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarePlanPage;