import React, { useState, useEffect } from "react";

// URL for a distinct, beautiful image for the form background
const FORM_BG_IMAGE_URL = 'https://i.etsystatic.com/29642605/r/il/98e318/5040840868/il_fullxfull.5040840868_d7ev.jpg'; 

const styles = {
  form: {
    padding: '50px', 
    borderRadius: '25px',
    boxShadow: '0 15px 40px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: `url(${FORM_BG_IMAGE_URL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 1,
    border: '2px solid rgba(76, 175, 80, 0.2)',
    transition: 'all 0.3s ease',
  },
  formOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 255, 248, 0.95))', 
    borderRadius: '25px',
    zIndex: 2,
    backdropFilter: 'blur(10px)',
  },
  formContent: {
    position: 'relative',
    zIndex: 3,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)', 
    gap: '25px 20px',
  },
  title: {
    background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginTop: '0',
    marginBottom: '20px',
    gridColumn: '1 / -1',
    fontSize: '2.5em',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    textAlign: 'center',
    textShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '8px',
    fontWeight: '600',
    color: '#333',
    fontSize: '1em',
  },
  input: {
    padding: '15px',
    border: '2px solid #e8f5e9',
    borderRadius: '12px',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    fontSize: '1em',
    fontWeight: '500',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
  },
  buttonBase: {
    padding: '14px 25px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1.1em',
    fontWeight: '700',
    transition: 'background-color 0.3s, transform 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '100%',
  },
  submitButton: {
    background: 'linear-gradient(135deg, #4CAF50, #45a049)',
    color: 'white',
    boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)',
  },
  cancelButton: {
    background: 'linear-gradient(135deg, #9e9e9e, #757575)',
    color: 'white',
    padding: '12px 20px', 
    fontSize: '1em',
    boxShadow: '0 6px 20px rgba(158, 158, 158, 0.3)',
  },
  buttonWrapper: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'flex-end', 
    alignSelf: 'end',
    gap: '15px',
    marginTop: '15px', 
  },
  nameGroup: {
    gridColumn: '1 / -1', 
    display: 'flex',
    flexDirection: 'column',
  }
};

const PlantForm = ({ onSubmit, selectedPlant, onCancel }) => {
  const [plantName, setPlantName] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [sunlightHours, setSunlightHours] = useState("");
  const [fertilizingFrequency, setFertilizingFrequency] = useState("");
  const [lastWateredDate, setLastWateredDate] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [suggestion, setSuggestion] = useState(null); 

  const isEditing = !!selectedPlant;

  useEffect(() => {
    if (isEditing) {
      setPlantName(selectedPlant.name || selectedPlant.plantName || "");
      setWateringFrequency(selectedPlant.wateringFrequency || "");
      setSunlightHours(selectedPlant.sunlightHours ? selectedPlant.sunlightHours.toString() : "");
      setFertilizingFrequency(selectedPlant.fertilizingFrequency ? selectedPlant.fertilizingFrequency.toString() : "");
      setLastWateredDate(selectedPlant.lastWateredDate || "");
    } else {
      setPlantName("");
      setWateringFrequency("");
      setSunlightHours("");
      setFertilizingFrequency("");
      setLastWateredDate("");
    }
  }, [selectedPlant, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: selectedPlant ? selectedPlant.id : undefined,
      name: plantName,
      wateringFrequency: wateringFrequency,
      sunlightHours: sunlightHours,
      fertilizingFrequency: fertilizingFrequency,
      lastWateredDate
    });

    if (!isEditing) {
      setPlantName("");
      setWateringFrequency("");
      setSunlightHours("");
      setFertilizingFrequency("");
      setLastWateredDate("");
    }
  };
  
  const getInputStyle = (inputName) => ({
    ...styles.input,
    ...(focusedInput === inputName && {
      border: '2px solid #4CAF50',
      boxShadow: '0 0 0 4px rgba(76, 175, 80, 0.2), 0 4px 12px rgba(76, 175, 80, 0.1)',
      transform: 'translateY(-2px)',
    }),
  });

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formOverlay}></div>
      <div style={styles.formContent}>
        <h2 style={styles.title}>
          {isEditing ? "✏️ Edit Plant Details" : <><span style={{color: '#9C27B0'}}>➕</span> Add New Plant to Track</>}
        </h2>

        <div style={styles.nameGroup}>
          <label style={styles.label}>Plant Name</label>
          <div style={{display: 'flex', gap: '10px'}}>
            <input
              type="text"
              placeholder="Plant Name"
              value={plantName}
              onChange={(e) => setPlantName(e.target.value)}
              style={{...getInputStyle('name'), flex: 1}}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput(null)}
              required
            />
            <button
              type="button"
              onClick={async () => {
                if (plantName.trim()) {
                  try {
                    console.log('Fetching care plan for:', plantName);
                    
                    // Try different variations of the plant name
                    const variations = [
                      plantName.trim(),
                      plantName.trim().toLowerCase(),
                      plantName.trim().charAt(0).toUpperCase() + plantName.trim().slice(1).toLowerCase()
                    ];
                    
                    let carePlan = null;
                    for (const variation of variations) {
                      const response = await fetch(`https://8080-efbdaaafaafcdfbbfbdfdbfcdecfafccfe.premiumproject.examly.io/api/careplan/suggest/${encodeURIComponent(variation)}`);
                      console.log(`Trying "${variation}" - Response status:`, response.status);
                      
                      if (response.ok) {
                        carePlan = await response.json();
                        console.log('Care plan received:', carePlan);
                        break;
                      }
                    }
                    
                    if (carePlan) {
                      setSuggestion(carePlan);
                    } else {
                      alert('No care plan found for this plant. Try a common plant name like "Rose", "Aloe Vera", or "Marigold".');
                    }
                  } catch (error) {
                    console.error('Error fetching suggestion:', error);
                    alert('Failed to get care tips. Please check your internet connection and try again.');
                  }
                } else {
                  alert('Please enter a plant name first.');
                }
              }}
              style={{
                padding: '15px 20px',
                background: 'linear-gradient(135deg, #2196F3, #1976D2)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontSize: '0.9em',
                fontWeight: '600'
              }}
            >
              <span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>💡</span> Get Tips
            </button>
          </div>
          {suggestion && (
            <div style={{
              marginTop: '15px',
              padding: '15px',
              background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
              borderRadius: '12px',
              border: '2px solid #2196F3'
            }}>
              <h4 style={{margin: '0 0 10px 0', color: '#1976D2'}}><span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>💡</span> Care Suggestions for {suggestion.plantType}:</h4>
              <p style={{margin: '5px 0', fontSize: '0.9em'}}><span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>💧</span> Water every {suggestion.wateringFrequency} days</p>
              <p style={{margin: '5px 0', fontSize: '0.9em'}}><span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>☀️</span> {suggestion.sunlightHours} hours of sunlight daily</p>
              <p style={{margin: '5px 0', fontSize: '0.9em'}}><span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>🌱</span> Fertilize every {suggestion.fertilizingFrequency} days</p>
              <p style={{margin: '5px 0', fontSize: '0.9em', fontStyle: 'italic'}}><span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>💡</span> {suggestion.tips}</p>
              <button
                type="button"
                onClick={() => {
                  setWateringFrequency(suggestion.wateringFrequency.toString());
                  setSunlightHours(suggestion.sunlightHours.toString());
                  setFertilizingFrequency(suggestion.fertilizingFrequency.toString());
                }}
                style={{
                  marginTop: '10px',
                  padding: '8px 16px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9em'
                }}
              >
                <span style={{color: 'initial', fontFamily: 'Apple Color Emoji, Segoe UI Emoji, sans-serif'}}>✅</span> Apply Suggestions
              </button>
            </div>
          )}
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Watering Frequency</label>
          <input
            type="text"
            placeholder="Watering Frequency"
            value={wateringFrequency}
            onChange={(e) => setWateringFrequency(e.target.value)}
            style={getInputStyle('watering')}
            onFocus={() => setFocusedInput('watering')}
            onBlur={() => setFocusedInput(null)}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Sunlight Hours (per day)</label>
          <input
            type="number"
            placeholder="e.g., 6"
            value={sunlightHours}
            onChange={(e) => setSunlightHours(e.target.value)}
            style={getInputStyle('sunlight')}
            onFocus={() => setFocusedInput('sunlight')}
            onBlur={() => setFocusedInput(null)}
            min="1"
            max="24"
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Fertilizing Frequency (days)</label>
          <input
            type="number"
            placeholder="e.g., 30"
            value={fertilizingFrequency}
            onChange={(e) => setFertilizingFrequency(e.target.value)}
            style={getInputStyle('fertilizing')}
            onFocus={() => setFocusedInput('fertilizing')}
            onBlur={() => setFocusedInput(null)}
            min="1"
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Last Watered Date</label>
          <input
            type="date"
            value={lastWateredDate}
            onChange={(e) => setLastWateredDate(e.target.value)}
            style={getInputStyle('date')}
            onFocus={() => setFocusedInput('date')}
            onBlur={() => setFocusedInput(null)}
            required
          />
        </div>

        <div style={styles.buttonWrapper}>
          {isEditing && (
            <button 
              type="button" 
              style={{ ...styles.buttonBase, ...styles.cancelButton, width: 'auto' }}
              onClick={onCancel}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#757575'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.cancelButton.backgroundColor}
            >
              ❌ Cancel Edit
            </button>
          )}
          <button 
            type="submit" 
            style={{ ...styles.buttonBase, ...styles.submitButton, width: isEditing ? 'auto' : '100%' }} 
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#388e3c'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = styles.submitButton.backgroundColor}
          >
            {isEditing ? "💾 Save Changes" : "🌱 Add Plant"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlantForm;