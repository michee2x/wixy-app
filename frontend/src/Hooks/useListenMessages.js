import { useSocketContext } from "../SocketContext"
import { useEffect } from "react"

export const useListenMessages = () => {
    const {socket, messages, setMessages} = useSocketContext()

    useEffect(() => {
            socket?.on("newMessage", (newMessage) => {
                console.log("message from frontend", newMessage);
                setMessages([...messages, newMessage])
            })

            return () => socket?.off("newMessage")
    }, [socket, setMessages, messages])
}

