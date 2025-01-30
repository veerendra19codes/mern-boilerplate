
import React, { useEffect, useState } from "react";

const IncidentForm = ({  onClose, isModalOpen }) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [location, setLocation] = useState("Fetching location...");
  const [incidents, setIncidents] = useState([]);


  const [type, setType] = useState("Animal");

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Month is 0-based
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}:${month}:${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedDateTime = formatDateTime(dateTime);
    const newIncident = { image, title, description, time: formattedDateTime, location, type };

    addIncident(newIncident);
    setImage("");
    setTitle("");
    setDescription("");
    setDateTime("");
    setLocation("");
    setType("Animal");
    onClose(); // Close modal after submission
  };

    useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLocation(`${lat} ${long}`);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLocation("Location unavailable");
        }
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

   const addIncident = (incident) => {
    const updatedIncidents = [...incidents, { ...incident, status: "Unresolved" }];
    setIncidents(updatedIncidents);
  };

  useEffect(() => {
    const storedIncidents = JSON.parse(localStorage.getItem("incidents")) || [];
    setIncidents(storedIncidents);
  }, []);


  useEffect(() => {
    if (incidents.length > 0) {
      localStorage.setItem("incidents", JSON.stringify(incidents));
    }
  }, [incidents]);

  const updateIncidentStatus = (index, status) => {
    const updatedIncidents = incidents.map((incident, i) =>
      i === index ? { ...incident, status } : incident
    );
    setIncidents(updatedIncidents);
  };


  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-1/2 h-[550px] p-6 rounded-lg shadow-lg relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-lg font-bold text-gray-700 hover:text-red-500"
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4">Report an Incident</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input 
            type="text" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            placeholder="Image URL" 
            required 
            className="p-2 border rounded"
          />
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Title" 
            required 
            className="p-2 border rounded"
          />
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Description" 
            required 
            className="p-2 border rounded"
          />
          
          {/* Date-Time Input */}
          <input 
            type="datetime-local" 
            value={dateTime} 
            onChange={(e) => setDateTime(e.target.value)} 
            required 
            className="p-2 border rounded"
          />
          
          {/* <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            placeholder="Location" 
            required 
            className="p-2 border rounded"
          /> */}

          {/* Location Display */}
          <p className="text-sm text-gray-600">Location: {location}</p>
          
          <select 
            value={type} 
            onChange={(e) => setType(e.target.value)} 
            className="p-2 border rounded"
          >
            <option value="Animal">Animal</option>
            <option value="Fire">Fire</option>
            <option value="Smoke">Smoke</option>
          </select>

          <div className="flex justify-between">
            <button 
              type="submit" 
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
            <button 
              type="button" 
              onClick={onClose} 
              className="p-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IncidentForm;


// import React, { useState, useEffect } from "react";

// const IncidentForm = ({ addIncident }) => {
//   const [image, setImage] = useState("");
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [dateTime, setDateTime] = useState("");
//   const [location, setLocation] = useState("Fetching location...");
//   const [type, setType] = useState("Animal");

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
//         },
//         () => setLocation("Location unavailable")
//       );
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const formattedDateTime = new Date(dateTime).toLocaleString();
//     addIncident({ image, title, description, time: formattedDateTime, location, type });
//     setImage("");
//     setTitle("");
//     setDescription("");
//     setDateTime("");
//     setType("Animal");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Image URL" />
//       <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
//       <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
//       <input type="datetime-local" value={dateTime} onChange={(e) => setDateTime(e.target.value)} required />
//       <input type="text" value={location} disabled />
//       <select value={type} onChange={(e) => setType(e.target.value)}>
//         <option value="Animal">Animal</option>
//         <option value="Accident">Accident</option>
//         <option value="Crime">Crime</option>
//       </select>
//       <button type="submit">Report Incident</button>
//     </form>
//   );
// };

// export default IncidentForm;
