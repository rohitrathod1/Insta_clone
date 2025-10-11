import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import useGetUserProfile from '@/hooks/useGetUserProfile';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AtSign, Heart, MessageCircle } from 'lucide-react';

const Profile = () => {
  const params = useParams();
  const userId = params.id;
  useGetUserProfile(userId);
  const [activeTab, setActiveTab] = useState('posts');

  const { userProfile, user } = useSelector(store => store.auth);

  const isLoggedInUserProfile = user?._id === userProfile?._id;
  const isFollowing = false;

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  }

  const displayedPost = activeTab === 'posts' ? userProfile?.posts : userProfile?.bookmarks;

  return (
    // Set general text color to light gray for dark background
    <div className='flex justify-center mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
      <div className='flex flex-col gap-8 py-6 w-full text-gray-100'> 
        {/* Profile Info Section: Grid adjusted for responsiveness and smaller size */}
        {/* Softened the bottom border for dark mode */}
        <div className='grid grid-cols-3 gap-4 sm:gap-10 items-start'>
          
          {/* Profile Picture (Reduced Size & Centered) */}
          <section className='col-span-1 flex items-start justify-center pt-2'>
            {/* White border kept for contrast with dark background */}
            <Avatar className='h-24 w-24 sm:h-28 sm:w-28 md:h-36 md:w-36 border-4 border-white shadow-md'>
              <AvatarImage src={userProfile?.profilePicture} alt="profilephoto" />
              <AvatarFallback className='text-lg sm:text-xl'>CN</AvatarFallback>
            </Avatar>
          </section>

          {/* User Details and Buttons */}
          <section className='col-span-2 mt-2'>
            <div className='flex flex-col gap-2 sm:gap-4'>
              
              {/* Username and Action Buttons */}
              <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
                <span className='text-lg sm:text-xl font-normal'>{userProfile?.username}</span>
                {
                  isLoggedInUserProfile ? (
                    <>
                      <Link to="/account/edit">
                        {/* Dark mode button styling for secondary variant */}
                        <Button variant='secondary' className='h-7 px-2 text-xs font-semibold border border-gray-700 bg-gray-900 text-gray-100 shadow-sm hover:shadow-md hover:bg-gray-700 transition duration-200 ease-in-out'>Edit profile</Button>
                      </Link>
                      <Button variant='secondary' className='h-7 px-2 text-xs font-semibold border border-gray-700 bg-gray-900 text-gray-100 shadow-sm hover:shadow-md hover:bg-gray-700 transition duration-200 ease-in-out hidden sm:inline-flex'>View archive</Button>
                      <Button variant='secondary' className='h-7 px-2 text-xs font-semibold border border-gray-700 bg-gray-900 text-gray-100 shadow-sm hover:shadow-md hover:bg-gray-700 transition duration-200 ease-in-out hidden sm:inline-flex'>Ad tools</Button>
                    </>
                  ) : (
                    isFollowing ? (
                      <>
                        {/* Dark mode button styling for secondary variant, adjusted hover */}
                        <Button variant='secondary' className='h-7 px-2 text-xs font-semibold border border-gray-700 bg-gray-900 text-gray-100 shadow-sm hover:shadow-md hover:bg-red-900 hover:text-red-400 transition duration-200 ease-in-out'>Unfollow</Button>
                        <Button variant='secondary' className='h-7 px-2 text-xs font-semibold border border-gray-700 bg-gray-900 text-gray-100 shadow-sm hover:shadow-md hover:bg-gray-700 transition duration-200 ease-in-out'>Message</Button>
                      </>
                    ) : (
                      <Button className='bg-[#0095F6] text-white hover:bg-[#3192d2] h-7 px-3 text-xs font-semibold transition duration-200 ease-in-out shadow-md hover:shadow-xl'>Follow</Button>
                    )
                  )
                }
              </div>

              {/* Stats: Posts, Followers, Following (Visible on desktop/tablet) */}
              <div className='hidden sm:flex items-center gap-6 text-sm'>
                <p><span className='font-bold'>{userProfile?.posts.length} </span>posts</p>
                <p><span className='font-bold'>{userProfile?.followers.length} </span>followers</p>
                <p><span className='font-bold'>{userProfile?.following.length} </span>following</p>
              </div>

              {/* Bio and Badge (Reduced font size) */}
              <div className='flex flex-col gap-1'>
                <span className='font-semibold text-sm'>{userProfile?.bio || 'Bio here...'}</span>
                {/* Dark mode badge styling */}
                <Badge className='w-fit bg-gray-800 text-gray-300 hover:bg-gray-700 transition duration-150 h-5 px-2 py-0'><AtSign className='w-3 h-3' /> <span className='pl-1 text-[10px]'>{userProfile?.username}</span> </Badge>
              </div>
            </div>
          </section>
        </div>

        {/* Stats on Mobile (Visible on small screens) */}
        {/* Softened the bottom border and text color for dark mode */}
        <div className='flex sm:hidden items-center justify-around border-b border-gray-800 py-3'>
            <div className='flex flex-col items-center'>
                <span className='font-bold text-sm'>{userProfile?.posts.length}</span>
                <span className='text-xs text-gray-400'>posts</span>
            </div>
            <div className='flex flex-col items-center'>
                <span className='font-bold text-sm'>{userProfile?.followers.length}</span>
                <span className='text-xs text-gray-400'>followers</span>
            </div>
            <div className='flex flex-col items-center'>
                <span className='font-bold text-sm'>{userProfile?.following.length}</span>
                <span className='text-xs text-gray-400'>following</span>
            </div>
        </div>

        {/* Tabs and Posts Section */}
        <div>
          {/* Softened top border and adjusted tab colors for dark mode */}
          <div className='flex items-center justify-center gap-6 sm:gap-10 text-[10px] sm:text-xs font-semibold tracking-widest uppercase border-t border-gray-800'>
            
            {/* Tab: POSTS (Active state uses border-b-2) */}
            <span
              className={`py-3 cursor-pointer text-gray-400 transition-colors duration-200 
                ${activeTab === 'posts'
                  ? 'text-white border-b-2 border-b-white font-extrabold -mb-[1px]' // Active tab: bottom border is white
                  : 'hover:text-gray-200' // Inactive tab hover is light gray
                }`}
              onClick={() => handleTabChange('posts')}
            >
              POSTS
            </span>

            {/* Tab: SAVED (Active state uses border-b-2, only for logged-in user) */}
            {isLoggedInUserProfile && (
              <span
                className={`py-3 cursor-pointer text-gray-400 transition-colors duration-200 
                  ${activeTab === 'saved'
                    ? 'text-white border-b-2 border-b-white font-extrabold -mb-[1px]' // Active tab: bottom border is white
                    : 'hover:text-gray-200'
                  }`}
                onClick={() => handleTabChange('saved')}
              >
                SAVED
              </span>
            )}

            {/* Other Tabs (Styling only) */}
            <span className='py-3 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors duration-200'>REELS</span>
            <span className='py-3 cursor-pointer text-gray-400 hover:text-gray-200 transition-colors duration-200'>TAGS</span>
          </div>

          {/* Posts Grid */}
          <div className='grid grid-cols-3 gap-1 md:gap-4 mt-1'>
            {
              displayedPost?.map((post) => {
                return (
                  <div key={post?._id} className='relative group cursor-pointer aspect-square overflow-hidden'>
                    {/* Image scaling on hover */}
                    <img src={post.image} alt='postimage' className='w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300' />
                    
                    {/* Hover Effect: Darker overlay and white text stats (already good) */}
                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      <div className='flex items-center text-white space-x-4 sm:space-x-8 text-sm sm:text-base'>
                        <button className='flex items-center gap-1 font-semibold hover:text-red-300 transition-colors duration-150'>
                          <Heart className='w-4 h-4 sm:w-5 sm:h-5' />
                          <span>{post?.likes.length}</span>
                        </button>
                        <button className='flex items-center gap-1 font-semibold hover:text-red-300 transition-colors duration-150'>
                          <MessageCircle className='w-4 h-4 sm:w-5 sm:h-5' />
                          <span>{post?.comments.length}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
