import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Link } from 'react-router-dom';

const Comment = ({ comment }) => {
    // Safety check for comment data
    if (!comment || !comment.author) {
        return null;
    }

    const { author, text } = comment;

    // Determine the fallback initials for the avatar
    const fallbackInitials = author.username ? author.username.slice(0, 2).toUpperCase() : 'CN';

    return (
        // Comment Container: Adds vertical spacing
        <div className='my-3'>
            <div className='flex gap-3 items-start'>
                
                {/* 1. Avatar with Link */}
                <Link to={`/profile/${author._id}`} className='flex-shrink-0'>
                    <Avatar className='h-8 w-8'>
                        <AvatarImage src={author.profilePicture} alt={`${author.username}'s profile`} />
                        
                        {/* Avatar Fallback: Optimized dark mode styling */}
                        <AvatarFallback className='bg-gray-700 text-white text-xs'>
                            {fallbackInitials}
                        </AvatarFallback>
                    </Avatar>
                </Link>
                
                {/* 2. Comment Content */}
                <div className='text-sm mt-1 flex flex-wrap items-start'>
                    
                    {/* Username with Link and bold styling */}
                    <Link 
                        to={`/profile/${author._id}`} 
                        className='font-bold text-white hover:text-gray-300 transition-colors mr-1'
                    >
                        {author.username}
                    </Link>
                    
                    {/* Comment Text: Normal weight, slightly muted color, uses flex-wrap for long comments */}
                    <span className='font-normal text-gray-300 break-words'>
                        {text}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Comment;