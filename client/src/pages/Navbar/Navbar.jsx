


import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import IncidentForm from "../../components/NewIncidentForm";

const Navbar = () => {
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showNavbar = !(location.pathname === '/login' || location.pathname === '/register');

  useEffect(() => {
    const checkLoggedIn = () => {
      if (localStorage.getItem("usertoken")) setLoggedIn(true);
      else setLoggedIn(false);
    };
    checkLoggedIn();
  }, []);

  const { user } = useUser();
  const role = user?.role || "tourist";
  console.log("user in navbar: ", user);

  return (
    <>
      {showNavbar && (
        <div className="w-full h-16 top-0 shadow-lg flex justify-between items-center p-2 ">
          <Link  to='/' className="logo cursor-pointer text-2xl font-bold">WildEchos</Link>
          <nav className="w-1/3 flex items-center justify-between text-2xl font-semibold">
            <Link to="/" className="text-blue-500 hover:text-blue-400 text-sm">Insights</Link>
            <Link to="/incidents" className="text-blue-500 hover:text-blue-400 text-sm">Incidents</Link>
            {/* <Link to="/zones" className="text-blue-500 hover:text-blue-400">Zones</Link> */}
            {role !== "ngo_admin" && <Link to="/profile/tourist" className="text-blue-500 hover:text-blue-400 text-sm">Profile</Link>}
            
            <Link to="/quickguide" className="text-blue-500 hover:text-blue-400 text-sm">Quick Guide</Link>
          </nav>

          <div className='login/signout flex gap-6 justify-center items-center'>
          {/* {role !== "ngo_admin" &&
              <button 
                onClick={() => setIsModalOpen(true)} 
                className="rounded-xl p-2 text-white bg-red-500 hover:bg-red-400 "
              >
                Report an incident
              </button>
            } */}

            {loggedIn ? (
              <a href='/login' className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white" 
                 onClick={() => localStorage.removeItem("usertoken")}>
                Signout
              </a>
            ) : (
              <a href='/login' className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 text-white">
                Login
              </a>
            )}
          </div>
        </div>
      )}

      {/* Modal for IncidentForm */}
      <IncidentForm 
        isModalOpen={isModalOpen} 
        addIncident={() => {}} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default Navbar;
