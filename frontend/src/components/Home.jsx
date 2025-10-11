import React from 'react'
import Feed from './Feed'
import { Outlet } from 'react-router-dom'
import RightSidebar from './RightSidebar'
import useGetAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUsers from '@/hooks/useGetSuggestedUsers'

const Home = () => {
    useGetAllPost();
    useGetSuggestedUsers();
    return (
        <div  className='flex w-full min-h-screen justify-center'>
           
            <div className='flex-grow max-w-full sm:max-w-xl  md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto'>
                <Feed />
                <Outlet />
            </div>

            <div className='hidden lg:block sticky top-0 min-h-screen overflow-y-auto w-[35rem] xl:w-[25rem] pr-8 '>
                <RightSidebar />
            </div>
        </div>
    )
}

export default Home