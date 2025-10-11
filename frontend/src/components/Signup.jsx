import React, { useEffect, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Signup = () => {
    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store=>store.auth);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const signupHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('https://insta-web-page.onrender.com/api/v1/user/register', input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
                setInput({
                    username: "",
                    email: "",
                    password: ""
                });
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[user, navigate])

    return (
        // Main screen container: Dark background, prevent text selection
        <div className="flex items-center justify-center w-screen h-screen bg-gray-950 select-none">
            {/* Form Card: Dark gray background, rounded corners, border, cursor-default */}
            <form 
                onSubmit={signupHandler} 
                className="flex flex-col gap-5 p-8 shadow-2xl rounded-xl bg-gray-900 border border-gray-800 w-full max-w-sm cursor-default" 
            >
                <div className="my-4">
                    {/* Title: Bright white text */}
                    <h1 className="text-center font-bold text-3xl text-white">LOGO</h1>
                    {/* Subtext: Muted gray text */}
                    <p className="text-sm text-center text-gray-400 mt-2">Signup to see photos & videos from your friends</p>
                </div>

                {/* Username Input */}
                <div>
                    {/* Label: Bright white text */}
                    <span className="font-medium text-white">Username</span>
                    <Input
                        type="text"
                        name="username"
                        value={input.username}
                        onChange={changeEventHandler}
                        // Input Field: Darker background, white text, subtle border, blue focus ring
                        className="bg-gray-800 text-white border-gray-700 placeholder:text-gray-500 focus-visible:ring-blue-500 focus-visible:ring-offset-0 my-2"
                    />
                </div>

                {/* Email Input */}
                <div>
                    {/* Label: Bright white text */}
                    <span className="font-medium text-white">Email</span>
                    <Input
                        type="email"
                        name="email"
                        value={input.email}
                        onChange={changeEventHandler}
                        // Input Field: Darker background, white text, subtle border, blue focus ring
                        className="bg-gray-800 text-white border-gray-700 placeholder:text-gray-500 focus-visible:ring-blue-500 focus-visible:ring-offset-0 my-2"
                    />
                </div>

                {/* Password Input */}
                <div>
                    {/* Label: Bright white text */}
                    <span className="font-medium text-white">Password</span>
                    <Input
                        type="password"
                        name="password"
                        value={input.password}
                        onChange={changeEventHandler}
                        // Input Field: Darker background, white text, subtle border, blue focus ring
                        className="bg-gray-800 text-white border-gray-700 placeholder:text-gray-500 focus-visible:ring-blue-500 focus-visible:ring-offset-0 my-2"
                    />
                </div>

                {/* Submit Button */}
                {
                    loading ? (
                        // Button: Primary accent color (bg-blue-600)
                        <Button className='bg-blue-600 hover:bg-blue-700 text-white' disabled>
                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                            Please wait
                        </Button>
                    ) : (
                        // Button: Primary accent color (bg-blue-600)
                        <Button type='submit' className='bg-blue-600 hover:bg-blue-700 text-white'>Signup</Button>
                    )
                }
                
                {/* Link to Login: Main text is muted gray, Link is blue accent */}
                <span className='text-center text-gray-400'>
                    Already have an account? 
                    <Link to="/login" className='text-blue-500 hover:text-blue-400 font-medium ml-1'>
                        Login
                    </Link>
                </span>
            </form>
        </div>
    )
}

export default Signup