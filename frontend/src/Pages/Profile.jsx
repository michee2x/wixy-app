import React  from "react";
import { ContextAPI } from "../ContextApi";
import {MdBusiness, MdStoreMallDirectory, MdLocationOn, MdMail, MdPerson, MdShare, MdLink, MdInfo, MdCall} from "react-icons/md"
import {BsCamera, BsGlobe} from "react-icons/bs"
import {IoMdTime} from "react-icons/io"


export const ProfilePage = () => {
    const {loggedUser, setLoggedUser} = ContextAPI()
    const Options = [
        {icon:<MdPerson />, title:`${loggedUser?.name}`, desc:"Business name"},
        {icon:<MdBusiness />, title:"Other Business", desc:"Category"},
        {icon:<MdLocationOn />, title:"Add address", desc:"Business address"},
        {icon:<BsGlobe />, title:"Addwebsite", desc:"Website"},
        {icon:<MdMail />, title:`${loggedUser?.email}`, desc:"Email"},
        {icon:<MdStoreMallDirectory />, title:"Add a description", desc:"Description"},
        {icon:<IoMdTime />, title:"Add hours", desc:"Business hours"}
    ]
    return (
        <div className="min-h-screen font-sans lg:px-40 lg:py-24 w-full bg-gray-100 dark:bg-gray-950 text-3xl dark:text-gray-100">
           <div className="w-full lg:rounded-xl p-[.8px] relative h-64 from-accent/0  via-accent to-primary bg-gradient-to-b">
                <div className="w-full lg:rounded-xl relative h-full bg-gray-950">
                    <span className="w-12 cursor-pointer h-12 bg-gray-100 rounded-full text-[18px] text-black font-bold flex items-center justify-center absolute bottom-4 right-4"><BsCamera /></span>
                <span className="w-32 h-32 rounded-full flex items-center justify-center left-1/2 p-[.9px] transform -translate-x-1/2 bg-blue-700 absolute bottom-[-3.7rem]">
                    <span className="flex w-full h-full rounded-full relative bg-gray-950">
                        <span className="w-12 cursor-pointer h-12 bg-gray-100 rounded-full text-[18px] text-black font-bold flex items-center justify-center absolute bottom-[-5px] right-1">
                            <BsCamera />
                        </span>
                
                    </span>
                </span>
                </div>
           </div>

           <div className="w-full border-b-[1px] gap-5 py-10 border-gray-700 flex items-end justify-between px-4 min-h-[15rem] ">
                <div className="w-1/2  lg:w-1/3 rounded-xl h-[5rem] flex flex-col justify-center gap-2 font-semibold items-center border-primary border-[1.5px]">
                    <span className="text-gray-200 text-2xl"><MdShare /></span>
                    <span className="text-gray-200 text-lg tracking-widest">Share</span>
                </div>

                <div className="w-1/2 lg:w-1/3 rounded-xl h-[5rem] flex flex-col justify-center gap-2 font-semibold items-center border-primary border-[1.5px]">
                    <span className="text-gray-200 text-2xl"><MdShare /></span>
                    <span className="text-gray-200 text-lg tracking-widest">Share</span>
                </div>
           </div>

           <div className="w-full border-b-[1px] border-gray-700 flex flex-col gap-5 h-auto py-10">
                {
                    Options.map(e => {
                        return (
                            <div className="w-full px-4 flex gap-2 justify-between h-16">
                    <span className="text-2xl mt-1 text-primary">{e.icon}</span>
                    <span className="flex flex-col gap-2 w-[90%]">
                        <b className="text-gray-300 font-sans tracking-widest  text-[15px]">{e.title}</b>
                        <i className="text-gray-400 text-[13px]">{e.desc}</i>
                    </span>

                </div>
                        )
                    })
                }
           </div>

           <div className="w-full border-b-[1px] border-gray-700 flex flex-col gap-5 h-auto py-10">
            <p className="w-full flex justify-between px-4">
                <b className="text-white/90 text-xl ">Products</b>
                <i className="text-xl text-white/90 cursor-pointer">Manage</i>
            </p>
            <div className="w-full p-3 h-auto flex justify-between list-none gap-2 lg:gap-4">
                {[1,2,3].map(e => {
                    return <li className="w-1/3 rounded-xl bg-gray-800/20 h-32 lg:h-64"></li>
                })}
            </div>
           </div>

           <div className="w-full px-3 border-b-[1px] border-gray-700 flex flex-col gap-5 h-auto py-10">
            <p className="font-sans bg-gradient-to-tr from-accent to-primary bg-clip-text text-transparent text-xl">Facebook & Instagram</p>
            <p className="w-full cursor-pointer flex gap-6">
                <span className="text-2xl mt-1 text-gray-500"><MdLink /></span>
                <span className="text-gray-500 font-bold text-lg">Add account</span>
            </p>
           </div>

           <div className="w-full px-3 border-b-[1px] border-gray-700 flex flex-col gap-5 h-auto py-10">
                <p className="font-sans bg-gradient-to-tr from-accent to-primary bg-clip-text text-transparent text-xl">About & phone number</p>
                {[{icon:<MdInfo />, title:"Into the Ai world", desc:"About"}, {icon:<MdCall />, title:"+234 904 004 3769", desc:"Phone number"}].map(e => {
                    return <div className="w-full flex gap-2 justify-between h-16">
                    <span className="text-xl mt-1 text-gray-500">{e.icon}</span>
                    <span className="flex flex-col font-[300] gap-2 w-[90%]">
                        <b className="text-gray-300 text-[14px]">{e.title}</b>
                        <i className="text-gray-400 text-sm">{e.desc}</i>
                    </span>

                </div>
                })}
           </div>
        </div>
    )
}