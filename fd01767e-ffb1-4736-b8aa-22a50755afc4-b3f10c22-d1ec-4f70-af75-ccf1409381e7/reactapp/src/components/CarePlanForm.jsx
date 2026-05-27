import React, { useState } from "react";

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
  textarea: {
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
    minHeight: '80px',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  buttonWrapper: {
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '15px', 
  },
  submitButton: {
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
    background: 'linear-gradient(135deg, #4CAF50, #45a049)',
    color: 'white',
    boxShadow: '0 6px 20px rgba(76, 175, 80, 0.3)',
  },
  viewButton: {
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
    background: 'linear-gradient(135deg, #2196F3, #1976D2)',
    color: 'white',
    boxShadow: '0 6px 20px rgba(33, 150, 243, 0.3)',
  },
  tipsGroup: {
    gridColumn: '1 / -1', 
    display: 'flex',
    flexDirection: 'column',
  }
};

const CarePlanForm = ({ onSubmit, onViewCarePlans }) => {
  const [plantType, setPlantType] = useState("");
  const [wateringFrequency, setWateringFrequency] = useState("");
  const [sunlightHours, setSunlightHours] = useState("");
  const [fertilizingFrequency, setFertilizingFrequency] = useState("");
  const [tips, setTips] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      plantType,
      wateringFrequency,
      sunlightHours,
      fertilizingFrequency,
      tips
    });
    
    setPlantType("");
    setWateringFrequency("");
    setSunlightHours("");
    setFertilizingFrequency("");
    setTips("");
  };
  
  const getInputStyle = (inputName) => ({
    ...styles.input,
    ...(focusedInput === inputName && {
      border: '2px solid #4CAF50',
      boxShadow: '0 0 0 4px rgba(76, 175, 80, 0.2), 0 4px 12px rgba(76, 175, 80, 0.1)',
      transform: 'translateY(-2px)',
    }),
  });

  const getTextareaStyle = (inputName) => ({
    ...styles.textarea,
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
          💡 Add New Care Plan
        </h2>

        <div style={styles.group}>
          <label style={styles.label}>Plant Type</label>
          <input
            type="text"
            placeholder="Plant Type (e.g., Rose)"
            value={plantType}
            onChange={(e) => setPlantType(e.target.value)}
            style={getInputStyle('plantType')}
            onFocus={() => setFocusedInput('plantType')}
            onBlur={() => setFocusedInput(null)}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Watering Frequency</label>
          <input
            type="number"
            placeholder="Watering (days)"
            value={wateringFrequency}
            onChange={(e) => setWateringFrequency(e.target.value)}
            style={getInputStyle('watering')}
            onFocus={() => setFocusedInput('watering')}
            onBlur={() => setFocusedInput(null)}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Sunlight Hours</label>
          <input
            type="number"
            placeholder="Sunlight (hours)"
            value={sunlightHours}
            onChange={(e) => setSunlightHours(e.target.value)}
            style={getInputStyle('sunlight')}
            onFocus={() => setFocusedInput('sunlight')}
            onBlur={() => setFocusedInput(null)}
            required
          />
        </div>

        <div style={styles.group}>
          <label style={styles.label}>Fertilizing Frequency</label>
          <input
            type="number"
            placeholder="Fertilizing (days)"
            value={fertilizingFrequency}
            onChange={(e) => setFertilizingFrequency(e.target.value)}
            style={getInputStyle('fertilizing')}
            onFocus={() => setFocusedInput('fertilizing')}
            onBlur={() => setFocusedInput(null)}
            required
          />
        </div>

        <div style={styles.tipsGroup}>
          <label style={styles.label}>Care Tips</label>
          <textarea
            placeholder="Care tips and notes..."
            value={tips}
            onChange={(e) => setTips(e.target.value)}
            style={getTextareaStyle('tips')}
            onFocus={() => setFocusedInput('tips')}
            onBlur={() => setFocusedInput(null)}
            required
          />
        </div>

        <div style={styles.buttonWrapper}>
          <button type="submit" style={styles.submitButton}>
            ➕ Add Care Plan
          </button>
          <button type="button" onClick={onViewCarePlans} style={styles.viewButton}>
            👁️ View Care Plans
          </button>
        </div>
      </div>
    </form>
  );
};

export default CarePlanForm;