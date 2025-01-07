import {IoCheckmarkDone} from "react-icons/io5"
import {IoMdCheckmark} from "react-icons/io"

export const MessageChatCom = ({status, data}) => {

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