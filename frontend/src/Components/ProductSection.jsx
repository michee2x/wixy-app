import React, { useState } from 'react'
import { MdLocationOn } from 'react-icons/md'
import { CiMenuKebab } from 'react-icons/ci'
import {Link} from "react-router-dom"

const ProductSection = ({setCatOption}) => {
    const [showOptions, setShowOptions] = useState(false)
  return (
    <div className='w-full h-auto'>
        <div className='w-full flex justify-between px-5 py-3 '>
            <span className='text-gray-100 text-xl'>Today's picks</span>
            <span className='text-blue-700 items-center flex text-md'><MdLocationOn />Bayelsa__65km</span>
            <span onClick={() => setCatOption("Electronics & Computers")} className='text-gray-100 cursor-pointer transform rotate-90 text-xl'><CiMenuKebab /></span>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:gap-10 gap-5 py-5'>
            {[1,2,3,4,5,6].map(e => {
            return <Link to={`/aboutproduct/${e}`} class="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
    <div class="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md" style={{backgroundImage: `url("https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80")`}}></div>

    <div class="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
        <h3 class="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">Nike Revolt</h3>

        <div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
            <span class="font-bold text-gray-800 dark:text-gray-200">$129</span>
            <button class="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">Add to cart</button>
        </div>
    </div>
</Link>
        })}
        </div>
      
    </div>
  )
}

export default ProductSection
