import React from "react";

// Inline CSS styles in the JS file
const styles = {
  adminContainer: {
    padding: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'white',
    width: '300px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  incidentImage: {
    width: '100%',
    maxHeight: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    padding: '10px',
    margin: '5px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  buttonHover: {
    backgroundColor: '#45a049',
  },
};

const AdminPage = ({ incidents, updateIncidentStatus }) => {
  return (
    <div style={styles.adminContainer}>
      <h2>NGO Admin Panel</h2>
      {incidents.length === 0 ? (
        <p>No incidents to manage.</p>
      ) : (
        incidents.map((incident, index) => (
          <div key={index} style={styles.card}>
            {incident.image && <img style={styles.incidentImage} src={incident.image} alt={incident.title} />}
            <h4>{incident.title}</h4>
            <p>{incident.description}</p>
            <button 
              style={styles.button} 
              onMouseOver={e => e.target.style.backgroundColor = styles.buttonHover.backgroundColor} 
              onMouseOut={e => e.target.style.backgroundColor = styles.button.backgroundColor} 
              onClick={() => updateIncidentStatus(index, "Resolved")}
            >
              Resolved
            </button>
            <button 
              style={styles.button} 
              onMouseOver={e => e.target.style.backgroundColor = styles.buttonHover.backgroundColor} 
              onMouseOut={e => e.target.style.backgroundColor = styles.button.backgroundColor} 
              onClick={() => updateIncidentStatus(index, "Unresolved")}
            >
              Unresolved
            </button>
            <button 
              style={styles.button} 
              onMouseOver={e => e.target.style.backgroundColor = styles.buttonHover.backgroundColor} 
              onMouseOut={e => e.target.style.backgroundColor = styles.button.backgroundColor} 
              onClick={() => updateIncidentStatus(index, "In Progress")}
            >
              In Progress
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;