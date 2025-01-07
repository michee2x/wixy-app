import React from 'react'
import { BreadCrumb } from '../Components/BreadCrumb'

export const BookmarkPage = () => {
  return (
    <div className='w-full pt-16 min-h-screen px-4 dark:bg-gray-950'>
       <div className='pl-4'>
               <BreadCrumb history={[{name:"My Network", link:"/network", current:false}, {name:"Manage My Network", current:true, link:`/manage`}, {name:"Newsletter", current:true, link:`/newsletter`}]} />
       </div>
    </div>
  )
}
