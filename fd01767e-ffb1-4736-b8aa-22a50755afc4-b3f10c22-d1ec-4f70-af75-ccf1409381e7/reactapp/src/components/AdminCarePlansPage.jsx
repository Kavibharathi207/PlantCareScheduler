import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundImage: 'url(https://i.etsystatic.com/29642605/r/il/98e318/5040840868/il_fullxfull.5040840868_d7ev.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    padding: '20px',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
    position: 'relative',
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 1,
  },
  contentWrapper: {
    maxWidth: '1400px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 2,
  },
  topBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  backButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #4CAF50, #45a049)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
    transition: 'all 0.3s ease',
  },
  logoutButton: {
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #f44336, #d32f2f)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1em',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(244, 67, 54, 0.3)',
    transition: 'all 0.3s ease',
  },
  header: {
    background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    padding: '24px 32px',
    borderRadius: '15px',
    boxShadow: '0 10px 30px rgba(76, 175, 80, 0.4)',
    marginBottom: '24px',
    color: 'white',
  },
  headerTitle: {
    fontSize: '32px',
    fontWeight: '700',
    color: 'white',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
  },
  carePlansGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
    marginTop: '20px'
  },
  carePlanCard: {
    border: '2px solid #4CAF50',
    borderRadius: '12px',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  },
  plantType: {
    margin: '0 0 15px 0',
    color: '#2e7d32',
    fontSize: '1.3em',
    fontWeight: '600'
  },
  careDetail: {
    marginBottom: '10px',
    fontSize: '0.95em'
  },
  careLabel: {
    fontWeight: '600'
  },
  tipsSection: {
    backgroundColor: '#e8f5e9',
    padding: '12px',
    borderRadius: '8px',
    fontSize: '0.9em',
    fontStyle: 'italic',
    color: '#2e7d32',
    marginTop: '15px'
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    marginTop: '15px',
    transition: 'background-color 0.2s ease',
  },
  noData: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1em',
    padding: '40px',
    gridColumn: '1 / -1',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#666',
    padding: '40px',
  }
};

const AdminCarePlansPage = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [carePlans, setCarePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [carePlansPerPage] = useState(6);

  useEffect(() => {
    fetchCarePlans();
  }, []);

  const fetchCarePlans = async () => {
    try {
      const response = await axios.get('https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io/api/careplan/all');
      setCarePlans(response.data || []);
    } catch (error) {
      console.error('Error fetching care plans:', error);
      setCarePlans([]);
    }
    setLoading(false);
  };

  const handleDeleteCarePlan = async (planId) => {
    if (window.confirm('Delete this care plan?')) {
      try {
        await axios.delete(`https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io/api/careplan/${planId}`);
        fetchCarePlans();
      } catch (error) {
        console.error('Error deleting care plan:', error);
      }
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.backgroundOverlay}></div>
        <div style={styles.contentWrapper}>
          <div style={styles.loading}>🌱 Loading care plans...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.backgroundOverlay}></div>
      <div style={styles.contentWrapper}>
        <div style={styles.topBar}>
          <button 
            style={styles.backButton}
            onClick={() => navigate('/admin/dashboard')}
          >
            ← Back to Dashboard
          </button>
          <button 
            style={styles.logoutButton}
            onClick={() => {
              onLogout();
              navigate('/login');
            }}
          >
            🚪 Logout
          </button>
        </div>
        
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>
            💡 All Care Plans ({carePlans.length})
          </h1>
        </div>
        
        {carePlans.length > 0 ? (
          <>
            <div style={styles.carePlansGrid}>
              {carePlans.slice((currentPage - 1) * carePlansPerPage, currentPage * carePlansPerPage).map(plan => (
                <div key={plan.id} style={styles.carePlanCard}>
                  <h3 style={styles.plantType}>
                    🌿 {plan.plantType}
                  </h3>
                  <div style={styles.careDetail}>
                    <span style={{...styles.careLabel, color: '#1976D2'}}>💧 Watering:</span> Every {plan.wateringFrequency} days
                  </div>
                  <div style={styles.careDetail}>
                    <span style={{...styles.careLabel, color: '#FF9800'}}>☀️ Sunlight:</span> {plan.sunlightHours} hours/day
                  </div>
                  <div style={styles.careDetail}>
                    <span style={{...styles.careLabel, color: '#9C27B0'}}>🌱 Fertilizing:</span> Every {plan.fertilizingFrequency} days
                  </div>
                  <div style={styles.tipsSection}>
                    💡 <strong>Tips:</strong> {plan.tips}
                  </div>
                  <button
                    onClick={() => handleDeleteCarePlan(plan.id)}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            {Math.ceil(carePlans.length / carePlansPerPage) > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                marginTop: '30px'
              }}>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '10px 15px',
                    background: currentPage === 1 ? '#ccc' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                  }}
                >
                  ← Previous
                </button>
                <span style={{
                  padding: '10px 20px',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  fontWeight: '600'
                }}>
                  Page {currentPage} of {Math.ceil(carePlans.length / carePlansPerPage)}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(carePlans.length / carePlansPerPage)))}
                  disabled={currentPage === Math.ceil(carePlans.length / carePlansPerPage)}
                  style={{
                    padding: '10px 15px',
                    background: currentPage === Math.ceil(carePlans.length / carePlansPerPage) ? '#ccc' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: currentPage === Math.ceil(carePlans.length / carePlansPerPage) ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <p style={styles.noData}>No care plans available.</p>
        )}
      </div>
    </div>
  );
};

export default AdminCarePlansPage;