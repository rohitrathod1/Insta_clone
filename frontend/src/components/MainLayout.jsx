import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidebar from './LeftSidebar'

const MainLayout = () => {
  return (
    <div className='flex min-h-screen bg-gray-950 text-white overflow-x-hidden'>
      
      <LeftSidebar/>
      
      <div className='flex-1'>
        
        <div className='w-full pb-16 lg:pl-20 xl:pl-64 2xl:pl-72'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default MainLayout