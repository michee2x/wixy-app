import React from 'react'

export const NewMessage = ({data}) => {
  return (
    <div className='w-full min-h-16 bg-blue-950 gap-3 flex cursor-pointer justify-between p-6 rounded-xl shadow-md shadow-black'>
                            <img src="src\assets\ai-generated-8249225_1280.jpg" alt="" className='w-12 rounded-full md:w-16 md:h-16 h-12 object-cover'/>
                            <span className='flex w-[90%] flex-col gap-1'>
                                <span className='flex justify-between w-full h-auto'><b className='font-semibold text-md font-sans tracking-wider text-gray-200'>{data.from}</b> <i className='text-blue-300 text-xs'>now</i></span>
                                <span className='flex justify-between w-full h-auto'>
                                    <b className='text-gray-400'>
                                       {data.message}
                                    </b>
                             </span>
                                
                            </span>
    </div>
  )
}
