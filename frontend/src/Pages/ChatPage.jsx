import React, {useEffect, useRef, useState, } from 'react'
import { ContextAPI } from '../ContextApi'
import { useSocketContext } from '../SocketContext'
import {IoIosSend} from "react-icons/io"
import { Navigate, useParams } from 'react-router-dom'
import { useListenMessages } from '../Hooks/useListenMessages'
import {MdChatBubble} from "react-icons/md"
import {IoCheckmarkDone} from "react-icons/io5"
import {IoMdCheckmark} from "react-icons/io"
import { useReadMessage } from '../Hooks/useReadMessage'
import { useReadAllMessages } from '../Hooks/useReadAllMessages'
import { AddOrUpdate } from '../Utils/AddOrUpdate'

const MessageChatCom = ({status, data}) => {

    const StatusTypeIcon = () => {
        if(data?.status === "sent"){
            return <span className="text-gray-400 text-xl"><IoMdCheckmark /></span>
        }
        else if(data?.status === "received"){
                return <span className="text-gray-400 text-xl"><IoCheckmarkDone /></span>
        } else if(data?.status === "read"){
                return <span className="text-blue-400 text-xl"><IoCheckmarkDone /></span>
        }
        else{
            return <span className="text-gray-400 text-xl"><IoMdCheckmark /></span>
        }
    }

    useListenMessages()
    return (<>
            <div className={`chat my-2 list-none ${status === "left" ? "chat-start" : "chat-end"} flex flex-col`}>
                <div className={`chat-bubble chat-bubble-primary text-wrap min-h-8`}>
                    <div className='min-w-16 flex flex-col text-center justify-center p-1 break-words min-h-8 overflow-hidden'>
                            {data?.message}
                    </div>
                </div>
                <div className={`items-center  ${status === "right" ? "block" : "hidden"} text-gray-400 flex gap-2`}>
                    {data?.createdAt.slice(11,16)} {<StatusTypeIcon />}
                </div>
            </div>
        </>

    )
}

export const ChatPage = () => {
    useReadAllMessages()
    useReadMessage()
    useListenMessages()
    const {id} = useParams()
    const [inputText, setInputText] = useState({placeholder:"", mainholder:""})
    const {messages, setMessages, dbUsers, socket, typing, setTyping} = useSocketContext()
    const {selectedChat, loggedUser, setSelectedChat, allConversations, setAllConversations,} = ContextAPI()
    const lastChatMessageRef = useRef(null)
    const chatDivRef = useRef(null)

    /* const fetchMessages = async () => {
        console.log("ITS TIME TO FETCH CONVERSSATION >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
            try{
                    const res = await fetch(`http://localhost:7000/api/message/getconversation?chatUser=${id}`, {
                    method:"GET",
                    credentials:"include"
                    })
                    if(!res.ok) throw new Error(res)

                    const data = await res.json()

                    console.log("thisis the conversation messages", data?.conversation?.messages)
                    //AddOrUpdate(messages, data?.conversation?.messages, setMessages)
                    setMessages(data?.conversation?.messages)
                    
                    socket?.emit("seenchannelmessage", messages)

            } catch(error){
                console.log(error)
            }finally{
                setInputText("")
            }
        } */


    useEffect(() => {
            setTimeout(() => {
                    if(lastChatMessageRef.current){
            lastChatMessageRef.current.scrollIntoView({behavior:"smooth",
                block:'end'
            })
        }
            }, 50)
    }, [Object.keys(selectedChat).length, allConversations])

    const sendMessage = async (e) => {
        console.log("the send Message function isworking....")
        const text = inputText.mainholder
        e.preventDefault()
        if(Object.keys(selectedChat).length > 0){
            try{
            
             const res = await fetch(`http://localhost:7000/api/message/sendmessage?receiverId=${selectedChat?.participants[selectedChat?.participants[0]?._id === loggedUser?._id ? 1 : 0]?._id}`, {
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({
                    text
                }),
                credentials:"include"
            })

            if(!res.ok){
                throw new Error (res)
            }

            const newMessage = await res.json()
            console.log("Da Da Da : ", newMessage)
            if(Object.keys(newMessage).length > 0){
                const newConversations = allConversations.map(e => e.participants[e?.participants[0]?._id === loggedUser?._id ? 1 : 0]?._id === newMessage?.receiverId ? {...e, messages:AddOrUpdate(e.messages, newMessage)} : e)
                console.log("this is the newConversation", newConversations)
                setAllConversations(newConversations)
            }
            

            

        }catch(error){
            console.log("this is the error from the sendMessage func", error)
        }
        }
    }


    const fromMe = (e) => {
        const status = e?.senderId === loggedUser?._id
        return status;

    }

  return (
    <>
    <div key={selectedChat?._id} className='w-full pt-16 min-h-screen dark:bg-gray-950'>
      <form onSubmit={sendMessage} className={`w-full h-full ${Object.keys(selectedChat).length !== 0 ? "block" : "hidden"} flex justify-center`}>
  
    
    <div className="relative w-full h-full my-12 lg:pr-32 pb-10 rounded-md overflow-hidden p-5">
        <div ref={chatDivRef} className="flex flex-col  h-auto w-full">
                {selectedChat?.messages?.length  ? selectedChat?.messages?.map(e => {
                    return <MessageChatCom status={fromMe(e) ? "right" : "left"} data={e} />
                }) : (
                <p className='w-full h-auto flex flex-col justify-center items-center text-center text-xl text-yellow-400...'> 
                        <span className='text-primary text-[20rem]'><MdChatBubble /></span> <span className='text-blue-400'>{`start a conversation with ${Object.keys(selectedChat).length > 0 && selectedChat?.participants[1]?.name}`}</span>
                </p>)}
                <div ref={lastChatMessageRef} className='h-24 justify-between items-center px-10 border-b-[1px] border-b-primary my-10 flex w-full bg-transparent'>
                
                </div>
                <p className="text-primary tracking-widest text-center">&copy; wixy</p>

         </div>
        <div className='w-[90%] lg:w-1/2 flex rounded-xl overflow-hidden left-1/2 transform -translate-x-1/2 z-20 border-[1px] fixed focus:border-accent dark:focus:border-accent focus:ring-accent focus:ring-opacity-40 focus:outline-none focus:ring bottom-5 h-10 bg-gray-900'>
            <textarea value={inputText.placeholder} onChange={(e) => setInputText({placeholder:e.target.value, mainholder:e.target.value})} type="text" className="w-[85%] overflow-hidden resize-none lg:w-[93%] pt-1.5 pb-2 pl-4 pr-2 h-full text-gray-700 bg-white border-0 outline-0 rounded-md dark:bg-gray-900 dark:text-gray-300" placeholder="send a message..." />
            <button onClick={() => setInputText({...inputText, placeholder:""})} className='text-blue-600 right-5 top-1/2 cursor-pointer transform -translate-y-1/2 absolute text-2xl' type='submit'><IoIosSend /></button>
        </div>
    </div>
</form>
    </div>
    </>
  )
}
