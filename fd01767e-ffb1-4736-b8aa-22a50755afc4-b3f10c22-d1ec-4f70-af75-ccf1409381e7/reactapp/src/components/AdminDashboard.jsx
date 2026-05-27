import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlantCard from './PlantCard';
import CarePlanForm from './CarePlanForm';
import UserManagement from './UserManagement';

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
    justifyContent: 'flex-end',
    marginBottom: '20px',
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
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
    marginBottom: '32px',
  },
  statCard: {
    background: 'linear-gradient(135deg, #ffffff, #f8fafc)',
    padding: '24px',
    borderRadius: '15px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
    border: '1px solid rgba(255,255,255,0.2)',
    transition: 'all 0.3s ease',
    transform: 'translateY(0)',
  },
  statHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  statIcon: {
    width: '48px',
    height: '48px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
  },
  statNumber: {
    fontSize: '36px',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
  },
  statLabel: {
    fontSize: '16px',
    color: '#64748b',
    fontWeight: '500',
    marginTop: '4px',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '2.2em',
    fontWeight: '600',
    color: '#2e7d32',
    marginBottom: '20px',
    borderBottom: '2px solid #4CAF50',
    paddingBottom: '10px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2em',
    color: '#666',
    padding: '40px',
  },
  tabContainer: {
    background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
    borderRadius: '15px',
    padding: '8px',
    marginBottom: '24px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255,255,255,0.3)',
    display: 'flex',
    gap: '4px',
  },
  tabButton: {
    padding: '12px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    color: '#64748b',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  },
  activeTab: {
    background: 'linear-gradient(135deg, #4CAF50, #45a049)',
    color: 'white',
    fontWeight: '600',
    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
  },
  overviewGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '20px',
  },
  overviewCard: {
    backgroundColor: 'white',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  cardTitle: {
    fontSize: '20px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '16px',
  },
  actionButton: {
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    margin: '8px 0',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
  },
  userActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  deactivateButton: {
    padding: '6px 12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
  },
  plantGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
  },
  plantItem: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  noData: {
    textAlign: 'center',
    color: '#666',
    fontSize: '1.1em',
    padding: '40px',
    gridColumn: '1 / -1',
  },
  userFilters: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '8px 16px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9em',
  },
  userTable: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
    backgroundColor: '#f8fafc',
    color: '#374151',
    padding: '16px 20px',
    fontWeight: '600',
    fontSize: '14px',
    borderBottom: '1px solid #e2e8f0',
  },
  headerCell: {
    padding: '0 10px',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
    padding: '16px 20px',
    borderBottom: '1px solid #f1f5f9',
    alignItems: 'center',
    transition: 'background-color 0.2s ease',
  },
  userDetails: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  userAvatar: {
    fontSize: '2em',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontWeight: '600',
    color: '#333',
  },
  userEmail: {
    color: '#666',
    fontSize: '0.9em',
  },
  userId: {
    fontSize: '0.8em',
    color: '#999',
    marginTop: '2px',
  },
  roleStatus: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  userRole: {
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '0.8em',
    fontWeight: '600',
    backgroundColor: '#e8f5e9',
    color: '#2e7d32',
  },
  joinedDate: {
    fontSize: '0.9em',
    color: '#666',
  },
  viewButton: {
    padding: '6px 12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    marginRight: '8px',
    transition: 'background-color 0.2s ease',
  },
  resetButton: {
    padding: '6px 12px',
    backgroundColor: '#f59e0b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
    marginLeft: '8px',
    transition: 'background-color 0.2s ease',
  }
};

// Plant image mapping
const getPlantImage = (plantName) => {
  const name = plantName.toLowerCase();
  const imageMap = {
    'rose': 'https://tse1.mm.bing.net/th/id/OIP.88HJd_U0FCHk3WixEQYMlgHaEH?pid=Api&P=0&h=180',
    'aloe vera': 'https://tse4.mm.bing.net/th/id/OIP.lwWEMHGUg26UBnLz44nRFwHaE8?pid=Api&P=0&h=180',
    'marigold': 'https://tse2.mm.bing.net/th/id/OIP.pEuzL7sru9u_0US0lAznWgHaE8?pid=Api&P=0&h=180',
    'jasmine':'https://cdn.shopify.com/s/files/1/1419/7120/products/Philippine_Jasmine-2.SHUT.jpg?v=1532466088',
    'hibiscus':'https://tse1.mm.bing.net/th/id/OIP.VJMCwbta_dg3Mpqov0R_JwHaFG?pid=Api&P=0&h=180',
    'lilly': 'https://tse1.mm.bing.net/th/id/OIP.uqqHwOnFuR9_tVOAiG5_lAHaFj?pid=Api&P=0&h=180',
    'lotus': 'https://tse4.mm.bing.net/th/id/OIP.pQAiG56L-0XDtKU7O9aOKQHaE8?pid=Api&P=0&h=180',
    'basil': 'https://tse2.mm.bing.net/th/id/OIP.NqWRCvnzXP6W3rTcKn_xzgHaE8?pid=Api&P=0&h=180',
    'mint': 'https://tse4.mm.bing.net/th/id/OIP.n3D4kZYRYAvmxYh01tX1QgHaE8?pid=Api&P=0&h=180',
    'tomato': 'https://tse3.mm.bing.net/th/id/OIP.Y6suzXKRsRZN9NVagPNY7AHaE7?pid=Api&P=0&h=180',
    'cactus': 'https://tse1.mm.bing.net/th/id/OIP.uZ2qM4XxDQXGLKaCaGyKgAHaKX?pid=Api&P=0&h=180',
    'sunflower': 'https://tse1.mm.bing.net/th/id/OIP.4N7T2h8zV_OeRx5OUNIjVgHaE7?pid=Api&P=0&h=180'
  };
  
  for (const [key, url] of Object.entries(imageMap)) {
    if (name.includes(key)) return url;
  }
  return 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop';
};

const AdminDashboard = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, totalPlants: 0, activeUsers: 0 });
  const [users, setUsers] = useState([]);
  const [plants, setPlants] = useState([]);
  const [carePlans, setCarePlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [newCarePlan, setNewCarePlan] = useState({ plantType: '', wateringFrequency: '', sunlightHours: '', fertilizingFrequency: '', tips: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPlants, setUserPlants] = useState([]);
  const [showCarePlansModal, setShowCarePlansModal] = useState(false);
  const [carePlanPage, setCarePlanPage] = useState(1);
  const [carePlansPerPage] = useState(6);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const carePlansResponse = await axios.get('https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io/api/careplan/all');
      setCarePlans(carePlansResponse.data || []);
    } catch (error) {
      console.error('Error fetching care plans:', error);
      setCarePlans([]);
    }
    
    // Fetch users from backend
    let userList = [];
    try {
      const usersResponse = await axios.get('https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io/api/admin/users');
      userList = usersResponse.data || [];
    } catch (error) {
      console.error('Error fetching users from backend:', error);
      // Fallback to hardcoded users
      userList = [
        { id: 1, username: 'admin', email: 'admin@plantcare.com', role: 'ADMIN', active: true },
        { id: 2, username: 'kavii', email: 'kavii@plantcare.com', role: 'USER', active: true },
        { id: 3, username: 'user', email: 'user@plantcare.com', role: 'USER', active: true }
      ];
    }
    
    // Also include localStorage users
    const localUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const combinedUsers = [...userList, ...localUsers.filter(lu => 
      !userList.some(bu => bu.username === lu.username)
    )];
    
    const allPlants = [];
    combinedUsers.forEach(user => {
      const userPlants = JSON.parse(localStorage.getItem(`plants_${user.username}`) || '[]');
      allPlants.push(...userPlants);
    });
    
    setPlants(allPlants);
    setUsers(combinedUsers);
    setStats({ 
      totalUsers: combinedUsers.length, 
      totalPlants: allPlants.length, 
      activeUsers: combinedUsers.filter(u => u.active !== false).length 
    });
    setLoading(false);
  };
  
  const handleDeactivateUser = async (userId) => {
    if (!window.confirm('Are you sure you want to deactivate this user?')) return;
    try {
      await axios.put(`https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io/api/admin/users/${userId}/deactivate`);
      fetchAdminData();
    } catch (error) {
      console.error('Error deactivating user:', error);
      alert('Failed to deactivate user');
    }
  };
  
  const handleDeletePlant = async (plantId) => {
    if (!window.confirm('Are you sure you want to delete this plant?')) return;
    try {
      await axios.delete(`https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io/api/plants/${plantId}`);
      setPlants(prev => prev.filter(p => p.id !== plantId));
      fetchAdminData();
    } catch (error) {
      console.error('Error deleting plant:', error);
      alert('Failed to delete plant');
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.contentWrapper}>
          <div style={styles.loading}>🌱 Loading admin dashboard...</div>
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
            style={styles.logoutButton}
            onClick={() => {
              onLogout();
              navigate('/login', { replace: true });
            }}
          >
            Logout
          </button>
        </div>
        
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>
            🛠️ Admin Dashboard - Welcome {user?.username}!
          </h1>
        </div>
        
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={{...styles.statIcon, backgroundColor: '#dcfce7', color: '#22c55e'}}>👥</div>
            </div>
            <h3 style={styles.statNumber}>{stats.totalUsers || 0}</h3>
            <p style={styles.statLabel}>Total Users</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={{...styles.statIcon, backgroundColor: '#dcfce7', color: '#22c55e'}}>🌱</div>
            </div>
            <h3 style={styles.statNumber}>{stats.totalPlants || 0}</h3>
            <p style={styles.statLabel}>Total Plants</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={{...styles.statIcon, backgroundColor: '#fef3c7', color: '#f59e0b'}}>✅</div>
            </div>
            <h3 style={styles.statNumber}>{stats.activeUsers || 0}</h3>
            <p style={styles.statLabel}>Active Users</p>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statHeader}>
              <div style={{...styles.statIcon, backgroundColor: '#fce7f3', color: '#ec4899'}}>🛠️</div>
            </div>
            <h3 style={styles.statNumber}>{users.filter(u => u.role === 'ADMIN').length}</h3>
            <p style={styles.statLabel}>Admins</p>
          </div>
        </div>
        
        <div style={styles.tabContainer}>
          <button 
            style={{...styles.tabButton, ...(activeTab === 'overview' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            style={{...styles.tabButton, ...(activeTab === 'users' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('users')}
          >
            👥 User Management
          </button>
          <button 
            style={{...styles.tabButton, ...(activeTab === 'plants' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('plants')}
          >
            🌱 Plant Management
          </button>
          <button 
            style={{...styles.tabButton, ...(activeTab === 'careplans' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('careplans')}
          >
            💡 Care Plans
          </button>
          <button 
            style={{...styles.tabButton, ...(activeTab === 'usermanagement' ? styles.activeTab : {})}}
            onClick={() => setActiveTab('usermanagement')}
          >
            ➕ Add Users
          </button>
        </div>

        {activeTab === 'overview' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>📊 System Overview</h2>
            <div style={styles.overviewGrid}>
              <div style={styles.overviewCard}>
                <h3 style={styles.cardTitle}>Recent Activity</h3>
                <div style={{color: '#64748b', lineHeight: '1.6'}}>
                  <p style={{margin: '8px 0'}}>• {plants.length} plants in system</p>
                  <p style={{margin: '8px 0'}}>• {users.filter(u => u.active).length} active users</p>
                  <p style={{margin: '8px 0'}}>• {carePlans.length} care plans available</p>
                  <p style={{margin: '8px 0'}}>• System running smoothly</p>
                </div>
              </div>
              <div style={styles.overviewCard}>
                <h3 style={styles.cardTitle}>Quick Actions</h3>
                <button style={styles.actionButton} onClick={() => setActiveTab('users')}>Manage Users</button>
                <button style={styles.actionButton} onClick={() => setActiveTab('plants')}>Manage Plants</button>
                <button style={styles.actionButton} onClick={() => setActiveTab('careplans')}>Manage Care Plans</button>
                <button style={styles.actionButton} onClick={() => setShowCarePlansModal(true)}>View Care Plans</button>
                <button style={styles.actionButton} onClick={fetchAdminData}>Refresh Data</button>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'users' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>👥 User Management</h2>
            <div style={styles.userFilters}>
              <button style={styles.filterButton}>All Users ({users.length})</button>
              <button style={styles.filterButton}>Active ({users.filter(u => u.active).length})</button>
              <button style={styles.filterButton}>Admins ({users.filter(u => u.role === 'ADMIN').length})</button>
              <button style={styles.filterButton}>Users ({users.filter(u => u.role === 'USER').length})</button>
            </div>
            <div style={styles.userTable}>
              <div style={styles.tableHeader}>
                <div style={styles.headerCell}>User Details</div>
                <div style={styles.headerCell}>Role & Status</div>
                <div style={styles.headerCell}>Joined</div>
                <div style={styles.headerCell}>Actions</div>
              </div>
              {users.map(user => (
                <div key={user.id} style={styles.tableRow}>
                  <div style={styles.userDetails}>
                    <div style={styles.userAvatar}>
                      {user.role === 'ADMIN' ? '🛠️' : '🌿'}
                    </div>
                    <div>
                      <div style={styles.userName}>{user.username}</div>
                      <div style={styles.userEmail}>📧 {user.email}</div>
                      <div style={styles.userId}>ID: {user.id}</div>
                    </div>
                  </div>
                  <div style={styles.roleStatus}>
                    <span style={{...styles.userRole, backgroundColor: user.role === 'ADMIN' ? '#ff9800' : '#4CAF50'}}>
                      {user.role}
                    </span>
                    <span style={{
                      ...styles.userRole, 
                      backgroundColor: user.active ? '#e8f5e9' : '#ffebee',
                      color: user.active ? '#2e7d32' : '#d32f2f',
                      marginTop: '5px'
                    }}>
                      {user.active ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </div>
                  <div style={styles.joinedDate}>
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                  </div>
                  <div style={styles.userActions}>
                    <button 
                      style={styles.viewButton}
                      onClick={() => {
                        const plants = JSON.parse(localStorage.getItem(`plants_${user.username}`) || '[]');
                        setUserPlants(plants);
                        setSelectedUser(user);
                      }}
                    >
                      View Plants
                    </button>
                    {user.role !== 'ADMIN' && user.active && (
                      <button 
                        style={styles.deactivateButton}
                        onClick={() => handleDeactivateUser(user.id)}
                      >
                        Deactivate
                      </button>
                    )}
                    <button style={styles.resetButton}>Reset Password</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'plants' && (
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>🌱 Plant Management</h2>
            <div style={styles.plantGrid}>
              {plants.map(plant => (
                <div key={plant.id} style={styles.plantItem}>
                  <PlantCard 
                    plant={plant} 
                    onEdit={() => alert('Edit functionality would be implemented here')}
                    onDelete={() => handleDeletePlant(plant.id)}
                  />
                </div>
              ))}
              {plants.length === 0 && (
                <p style={styles.noData}>No plants found in the system.</p>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'careplans' && (
          <div style={styles.section}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              padding: '20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <CarePlanForm 
                onSubmit={async (carePlan) => {
                  try {
                    await axios.post('https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io/api/careplan', carePlan);
                    fetchAdminData();
                  } catch (error) {
                    console.error('Error adding care plan:', error);
                  }
                }}
                onViewCarePlans={() => navigate('/admin/careplans')}
              />
            </div>
          </div>
        )}
        
        {activeTab === 'usermanagement' && (
          <div style={styles.section}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '15px',
              padding: '20px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              <UserManagement />
            </div>
          </div>
        )}

        {showCarePlansModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '30px',
              maxWidth: '900px',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative'
            }}>
              <button
                onClick={() => {
                  setShowCarePlansModal(false);
                  setCarePlanPage(1);
                }}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
              <h2 style={{marginTop: '0', color: '#2e7d32'}}>
                💡 All Care Plans ({carePlans.length})
              </h2>
              {carePlans.length > 0 ? (
                <>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '20px',
                    marginTop: '20px'
                  }}>
                    {carePlans.slice((carePlanPage - 1) * carePlansPerPage, carePlanPage * carePlansPerPage).map(plan => (
                      <div key={plan.id} style={{
                        border: '2px solid #4CAF50',
                        borderRadius: '12px',
                        padding: '20px',
                        backgroundColor: '#f9f9f9'
                      }}>
                        <h3 style={{margin: '0 0 15px 0', color: '#2e7d32', fontSize: '1.3em'}}>
                          🌿 {plan.plantType}
                        </h3>
                        <div style={{marginBottom: '10px'}}>
                          <span style={{fontWeight: '600', color: '#1976D2'}}>💧 Watering:</span> Every {plan.wateringFrequency} days
                        </div>
                        <div style={{marginBottom: '10px'}}>
                          <span style={{fontWeight: '600', color: '#FF9800'}}>☀️ Sunlight:</span> {plan.sunlightHours} hours/day
                        </div>
                        <div style={{marginBottom: '15px'}}>
                          <span style={{fontWeight: '600', color: '#9C27B0'}}>🌱 Fertilizing:</span> Every {plan.fertilizingFrequency} days
                        </div>
                        <div style={{
                          backgroundColor: '#e8f5e9',
                          padding: '12px',
                          borderRadius: '8px',
                          fontSize: '0.9em',
                          fontStyle: 'italic',
                          color: '#2e7d32'
                        }}>
                          💡 <strong>Tips:</strong> {plan.tips}
                        </div>
                      </div>
                    ))}
                  </div>
                  {Math.ceil(carePlans.length / carePlansPerPage) > 1 && (
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: '10px',
                      marginTop: '20px'
                    }}>
                      <button
                        onClick={() => setCarePlanPage(prev => Math.max(prev - 1, 1))}
                        disabled={carePlanPage === 1}
                        style={{
                          padding: '8px 12px',
                          background: carePlanPage === 1 ? '#ccc' : '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: carePlanPage === 1 ? 'not-allowed' : 'pointer'
                        }}
                      >
                        ← Previous
                      </button>
                      <span style={{
                        padding: '8px 12px',
                        background: '#f5f5f5',
                        borderRadius: '6px',
                        fontWeight: '600'
                      }}>
                        Page {carePlanPage} of {Math.ceil(carePlans.length / carePlansPerPage)}
                      </span>
                      <button
                        onClick={() => setCarePlanPage(prev => Math.min(prev + 1, Math.ceil(carePlans.length / carePlansPerPage)))}
                        disabled={carePlanPage === Math.ceil(carePlans.length / carePlansPerPage)}
                        style={{
                          padding: '8px 12px',
                          background: carePlanPage === Math.ceil(carePlans.length / carePlansPerPage) ? '#ccc' : '#4CAF50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: carePlanPage === Math.ceil(carePlans.length / carePlansPerPage) ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Next →
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <p style={{textAlign: 'center', color: '#666', fontSize: '1.1em', marginTop: '40px'}}>
                  No care plans available.
                </p>
              )}
            </div>
          </div>
        )}

        {selectedUser && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '30px',
              maxWidth: '800px',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative'
            }}>
              <button
                onClick={() => setSelectedUser(null)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                ×
              </button>
              <h2 style={{marginTop: '0', color: '#2e7d32'}}>
                🌱 {selectedUser.username}'s Plants ({userPlants.length})
              </h2>
              {userPlants.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                  gap: '15px',
                  marginTop: '20px'
                }}>
                  {userPlants.map(plant => (
                    <div key={plant.id} style={{
                      border: '1px solid #ddd',
                      borderRadius: '8px',
                      padding: '15px',
                      backgroundColor: '#f9f9f9'
                    }}>
                      <img 
                        src={getPlantImage(plant.name || plant.plantName || '')}
                        alt={plant.name || plant.plantName}
                        style={{
                          width: '100%',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          marginBottom: '10px'
                        }}
                        onError={(e) => {
                          e.target.src = 'https://tse3.mm.bing.net/th/id/OIP.7vc7KfOnA4CFoX7n2_nXKQHaFA?pid=Api&P=0&h=180';
                        }}
                      />
                      <h4 style={{margin: '0 0 10px 0', color: '#2e7d32'}}>
                        {plant.name || plant.plantName}
                      </h4>
                      <p style={{margin: '5px 0', fontSize: '0.9em'}}>
                        💧 Water: Every {plant.wateringFrequency} days
                      </p>
                      <p style={{margin: '5px 0', fontSize: '0.9em'}}>
                        ☀️ Sunlight: {plant.sunlightHours} hours/day
                      </p>
                      <p style={{margin: '5px 0', fontSize: '0.9em'}}>
                        🌱 Fertilize: Every {plant.fertilizingFrequency} days
                      </p>
                      <p style={{margin: '5px 0', fontSize: '0.9em'}}>
                        📅 Last watered: {plant.lastWateredDate || 'Not recorded'}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{textAlign: 'center', color: '#666', fontSize: '1.1em', marginTop: '40px'}}>
                  This user hasn't added any plants yet.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;