import React from "react"
export const InputComponent = ({data,type, name, setData, label}) => {
    return (
        <div>
        <label for="email" className="mb-2 inline-block dark:text-gray-100 text-sm text-gray-800 sm:text-base">{label}</label>
          
        <input value={data[name]} type={`${type}`} onChange={(e) => setData({...data, [name]:e.target.value})} className={`w-full dark:bg-gray-900 dark:text-gray-100 dark:border-white rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring`}/>

        </div>
    )
}