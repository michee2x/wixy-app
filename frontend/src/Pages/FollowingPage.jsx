import React from 'react'
import { BreadCrumb } from '../Components/BreadCrumb'
import {MdPerson} from "react-icons/md"

export const FollowingPage = () => {
  return (
    <div className='w-full pt-16 min-h-screen dark:bg-gray-950'>
       <div className='px-4'>
               <BreadCrumb history={[{name:"My Network", link:"/network", current:false}, {name:"Manage My Network", current:false, link:`/manage`}, {name:"People i follow", current:true, link:`/following`}]} />
       </div>

       <div className='w-full border-t-[.5px] text-gray-200 px-4 border-gray-700 py-5 flex gap-2 min-h-16'>
          11 people
       </div>

       <div>
        {[1,2,3,4,5].map(e => {
          return (
            <div className='w-full border-t-[.5px] px-4 border-gray-700 py-5 flex gap-2 min-h-16'>
              <div className='w-auto h-auto flex justify-center'>
                <span className='w-12 h-12 bg-sky-700 text-3xl text-sky-200 rounded-full flex items-center justify-center'><MdPerson /></span>
              </div>
              <div className='w-[90%] h-full flex flex-col gap-1'>
                <p className='text-gray-200 text-[14px]'>Whyte Peter</p>
                <p className='text-gray-200 w-full h-auto text-[12px]'>Senior Frontend Engineer yuadsfgaugd ayifgyidfiayfy</p>
              </div>
              <p className='flex items-center text-gray-200'>Following</p>
          </div>
          )
        })}
       </div>
    </div>
  )
}
