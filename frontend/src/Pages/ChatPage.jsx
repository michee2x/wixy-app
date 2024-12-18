import React, {useState} from 'react'
import { ContextAPI } from '../ContextApi'
import {IoIosSend} from "react-icons/io"

const ChatPage = () => {
    const [text, setText] = useState("")
    const {selectedChat} = ContextAPI()
    console.log("thisis the object", selectedChat)
  return (
    <>
    {Object.keys(selectedChat).length !== 0 ?
        <div className="w-full h-full bg-gray-900 flex justify-center">
    <div className=" bg-gray-900 relative w-full h-full my-12 pb-10 rounded-md overflow-hidden p-5">
        <div className="flex flex-col w-full">

            <div id="rightMsg" className="flex justify-end items-center">
                <div className="w-[400px] bg-[#030303] border border-1 border-zinc-300 border-opacity-30 rounded-md flex items-center px-2 py-2 text-zinc-300 relative">
                    Hey, we just completed the landing page. Any thoughts?
                    <div className="absolute -bottom-6 right-0 text-zinc-600 text-sm">
                        Sent at 2:50pm
                    </div>
                </div>
                <img src="https://github.com/thomas5.png?size=56" className="h-12 w-12border-[1px] border-zinc-300 border-opacity-50 rounded-full ml-3 opacity-90 pl-[1px]"/>
            </div>

            <div id="leftMsg" className="flex justify-start items-center mt-8">
                <img src="https://github.com/mojombo.png?size=56" className="h-12 w-12 border border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-3 opacity-90" alt="User avatar"/>
                <div className="w-[400px] min-h-[56px] bg-[#030303] border border-1 border-zinc-300 border-opacity-30 rounded-md flex items-start px-2 py-2 text-zinc-300 relative">
                Hey, I just reviewed the landing page. It looks great! What's next?
                <div className="absolute -bottom-6 left-0 text-zinc-600 text-sm">
                    Sent at 3:05pm
                </div>
                </div>
            </div>

            <div id="rightMsg" className="flex justify-end items-center mt-8">
                <div className="w-[400px] bg-[#030303] border border-1 border-zinc-300 border-opacity-30 rounded-md flex items-center px-2 py-2 text-zinc-300 relative">
                    We are going to start work on the contact us form, using that agreed upon design.
                    <div className="absolute -bottom-6 right-0 text-zinc-600 text-sm">
                        Sent at 3:07pm
                    </div>
                </div>
                <img src="https://github.com/thomas5.png?size=56" className="h-12 w-12 border border-[1px] border-zinc-300 border-opacity-50 rounded-full ml-3 opacity-90 pl-[1px]"/>
            </div>

            <div id="leftMsg" className="flex justify-start items-center mt-8">
                <img src="https://github.com/mojombo.png?size=56" className="h-12 w-12 border border-[1px] border-zinc-300 border-opacity-50 rounded-full mr-3 opacity-90" alt="User avatar"/>
                <div className="w-[400px] min-h-[56px] bg-[#030303] border border-1 border-zinc-300 border-opacity-30 rounded-md flex items-start px-2 py-2 text-zinc-300 relative">
                This is all looking awesome! I look forward to our review meeting tommorow at 11:00am.
                <div className="absolute -bottom-6 left-0 text-zinc-600 text-sm">
                    Sent at 3:12pm
                </div>
                </div>
            </div>

        </div>

        <div className='w-[90%] lg:w-1/2 flex rounded-xl overflow-hidden left-1/2 transform -translate-x-1/2 z-20 border-[1px] fixed focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring bottom-5 h-10 bg-gray-900'>
            <textarea value={text} onChange={(e) => setText(e.target.value)} type="text" className="w-[85%] overflow-hidden resize-none lg:w-[93%] pt-1.5 pb-2 pl-4 pr-2 h-full text-gray-700 bg-white border-0 outline-0 rounded-md dark:bg-gray-900 dark:text-gray-300" placeholder="send a message..." />
            <span className='text-blue-600 right-5 top-1/2 cursor-pointer transform -translate-y-1/2 absolute text-2xl'><IoIosSend /></span>
        </div>
    </div>
</div> : <div className='w-full min-h-screen flex items-center justify-center text-gray-900 dark:text-gray-200 dark:bg-gray-900'>
    <p>Start a conversation...</p>
    </div>}
</>
  )
}

export default ChatPage
