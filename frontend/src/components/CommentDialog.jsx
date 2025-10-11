import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';
import { MoreHorizontal } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import Comment from './Comment';
import axios from 'axios';
import { toast } from 'sonner';
import { setPosts, setSelectedPost } from '@/redux/postSlice'; // ✅ ensure this action exists in postSlice.js

const CommentDialog = ({ open, setOpen }) => {
    const [text, setText] = useState("");
    const { selectedPost, posts } = useSelector(store => store.post);
    const [comment, setComment] = useState([]);
    const dispatch = useDispatch();

    const BASE_URL = 'https://insta-web-page.onrender.com/api/v1/post';

    // Load comments from selectedPost
    useEffect(() => {
        if (selectedPost) {
            setComment(selectedPost.comments || []);
        }
    }, [selectedPost]);

    // Handle input change
    const changeEventHandler = (e) => {
        setText(e.target.value);
    };

    // Send comment
    const sendMessageHandler = async () => {
        const trimmedText = text.trim();
        if (!trimmedText) return;

        setText(""); // clear input immediately

        try {
            const res = await axios.post(
                `${BASE_URL}/${selectedPost?._id}/comment`,
                { text: trimmedText },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );

            if (res.data.success) {
                const newComment = res.data.comment;
                const updatedCommentData = [...comment, newComment];
                setComment(updatedCommentData);

                // ✅ Update both posts array and selectedPost in Redux
                const updatedPostData = posts.map(p =>
                    p._id === selectedPost._id ? { ...p, comments: updatedCommentData } : p
                );

                dispatch(setPosts(updatedPostData));
                dispatch(setSelectedPost({ ...selectedPost, comments: updatedCommentData }));

                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Error posting comment:", error);
            toast.error(error.response?.data?.message || "Failed to post comment.");
        }
    };

    // Avatar fallback initials
    const fallbackInitials = selectedPost?.author?.username?.slice(0, 2).toUpperCase() || 'CN';

    return (
        <Dialog open={open}>
            <DialogContent
                onInteractOutside={() => setOpen(false)}
                className="p-0 flex flex-col h-auto max-h-[80vh]
                           sm:max-w-xl md:max-w-2xl lg:max-w-3xl md:h-[500px] md:w-auto
                           bg-gray-900 border border-gray-700 text-white shadow-2xl shadow-gray-950/50"
            >
                <div className='flex flex-1 flex-col md:flex-row w-full'>

                    {/* Left Side - Post Image */}
                    <div className='hidden md:w-1/2 md:flex-shrink-0 md:h-full md:block overflow-hidden border-b md:border-b-0 md:border-r border-gray-800 bg-black md:flex items-center justify-center'>
                        <img
                            src={selectedPost?.image}
                            alt="post_img"
                            className='w-full h-full object-contain'
                        />
                    </div>

                    {/* Right Side - Comments Section */}
                    <div className='w-full md:w-1/2 flex flex-col justify-between'>

                        {/* Header Section */}
                        <div className='flex items-center justify-between p-4 border-b border-gray-800 flex-shrink-0'>
                            <div className='flex gap-3 items-center'>
                                <Link to={`/profile/${selectedPost?.author?._id}`}>
                                    <Avatar className='h-9 w-9'>
                                        <AvatarImage src={selectedPost?.author?.profilePicture} />
                                        <AvatarFallback className='bg-gray-700 text-white'>{fallbackInitials}</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link
                                        to={`/profile/${selectedPost?.author?._id}`}
                                        className='font-semibold text-sm hover:text-gray-300 transition-colors'
                                    >
                                        {selectedPost?.author?.username}
                                    </Link>
                                </div>
                            </div>

                            {/* Options Button */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer text-gray-400 hover:text-white transition-colors' />
                                </DialogTrigger>
                                <DialogContent className="flex flex-col items-center text-sm text-center bg-gray-900 border border-gray-700 text-white">
                                    <div className='cursor-pointer w-full text-red-500 font-bold p-2 hover:bg-gray-800 rounded'>
                                        Unfollow
                                    </div>
                                    <div className='cursor-pointer w-full p-2 hover:bg-gray-800 rounded'>
                                        Add to favorites
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>

                        {/* Comments List */}
                        <div className='overflow-y-auto p-4 space-y-4 max-h-[40vh] md:flex-1 scrollbar-hide'>
                            {/* Post Caption */}
                            {selectedPost?.caption && (
                                <div className="text-sm pb-2 border-b border-gray-800 mb-4">
                                    <Link
                                        to={`/profile/${selectedPost?.author?._id}`}
                                        className='font-semibold mr-2 hover:text-gray-300 transition-colors'
                                    >
                                        {selectedPost?.author?.username}:
                                    </Link>
                                    <span className='text-gray-300'>{selectedPost.caption}</span>
                                </div>
                            )}

                            {/* Actual Comments */}
                            {comment.map((c) => (
                                <Comment key={c._id} comment={c} />
                            ))}

                            {/* No Comments */}
                            {comment.length === 0 && !selectedPost?.caption && (
                                <p className="text-center text-gray-500 mt-10">Be the first to comment!</p>
                            )}
                        </div>

                        {/* Comment Input Area */}
                        <div className='p-4 border-t border-gray-800 flex-shrink-0'>
                            <div className='flex items-center gap-2'>
                                <input
                                    type="text"
                                    value={text}
                                    onChange={changeEventHandler}
                                    placeholder='Add a comment...'
                                    className='w-full outline-none text-sm p-2 rounded bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500 transition-colors'
                                />
                                <Button
                                    disabled={!text.trim()}
                                    onClick={sendMessageHandler}
                                    className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-all duration-200"
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CommentDialog;
