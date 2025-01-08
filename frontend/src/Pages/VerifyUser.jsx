import React, {useEffect, useState} from 'react'
import {Link, Navigate, useLocation} from "react-router-dom"
import { ContextAPI } from '../ContextApi'

const VerifyUser = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const token = query.get("token")
    const {darkmode, setDarkMode, APIOrigin} = ContextAPI()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(true)
    const [verified, setVerified] = useState(false)
    const [navigate, setNavigate] = useState(false)

    
    useEffect(() => {
        const doc = document.body
        if(darkmode){
            doc.classList.add("dark");
        }else{
            doc.classList.remove("dark")
        }
    }, [darkmode])

    useEffect(() => {
        const verify = async () => {
        setLoading(true)
        try{
            const res = await fetch(`${APIOrigin}/api/auth/verify?token=${token}`,{
                method:"GET",
                credentials:"include"
            })
            if(!res.ok){
                const {error} = await res.json()
                setLoading(error)
                setLoading(false)
                throw new Error(data.message)
            }

            const data = await res.json()
            console.log("this is from the backend", data)
            setVerified(true)
            setLoading(false)
            setNavigate(true)

        } catch (e){
            console.log(e.message)
        }
    }

    verify()
    }, [])

    if(navigate){
        return <Navigate to={"/auth"} />
    }
  return (
    <>
    {loading && <div className='w-full h-screen gap-10 flex-col text-blue-600 dark:bg-gray-950 flex items-center justify-center'>
                    <span className="loading loading-dots loading-lg"></span>
                    <span className='text-blue-300 text-[17px]'>verifying account. hold a sec...</span>
                </div>
    }

    {!loading && <div className='w-full h-screen gap-10 flex-col text-blue-600 dark:bg-gray-950 flex items-center justify-center'>
                    <span className='text-blue-300 text-[17px]'>Something went wrong.. its like your token expired</span>
                    <Link to={"/auth"} className='w-32 h-12 flex items-center justify-center text-[17px] bg-blue-700 rounded-xl text-blue-100'>relogin</Link>
                </div>
    }
    
    </>
  )
}

export default VerifyUser
