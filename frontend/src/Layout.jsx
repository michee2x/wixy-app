import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { SideBar } from './Components/SideBar'
import { ContextAPI } from './ContextApi'
import { MdArrowUpward } from 'react-icons/md'
const Layout = () => {
  const {loggedUser, setAllConversations} = ContextAPI()
  const [scrollPosition, setScrollPosition] = useState({x:0, y:0})
  const [scrollTop, setScrollTop] = useState(false)


  useEffect(() => {
      const fetchEveryConversation = async () => {
          try{
                const res = await fetch(`http://localhost:7000/api/message/geteveryconversation`, {
                              method:"GET",
                              credentials:"include"
                              })
                if(!res.ok) throw new Error(res)
          
                const data = await res.json()
                console.log("BRO THHIS ARE ALL YOUR CONVERSATIIONS---------------------------- ", data?.allConversations)
                setAllConversations(data?.allConversations)
          
                } catch(error){
                  console.log(error)
                }
          }
          fetchEveryConversation()
    }, [])

  useEffect(() => {
    //funtion to handle scroll event
    const handleScroll = () => {
      setScrollPosition({
        x:window.scrollX,
        y:window.scrollY
      });

    //check if the user scrolled past 1vh
    const oneVhInPixels = window.innerHeight * 0.02;
    if(window.scrollY > 1000){
      //console.log("scrolle past 1vh: ", window.scrollY)
      setScrollTop(true);
    } else {
      setScrollTop(false)
    }
    };

    //Add event listener for a scroll event
    window.addEventListener("scroll", handleScroll)
    
    //clean up function

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  /* if(!loggedUser){
    console.log("there is no auth user");
    return <Navigate to={"/auth"} />
  } */
 const scrollToTop = () => {
  window.scrollTo({
    top:0, left:0, behavior:"smooth"
  })
 }
 if(scrollTop){
  //console.log("it is time to scroll up babies...............................")
 }

    //console.log("this is the current window location", scrollPosition)
  return (
    <div className='w-screen relative overflow-y-scroll min-h-screen'>
    <SideBar>
      <Outlet />
    </SideBar>
    <div onClick={scrollToTop} className={`w-12 hidden border-2 border-blue-200 ${scrollTop ? "block" : "hidden"} lg:left-1/2 lg:-translate-x-1/2 lg:transform h-12 flex items-center justify-center cursor-pointer text-2xl text-white fixed bottom-16 right-4 bg-primary rounded-full`}>
      <MdArrowUpward />
    </div>
    </div>
  )
}

export default Layout
