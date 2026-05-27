import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PlantList from './PlantList';
import { usePlants } from '../context/PlantContext';

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
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '15px',
    padding: '35px',
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
  statsBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '30px',
    marginBottom: '30px',
    padding: '20px',
    background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)',
    borderRadius: '15px',
    flexWrap: 'wrap',
  },
  statItem: {
    textAlign: 'center',
    color: '#2e7d32',
    fontWeight: '600',
  },
  statNumber: {
    fontSize: '2em',
    fontWeight: '800',
    display: 'block',
  },
  statLabel: {
    fontSize: '0.9em',
    opacity: '0.8',
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
  return 'https://tse3.mm.bing.net/th/id/OIP.7vc7KfOnA4CFoX7n2_nXKQHaFA?pid=Api&P=0&h=180';
};

// Add CSS animation for fade effect
if (typeof document !== 'undefined' && !document.head.querySelector('style[data-fade-animation-plants]')) {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.innerText = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;
  styleSheet.setAttribute('data-fade-animation-plants', 'true');
  document.head.appendChild(styleSheet);
}

const MyPlantsPage = ({ user }) => {
  const navigate = useNavigate();
  const { plants: rawPlants, deletePlant } = usePlants();
  const [currentPage, setCurrentPage] = useState(1);
  const [plantsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  // Data normalization function for display in PlantCard
  const getDisplayPlants = (rawPlants) => {
    let plants = rawPlants.map((p) => ({
      id: p.id,
      name: p.name || p.plantName || "Unnamed Plant", 
      plantName: p.name || p.plantName || "Unnamed Plant",
      wateringFrequency: p.wateringFrequency || 0,
      sunlightHours: p.sunlightHours || 0,
      fertilizingFrequency: p.fertilizingFrequency || 0,
      lastWateredDate: p.lastWateredDate || "Not Recorded",
      imageUrl: getPlantImage(p.name || p.plantName || ""),
    }));
    
    // Filter by search term
    if (searchTerm) {
      plants = plants.filter(plant => 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort plants
    plants.sort((a, b) => {
      let aVal = a[sortBy];
      let bVal = b[sortBy];
      
      if (typeof aVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
    
    return plants;
  };

  // Pagination logic
  const getPaginatedPlants = (plants) => {
    const indexOfLastPlant = currentPage * plantsPerPage;
    const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
    return plants.slice(indexOfFirstPlant, indexOfLastPlant);
  };

  const displayPlants = getDisplayPlants(rawPlants);
  const paginatedPlants = getPaginatedPlants(displayPlants);
  const totalPages = Math.ceil(displayPlants.length / plantsPerPage);

  const handleEditPlant = (normalizedPlant) => {
    // Navigate back to dashboard with edit mode
    localStorage.setItem('editPlant', JSON.stringify(normalizedPlant));
    navigate('/user/dashboard');
  };

  const handleDeletePlant = (id) => {
    if (!window.confirm("Are you sure you want to delete this plant?")) return;
    deletePlant(id);
  };

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
          🌱 My Plant Collection
        </h1>

        <div style={styles.statsBar}>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{displayPlants.length}</span>
            <span style={styles.statLabel}>🌿 Total Plants</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{displayPlants.filter(p => p.wateringFrequency <= 3).length}</span>
            <span style={styles.statLabel}>💧 High Maintenance</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{displayPlants.filter(p => p.sunlightHours >= 6).length}</span>
            <span style={styles.statLabel}>☀️ Sun Lovers</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statNumber}>{displayPlants.filter(p => p.fertilizingFrequency <= 14).length}</span>
            <span style={styles.statLabel}>🌱 Frequent Feeding</span>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '25px',
          padding: '20px',
          background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
        }}>
          <input
            type="text"
            placeholder="🔍 Search plants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '25px',
              fontSize: '1em',
              outline: 'none',
              transition: 'border-color 0.3s ease'
            }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '12px 16px',
              border: '2px solid #e0e0e0',
              borderRadius: '25px',
              fontSize: '1em',
              outline: 'none',
              background: 'white'
            }}
          >
            <option value="name">Sort by Name</option>
            <option value="wateringFrequency">Sort by Watering</option>
            <option value="sunlightHours">Sort by Sunlight</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            style={{
              padding: '12px 16px',
              background: sortOrder === 'asc' ? '#4CAF50' : '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '25px',
              cursor: 'pointer',
              fontSize: '1em',
              fontWeight: '600'
            }}
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>

        {displayPlants.length > 0 ? (
          <>
            <PlantList
              plants={paginatedPlants} 
              onEdit={handleEditPlant}
              onDelete={handleDeletePlant}
            />
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                marginTop: '30px',
                padding: '20px'
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
                  Page {currentPage} of {totalPages}
                </span>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '10px 15px',
                    background: currentPage === totalPages ? '#ccc' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666',
            fontSize: '1.2em'
          }}>
            <div style={{fontSize: '4em', marginBottom: '20px'}}>🌱</div>
            <h3>No plants found</h3>
            <p>
              {searchTerm ? 
                `No plants match "${searchTerm}". Try a different search term.` : 
                "You haven't added any plants yet. Go back to dashboard to add your first plant!"
              }
            </p>
            <button
              onClick={() => navigate('/user/dashboard')}
              style={{
                marginTop: '20px',
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #4CAF50, #45a049)',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '1em',
                fontWeight: '600'
              }}
            >
              Add Your First Plant
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlantsPage;