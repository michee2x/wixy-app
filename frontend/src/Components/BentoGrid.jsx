import React from 'react'

const BentoGrid = ({images}) => {
  return (
    <div className='w-full grid grid-cols-2 grid-rows-2 gap-5 px-5 h-64 lg:h-[70vh] mt-10'>
        <img src={images[0]} loading="lazy" alt="Photo by vahid kanani" class="object-cover rounded-xl w-full h-full col-span-1 row-span-2 object-center transition duration-200 group-hover:scale-110" />
        <img src={images[1]} loading="lazy" alt="Photo by vahid kanani" class="object-cover rounded-xl w-full h-full object-center col-span-1 row-span-1 transition duration-200 group-hover:scale-110" />
        <img src={images[2]} loading="lazy" alt="Photo by vahid kanani" class="object-cover rounded-xl w-full h-full object-center col-span-1 row-span-1 transition duration-200 group-hover:scale-110" />
               
      </div>
  )
}



export const BentoSection = () => {
    const images = ["https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&q=75&fit=crop&w=600",
                  "https://images.unsplash.com/photo-1621111848501-8d3634f82336?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1565&q=80",
                  "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&q=75&fit=crop&w=600"]
  
  return (
    <div>
        <BentoGrid images={images}/>
        <div className='flex justify-between px-5 py-5'><span className='text-bold dark:text-gray-100 text-gray-900'>Hot Collections</span> <span className='text-gray-700 font-light underline dark:text-gray-100'>view all</span></div>
        <p className='pl-5 text-gray-900 dark:text-gray-100 font-extralight font-sans'>made for comfy days and nights</p>
      </div>
  )
}
