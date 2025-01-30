// import React, { useEffect, useState } from "react";
// import IncidentForm from "../components/NewIncidentForm";
// import IncidentList from "./Incidents/IncidentList";

// const IncidentManager = () => {
//   const [incidents, setIncidents] = useState([]);

//   useEffect(() => {
//     const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
//     setIncidents(storedIncidents);
//   }, []);

//   useEffect(() => {
//     if (incidents.length > 0) {
//       localStorage.setItem("incidents", JSON.stringify(incidents));
//     }
//   }, [incidents]);

//   const addIncident = (incident) => {
//     const updatedIncidents = [
//       ...incidents,
//       { ...incident, status: "Unresolved" },
//     ];
//     setIncidents(updatedIncidents);
//   };

//   const updateIncidentStatus = (index, status) => {
//     const updatedIncidents = incidents.map((incident, i) =>
//       i === index ? { ...incident, status } : incident
//     );
//     setIncidents(updatedIncidents);
//   };

//   return (
//     <div>
//       <IncidentForm addIncident={addIncident} />
//       <IncidentList
//         incidents={incidents}
//         updateIncidentStatus={updateIncidentStatus}
//       />
//     </div>
//   );
// };

// export default IncidentManager;
