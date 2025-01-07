import React, {useEffect} from 'react'
import {Outlet} from "react-router-dom"
import { ContextAPI } from './ContextApi'

export const AuthLayout = () => {
    const {darkmode, setDarkMode} = ContextAPI()
    useEffect(() => {
            const doc = document.body
            if(darkmode){
                doc.classList.add("dark");
            }else{
                doc.classList.remove("dark")
            }
        }, [darkmode])
  return (
    <div className='w-screen h-screen bg-gray-100 dark:bg-gray-950'>
        <Outlet />
    </div>
  )
}