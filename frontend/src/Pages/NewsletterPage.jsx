import React from 'react'
import { BreadCrumb } from '../Components/BreadCrumb'
import {CiImageOn, CiMenuKebab} from "react-icons/ci"
import { MdPerson } from 'react-icons/md'

export const NewsletterPage = () => {
  return (
    <div className='w-full pt-16 min-h-screen dark:bg-gray-950'>
       <div className='px-4'>
               <BreadCrumb history={[{name:"My Network", link:"/network", current:false}, {name:"Manage My Network", current:false, link:`/manage`}, {name:"Newsletter", current:true, link:`/newsletter`}]} />
       </div>

       <div className='w-full h-auto flex flex-col'>
       { [1,2,3].map(e => {
        return <div className='w-full gap-2 lg:gap-0 border-t-[1px] border-gray-600 py-4 pr-2 bg-gray-900 min-h-16 flex justify-between'>
        <div className='w-[10%] flex justify-center pl-2 text-gray-300 text-[3rem] h-full'>
          <CiImageOn />
        </div>

        <div className='w-[90%] gap-2 flex flex-col justify-between h-full'>
          <div className='w-full h-auto flex justify-between'>
            <p className='text-[17px] font-bold text-gray-200'>Welcome to Unlock your potential</p>
            <span className='text-xl text-gray-200'><CiMenuKebab /></span>
          </div>
          <p className='text-blue-200 text-bold break-words'>Welcome to Unlock your potential, your source of daily motivation and personal gro...</p>
          <div className='w-full h-auto flex gap-2'>
            <span className='w-8 h-8 text-xl flex items-center justify-center rounded-full text-blue-200 bg-blue-500'>
              <MdPerson />
            </span>
            <p className='w-[90%] h-full flex flex-col gap-1'>
              <span className='font-bold text-[14px] text-gray-300'>Ashish Shukla</span>
              <span className='font-bold text-[14px] text-gray-400'>Moticvational speaker | Life coach | fit...</span>
            </p>
          </div>
        </div>
       </div>
       })}
       </div>
    </div>
  )
}
