import React, { useEffect, useState } from "react"
import {Footer} from "./Footer"
import {Hero} from "./Hero"
import {MdCancel, MdChat, MdContacts, MdDashboard, MdNotifications, MdPerson, MdPerson2, MdPerson4, MdSettings} from 'react-icons/md'
import Nav from "./Nav"
import { ContextAPI } from "../ContextApi"
import { CookieComponent } from "./Cookie"
import { Link, Navigate } from "react-router-dom"
import {MdHome} from "react-icons/md"
import {IoIosGitNetwork, IoIosArrowForward} from "react-icons/io"
import {SiCoinmarketcap} from "react-icons/si"
import { useSocketContext } from "../SocketContext"
import {RiWechatChannelsFill, RiUserCommunityFill} from "react-icons/ri"


export const SideBar = ({children}) => {
    const {loggedUser, setLoggedUser, selectedChat, setSelectedChat} = ContextAPI()
    const {onlineUsers, socket, setOnlineUsers, dbUsers, setDbUsers} = useSocketContext()
    const [options, setOptions] = useState([
        [{name:"home", url:"/", icon:<MdHome />}
        , {name:"contact", url:"/contact", icon:<MdContacts />}
        , { name:"about", url:"/about", icon:<MdPerson4 />}
    ],
        [{name:"home", url:"/dashboard/id", icon:<MdDashboard />}
        , { name:"Profile", url:`/profile/${loggedUser?._id}`, icon:<MdPerson />}
        , {name:"Settings", url:"/settings", icon:<MdSettings />}
        , {name:"Marketplace", url:"/marketplace", icon:<SiCoinmarketcap />}
        , {name:"Notification", url:"/notifications", icon:<MdNotifications />}
        , {name:"My Network", url:"/network", icon:<RiUserCommunityFill />}
    ],

    ])
    const {showSideBar, setShowSideBar} = ContextAPI()
    const [darkmode, setDarkMode] = useState(true)
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
        <div className="w-full dark:bg-gray-950 relative h-full  flex">
        <aside className={`flex bg-scroll mt-0 bg-gray-400 ${showSideBar ? "w-full px-6" : "w-0"} lg:w-[20%] lg:px-6 transition-all duration-500 fixed top-0 z-50 bottom-0 left-0 flex-col h-screen overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-950 dark:border-gray-700`}>


    <div className="flex flex-col py-10 justify-between  flex-1">
        <nav className="flex-1 pt-16 md:pt-0 bg-scroll ">
        

            {options[loggedUser ? 1 : 0].map(e => {
                return <Link key={e.name} onClick={() => {window.scrollTo(0, 0); setShowSideBar(false)}} to={e.url} className=" items-center  px-3 flex py-2 text-gray-600 transition-colors duration-300 cursor-pointer transform dark:text-gray-300 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                <span className="text-primary">{e.icon}</span>

                <span className="mx-2 text-md lg:text-lg font-medium py-4 flex justify-between items-center w-full h-auto">{e.name} <span className={`${e.name === "chats" ? "block" : "hidden"} text-primary`}><IoIosArrowForward /></span></span>
            </Link>
            })}
        </nav>

        <div className="mt-6">

            <div className={`flex ${loggedUser ? "block" : "hidden"} items-center justify-between mt-6`}>
                <a href="#" className="flex items-center gap-x-2">
                    <img className="object-cover rounded-full h-7 w-7" src={loggedUser?.profilepic} alt="avatar" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{loggedUser?.name}</span>
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
<div className={`${showSideBar ? "lg:w-[80%] lg:ml-[20%]" : "lg:w-full"} lg:w-[80%] lg:ml-[20%] transition-all duration-500 relative h-auto w-full lg:min-h-screen`}>

    <Nav />
{children}
<CookieComponent />
<Footer />

</div>
        </div>
        </>
    )
}



{/* <div className="flex flex-col gap-3 items-center justify-center w-full h-screen dark:bg-gray-950">
<span className="loading text-3xl  loading-spinner text-info"></span>
<code className="text-sans text-primary tracking-widest">Wixy Loading...</code>
</div> */}