import React, {createContext, useContext, useState} from "react"

const Context = createContext()

export const ContextAPI = () => {
    return useContext(Context)
}

export const ContextProvider = ({children}) => {
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("logged-user")) || null)
    const [showSideBar, setShowSideBar] = useState(false);
    const [showCookie, setShowCookie] = useState(false);
    const [darkmode,setDarkMode] = useState(true)
    const [selectedChat, setSelectedChat] = useState({})
    const [chatMode, setChatMode] = useState(false)
    const [loading, setLoading] = useState(false)

    return <Context.Provider value={{
        loading,
        setLoading,
        chatMode,
        setChatMode,
        showSideBar,
        selectedChat, 
        setSelectedChat,
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