import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const SuggestedUsers = () => {
    const { suggestedUsers } = useSelector(store => store.auth);
    return (
        // Apply card background, padding, and rounded corners for the dark theme look
        <div className='my-2 p-4 rounded-lg bg-gray-900 border border-gray-800'>
            <div className='flex items-center justify-between text-sm'>
                {/* Heading color changed to a muted light gray */}
                <h1 className='font-semibold text-gray-400'>Suggested for you</h1>
                {/* Action color changed to the primary blue accent */}
                <span className='font-medium cursor-pointer text-blue-500 hover:text-blue-400'>See All</span>
            </div>
            {
                suggestedUsers.map((user) => {
                    return (
                        // Added hover effect for a slick dark UI feel
                        <div key={user._id} className='flex items-center justify-between my-5 p-1 rounded-md transition-colors hover:bg-gray-800'>
                            <div className='flex items-center gap-2'>
                                <Link to={`/profile/${user?._id}`}>
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture} alt="post_image" />
                                        {/* Fallback background adjusted for the dark theme */}
                                        <AvatarFallback className='bg-gray-700 text-white'>CN</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    {/* Username text changed to bright white */}
                                    <h1 className='font-semibold text-sm text-white'><Link to={`/profile/${user?._id}`}>{user?.username}</Link></h1>
                                    {/* Bio text changed to a muted gray */}
                                    <span className='text-gray-500 text-sm'>{user?.bio || 'Bio here...'}</span>
                                </div>
                            </div>
                            {/* Follow text color changed to the primary blue accent */}
                            <span className='text-blue-500 text-xs font-bold cursor-pointer hover:text-blue-400'>Follow</span>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default SuggestedUsers