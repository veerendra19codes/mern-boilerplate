// import React, { useEffect, useState } from "react";

// const IncidentList = () => {
//     const [incidents, setIncidents] = useState([]);

//     useEffect(() => {
//     const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
//     setIncidents(storedIncidents);
//   }, []);


//    useEffect(() => {
//     if (incidents.length > 0) {
//       localStorage.setItem("incidents", JSON.stringify(incidents));
//     }
//   }, [incidents]);

//   const addIncident = (incident) => {
//     const updatedIncidents = [...incidents, { ...incident, status: "Unresolved" }];
//     setIncidents(updatedIncidents);
//   };

//   const updateIncidentStatus = (index, status) => {
//     const updatedIncidents = incidents.map((incident, i) =>
//       i === index ? { ...incident, status } : incident
//     );
//     setIncidents(updatedIncidents);
//   };

//   // Inline CSS styles
//   const styles = {
//     container: {
//       padding: '20px',
//     },
//     card: {
//       border: '1px solid #ddd',
//       borderRadius: '8px',
//       padding: '15px',
//       marginBottom: '15px',
//       boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
//       backgroundColor: 'white',
//       maxWidth: '500px',
//       margin: 'auto',
//     },
//     image: {
//       width: '100px',
//       height: 'auto',
//       objectFit: 'cover',
//       borderRadius: '8px',
//       marginBottom: '10px',
//     },
//     title: {
//       fontSize: '1.2rem',
//       fontWeight: 'bold',
//     },
//     description: {
//       fontSize: '1rem',
//       color: '#555',
//     },
//     details: {
//       fontSize: '0.9rem',
//       color: '#777',
//       marginTop: '5px',
//     },
//     status: {
//       fontSize: '1rem',
//       fontWeight: 'bold',
//       color: '#4CAF50', // Green color for active status
//       marginTop: '10px',
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {incidents?.length === 0 ? (
//         <p>No incidents reported yet.</p>
//       ) : (
//         incidents.map((incident, index) => (
//           <div key={index} style={styles.card}>
//             {incident.image && (
//               <img
//                 src={incident.image}
//                 alt="Incident"
//                 style={styles.image}
//               />
//             )}
//             <h4 style={styles.title}>{incident.title}</h4>
//             <p style={styles.description}>{incident.description}</p>
//             <div style={styles.details}>
//               <p>Time: {incident.time}</p>
//               <p>Location: {incident.location}</p>
//               <p>Type: {incident.type}</p>
//             </div>
//             <p style={styles.status}>Status: {incident.status}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default IncidentList;



// import React from "react";

// const IncidentList = ({ incidents, updateIncidentStatus }) => {
//   return (
//     <div>
//       {incidents.length === 0 ? (
//         <p>No incidents reported yet.</p>
//       ) : (
//         incidents.map((incident, index) => (
//           <div key={index} className="incident-card">
//             {incident.image && <img src={incident.image} alt="Incident" />}
//             <h4>{incident.title}</h4>
//             <p>{incident.description}</p>
//             <p>Time: {incident.time}</p>
//             <p>Location: {incident.location}</p>
//             <p>Type: {incident.type}</p>
//             <p>Status: {incident.status}</p>
//             <button onClick={() => updateIncidentStatus(index, "Resolved")}>Mark Resolved</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default IncidentList;

"use client"

import { useState, useEffect } from "react"
import TouristView from "../../components/TouristView"
import AdminView from "../../components/AdminView"
import { useUser } from "../../context/UserContext"

// Simulating JSON file storage
const initialData = {
  communities: [
    {
      id: "1",
      name: "Safari Adventure",
      startDate: "2023-07-01",
      endDate: "2023-07-07",
      joinLink: "abc123",
      members: [],
    },
  ],
  incidents: [{ id: "1", type: "animal", reporterEmail: "tourist@example.com", status: "active", communityId: "1" }],
}

export default function IncidentsPage() {
  const { user } = useUser()
  const [data, setData] = useState(initialData)

  const updateData = (newData) => {
    setData(newData)
    // In a real application, you would send this data to your backend to update the JSON file
    console.log("Data updated:", newData)
  }

  const joinCommunity = (communityId) => {
    const newData = { ...data }
    const community = newData.communities.find((c) => c.id === communityId)
    if (community && !community.members.includes(user.username)) {
      community.members.push(user.username)
      updateData(newData)
    }
  }

  const createCommunity = (communityData) => {
    const newCommunity = {
      ...communityData,
      id: Math.random().toString(36).substr(2, 9),
      joinLink: Math.random().toString(36).substr(2, 16),
      members: [],
    }
    updateData({
      ...data,
      communities: [...data.communities, newCommunity],
    })
  }

  const reportIncident = (incidentData) => {
    const newIncident = {
      ...incidentData,
      id: Math.random().toString(36).substr(2, 9),
      status: "active",
    }
    updateData({
      ...data,
      incidents: [...data.incidents, newIncident],
    })
  }

  const updateIncidentStatus = (incidentId, newStatus) => {
    const newData = { ...data }
    const incident = newData.incidents.find((i) => i.id === incidentId)
    if (incident) {
      incident.status = newStatus
      updateData(newData)
    }
  }

  const verifyTourist = (communityId, username, isAccepted) => {
    const newData = { ...data }
    const community = newData.communities.find((c) => c.id === communityId)
    if (community) {
      if (isAccepted) {
        community.members.push(username)
      } else {
        community.members = community.members.filter((member) => member !== username)
      }
      updateData(newData)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Incidents Management</h1>
      {user.role === "tourist" ? (
        <TouristView
          user={user}
          communities={data.communities}
          incidents={data.incidents}
          onJoinCommunity={joinCommunity}
          onReportIncident={reportIncident}
        />
      ) : (
        <AdminView
          communities={data.communities}
          incidents={data.incidents}
          onCreateCommunity={createCommunity}
          onVerifyTourist={verifyTourist}
          onUpdateIncidentStatus={updateIncidentStatus}
        />
      )}
    </div>
  )
}

