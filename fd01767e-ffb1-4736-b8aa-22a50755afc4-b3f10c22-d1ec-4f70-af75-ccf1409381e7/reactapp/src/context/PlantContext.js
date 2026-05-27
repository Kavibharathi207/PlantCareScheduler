import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const PlantContext = createContext();

export const usePlants = () => {
  const context = useContext(PlantContext);
  if (!context) {
    throw new Error('usePlants must be used within a PlantProvider');
  }
  return context;
};

export const PlantProvider = ({ children, user }) => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadPlants = useCallback(() => {
    setLoading(true);
    try {
      const userPlants = JSON.parse(localStorage.getItem(`plants_${user?.username}`) || '[]');
      setPlants(userPlants);
    } catch (error) {
      console.error('Error loading plants:', error);
      setPlants([]);
    } finally {
      setLoading(false);
    }
  }, [user?.username]);

  // Load plants from localStorage when user changes
  useEffect(() => {
    if (user?.username) {
      setLoading(true);
      try {
        const userPlants = JSON.parse(localStorage.getItem(`plants_${user?.username}`) || '[]');
        setPlants(userPlants);
      } catch (error) {
        console.error('Error loading plants:', error);
        setPlants([]);
      } finally {
        setLoading(false);
      }
    } else {
      setPlants([]);
    }
  }, [user?.username]);

  const addPlant = (plant) => {
    const newPlant = { 
      ...plant, 
      id: Date.now(), 
      createdBy: user?.username,
      plantName: plant.name || plant.plantName
    };
    
    const updatedPlants = [...plants, newPlant];
    setPlants(updatedPlants);
    localStorage.setItem(`plants_${user?.username}`, JSON.stringify(updatedPlants));
    return newPlant;
  };

  const updatePlant = (updatedPlant) => {
    const updatedPlants = plants.map(p => p.id === updatedPlant.id ? updatedPlant : p);
    setPlants(updatedPlants);
    localStorage.setItem(`plants_${user?.username}`, JSON.stringify(updatedPlants));
  };

  const deletePlant = (id) => {
    const updatedPlants = plants.filter(p => p.id !== id);
    setPlants(updatedPlants);
    localStorage.setItem(`plants_${user?.username}`, JSON.stringify(updatedPlants));
  };

  const value = {
    plants,
    loading,
    addPlant,
    updatePlant,
    deletePlant,
    loadPlants
  };

  return (
    <PlantContext.Provider value={value}>
      {children}
    </PlantContext.Provider>
  );
};