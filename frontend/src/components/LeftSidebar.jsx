import { Heart, Home, LogOut, MessageCircle, PlusSquare, Search, TrendingUp } from 'lucide-react'
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { toast } from 'sonner'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAuthUser } from '@/redux/authSlice'
import CreatePost from './CreatePost'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'

const LeftSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    // Assuming likeNotification is an array of notification objects
    const { likeNotification } = useSelector(store => store.realTimeNotification); 
    const [open, setOpen] = useState(false);

    /**
     * Handles the user logout process.
     */
    const logoutHandler = async () => {
        try {
            // Using error handling for optional chaining for safety
            const res = await axios.get('https://insta-web-page.onrender.com/api/v1/user/logout', { withCredentials: true }); 
            if (res.data.success) {
                dispatch(setAuthUser(null));
                dispatch(setSelectedPost(null));
                dispatch(setPosts([]));
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    /**
     * Handles navigation or state changes based on the sidebar item clicked.
     */
    const sidebarHandler = (textType) => {
        if (textType === 'Logout') logoutHandler();
        else if (textType === "Create") setOpen(true);
        else if (textType === "Profile") navigate(`/profile/${user?._id}`);
        else if (textType === "Home") navigate("/");
        else if (textType === 'Messages') navigate("/chat");
        else if (textType === 'Search') navigate("/search"); 
        else if (textType === 'Explore') navigate("/explore"); 
    };

    // Define the list of sidebar navigation items
    const sidebarItems = [
        { icon: <Home />, text: "Home" },
        { icon: <Search />, text: "Search" },
        { icon: <TrendingUp />, text: "Explore" },
        { icon: <MessageCircle />, text: "Messages" },
        { icon: <Heart />, text: "Notifications" },
        { icon: <PlusSquare />, text: "Create" },
        {
            icon: (
                <Avatar className='w-6 h-6'>
                    <AvatarImage src={user?.profilePicture} alt="@user" />
                    <AvatarFallback className='bg-gray-700 text-white text-sm'>
                        {user?.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                </Avatar>
            ),
            text: "Profile"
        },
        { icon: <LogOut />, text: "Logout" },
    ];

    return (
        <>
            {/* DESKTOP SIDEBAR (Hidden on screens smaller than large 'lg') */}
            <div className='hidden lg:flex flex-col fixed top-0 left-0 z-50 h-screen border-r border-gray-800 bg-gray-900 shadow-xl text-white 
                             lg:w-20 xl:w-64 2xl:w-72 p-4 lg:pl-4 xl:pl-8 overflow-y-auto transition-all duration-300'>
                <div className='flex flex-col'>
                    {/* Logo/App Title */}
                    <h1
                        className='mt-6 mb-8 pl-1 lg:pl-0 xl:pl-3 font-extrabold text-3xl cursor-pointer lg:text-center xl:text-left text-white 
                                 transition-colors duration-300 hover:text-red-500'
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        onClick={() => navigate("/")}
                    >
                        {/* Show full name on XL screens, icon-like character on LG screens */}
                        <span className='lg:hidden xl:inline'>INSTA</span>
                        <span className='xl:hidden'>I</span>
                    </h1>

                    {/* Navigation Items */}
                    <div className='flex flex-col gap-1'>
                        {sidebarItems.map((item, index) => {
                            // Ensure the icon has standard size classes
                            const itemIcon = React.cloneElement(item.icon, { className: 'w-6 h-6' });
                            return (
                                <div
                                    onClick={() => sidebarHandler(item.text)}
                                    key={index}
                                    className='group flex items-center lg:justify-center xl:justify-start gap-4 relative 
                                             transition-all duration-200 cursor-pointer p-3.5 my-0.5 rounded-xl 
                                             hover:bg-gray-800 hover:text-white hover:ring-1 hover:ring-red-500/20'
                                >
                                    {/* Icon with hover effect */}
                                    <span className='group-hover:text-red-400 transition-colors'>{itemIcon}</span>
                                    {/* Text, hidden on narrow desktop (lg) and visible on wider desktop (xl) */}
                                    <span className={`text-lg font-medium lg:hidden xl:inline`}>
                                        {item.text}
                                    </span>

                                    {/* Notification Badge and Popover for Likes */}
                                    {item.text === "Notifications" && likeNotification.length > 0 && (
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    size="icon"
                                                    className="rounded-full h-5 w-5 absolute top-2 right-2 lg:left-3 xl:left-10 text-xs font-bold 
                                                             bg-red-600 text-white border-2 border-gray-900 hover:bg-red-700 shadow-md p-1"
                                                >
                                                    {/* FIX: Removed extra ternary condition, which caused the 'Unexpected token' error */}
                                                    {likeNotification.length > 9 ? '9+' : likeNotification.length}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent 
                                                className='w-80 bg-gray-950 text-white border-red-500/50 border rounded-xl shadow-2xl p-4'
                                                side='right' // Position popover content to the right
                                            >
                                                <h3 className='text-lg font-bold mb-3 text-red-400'>New Likes</h3>
                                                <div className='max-h-60 overflow-y-auto'>
                                                    {likeNotification.map((n) => (
                                                        <div key={n.userId} className='flex items-center gap-2 my-2 cursor-pointer p-2 rounded-lg hover:bg-gray-800 transition-colors'>
                                                            <Avatar className="w-8 h-8">
                                                                <AvatarImage src={n.userDetails?.profilePicture} />
                                                                <AvatarFallback className='bg-gray-700 text-xs text-white'>CN</AvatarFallback>
                                                            </Avatar>
                                                            <p className='text-sm text-gray-200'>
                                                                <span className='font-bold text-red-400'>{n.userDetails?.username}</span> liked your post
                                                            </p>
                                                        </div>
                                                    ))}
                                                    {likeNotification.length === 0 && <p className='text-gray-400'>No new notifications</p>}
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* MOBILE BOTTOM NAV (Visible on screens smaller than large 'lg') */}
            <div className='lg:hidden fixed bottom-0 left-0 w-full z-50 border-t border-gray-800 bg-gray-950 text-white shadow-[0_-4px_15px_rgba(0,0,0,0.7)]'>
                <div className='flex justify-around items-center h-16 px-2'>
                    {/* Only show the first 6 items for a clean mobile nav */}
                    {sidebarItems.slice(0, 6).map((item, index) => {
                        const itemIcon = React.cloneElement(item.icon, { className: 'w-6 h-6' });
                        return (
                            <div
                                onClick={() => sidebarHandler(item.text)}
                                key={index}
                                className='flex flex-col items-center justify-center p-3 rounded-xl text-white cursor-pointer 
                                         transition-colors hover:bg-gray-800/70 hover:text-red-400 relative'
                            >
                                <span>{itemIcon}</span>
                                {item.text === "Notifications" && likeNotification.length > 0 && (
                                    <Button
                                        className="rounded-full h-4 w-4 absolute top-1 right-0 text-[0.6rem] font-bold 
                                                 bg-red-600 text-white border-2 border-gray-950 hover:bg-red-700 shadow-sm p-1"
                                    >
                                        {/* FIX: Removed extra ternary condition */}
                                        {likeNotification.length > 9 ? '9+' : likeNotification.length}
                                    </Button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modal for creating a new post */}
            <CreatePost open={open} setOpen={setOpen} />
        </>
    );
};

export default LeftSidebar;
