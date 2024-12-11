import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBar } from './Components/SideBar'

const Layout = () => {
  return (
    <div className='w-screen overflow-scroll min-h-screen'>
    <SideBar>
      <Outlet />
    </SideBar>
    </div>
  )
}

export default Layout
