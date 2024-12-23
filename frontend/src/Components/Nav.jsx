import React,{useState, useEffect} from 'react'
import { ContextAPI } from '../ContextApi'
import Aos from "aos"
import "aos/dist/aos.css"
import {MdMenu, MdPerson, MdArrowBack} from "react-icons/md"
import { useSocketContext } from '../SocketContext'

const Nav = () => {
    const {selectedChat, setSelectedChat,} = ContextAPI()
    const [isOpen, setIsOpen] = useState(false)
    const {showSideBar, setShowSideBar} = ContextAPI()
    const {setMessages} = useSocketContext()

    useEffect(() => {
    Aos.init({duration:2000})
}, [])

  return (
    <nav className="fixed z-50 lg:w-[80%] lg:ml-[20%] bg-gray-200 dark:bg-gray-900 top-0 left-0 right-0 shadow">
        <div className="lg:items-center shadow-sm shadow-black/20 w-full h-full lg:justify-between lg:flex">
            {Object.keys(selectedChat).length === 0 ? <div className="flex items-center w-full h-16 px-5 justify-between">
                <a data-aos="slide-left" href="/" className="">
                    <code className='text-gray-800 flex gap-3 items-center text-xl font-extrabold'><img className="w-auto transform rotate-180 h-6" src="https://merakiui.com/images/logo.svg" alt="" /><span className="text-blue-600 opacity-50"> i x y</span></code>
                </a>

                {/* <!-- Mobile menu button --> */}
                <div className="lg:hidden">
                    <button onClick={() => setShowSideBar(true)} type="button" className="text-gray-800 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                        <svg xmlns="http://www.w3.org/2000/svg" className={`${!isOpen ? "block" : "hidden"} w-6 h-6`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
                        </svg>
                    </button>
                </div>
            </div> : 
            <div className='w-full min-h-16 flex justify-between'>
                <div className='w-1/2 lg:w-1/3 h-full flex items-center gap-5 p-2'>
                <span onClick={() => {history.back();setSelectedChat({});setMessages([])}} className='flex text-2xl cursor-pointer text-gray-100'><MdArrowBack /></span>
                {
                    selectedChat?.profilepic !== "" ? <img className='w-12 h-12 rounded-full object-cover' src={selectedChat?.profilePic} alt="" /> : <span className='w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center text-3xl text-gray-200'><MdPerson /></span>
                    
                }
                <b className='text-xl text-gray-100'>{selectedChat?.name}</b>
                </div>
                <div className='w-1/3 items-center flex justify-end pr-5'>
                    <span className='text-gray-200 text-xl'><MdMenu /></span>
                </div>
            </div>}

            {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
            <div className={`absolute lg:hidden inset-x-0 hidden z-20 w-full px-6 py-4 overflow-hidden lg:h-full transition-all ${isOpen ? "h-auto":"h-0"} duration-300 ease-in-out bg-white shadow-md lg:bg-transparent lg:dark:bg-transparent lg:shadow-none dark:bg-gray-900 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center`}>
                <a href="/" className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 lg:mx-2">Home</a>
                <a href="#" className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 lg:mx-2">About</a>
                <a href="#" className="block px-3 py-2 text-gray-600 rounded-lg dark:text-gray-200 hover:bg-gray-100 lg:mx-2">Contact</a>
            </div>
        </div>
    </nav>
  )
}

export default Nav
