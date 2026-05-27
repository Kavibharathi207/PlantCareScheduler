import React from "react";

const PlantCard = ({ plant, onEdit, onDelete }) => {
  const wateringFreq = plant.wateringFrequency || 0;
  const sunlightHrs = plant.sunlightHours || 0;
  const fertilizingFreq = plant.fertilizingFrequency || 0;
  
  const getHealthColor = () => {
    if (wateringFreq <= 2) return '#4CAF50'; // Green - healthy
    if (wateringFreq <= 5) return '#FF9800'; // Orange - moderate
    return '#f44336'; // Red - needs attention
  };
  
  const cardStyle = {
    background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
    borderRadius: '20px',
    padding: '0',
    margin: '15px',
    boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    border: `3px solid ${getHealthColor()}`,
    position: 'relative',
    minHeight: '400px'
  };
  
  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '0',
    transition: 'transform 0.3s ease'
  };
  
  const contentStyle = {
    padding: '20px'
  };
  
  const titleStyle = {
    fontSize: '1.6em',
    fontWeight: '800',
    color: '#1B5E20',
    marginBottom: '15px',
    textAlign: 'center',
    textTransform: 'capitalize',
    letterSpacing: '0.5px'
  };
  
  const statStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '0.95em',
    color: '#424242',
    fontWeight: '500'
  };
  
  const buttonContainerStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    justifyContent: 'center'
  };
  
  const buttonStyle = {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9em',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };
  
  const editButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #2196F3, #1976D2)',
    color: 'white'
  };
  
  const deleteButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #f44336, #d32f2f)',
    color: 'white'
  };
  
  return (
    <div 
      style={cardStyle}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.15)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
        const img = e.currentTarget.querySelector('img');
        if (img) img.style.transform = 'scale(1)';
      }}
    >
      <div style={{position: 'absolute', top: '10px', right: '10px', background: getHealthColor(), color: 'white', padding: '6px 12px', borderRadius: '15px', fontSize: '0.75em', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px'}}>
        {wateringFreq <= 2 ? '🟢 Healthy' : wateringFreq <= 5 ? '🟡 Moderate' : '🔴 Attention'}
      </div>
      
      <img 
        src={plant.imageUrl} 
        alt={plant.name || plant.plantName}
        style={imageStyle}
        onError={(e) => {
          e.target.src = 'https://tse3.mm.bing.net/th/id/OIP.7vc7KfOnA4CFoX7n2_nXKQHaFA?pid=Api&P=0&h=180';
        }}
      />
      
      <div style={contentStyle}>
        <h3 style={titleStyle}>{plant.name || plant.plantName}</h3>
        
        <div style={statStyle}>
          <span style={{marginRight: '10px', fontSize: '1.2em', color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>💧</span>
          <span>Water every <strong>{wateringFreq}</strong> days</span>
        </div>
        
        <div style={statStyle}>
          <span style={{marginRight: '10px', fontSize: '1.2em', color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>☀️</span>
          <span><strong>{sunlightHrs}</strong> hours/day sunlight</span>
        </div>
        
        <div style={statStyle}>
          <span style={{marginRight: '10px', fontSize: '1.2em', color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>🌾</span>
          <span>Fertilize every <strong>{fertilizingFreq}</strong> days</span>
        </div>
        
        <div style={buttonContainerStyle}>
          <button 
            style={editButtonStyle}
            onClick={() => onEdit(plant)}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            ✏️ Edit
          </button>
          <button 
            style={deleteButtonStyle}
            onClick={() => onDelete(plant.id)}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;