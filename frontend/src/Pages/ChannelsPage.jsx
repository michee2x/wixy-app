import React, {useEffect, useState, useRef} from 'react'
import { ContextAPI } from '../ContextApi'
import {useListenMessages} from "../Hooks/useListenMessages"
import { useSocketContext } from '../SocketContext'
import { Link } from 'react-router-dom'

const MessageChatCom = ({status, data}) => {
    useListenMessages()
    return (
        <>
        {status === "right" && <div id="leftMsg" className="flex justify-start flex-row-reverse items-center mt-8">
                <img src="https://github.com/mojombo.png?size=56" className="h-12 w-12  border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-3 opacity-90" alt="User avatar"/>
                <div className="w-[400px] min-h-[56px] bg-[#030303] border border-1 border-zinc-300 border-opacity-30 rounded-md flex items-start px-2 py-2 text-zinc-300 relative">
                {data?.message}
                <div className="absolute -bottom-6 left-0 text-zinc-600 text-sm">
                    Sent at {data?.createdAt}
                </div>
                </div>
            </div>
}

           {status === "left" && <div id="leftMsg" className="flex justify-start items-center mt-8">
                <img src="https://github.com/mojombo.png?size=56" className="h-12 w-12  border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-3 opacity-90" alt="User avatar"/>
                <div className="w-[400px] min-h-[56px] bg-[#030303] border border-1 border-zinc-300 border-opacity-30 rounded-md flex items-start px-2 py-2 text-zinc-300 relative">
                {data?.message}
                <div className="absolute -bottom-6 left-0 text-zinc-600 text-sm">
                    Sent at {data?.createdAt}
                </div>
                </div>
            </div>
}
        </>

    )
}

export const ChannelsPage = () => {
    const {messages, setMessages, dbUsers} = useSocketContext()
    const [text, setText] = useState("")
    const {selectedChat, loggedUser, setSelectedChat} = ContextAPI()
    const receiverId = selectedChat?._id


    useEffect(() => {
        const fetchMessages = async () => {
            console.log("thisis the receiverID oooo: ", receiverId)
            try{
                const res = await fetch(`http://localhost:7000/api/message/getconversation?chatUser=${receiverId}`, {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok) throw new Error(res)

                const data = await res.json()

                console.log("thisis the conversation messages hahaha", data?.conversation?.messages)
                setMessages(data?.conversation?.messages)

            } catch(error){
                console.log(error)
            }
        }

    }, [selectedChat, messages])




   /*  {       
bio:"",
bookmark:[],
createdAt:"2024-12-12T12:59:42.407Z",
email:"m@m",
followers:[],
following:[],
isVerified:false,
link:"",
name:"michee",
password:"$2a$10$PrvyklMLTIjBN9ZngQjriOI1K9ihKeO/eO4R6CJVqLXlIzFwcYjfK",
profilepic:"",
updatedAt:"2024-12-12T12:59:42.407Z,
username:"michee2x",
__v:0,
_id:"675ade3dffa65c72be67ac7c"
    } */

  return (
    <>
    <div className={`w-full flex flex-col gap-4 lg:gap-6 pt-24 min-h-screen md:px-16 dark:bg-gray-900 bg-gray-100`}>
    {dbUsers && dbUsers?.map((e, index) => {
                return (
                    <Link to={`/chat/${e._id}`} key={index} className='w-full h-16 gap-3 flex cursor-pointer justify-between p-4'>
                        <img src="src\assets\ai-generated-8249225_1280.jpg" alt="" className='w-12 rounded-full md:w-16 md:h-16 h-12 object-cover'/>
                        <span className='flex w-[90%] flex-col gap-1'>
                            <span className='flex justify-between w-full h-auto'><b className='font-semibold text-md font-sans tracking-wider text-gray-200'>{e?.name}</b> <i className='text-gray-500 text-xs'>4:33 AM</i></span>
                            <span className='text-gray-500 font-bold'>what's up bro</span>
                        </span>
                    </Link>
                )
            })}

    </div>
</>
  )
}
