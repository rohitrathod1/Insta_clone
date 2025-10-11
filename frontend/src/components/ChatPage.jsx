import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { setSelectedUser } from '@/redux/authSlice'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { MessageCircleCode, ArrowLeft } from 'lucide-react'
import Messages from './Message'
import axios from 'axios'
import { setMessages } from '@/redux/chatSlice'

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("")
  const { user, suggestedUsers, selectedUser } = useSelector(store => store.auth)
  
  const { onlineUsers = [], messages } = useSelector(store => store.chat) 
  
  const dispatch = useDispatch()

  const sendMessageHandler = async (receiverId) => {
    if (!textMessage.trim()) return
    const originalMessage = textMessage
    setTextMessage("")

    try {
      const res = await axios.post(
        `https://insta-web-page.onrender.com/api/v1/message/send/${receiverId}`,
        { textMessage: originalMessage },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )

      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]))
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null))
    }
  }, [dispatch])
  
  const handleBack = () => {
    dispatch(setSelectedUser(null));
  }

  return (
    <div className='flex w-full h-screen max-h-screen overflow-hidden bg-gray-950 text-white'>
      
      <section 
        className={`w-full md:w-1/4 my-8 border-r border-gray-800 flex-col h-[calc(100vh-4rem)] ${selectedUser ? 'hidden md:flex' : 'flex'}`}
      >
        <h1 className='font-bold mb-4 px-3 text-2xl'>{user?.username}</h1>
        <hr className='mb-4 border-gray-800' />

        <div className='overflow-y-auto flex-1'>
          {suggestedUsers?.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id)
            const isSelected = selectedUser?._id === suggestedUser?._id
            return (
              <div
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                key={suggestedUser._id}
                className={`flex gap-3 items-center p-3 cursor-pointer transition-colors 
                  ${isSelected ? 'bg-gray-800' : 'hover:bg-gray-900'}`}
              >
                <Avatar className='w-12 h-12'>
                  <AvatarImage src={suggestedUser?.profilePicture} />
                  <AvatarFallback className='bg-gray-700 text-white'>CN</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='font-medium text-white'>{suggestedUser?.username}</span>
                  <div className='flex items-center gap-1'>
                    <span
                      className={`h-2 w-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}
                    ></span>
                    <span
                      className={`text-xs font-bold ${
                        isOnline ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {isOnline ? 'Online' : 'Offline'}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}

          {suggestedUsers?.length === 0 && (
            <p className='text-center text-gray-500 mt-10 px-3'>
              No suggested users found.
            </p>
          )}
        </div>
      </section>

      <section className={`flex-1 flex-col h-full ${selectedUser ? 'flex w-full' : 'hidden md:flex'}`}>
        {selectedUser ? (
          <>
            <div className='flex gap-3 items-center px-3 py-3 border-b border-gray-800 sticky top-0 bg-gray-900 z-10'>
              <Button 
                onClick={handleBack} 
                variant="ghost" 
                size="icon" 
                className='md:hidden text-white hover:bg-gray-800 mr-2'
              >
                <ArrowLeft className='w-5 h-5' />
              </Button>
              <Avatar className='h-10 w-10'>
                <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                <AvatarFallback className='bg-gray-700 text-white'>CN</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <span className='font-semibold text-white'>{selectedUser?.username}</span>
              </div>
            </div>

            <div className='flex-1 overflow-y-auto'>
              <Messages selectedUser={selectedUser} />
            </div>

            <div className='flex items-center p-4 border-t border-gray-800 bg-gray-900'>
              <Input
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                type='text'
                placeholder='Message...'
                className='flex-1 mr-2 bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 
                              focus:ring-0 focus:outline-none focus:border-blue-500 transition-colors'
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && textMessage.trim()) {
                    sendMessageHandler(selectedUser?._id)
                  }
                }}
              />
              <Button
                onClick={() => sendMessageHandler(selectedUser?._id)}
                disabled={!textMessage.trim()}
                className='bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200'
              >
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center flex-1 text-center px-4'>
            <MessageCircleCode className='w-20 h-20 my-4 text-gray-700' />
            <h1 className='font-bold text-3xl'>Your messages</h1>
            <span className='text-gray-400 mt-2'>
              Select a user from the left panel to start a chat.
            </span>
          </div>
        )}
      </section>
    </div>
  )
}

export default ChatPage
