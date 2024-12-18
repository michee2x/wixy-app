import React, {useEffect, useState} from 'react'
import {Navigate, useLocation} from "react-router-dom"
import { ContextAPI } from '../ContextApi'

const VerifyUser = () => {
    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const token = query.get("token")
    const {darkmode, setDarkMode} = ContextAPI()
    const [loading, setLoading] = useState(false)
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

    const verify = async () => {
        setLoading(true)
        try{
            const res = await fetch(`http://localhost:7000/api/auth/verify?token=${token}`)
            if(!res.ok){
                const data = await res.json()
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

    if(navigate){
        return <Navigate to={"/auth"} />
    }
  return (
    <div className='w-full h-screen dark:bg-gray-900 flex items-center justify-center'>

        <button onClick={verify} className='w-40 h-12 text-gray-200 rounded-xl  flex items-center justify-center bg-blue-700 '>{loading && !verified ? "verifying" : loading && verify ? "verified..." : "verify"}</button>
      
    </div>
  )
}

export default VerifyUser
