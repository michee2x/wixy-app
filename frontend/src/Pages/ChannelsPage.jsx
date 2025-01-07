import React, {useEffect, useState, useRef} from 'react'
import { ContextAPI } from '../ContextApi'
import {useListenMessages} from "../Hooks/useListenMessages"
import { useSocketContext } from '../SocketContext'
import { ChatPage } from './ChatPage'
import { BreadCrumb } from '../Components/BreadCrumb'
import {returnUnreadMessages} from "../Utils/returnUnreadMessages"
import useFetchConversations from '../Hooks/useFetchConversations'
import {AddOrUpdate} from "../Utils/AddOrUpdate"
import {IoCheckmarkDone} from "react-icons/io5"
import {IoMdCheckmark} from "react-icons/io"
import {createdAt} from "../Utils/createdAt"
import { Link } from 'react-router-dom'

export const ChannelsPage = () => {
    useListenMessages()
    const {messages, setMessages, dbUsers, socket, loading, conversationRepo, setConversationRepo} = useSocketContext()
    const [text, setText] = useState("")
    const {selectedChat, loggedUser, allConversations, setAllConversations, setSelectedChat, lastChat, setLastChat} = ContextAPI()
    const receiverId = selectedChat?._id
    const [load, setLoad] = useState(0)
    const  intervalRef = useRef(null)

    useEffect(() => {
            const setFirst = () => {
                        //Remove the channel from its current position
                        const newConversation = allConversations?.filter(obj => obj._id !== lastChat)
                        //Insert the channel at the front of the array
                        newConversation?.unshift(lastChat)
                        setAllConversations(newConversation)
                }
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
                          //setFirst()
                  } catch(error){
                      console.log(error)
                  }
              }
  
        fetchEveryConversation()
}, [])
    
    useEffect(() => {
       intervalRef.current = setInterval(() => {
            if(load < 100){
                setLoad(prev => prev + 0.001)
            } else {
                if(intervalRef.current){
                    clearInterval(intervalRef.current)
                }
            }
    }, 30)

    /* return () => {
        if(intervalRef.current){
                    clearInterval(intervalRef.current)
        }
    } */
    }, [load])


const storeAllConversationAsRead = async (_id) => {
    try{
            const res = await fetch(`http://localhost:7000/api/message/readmessages?id=${_id}`, {
                method:"GET",
                credentials:"include"
            })
            if(!res.ok){
                throw new Error(res)
            }

            const {unReadMessages} = await res.json()
            console.log("this are the read datas", unReadMessages)
            if(allConversations.length > 0){
                for(let i=0; i<=unReadMessages.length-1;i++){
                        const newConversations = allConversations.map(e => e.participants[e?.participants[0]?._id === loggedUser?._id ? 1 : 0]?._id === unReadMessages[i]?.senderId ? {...e, messages:AddOrUpdate(e.messages, unReadMessages[i])} : e)
                        setAllConversations(newConversations);
                    }
                    
            }
    }catch(error){
        console.log("there was an error in storeAllConversationAsRead func", error)
    }
}

const StatusTypeIcon = (status) => {
        if(status === "sent"){
            return <span className="text-gray-400 text-xl"><IoMdCheckmark /></span>
        }
        else if(status === "received"){
                return <span className="text-gray-400 text-xl"><IoCheckmarkDone /></span>
        } else if(status === "read"){
                return <span className="text-blue-400 text-xl"><IoCheckmarkDone /></span>
        }
        else{
            return ""
        }
}

  return (
    <>
    <div className={`w-full ${allConversations.length < 1 ? "block" : "hidden"} flex-col flex items-center justify-center gap-4 lg:gap-6 py-24 min-h-screen lg:mx-auto md:px-16 lg:w-[65rem] dark:bg-gray-950 bg-gray-100`}>
       <progress className="progress bg-gray-900 progress-primary w-56" value={`${load}`} max="100"></progress>
       <p className='text-center tracking-widest text-blue-400'>Loading your chats...</p>
       <p className='text-center tracking-widest text-blue-400'>{Math.floor(load) < 100 ? Math.floor(load) : "100"}%</p>
    </div>
    <div className={`w-full px-4 flex flex-col gap-4 lg:gap-6 py-24 min-h-screen lg:mx-auto md:px-16 lg:w-[65rem] dark:bg-gray-950 bg-gray-100`}>
    <BreadCrumb history={[{name:"My Network", link:"/network", current:false}, {name:"My Channels", current:true, link:`/channels`}]} />
    {allConversations?.length > 0 && allConversations?.map((e, index) => {
                return (
                    <Link to={`/chat/${e._id}`} onClick={() => {setSelectedChat(e); setLastChat(e?._id); storeAllConversationAsRead(e?.participants[e?.participants[0]?._id === loggedUser?._id ? 1 : 0]?._id)}} key={index} className='w-full h-16 gap-3 flex cursor-pointer justify-between py-4'>
                        <img src="src\assets\ai-generated-8249225_1280.jpg" alt="" className='w-12 rounded-full md:w-16 md:h-16 h-12 object-cover'/>
                        <span className='flex w-[90%] flex-col gap-1'>
                            <span className='flex justify-between w-full h-auto'><b className='font-semibold text-md font-sans tracking-wider text-gray-200'>{Object.keys(e).length && e?.participants[e?.participants[0]?._id === loggedUser?._id ? 1 : 0]?.name}</b> <i className='text-gray-500 text-xs'>{e?.messages?.length && `${createdAt(e?.messages[e?.messages?.length - 1]?.createdAt)}` !== "undefined" ? `${createdAt(e?.messages[e?.messages?.length - 1]?.createdAt)}` : "just now"}</i></span>
                            <span className='flex justify-between w-full h-auto'>
                                <b className='font-semibold flex gap-1 items-center text-md font-sans tracking-wider text-gray-200'>
                                    <i>{Object.keys(e).length && e?.messages[e?.messages?.length - 1]?.senderId === loggedUser?._id ? StatusTypeIcon(e?.messages[e?.messages?.length - 1]?.status) : ""}</i>
                                    <b>{Object.keys(e).length && e?.messages[e?.messages?.length - 1]?.message}</b>
                                </b>
                                <i className={`text-blue-200 w-6 flex justify-center items-center ${returnUnreadMessages(e?.messages) > 0 ? "block" : "hidden"} h-6 rounded-full bg-blue-800 text-xs`}>{returnUnreadMessages(e?.messages)}</i></span>
                            
                        </span>
                    </Link>
                )
            })}

    </div>
</>
  )
}
