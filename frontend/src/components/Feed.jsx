import React from 'react'
import Posts from './Posts'

const Feed = () => {
    return (
        <div 
            className='flex-1 my-1 flex flex-col items-center min-h-screen pt-4 pb-1' 
        >
            <div className="w-full max-w-4xl px-2 md:px-0">
                {/* Posts component displays the actual feed items */}
                <Posts/>
            </div>
        </div>
    )
}

export default Feed
