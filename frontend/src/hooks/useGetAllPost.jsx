// useGetAllPost.jsx

import { setPosts } from "@/redux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector

const useGetAllPost = () => {
    const dispatch = useDispatch();
    // Get user from the persisted Redux store
    const { user } = useSelector(store => store.auth); 

    useEffect(() => {
        // FIX: Only proceed if a user object exists (i.e., user is logged in)
        if (!user) return; 

        const fetchAllPost = async () => {
            try {
                // withCredentials: true is correct for sending the HTTP-only cookie
                const res = await axios.get('https://insta-web-page.onrender.com/api/v1/post/all', { withCredentials: true });
                if (res.data.success) { 
                    dispatch(setPosts(res.data.posts));
                }
            } catch (error) {
                console.error("Error fetching all posts:", error.message);
            }
        }
        fetchAllPost();
    }, [user, dispatch]); // Dependency array includes 'user' to re-run on login/logout
};
export default useGetAllPost;