import React from 'react'
import { Link, useParams } from 'react-router-dom'
import {HiBellAlert} from "react-icons/hi2"
import {FaBookmark} from "react-icons/fa"
import {GiRapidshareArrow} from "react-icons/gi"
import { CiMenuKebab } from 'react-icons/ci'
import { BreadCrumb } from '../Components/BreadCrumb'
import {SlUserFollow} from "react-icons/sl"

export const AboutProduct = () => {
    const {id:pageId} = useParams()

    const Actions = [
        {icon:<HiBellAlert />, name:"Alert"},
        {icon:<img src="https://i.imgur.com/95Vxv5f.png" alt="" className='w-8 h-8 object-cover' />, name:"Message"},
        {icon:<FaBookmark />, name:"Save"},
        {icon:<GiRapidshareArrow />, name:"Share"},
        {icon:<CiMenuKebab />, name:"More"}
    ]
  return (
    <div className='w-full px-4 md:px-16 bg-scroll lg:px-24 lg:pt-[55px] pt-16 min-h-screen dark:bg-gray-950'>
        <BreadCrumb history={[{name:"marketplace", link:"/marketplace", current:false}, {name:"productinfo", current:true, link:`/product/${pageId}`}]} />
        
        <div className='w-full gap-1 h-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {[1,2,3,4].map(e => {
                return <img className='rounded-xl object-cover' src="https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80" alt="" />
            })}
        </div>

        <div className='w-full my-5 px-5 flex flex-col gap-8 py-2 h-auto'>
             <p className='text-gray-200 font-bold text-2xl'>Nike Revolt</p>
             <p className='font-normal font-sans text-xl tracking-widest text-accent'>NGN13000</p>
             <p className='text-gray-400 text-lg'>Listed over a week ago in Aba</p>

             <div className='border-[1px] flex flex-col gap-3 py-6 px-5 rounded-xl my-3 border-accent min-h-32 w-full'>
                <p className='w-full h-auto flex items-center gap-2'>
                    <img src="https://i.imgur.com/95Vxv5f.png" alt="" className='w-8 h-8 object-cover' />
                    <span className='text-gray-200 text-xl font-sans'>Send seller a message</span>
                </p>

                <p className='flex w-full border-[1px] text-gray-200 border-gray-600 rounded-2xl h-12 items-center justify-center'>
                    is this still available?
                </p>

                <Link className='flex w-full bg-blue-800 text-white rounded-xl h-12 items-center justify-center'>
                    Send
                </Link>
             </div>


             <div className='grid border-b-[1px] py-3 border-gray-400 grid-cols-4 place-items-center gap-5 h-auto w-full items-center'>
                {Actions.map(e => {
                    return <p className='flex min-w-14 h-full items-center flex-col gap-2'>
                    <span className='w-12 h-12 transition-all duration-300 rounded-full flex items-center hover:text-2xl cursor-pointer text-xl justify-center border-[1px] border-accent text-gray-200'>{e.icon}</span>
                    <span className='text-gray-200 text-xl font-sans'>{e.name}</span>
                </p>
                })}
             </div>

             <div className='w-full border-b-[1px] py-5 flex flex-col gap-3 h-auto'>
                <p className='text-gray-800 text-xl dark:text-gray-200'>Description</p>
                <p className='text-gray-800 dark:text-gray-200 text-[16px]'>complete men wears up and down</p>
             </div>

             <div className='w-full py-5 flex flex-col gap-3 h-auto'>
                    <p className='w-full h-auto py-3 flex justify-between'>
                        <span className='text-gray-200'>Seller info</span>
                        <span className='text-primary'>see marketplace</span>
                    </p>

                    <div className='w-full flex justify-between h-auto'>
                        <p className='flex gap-3 w-2/3 items-center h-full'>
                            <span className='w-14 h-14 flex rounded-full bg-blue-500'></span>
                            <span className='text-xl text-gray-100 font-sans'>Michael Israel</span>
                        </p>
                        <p className='w-1/3 h-full flex items-center justify-end'>
                            <span className='w-28 h-12 bg-gray-600 text-white rounded-xl gap-3 flex items-center justify-center'><SlUserFollow /> Follow</span>
                        </p>
                    </div>
             </div>
        </div>
    </div>
  )
}
