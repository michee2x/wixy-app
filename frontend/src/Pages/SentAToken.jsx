import React, {useEffect} from 'react'
import { ContextAPI } from '../ContextApi'

export const SentAToken = () => {
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
    <div className='w-full flex-col gap-5 text-gray-200 text-xl h-screen dark:bg-gray-950 flex items-center justify-center'>
    <img src="https://i.imgur.com/95Vxv5f.png" className="w-28 h-28 my-6 object-cover"/>

      
      <p>Hey Dear</p>
      <p>Welcome to wixy-marketplace</p>
      <p>before you start exploring our collections</p>
      <p>pls verify your email.</p>
      <p>you successfully signuped so you should</p>
    <p>have a verification link sent to the your email.</p>
    <p>verification link expires in 2hrs time</p>
    </div>
  )
}