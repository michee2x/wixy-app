import React, {createContext, useContext, useState, useEffect} from "react"
import useFetchConversations from "./Hooks/useFetchConversations"
import { useGetMyCart } from "./Hooks/useGetMyCart"

const Context = createContext()

export const ContextAPI = () => {
    return useContext(Context)
}

export const ContextProvider = ({children}) => {
    const APIOrigin = "https://wixy-backend.onrender.com"
    const [cart, setCart] = useState({})
    const [lastChat, setLastChat] = useState("")
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("logged-user")) || null)
    const [showSideBar, setShowSideBar] = useState(false);
    const [showCookie, setShowCookie] = useState(false);
    const [darkmode,setDarkMode] = useState(true)
    const [selectedChat, setSelectedChat] = useState({})
    const [chatMode, setChatMode] = useState(false)
    const [loading, setLoading] = useState(false)
    const [allConversations, setAllConversations] = useState([])
    const [selectedProduct, setSelectedProduct] = useState({})

    useGetMyCart(setCart)

    /* useEffect(() => {
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
              
                    } catch(error){
                      console.log(error)
                    }
              }
          
                if(Object.keys(loggedUser).length){
                    fetchEveryConversation()
                }
        }, [Object.keys(loggedUser).length])
     */

    return <Context.Provider value={{
        APIOrigin,
        cart,
        lastChat, 
        setLastChat,
        setCart,
        selectedProduct,
        setSelectedProduct,
        allConversations, 
        setAllConversations,
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