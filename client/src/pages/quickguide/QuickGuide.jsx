import  { useState } from "react";
import { Link } from "react-router-dom";

const videosFire = [
  "https://www.youtube.com/embed/3Ld_x0AkOO0",
  "https://www.youtube.com/embed/GVBamXXVD30",
  "https://www.youtube.com/embed/cnn-yvszLXE",
  "https://www.youtube.com/embed/FvoUruFpV1w",
  "https://www.youtube.com/embed/o5QdAEJH43c",
  "https://www.youtube.com/embed/73uBTHEdew8",
];

const videosAnimal = [
  "https://www.youtube.com/embed/cMvvjHMmAxU",
  "https://www.youtube.com/embed/H_42eirrOv4",
  "https://www.youtube.com/embed/LuEZV0zOLJU",
  "https://www.youtube.com/embed/DV53W1rVF1Y",
  "https://www.youtube.com/embed/Hkv-mSpOwYg",
  "https://www.youtube.com/embed/1CWZZZ0-3UU",
];

const trainingStepsFire = [
  { title: "🔥 Fire Prevention Tips", description: "Always keep a fire extinguisher handy, ensure electrical wiring is safe, and avoid open flames near flammable materials." },
  { title: "🚒 Emergency Response Training", description: "Learn to use fire extinguishers, understand evacuation routes, and practice stop-drop-roll techniques." },
  { title: "🌲 Wildlife Safety", description: "Never approach wild animals, store food securely in camps, and know emergency contacts in case of an encounter." },
  { title: "🚨 Community Fire Drills", description: "Organize regular fire drills, educate people on safe exits, and teach children how to respond in emergencies." },
  { title: "💧 Fire Safety in the Kitchen", description: "Keep a fire extinguisher nearby, never leave cooking unattended, and avoid wearing loose clothing near open flames." },
  {
    title: "⚡ Electrical Fire Safety",
    description:
      "Avoid overloading power outlets, regularly inspect electrical cords for damage, and unplug appliances when not in use.",
  }
];

const trainingStepsAnimal = [
  { title: "🦺 Preventing Animal Encounters", description: "Avoid leaving food out, maintain a safe distance from wildlife, and be aware of animal activity in your area." },
  { title: "🚑 Immediate Response During an Attack", description: "Stay calm, do not run, make yourself appear larger, and use any available object to protect yourself." },
  { title: "📞 Emergency Contact and First Aid", description: "Know emergency numbers for wildlife control, carry a first-aid kit, and treat wounds immediately to prevent infection." },
  { title: "📢 Community Awareness and Preparedness", description: "Educate others on how to handle animal encounters, establish safe zones, and practice emergency response drills." },
  { title: "🏕 Safe Camping Practices", description: "Store food in airtight containers, keep a safe distance from water sources, and avoid setting up camp near animal trails or dens." },
  {
    title: "🔦 Nighttime Safety Measures",
    description:
      "Avoid walking alone at night in wildlife-prone areas, carry a flashlight, make noise to alert animals of your presence, and stay vigilant for movement or sounds.",
  }
  
];

const TrainingPage = () => {
  const [activeTab, setActiveTab] = useState("fire");

  return (
    <div className="max-w-screen-lg mx-auto p-4 sm:p-6 text-center font-sans">
      {/* Navbar */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 font-semibold rounded-lg transition duration-300 ${activeTab === "fire" ? "bg-red-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("fire")}
        >
          Fire Training
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-lg transition duration-300 ${activeTab === "animal" ? "bg-red-600 text-white" : "bg-gray-200"}`}
          onClick={() => setActiveTab("animal")}
        >
          Animal Training
        </button>
      </div>

      {activeTab === "fire" ? (
        <TrainingSection title="Fire Response and Fighting Instructions" videos={videosFire} steps={trainingStepsFire} />
      ) : (
        <TrainingSection title="Wild Animal Attack: Response & Survival Methods" videos={videosAnimal} steps={trainingStepsAnimal} />
      )}
    </div>
  );
};

const TrainingSection = ({ title, videos, steps }) => (
  <div>
    <h1 className="text-2xl sm:text-3xl font-bold text-red-600 mb-5">{title}</h1>
    
    <h2 className="text-left text-gray-700 text-xl font-semibold mb-4">📺 Training Videos 📺</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((video, index) => (
        <div key={index} className="w-full">
          <iframe
            src={video}
            title={`video-${index}`}
            allowFullScreen
            className="w-full aspect-video rounded-lg border-none"
          ></iframe>
        </div>
      ))}
    </div>
    
    <Link className="text-blue-600 text-lg underline block mt-4">View More</Link>
    <p className="text-left text-lg text-gray-700 font-semibold mt-2">
      Learn essential safety and response techniques.
    </p>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {steps.map((step, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 transition-transform transform hover:scale-105"
        >
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>
    
    <Link to="/response" className="text-blue-600 text-lg underline block mt-4">Learn More</Link>
  </div>
);

export default TrainingPage;