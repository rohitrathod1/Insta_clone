import React, { useEffect, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '@/redux/authSlice';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Input change handler
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Login logic
  const loginHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        'http://localhost:3000/api/v1/user/login',
        input,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(`Welcome ${res.data.user.fullname || res.data.user.username || ''}!`);
        setInput({ email: "", password: "" });
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center w-screen h-screen justify-center bg-gray-950">
      <form
        onSubmit={loginHandler}
        className="bg-gray-900 p-8 rounded-xl shadow-2xl flex flex-col gap-5 border border-gray-800 w-full max-w-sm"
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-3xl text-white">INSTA</h1>
          <p className="text-sm text-center text-gray-400 mt-2">
            Login to see photos & videos from your friends
          </p>
        </div>

        <div>
          <span className="font-medium text-white">Email</span>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeEventHandler}
            className="bg-gray-800 text-white border-gray-700 placeholder:text-gray-500 focus-visible:ring-blue-500 focus-visible:ring-offset-0 my-2"
          />
        </div>

        <div>
          <span className="font-medium text-white">Password</span>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeEventHandler}
            className="bg-gray-800 text-white border-gray-700 placeholder:text-gray-500 focus-visible:ring-blue-500 focus-visible:ring-offset-0 my-2"
          />
        </div>

        {loading ? (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white" disabled>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Login
          </Button>
        )}

        <span className="text-center text-gray-400">
          Don't have an account?
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-400 font-medium ml-1"
          >
            Signup
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
