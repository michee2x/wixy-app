import React, {useState} from 'react'
import ProductSection from '../Components/ProductSection'
import { MdCancel } from 'react-icons/md'
import {RxDashboard} from "react-icons/rx"

export const MarketPlace = () => {
  const [catOption, setCatOption] = useState("")
  return (
    <>
    <div className='w-full relative pt-16 min-h-screen dark:bg-gray-950'>
      <div className='w-full relative h-auto flex flex-col gap-10'>
            {[1,2,3,4,5].map(e => {
              return <ProductSection setCatOption={setCatOption}/>
            })}
            <div onClick={() => setCatOption("")} className={`w-full cursor-pointer h-screen flex ${catOption ? "block" : "hidden"} items-end fixed bg-gray-900/50`}>
              <div className='relative w-full h-full'>
                <div className={`w-full absolute bottom-0 left-0 transition-[width] duration-300 right-0 h-64 bg-gray-800`}>
                <span className='w-24 h-1 flex bg-gray-300 rounded-xl mx-auto my-3'></span>

                <div className='w-full flex flex-col gap-3 h-auto'>
                 {[{icon:<MdCancel />, prompt:"Hide these listings"}, {icon:<RxDashboard />, prompt:"See all listings in this category"}].map(e => {
                  return  <div className='w-full h-auto items-center px-3 flex gap-4'>
                    <span className='w-12 h-12 rounded-full bg-gray-700 text-gray-200 flex items-center justify-center text-2xl'>{e.icon}</span>
                    <span className='text-xl text-gray-200'>{e.prompt}</span>
                  </div>
                 })}

                </div>
              </div>
              </div>
            
            </div>
      </div>


    
    </div>
    

    </>
  )
}
