import React from "react";
import PlantCard from "./PlantCard";

const PlantList = ({ plants, onEdit, onDelete }) => {
  const emptyStateStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
    borderRadius: '20px',
    margin: '20px 0',
    border: '2px dashed #4CAF50',
  };
  
  const titleStyle = {
    fontSize: '2.2em',
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '15px',
    background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };
  
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
    marginTop: '30px',
    padding: '20px 0'
  };

  if (plants.length === 0) {
    return (
      <div style={emptyStateStyle}>
        <div style={{fontSize: '4em', marginBottom: '20px'}}>🌱</div>
        <h3 style={{fontSize: '1.5em', color: '#2e7d32', marginBottom: '10px'}}>No plants in your garden yet!</h3>
        <p style={{fontSize: '1.1em', color: '#666', marginBottom: '20px'}}>Start your plant care journey by adding your first plant above.</p>
        <div style={{fontSize: '1em', color: '#888'}}>
          🌿 Add plants • 💧 Track watering • ☀️ Monitor sunlight • 🌾 Schedule fertilizing
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 style={titleStyle}>
        🌱 My Plants ({plants.length})
      </h2>
      <div style={gridStyle}>
        {plants.map((plant) => (
          <PlantCard
            key={plant.id}
            plant={plant}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default PlantList;