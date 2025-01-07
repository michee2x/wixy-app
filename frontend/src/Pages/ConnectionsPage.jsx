import React, { useEffect, useState } from 'react'
import { BreadCrumb } from '../Components/BreadCrumb'
import {MdSearch, MdMenu, MdPerson} from "react-icons/md"
import {CiMenuKebab} from "react-icons/ci"
import {IoIosSend} from "react-icons/io"
import { ContextAPI } from '../ContextApi'

export const ConnectionsPage = () => {
  const {loggedUser, allConversations} = ContextAPI()
  const [allConnections, setAllConnections] = useState([])

  useEffect(() => {
    if(allConversations.length && Object.keys(loggedUser).length){
      let connections = []
      for(let i=0; i<=allConversations.length-1; i++){
        connections.push(allConversations[i].participants[loggedUser._id === allConversations[i].participants[0]._id ? 1 : 0])
      }
      setAllConnections(connections)
    }

  }, [allConversations.length])
  console.log("this are all your fucking connections", allConnections)
  return (
    <div className='w-full pt-16 min-h-screen dark:bg-gray-950'>
       <div className='px-4'>
               <BreadCrumb history={[{name:"My Network", link:"/network", current:false}, {name:"Manage My Network", current:false, link:`/manage`}, {name:"Newsletter", current:true, link:`/newsletter`}]} />
       </div>

       <div className='w-full h-16 flex justify-between px-2 items-center '>
        <p className='text-blue-300'>115 connections</p>
        <p className='flex text-2xl text-blue-300 gap-8'>
          <span><MdSearch /></span>
          <span><MdMenu /></span>
        </p>
       </div>

       <div className='w-full h-auto py-5 flex flex-col'>
        {allConnections?.map(e => {
          return <div className='w-full cursor-pointer py-4 border-t-[1px] lg:border-t-[.2px] px-3 border-blue-200 flex gap-2 min-h-16'>
        <div className='w-[4rem] h-full flex items-start justify-start'>
          <span className='w-12 h-12 flex items-center justify-center text-3xl bg-blue-600 text-blue-200 rounded-full'><MdPerson /></span>
        </div>
        <div className="w-full flex h-full">
          <div className='w-2/3 h-full gap-1 flex flex-col justify-between'>
            <span className="text-xl text-bold text-gray-200">{e?.name}</span>
            <span className="text-[13px] text-bold text-gray-200">{e?.desc}</span>
            <span className="text-[10px] text-gray-100">Connected Today</span>
          </div>
          <div className='w-1/3 h-full flex justify-end gap-4'>
            <span className="text-2xl text-bold cursor-pointer text-blue-200"><CiMenuKebab /></span>
            <span className="text-2xl text-bold cursor-pointer text-blue-200"><IoIosSend /></span>
          </div>
        </div>
       </div>
        })}
       </div>
    </div>
  )
}
