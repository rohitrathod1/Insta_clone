import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { setAuthUser } from '@/redux/authSlice';

const EditProfile = () => {
    const imageRef = useRef();
    const { user } = useSelector(store => store.auth);
    const [loading, setLoading] = useState(false);
    
    // Initialize state with current user data
    const [input, setInput] = useState({
        // profilePhoto can be a URL string or a File object
        profilePhoto: user?.profilePicture, 
        bio: user?.bio || '', // Ensure bio is defined for controlled component
        gender: user?.gender || 'not-specified' // Default to 'not-specified' if null
    });
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Set the File object to the state for upload
            setInput({ ...input, profilePhoto: file });
        }
    }

    const selectChangeHandler = (value) => {
        setInput({ ...input, gender: value });
    }

    // Function to safely get the image source for preview
    const getProfileImageSrc = () => {
        if (input.profilePhoto instanceof File) {
            // If it's a new file, create an object URL for preview
            return URL.createObjectURL(input.profilePhoto);
        }
        // Otherwise, use the existing URL or null
        return input.profilePhoto; 
    };


    const editProfileHandler = async () => {
        
        // Basic validation: Prevent saving if bio is too long or empty if required
        if (input.bio && input.bio.length > 300) {
            toast.error("Bio is too long (max 300 characters).");
            return;
        }

        const formData = new FormData();
        formData.append("bio", input.bio);
        formData.append("gender", input.gender);
        
        // Only append photo if a new File object was selected
        if(input.profilePhoto instanceof File){
            formData.append("profilePhoto", input.profilePhoto);
        }
        
        try {
            setLoading(true);
            // Using a mock local API URL for robust example
            const res = await axios.post('http://localhost:3000/api/v1/user/profile/edit', formData,{
                headers:{
                    // 'Content-Type':'multipart/form-data' is usually set automatically by browser when using FormData
                },
                withCredentials:true
            });
            
            if(res.data.success){
                // Update the Redux state with the new user data
                const updatedUserData = {
                    ...user,
                    bio: res.data.user?.bio,
                    profilePicture: res.data.user?.profilePicture,
                    gender: res.data.user?.gender
                };
                dispatch(setAuthUser(updatedUserData));
                navigate(`/profile/${user?._id}`);
                toast.success(res.data.message || "Profile updated successfully!");
            }

        } catch (error) {
            console.error("Profile edit error:", error);
            // Ensure error message is extracted safely
            const errorMessage = error.response?.data?.message || "Failed to update profile. Please try again.";
            toast.error(errorMessage);
        } finally{
            setLoading(false);
        }
    }

    return (
        // Responsive Container: Max width on large screens, full width/padding on mobile
        <div className='flex max-w-2xl mx-auto px-5 md:px-0 min-h-screen text-white'>
            <section className='flex flex-col gap-6 w-full my-8'>
                
                <h1 className='font-extrabold text-3xl border-b border-gray-800 pb-4 text-blue-500'>Edit Profile</h1>
                
                {/* Profile Photo and Info Section (Card) */}
                <div className='flex items-center justify-between bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-xl shadow-gray-950/50'>
                    <div className='flex items-center gap-4'>
                        {/* Avatar displays the selected file or the current user photo */}
                        <Avatar className='h-14 w-14 border-2 border-blue-500 flex-shrink-0'>
                            <AvatarImage 
                                src={getProfileImageSrc() || `https://placehold.co/56x56/374151/ffffff?text=${user?.username?.[0] || 'U'}`} 
                                alt="profile_photo" 
                            />
                            <AvatarFallback className='bg-gray-700 text-white font-semibold text-lg'>
                                {user?.username?.[0]?.toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-lg text-white'>{user?.username}</h1>
                            <span className='text-gray-400 text-sm'>
                                {user?.fullName || user?.bio || 'Update your details below...'}
                            </span>
                        </div>
                    </div>
                    {/* Hidden file input */}
                    <input ref={imageRef} onChange={fileChangeHandler} type='file' className='hidden' accept="image/*" />
                    
                    {/* Change photo button */}
                    <Button 
                        onClick={() => imageRef?.current.click()} 
                        className='bg-blue-600 h-9 px-4 hover:bg-blue-700 text-white transition-all duration-200 text-sm font-semibold'
                    >
                        Change photo
                    </Button>
                </div>
                
                {/* Bio Textarea Section */}
                <div>
                    <label htmlFor="bio" className='font-bold text-xl mb-2 block text-gray-200'>Bio</label>
                    <Textarea 
                        id="bio"
                        value={input.bio} 
                        onChange={(e) => setInput({ ...input, bio: e.target.value })} 
                        name='bio' 
                        placeholder="Write a brief bio about yourself..."
                        maxLength={300}
                        // Enhanced dark theme styling for Textarea
                        className="w-full bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:ring-0 focus:border-blue-500 focus:ring-opacity-50 transition-colors duration-200 resize-none outline-none h-24" 
                    />
                    <p className='text-right text-xs text-gray-500 mt-1'>{input.bio.length} / 300</p>
                </div>
                
                {/* Gender Select Section */}
                <div>
                    <label htmlFor="gender" className='font-bold text-xl mb-2 block text-gray-200'>Gender</label>
                    <Select defaultValue={input.gender} onValueChange={selectChangeHandler}>
                        {/* Select Trigger styling for dark theme */}
                        <SelectTrigger className="w-full bg-gray-800 border border-gray-700 text-white focus:ring-0 focus:border-blue-500 transition-colors duration-200 outline-none">
                            <SelectValue placeholder="Select your gender" />
                        </SelectTrigger>
                        {/* Select Content styling for dark theme */}
                        <SelectContent className='bg-gray-800 border border-gray-700 text-white shadow-xl shadow-gray-950/50'>
                            <SelectGroup>
                                {/* Added 'other' and 'not-specified' options for completeness */}
                                <SelectItem value="male" className='text-white hover:bg-gray-700 focus:bg-gray-700 cursor-pointer'>Male</SelectItem>
                                <SelectItem value="female" className='text-white hover:bg-gray-700 focus:bg-gray-700 cursor-pointer'>Female</SelectItem>
                                <SelectItem value="other" className='text-white hover:bg-gray-700 focus:bg-gray-700 cursor-pointer'>Other</SelectItem>
                                <SelectItem value="not-specified" className='text-gray-400 hover:bg-gray-700 focus:bg-gray-700 cursor-pointer'>Prefer not to say</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                
                {/* Submit Button */}
                <div className='flex justify-end pt-4 border-t border-gray-800'>
                    {
                        loading ? (
                            <Button 
                                className='w-full md:w-32 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200' 
                                disabled
                            >
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button 
                                onClick={editProfileHandler} 
                                className='w-full md:w-32 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200'
                                disabled={!input.bio.trim() && !input.profilePhoto && !input.gender} // Optional: Disable if nothing changed (or just keep it simple)
                            >
                                Submit
                            </Button>
                        )
                    }
                </div>
            </section>
        </div>
    )
}

export default EditProfile
