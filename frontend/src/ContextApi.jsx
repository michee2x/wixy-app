import React, {createContext, useContext, useState, useEffect} from "react"

const Context = createContext()

export const ContextAPI = () => {
    return useContext(Context)
}

export const ContextProvider = ({children}) => {
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("logged-user")) || null)
    const [showSideBar, setShowSideBar] = useState(false);
    const [showCookie, setShowCookie] = useState(false);
    const [darkmode,setDarkMode] = useState(true)
    const [chats, setChats] = useState({
        chatMode:false,
        contact:[
            {name:"david", roomId:"123", lastMessage:"how far. what's up..", profilePic:""},
            {name:"michael", roomId:"123", lastMessage:"how far. what's up..", profilePic:""},
            {name:"bomo", roomId:"123", lastMessage:"how far. what's up..", profilePic:""},
            {name:"faith", roomId:"123", lastMessage:"how far. what's up..", profilePic:""}
        ]
    })
    const [selectedChat, setSelectedChat] = useState({})

    return <Context.Provider value={{
        showSideBar,
        selectedChat, 
        setSelectedChat, 
        chats, 
        setChats, 
        loggedUser, 
        setLoggedUser, 
        setShowSideBar, 
        darkmode, 
        setDarkMode, 
        showCookie, 
        setShowCookie}}>
{children}
    </Context.Provider>
}