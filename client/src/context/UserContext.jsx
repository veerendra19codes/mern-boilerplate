import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create a context
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("usertoken");
      console.log("token:", token);
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/verify/user`;
        const response = await axios.post(apiUrl, { token });
        setUser(response.data.user);
        console.log("response: ", response);
      } catch (error) {
        console.error("Error verifying user:", error);
        localStorage.removeItem("userToken");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = () => {
  return useContext(UserContext);
};
