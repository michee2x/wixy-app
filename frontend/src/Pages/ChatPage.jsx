import React, {useEffect, useState, } from 'react'
import { ContextAPI } from '../ContextApi'
import { useSocketContext } from '../SocketContext'
import {IoIosSend} from "react-icons/io"
import { Navigate, useParams } from 'react-router-dom'
import { useListenMessages } from '../Hooks/useListenMessages'
import {MdChatBubble} from "react-icons/md"

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

export const ChatPage = () => {
    useListenMessages()
    const {id} = useParams()
    const [inputText, setInputText] = useState("")
    const [text, setText] = useState("")
    const {messages, setMessages, dbUsers} = useSocketContext()
    const {selectedChat, loggedUser, setSelectedChat} = ContextAPI()

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

    /* if(!Object.keys(selectedChat).length){
        return <Navigate to={"/channels"}/>
    } */


  return (
    <div className='w-full pt-16 min-h-screen dark:bg-gray-900'>
      <form onSubmit={sendMessage} className={`w-full h-full ${Object.keys(selectedChat).length !== 0 ? "block" : "hidden"} bg-gray-900 flex justify-center`}>
  
    
    <div className=" bg-gray-900 relative w-full h-full my-12 pb-10 rounded-md overflow-hidden p-5">
        <div className="flex flex-col h-auto w-full">
                {messages.length ? messages?.map(e => {
                    return <MessageChatCom status={fromMe(e) ? "right" : "left"} data={e} />
                }) : (
                <p className='w-full h-auto flex flex-col justify-center items-center text-center text-xl text-yellow-400...'> 
                        <span><MdChatBubble /></span> <span>{`start a conversation with ${selectedChat?.name}`}</span>
                </p>)}
         </div>

        <div className='w-[90%] lg:w-1/2 flex rounded-xl overflow-hidden left-1/2 transform -translate-x-1/2 z-20 border-[1px] fixed focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring bottom-5 h-10 bg-gray-900'>
            <textarea value={inputText} onChange={(e) => {setInputText(e.target.value); setText(e.target.value)}} type="text" className="w-[85%] overflow-hidden resize-none lg:w-[93%] pt-1.5 pb-2 pl-4 pr-2 h-full text-gray-700 bg-white border-0 outline-0 rounded-md dark:bg-gray-900 dark:text-gray-300" placeholder="send a message..." />
            <button onClick={() => setInputText("")} className='text-blue-600 right-5 top-1/2 cursor-pointer transform -translate-y-1/2 absolute text-2xl' type='submit'><IoIosSend /></button>
        </div>
    </div>
</form>
    </div>
  )
}
