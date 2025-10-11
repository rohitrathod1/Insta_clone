import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetAllMessage from '@/hooks/useGetAllMessage'
import useGetRTM from '@/hooks/useGetRTM'

const Message = ({ selectedUser }) => {
    // Custom hooks to fetch messages and real-time updates
    useGetRTM();
    useGetAllMessage();

    const { messages } = useSelector(store => store.chat);
    const { user } = useSelector(store => store.auth);

    return (
        // Chat viewport container with dark background and scrolling
        <div className='overflow-y-auto flex-1 p-4 bg-gray-950 text-white'>
            
            {/* Selected User Info */}
            <div className='flex justify-center mb-6 border-b border-gray-800 pb-4'>
                <div className='flex flex-col items-center'>
                    <Avatar className="h-20 w-20 mb-2 border-2 border-red-500/50">
                        <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                        <AvatarFallback className="bg-gray-700 text-white">
                             {selectedUser?.username?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <span className='text-xl font-bold text-white'>{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}>
                        <Button 
                            className="h-8 my-2 text-sm bg-gray-700 hover:bg-gray-600 text-white transition-colors" 
                            variant="secondary"
                        >
                            View profile
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Chat Messages */}
            <div className='flex flex-col gap-3'>
                {messages && messages.length > 0 ? (
                    messages.map((msg) => {
                        const isSender = msg.senderId === user?._id;
                        // Format the timestamp for readability
                        const timestamp = new Date(msg.createdAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                        });
                        return (
                            // Message wrapper for alignment (justify-end for sender, justify-start for receiver)
                            <div key={msg._id} className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className={`flex flex-col p-3 max-w-[90%] sm:max-w-[70%] lg:max-w-md break-words text-sm shadow-xl transition-all duration-300
                                        ${isSender
                                            // Sender's message style (Blue, rounded-br-none)
                                            ? 'bg-blue-600 text-white rounded-t-xl rounded-l-xl rounded-br-none ml-auto'
                                            // Receiver's message style (Dark Gray, rounded-tl-none)
                                            : 'bg-gray-800 text-gray-100 rounded-t-xl rounded-r-xl rounded-tl-none mr-auto border border-gray-700'
                                        }`}
                                >
                                    <div>{msg.message}</div>
                                    <span className={`text-[0.65rem] mt-1 self-end ${isSender ? 'text-blue-200' : 'text-gray-400'}`}>
                                        {timestamp}
                                    </span>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p className="text-center text-gray-500 mt-10">
                        No messages yet. Start the conversation!
                    </p>
                )}
            </div>
        </div>
    )
}

export default Message
