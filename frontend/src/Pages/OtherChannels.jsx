import React, { useState, useEffect } from 'react'
import { ContextAPI } from '../ContextApi'

export const OtherChannels = ({feed, setFeed}) => {
    const {loggedUser} = ContextAPI()

    const  connectWithChannel = async (id) =>  {
        try{
                const res = await fetch(`https://wixy-backend.onrender.com/api/user/connect/${id}`, {
                    method:"GET",
                    credentials:"include"
                })
        } catch (error) {
            console.log("error in connectWithChannel func", error)
        }
    }
    const removeItem = (feedId) => {
        const filtered = feed.filter((e) => e._id !== feedId)
        setFeed(filtered)
    }

  return (
    <div className='w-full px-3 pt-16 min-h-screen dark:bg-gray-950'>
        <div className='w-full py-3 h-auto'>
            <p className='text-xl mb-3 text-blue-100'>Channels</p>
            <p className='text-ld text-blue-400'>Boost your sales and partnership power by connecting with others...</p>
            <p className='text-ld mt-10 mb-6 text-blue-400'>find channels to follow</p>
        </div>

        <div className='w-full h-auto flex flex-col gap-8'>
            {feed.map(e => {
                return (
                    <div key={e?._id} className='w-full flex gap-2 h-auto'>
                        <img src="src\assets\ai-generated-8249225_1280.jpg" alt="" className='w-12 h-12 rounded-full object-cover'/>
                        <div className='w-full flex justify-between h-full'>
                            <p className='w-1/2 h-full flex flex-col pr-2'>
                                <span className='text-blue-200 text-xl'>{e?.name}</span>
                                <span className='text-gray-400 text-[14px]'>{e?.username}</span>
                            </p>
                            <button onClick={() => {connectWithChannel(e?._id); removeItem(e?._id)}} className='w-[5rem] h-8 text-sm bg-blue-950 rounded-lg flex items-center justify-center text-gray-100'>{!loggedUser?.sentConnectionRequest?.includes(e._id) ? "Connect": "Cancel request"}</button>
                        </div>
                    </div>
                )
            })}
        </div>

        <button className='w-[9rem] h-10 border-[1.2px] border-blue-400 my-16 bg-transparent rounded-xl flex items-center justify-center text-blue-400'>Explore more</button>
                        
    </div>
  )
}
