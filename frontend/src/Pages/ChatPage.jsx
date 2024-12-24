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
    useReadMessage()
    useListenMessages()
    const [laoding, setLoading] = useState(false)
    const {id} = useParams()
    const [inputText, setInputText] = useState("")
    const [text, setText] = useState("")
    const {messages, setMessages, dbUsers, socket} = useSocketContext()
    const {selectedChat, loggedUser, setSelectedChat} = ContextAPI()
    const lastChatMessageRef = useRef(null)

    useEffect(() => {

        const addOrUpdate = (array, newObject) => {
            //find the index of the object with thesame id
            const index = array.findIndex(obj => obj._id === newObject._id)

            if(index > -1){
                //if found, merge the existing object with the new one
                array[index] = {...array[index], ...newObject};
            } else {
                //if not found, add the new object to the array
                array.push(newObject)
            }

            setMessages(array)
        }
        socket?.on("receivedMessage", (data) => {
            const {unReadConversation, selected} = data;
            if(selectedChat._id === selected){
                for(let i=0; i<=unReadConversation.length-1; i++){
                    const message = unReadConversation[i]
                    addOrUpdate(messages, message)
                }
            }
        })
        
        socket?.on("readChat", data => {
            console.log("HEY ALL THE MESSAGES ARE READ", data)
            setMessages([...messages, ...data])
        })

        return () => {
            socket?.off("receivedMessage")
            socket?.off("readChat")
        }
    }, [messages, socket, selectedChat])

    useEffect(() => {
            setTimeout(() => {
                    if(lastChatMessageRef.current){
            lastChatMessageRef.current.scrollIntoView({behavior:"smooth",
                block:'end'
            })
        }
            }, 500)
    }, [messages])

    const sendMessage = async (e) => {
        console.log("the send Message function isworking....", text, id)
        e.preventDefault()
        if(id){
            try{
             
             const res = await fetch(`http://localhost:7000/api/message/sendmessage?receiverId=${id}`, {
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

            const data = await res.json()
            setMessages([...messages, data])
            //scrollToLastMessage()
            console.log("this is the data from sendMesageFunc", data)
            

            

        }catch(error){
            console.log("this is the error from the sendMessage func", error)
        }
        }
    }

    useEffect(() => {
        const particularUser = dbUsers?.find(e => e._id === id)

        if(particularUser){
            setSelectedChat(particularUser)
        }
console.log("thsi is rh conversaton for paruser", messages)

        const fetchMessages = async () => {
            console.log("thisis the receiverID oooo: ", id)
            try{
                const res = await fetch(`http://localhost:7000/api/message/getconversation?chatUser=${id}`, {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok) throw new Error(res)

                const data = await res.json()

                console.log("thisis the conversation messages", data?.conversation?.messages)
                setMessages(data?.conversation?.messages)

            } catch(error){
                console.log(error)
            }finally{
                setInputText("")
            }
        }

        fetchMessages()

    }, [])


    const fromMe = (e) => {
        const status = e?.senderId === loggedUser?._id
        return status;

    }

    if(!selectedChat){
        setTimeout(() => {
            return <Navigate to="/channels" />
        }, 10)
    }

  return (
    <>
    <div className='w-full pt-16 min-h-screen dark:bg-gray-950'>
      <form onSubmit={sendMessage} className={`w-full h-full ${Object.keys(selectedChat).length !== 0 ? "block" : "hidden"} flex justify-center`}>
  
    
    <div className="relative w-full h-full my-12 pb-10 rounded-md overflow-hidden p-5">
        <div className="flex flex-col lg:mx-auto lg:w-[65rem] h-auto w-full">
                {messages?.length  ? messages?.map(e => {
                    return <MessageChatCom status={fromMe(e) ? "right" : "left"} data={e} />
                }) : (
                <p className='w-full h-auto flex flex-col justify-center items-center text-center text-xl text-yellow-400...'> 
                        <span className='text-accent text-[20rem]'><MdChatBubble /></span> <span className='text-accent'>{`start a conversation with ${selectedChat?.name}`}</span>
                </p>)}
                <div ref={lastChatMessageRef} className='h-24 justify-between items-center px-10 border-b-[1px] border-b-primary my-10 flex w-full bg-transparent'>
                
                </div>
                <p className="text-primary tracking-widest text-center">&copy; wixy</p>

         </div>
        <div className='w-[90%] lg:w-1/2 flex rounded-xl overflow-hidden left-1/2 transform -translate-x-1/2 z-20 border-[1px] fixed focus:border-accent dark:focus:border-accent focus:ring-accent focus:ring-opacity-40 focus:outline-none focus:ring bottom-5 h-10 bg-gray-900'>
            <textarea value={inputText} onChange={(e) => {setInputText(e.target.value); setText(e.target.value)}} type="text" className="w-[85%] overflow-hidden resize-none lg:w-[93%] pt-1.5 pb-2 pl-4 pr-2 h-full text-gray-700 bg-white border-0 outline-0 rounded-md dark:bg-gray-900 dark:text-gray-300" placeholder="send a message..." />
            <button onClick={() => setInputText("")} className='text-blue-600 right-5 top-1/2 cursor-pointer transform -translate-y-1/2 absolute text-2xl' type='submit'><IoIosSend /></button>
        </div>
    </div>
</form>
    </div>
    </>
  )
}
