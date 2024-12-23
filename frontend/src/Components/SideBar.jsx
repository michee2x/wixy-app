import React, { useEffect, useState } from "react"
import {Footer} from "./Footer"
import {Hero} from "./Hero"
import {MdCancel, MdChat, MdContacts, MdDashboard, MdPerson, MdPerson4, MdSettings} from 'react-icons/md'
import Nav from "./Nav"
import { ContextAPI } from "../ContextApi"
import { CookieComponent } from "./Cookie"
import { Link, Navigate } from "react-router-dom"
import {MdHome} from "react-icons/md"
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io"
import {SiCoinmarketcap} from "react-icons/si"
import { useSocketContext } from "../SocketContext"
import Avatar from "./Avatar"


export const SideBar = ({children}) => {
    const {onlineUsers, socket, setOnlineUsers, dbUsers, setDbUsers} = useSocketContext()
    const [options, setOptions] = useState([
        [{name:"home", url:"/", icon:<MdHome />}, {name:"contact", url:"/contact", icon:<MdContacts />}, { name:"about", url:"/about", icon:<MdPerson4 />}],
        [{name:"dashboard", url:"/dashboard/id", icon:<MdDashboard />}, { name:"profile", url:"/profile/id", icon:<MdPerson />}, {name:"settings", url:"/settings", icon:<MdSettings />}, {name:"chats", url:"/channels", icon:<MdChat />}, {name:"marketplace", url:"/marketplace", icon:<SiCoinmarketcap />}],

    ])
    const {showSideBar, setShowSideBar} = ContextAPI()
    const [darkmode, setDarkMode] = useState(true)
    const {loggedUser, setLoggedUser, selectedChat, setSelectedChat} = ContextAPI()
    const [navigate, setNavigate] = useState(false)

    useEffect(() => {
        const doc = document.body
        if(darkmode){
            doc.classList.add("dark");
        }else{
            doc.classList.remove("dark")
        }
    }, [darkmode])

    const logOut = async () => {
        try{

            const res = await fetch("http://localhost:7000/api/auth/logout", {
                method:"GET",
                credentials:"include"
            })

            if(!res.ok){
                throw new Error("there was an error loging out. try reloging out")
            }

            localStorage.removeItem("logged-user");
            setLoggedUser(null);
            setNavigate(true)

        }catch(error){
            console.log("error in logout hook", error)
        }
    }

    if(navigate){
        return <Navigate to={"/auth"} />
    }
    
    return (
        <>
        <div className="w-full relative h-full  flex">
        <aside className={`flex bg-scroll mt-0 bg-gray-400 ${showSideBar ? "w-full px-6" : "w-0"} lg:px-6 transition-all duration-500 fixed top-0 z-40 bottom-0 left-0 flex-col lg:w-[20%] h-screen overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700`}>


    <div className="flex flex-col py-10 justify-between  flex-1">
        <nav className="flex-1 pt-16 md:pt-0 bg-scroll ">
        

            {options[loggedUser ? 1 : 0].map(e => {
                return <Link key={e.name} onClick={() => {window.scrollTo(0, 0); setShowSideBar(false)}} to={e.url} className=" items-center px-3 flex py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                <span>{e.icon}</span>

                <span className="mx-2 text-md lg:text-lg font-medium flex justify-between items-center w-full h-auto">{e.name} <span className={`${e.name === "chats" ? "block" : "hidden"}`}><IoIosArrowForward /></span></span>
            </Link>
            })}{/* 
            {chatMode && dbUsers.length !== 0 && 
                <div className="w-full h-auto flex flex-col">
                    <div onClick={() => {setChatMode(false); setSelectedChat({})}} className="w-full text-xl mt-3 mb-6 cursor-pointer dark:text-gray-100"><IoIosArrowBack /></div>
                    <div className="relative mb-4">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                        <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                </span>

                <input type="text" className="w-full py-1.5 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="search user" />
                </div>
                {dbUsers?.map((e, i) => {
                    return <div key={i} onClick={() => {startChat(e); setShowSideBar(false)}} className={`flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 ${selectedChat.name === e.name ? "dark:bg-gray-700" : "dark:bg-gray-900"} dark:hover:text-gray-200 hover:text-gray-700`} href="#">
                <Avatar user={e} />
                <span className="mx-2 text-sm font-medium">{e.name}</span>
            </div>
                })}

            </div>
            } */}
        </nav>

        <div className="mt-6">
            <div className="p-3 bg-gray-100 rounded-lg dark:bg-gray-800">
                <h2 className="text-sm font-medium text-gray-800 dark:text-white">New feature availabel!</h2>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus harum officia eligendi velit.</p>

                <img className="object-cover w-full h-32 mt-2 rounded-lg" src="https://images.unsplash.com/photo-1658953229664-e8d5ebd039ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&h=1374&q=80" alt="" />
            </div>

            <div className={`flex ${loggedUser ? "block" : "hidden"} items-center justify-between mt-6`}>
                <a href="#" className="flex items-center gap-x-2">
                    <img className="object-cover rounded-full h-7 w-7" src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&h=634&q=80" alt="avatar" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">John Doe</span>
                </a>
                
                <p onClick={logOut} className={`text-gray-500 cursor-pointer transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                    </svg>
                </p>
            </div>
        </div>
    </div>
</aside>
<div className="lg:w-[80%] h-auto w-full lg:ml-[20%] lg:min-h-screen">
<Nav />
{children}
<CookieComponent />
<Footer />
</div>
        </div>
        </>
    )
}
