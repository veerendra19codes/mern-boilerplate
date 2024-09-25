import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            if (!localStorage.getItem("usertoken")) {
                navigate('/login');
            }
        }
        checkAuth();
    }, [navigate]);

    return (
        <div>
            Home
        </div>
    )
}

export default Home
