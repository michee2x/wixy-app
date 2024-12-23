import React from 'react'
import { Link } from 'react-router-dom'

export const BreadCrumb = ({history}) => {
  return (
    <div class="flex w-full h-auto items-center py-6 overflow-x-auto whitespace-nowrap">
    {history.map(e => {
        return <>
            <Link to={`${e.link}`} className={` ${e.current ? "text-blue-600 dark:text-blue-400 hover:underline" : "text-gray-600 dark:text-gray-200 hover:underline"} hover:underline`}>
        {e.name}
    </Link>

    <span className={`mx-5 ${e.current ? "hidden" : "block"} text-gray-500 dark:text-gray-300 rtl:-scale-x-100`}>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
        </svg>
    </span>
        </>
    })}
   
</div>
  )
}
