import React, {useState, useEffect} from 'react'
import { BreadCrumb } from '../Components/BreadCrumb'
import {MdPerson, MdPeople, MdGroups, MdPages} from "react-icons/md"
import {RiNewsLine} from "react-icons/ri"
import { Link } from 'react-router-dom'
import { ContextAPI } from '../ContextApi'

export const ManagePage = () => {
  const [numberOfConnections, setNumberOfConnections] = useState(0)
  const {loggedUser, allConversations} = ContextAPI()
  
  useEffect(() => {
    const returnConnections = () => {
      let count = 0
      for(let i=0; i<=allConversations.length-1; i++){
        count += 1
      }
      setNumberOfConnections(count)
  }
  if(allConversations?.length){
    returnConnections()
    console.log("all conversations. dey play", allConversations)
  }
  }, [allConversations?.length])

  console.log("all conversations. dey play", allConversations)

    const data = [
        {name:"Connections", icon:<MdPeople />, value:numberOfConnections, url:"/connections"},
        {name:"People i follow", icon:<MdPerson />, value:loggedUser?.followers?.length, url:"/following"},
        {name:"Groups", icon:<MdGroups />, value:3, url:"groups"},
        {name:"Pages", icon:<MdPages />, value:15, url:"/bookmark"},
        {name:"Newsletters", icon:<RiNewsLine />, value:1, url:"/newsletter"}
    ]
  return (
    <div className='w-full pt-16 min-h-screen dark:bg-gray-950'>
      <div className='pl-4'>
        <BreadCrumb history={[{name:"My Network", link:"/network", current:false}, {name:"Manage My Network", current:true, link:`/manage`}]} />

      </div>

      <div className="flex w-full h-auto flex-col">
          {data.map(e => {
            return <Link to={`${e.url}`} className='w-full border-t-[1px] px-4 py-10 border-blue-900 flex justify-between items-center h-14'>
              <div className='flex gap-2 items-center'>
                <span className='text-2xl text-blue-400'>{e.icon}</span>
            <span className='text-xl text-blue-400'>{e.name}</span>
              </div>
              <div className='text-xl text-blue-400'>{e.value}</div>
            </Link>
          })}
      </div>

    </div>
  )
}
