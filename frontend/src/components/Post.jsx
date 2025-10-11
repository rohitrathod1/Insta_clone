import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react'
import { Button } from './ui/button'
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from './CommentDialog'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { setPosts, setSelectedPost } from '@/redux/postSlice'
import { Badge } from './ui/badge'

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const { posts } = useSelector(store => store.post);
  const [liked, setLiked] = useState(post.likes.includes(user?._id) || false);
  const [postLike, setPostLike] = useState(post.likes.length);
  const [comment, setComment] = useState(post.comments);
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  }

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? 'dislike' : 'like';
      // NOTE: Using localhost URL. Update this if deploying to production.
      const res = await axios.get(`https://insta-web-page.onrender.com/api/v1/post/${post._id}/${action}`, { withCredentials: true });
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        const updatedPostData = posts.map(p =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter(id => id !== user._id)
                  : [...p.likes, user._id]
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const commentHandler = async () => {
    try {
      // NOTE: Using localhost URL. Update this if deploying to production.
      const res = await axios.post(
        `https://insta-web-page.onrender.com/api/v1/post/${post._id}/comment`,
        { text },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map(p =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const deletePostHandler = async () => {
    try {
      // NOTE: Using localhost URL. Update this if deploying to production.
      const res = await axios.delete(`https://insta-web-page.onrender.com/api/v1/post/delete/${post?._id}`, { withCredentials: true })
      if (res.data.success) {
        const updatedPostData = posts.filter((postItem) => postItem?._id !== post?._id);
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.messsage);
    }
  }

  const bookmarkHandler = async () => {
    try {
      // NOTE: Using localhost URL. Update this if deploying to production.
      const res = await axios.get(`https://insta-web-page.onrender.com/api/v1/post/${post?._id}/bookmark`, { withCredentials: true });
      if (res.data.success) toast.success(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='my-6 w-[95%] sm:w-[90%] md:w-[85%] lg:w-[60%] xl:w-[45%] mx-auto bg-gray-900 p-3 sm:p-5 md:p-6 rounded-xl border border-gray-800 text-white transition-all duration-300'>
      
      {/* Header */}
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <div className='flex items-center gap-3 flex-wrap'>
          <Avatar className="w-9 h-9 sm:w-10 sm:h-10">
            <AvatarImage src={post.author?.profilePicture} alt="post_image" />
            <AvatarFallback className='bg-gray-700 text-white'>CN</AvatarFallback>
          </Avatar>
          <div className='flex items-center gap-2 flex-wrap'>
            <h1 className='font-semibold text-sm sm:text-base md:text-lg'>{post.author?.username}</h1>
            {user?._id === post.author._id &&
              <Badge variant="secondary" className='bg-blue-600 text-white hover:bg-blue-700 text-xs sm:text-sm md:text-base'>
                Author
              </Badge>
            }
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className='cursor-pointer text-gray-400 hover:text-white' />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center bg-gray-800 text-white rounded-lg border-gray-700 w-[90%] sm:w-[70%] md:w-[50%] lg:w-[30%]">
            {post?.author?._id !== user?._id &&
              <Button variant='ghost' className="cursor-pointer w-fit text-blue-500 font-bold hover:bg-gray-700 hover:text-blue-400">
                Unfollow
              </Button>}
            <Button variant='ghost' className="cursor-pointer w-fit text-white hover:bg-gray-700">
              Add to favorites
            </Button>
            {user && user?._id === post?.author._id &&
              <Button onClick={deletePostHandler} variant='ghost' className="cursor-pointer w-fit text-red-500 hover:bg-gray-700 hover:text-red-400">
                Delete
              </Button>}
          </DialogContent>
        </Dialog>
      </div>

      {/* Image (Rounded corners updated for better aesthetics) */}
      <img
        className='rounded-xl my-4 w-full object-cover border border-gray-800 aspect-square sm:aspect-video md:aspect-[4/3] lg:aspect-[16/9]'
        src={post.image}
        alt="post_img"
      />

      {/* Actions */}
      <div className='flex items-center justify-between my-2 text-gray-400 text-base sm:text-lg'>
        <div className='flex items-center gap-3 sm:gap-4'>
          {liked
            ? <FaHeart onClick={likeOrDislikeHandler} size={22} className='cursor-pointer text-red-500' />
            : <FaRegHeart onClick={likeOrDislikeHandler} size={20} className='cursor-pointer hover:text-white' />}
          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className='cursor-pointer hover:text-white'
            size={20}
          />
          <Send className='cursor-pointer hover:text-white' size={20} />
        </div>
        <Bookmark onClick={bookmarkHandler} className='cursor-pointer hover:text-white' size={20} />
      </div>

      {/* Likes */}
      <span className='font-medium block mb-2 text-sm sm:text-base'>{postLike} likes</span>

      {/* Caption */}
      <p className='text-gray-200 text-sm sm:text-base break-words leading-snug sm:leading-normal'>
        <span className='font-semibold mr-2 text-white'>{post.author?.username}</span>
        {post.caption}
      </p>

      {/* Comments */}
      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className='cursor-pointer text-xs sm:text-sm md:text-base text-gray-500 hover:text-gray-400 block mt-1'
        >
          View all {comment.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />

      {/* Add Comment */}
      <div className='flex items-center justify-between mt-4 border-t border-gray-800 pt-3'>
        <input
          type="text"
          placeholder='Add a comment...'
          value={text}
          onChange={changeEventHandler}
          className='outline-none text-xs sm:text-sm md:text-base w-full bg-transparent placeholder:text-gray-600 text-white'
        />
        {text && (
          <span
            onClick={commentHandler}
            className='text-blue-500 cursor-pointer font-medium hover:text-blue-400 ml-2 text-xs sm:text-sm md:text-base'
          >
            Post
          </span>
        )}
      </div>
    </div>
  )
}

export default Post
