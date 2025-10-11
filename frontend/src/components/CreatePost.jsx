import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { readFileAsDataURL } from '@/lib/utils'; // Assuming this utility is available
import { Loader2, X } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '@/redux/postSlice';

const CreatePost = ({ open, setOpen }) => {
    const imageRef = useRef();
    const [file, setFile] = useState("");
    const [caption, setCaption] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
    
    // Redux State
    const { user } = useSelector(store => store.auth);
    const { posts } = useSelector(store => store.post);
    const dispatch = useDispatch();

    // Reset state when modal is closed (logic taken from second code)
    useEffect(() => {
        if (!open) {
            setCaption("");
            setImagePreview("");
            setFile("");
            // Reset the file input value as well, if needed
            if (imageRef.current) {
                imageRef.current.value = "";
            }
        }
    }, [open]);

    const fileChangeHandler = async (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            // Client-side File Validation (from second code)
            if (!selectedFile.type.startsWith('image/')) {
                toast.error("Please select a valid image file.");
                return;
            }
            if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
                toast.error("Image size must be less than 5MB.");
                return;
            }
            
            setFile(selectedFile);
            const dataUrl = await readFileAsDataURL(selectedFile);
            setImagePreview(dataUrl);
        }
    }

    const createPostHandler = async (e) => {
        e.preventDefault();
        
        // Basic Post Validation (from second code logic)
        if (!imagePreview && !caption.trim()) {
            toast.error("Post must contain a caption or an image.");
            return;
        }

        const formData = new FormData();
        formData.append("caption", caption);
        // Use the 'file' state which holds the File object
        if (file) formData.append("image", file); 

        try {
            setLoading(true);
            // Use a local/dynamic URL (better for development than the hardcoded render URL)
            const BASE_URL = 'http://localhost:3000/api/v1/post/addpost'; 
            
            const res = await axios.post(BASE_URL, formData, {
                // 'Content-Type': 'multipart/form-data' is typically set automatically by the browser with FormData
                withCredentials: true 
            });

            if (res.data.success) {
                // Update Redux posts state by prepending the new post (logic from first code)
                dispatch(setPosts([res.data.post, ...posts]));
                toast.success(res.data.message || "Post created successfully!");
                setOpen(false); // Close modal on success
            }
        } catch (error) {
            console.error("Post creation error:", error);
            const errorMessage = error.response?.data?.message || "Failed to create post. Server error.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const handleClose = () => {
        setOpen(false);
    }
    
    // Determine fallback initials
    const fallbackInitial = user?.username?.[0]?.toUpperCase() || 'U';

    return (
        <Dialog open={open}>
            <DialogContent 
                onInteractOutside={handleClose} 
                // ✅ DESIGN: Dark theme styling for the DialogContent
                className="bg-gray-900 border border-gray-700 text-white shadow-2xl shadow-gray-950/50 w-[95%] sm:max-w-xl"
            >
                {/* Close Button (From second code structure, assuming DialogContent supports it or Dialog is a mock) */}
                <button 
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 rounded-full hover:bg-gray-700 z-10"
                >
                    <X className='w-5 h-5'/>
                </button>

                {/* Header */}
                <DialogHeader className='text-center font-extrabold text-xl border-b border-gray-800 pb-3 text-white'>
                    Create New Post
                </DialogHeader>
                
                {/* Use a form for easy submission handling */}
                <form onSubmit={createPostHandler}>
                    
                    {/* User Info */}
                    <div className='flex gap-3 items-center mb-4'>
                        <Avatar className='h-10 w-10 border-2 border-gray-700 flex-shrink-0'>
                            <AvatarImage src={user?.profilePicture} alt="User Profile" />
                            <AvatarFallback className='bg-gray-700 text-white font-bold'>
                                {fallbackInitial}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className='font-bold text-base text-white'>{user?.username}</h1>
                            <span className='text-gray-500 text-xs'>Ready to share...</span>
                        </div>
                    </div>

                    {/* Caption Textarea (Dark Theme Styling) */}
                    <Textarea 
                        value={caption} 
                        onChange={(e) => setCaption(e.target.value)} 
                        placeholder="Write a captivating caption..."
                        className="h-28 mb-4 resize-none bg-gray-900 focus:bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 transition-colors"
                        maxLength={500}
                    />
                    
                    {/* Image Preview */}
                    {
                        imagePreview && (
                            <div className='w-full h-72 mb-4 flex items-center justify-center bg-gray-800 border-2 border-dashed border-gray-700 rounded-xl overflow-hidden'>
                                <img src={imagePreview} alt="Preview" className='object-cover h-full w-full' />
                            </div>
                        )
                    }

                    <input ref={imageRef} type='file' className='hidden' onChange={fileChangeHandler} accept="image/*" />
                    
                    {/* Action Buttons Container */}
                    <div className='flex flex-col gap-3 mt-4'>
                        
                        {/* Select Image Button */}
                        <Button 
                            onClick={() => imageRef.current.click()} 
                            type="button"
                            // ✅ DESIGN: Secondary button style for selection
                            className='w-full bg-gray-700 hover:bg-gray-600 text-white'
                        >
                            {imagePreview ? 'Change Photo' : 'Select Photo from Computer'}
                        </Button>
                        
                        {/* Post/Loading Button */}
                        <Button 
                            type="submit" 
                            disabled={loading || (!imagePreview && !caption.trim())} // Disable if loading or empty post
                            // ✅ DESIGN: Primary button style
                            className="w-full"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Posting...
                                </>
                            ) : (
                                'Share Post'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreatePost;