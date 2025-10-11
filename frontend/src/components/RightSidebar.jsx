import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SuggestedUsers from './SuggestedUsers'

const RightSidebar = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div className='w-full pt-10 px-4'>
      
      {/* User Profile Section */}
      <div className='flex items-center justify-between gap-4 mb-8'>
        <div className='flex items-center gap-3'>
          <Link to={`/profile/${user?._id}`}>
            {/* Larger Avatar for prominence */}
            <Avatar className="w-14 h-14 border-2 border-red-500/50">
              <AvatarImage src={user?.profilePicture} alt="User Profile" className="object-cover" />
              <AvatarFallback className='bg-gray-700 text-white text-lg font-bold'>
                {user?.username?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
          </Link>
          
          {/* Username and Bio */}
          <div>
            <Link to={`/profile/${user?._id}`} className='text-white font-bold text-base hover:text-red-400 transition-colors'>
              {user?.username}
            </Link>
            <span className='block text-gray-500 text-sm truncate max-w-[120px]'>
              {user?.fullName || user?.bio || 'Bio here...'}
            </span>
          </div>
        </div>
        
        {/* Switch/Action Button */}
        <button className='text-red-500 text-sm font-semibold hover:text-white transition-colors'>
          Switch
        </button>
      </div>

      {/* Suggested Users Section */}
      <SuggestedUsers />
      
    </div>
  )
}

export default RightSidebar
