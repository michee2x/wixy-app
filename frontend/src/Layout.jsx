import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { SideBar } from './Components/SideBar'
import { ContextAPI } from './ContextApi'
const Layout = () => {
  const {loggedUser} = ContextAPI()
  console.log("this is teh error", loggedUser)

  /* if(!loggedUser){
    console.log("there is no auth user");
    return <Navigate to={"/auth"} />
  } */
  return (
    <div className='w-screen overflow-y-scroll min-h-screen'>
    <SideBar>
      <Outlet />
    </SideBar>
    </div>
  )
}

export default Layout
