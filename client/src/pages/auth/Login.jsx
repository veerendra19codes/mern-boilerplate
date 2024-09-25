import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/auth/login`;
            console.log("apiUrl: ", apiUrl);
            const res = await axios({
                method: "POST",
                url: apiUrl,
                data: {
                    email,
                    password,
                }
            });

            console.log("res:", res);
            localStorage.setItem("usertoken", res.data.token);
            navigate("/");
        } catch (error) {
            console.log("error:", error);
        }
    }

    useEffect(() => {
        const checkAuth = async () => {
            if (localStorage.getItem("usertoken")) {
                navigate('/');
            }
        }
        checkAuth();
    }, [navigate]);

    return (
        <div className='w-full min-h-screen flex justify-center items-center bg-black'>
            <form className='bg-gray-800 shadow-lg p-8 rounded-lg flex flex-col justify-center items-center gap-4 w-[400px] h-[500px]' onSubmit={handleSubmit}>
                <h1 className='text-2xl font-bold text-white'>Login</h1>

                <div className="inputfield flex flex-col w-full">
                    <label className='text-white'>Email</label>

                    <input placeholder='example@gmail.com' name='email' value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none bg-transparent border-[1px] border-gray-600 rounded-lg p-2 text-white' />
                </div>

                <div className="inputfield flex flex-col w-full ">
                    <label className='text-white'>Password</label>

                    <div className='flex justify-center items-center border-[1px] border-gray-600 rounded-lg p-2'>
                        <input placeholder='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)}
                            className='bg-transparent outline-none text-white w-full'
                            type={showPassword ? "text" : "password"} />
                        {showPassword ? <FaEyeSlash className='font-bold text-xl text-white cursor-pointer'
                            onClick={() => setShowPassword(!showPassword)} /> : <IoEyeSharp className='font-bold text-xl text-white cursor-pointer' onClick={() => setShowPassword(!showPassword)} />}
                    </div>
                </div>

                <button type='submit' className='bg-blue-500 hover:bg-blue-500 rounded-lg px-4 py-2 cursor-pointer text-white w-[80%] mt-6'>
                    Login
                </button>

                <div className="w-full text-white text-center">Don&apos;t have an account? <a href='/register' className='text-blue-500 hover:text-blue-400'>Register</a></div>
            </form >
        </div >
    )
}

export default Login
