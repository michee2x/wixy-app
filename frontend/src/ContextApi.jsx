import React, {createContext, useContext, useState} from "react"

const Context = createContext()

export const ContextAPI = () => {
    return useContext(Context)
}

export const ContextProvider = ({children}) => {
    const [showSideBar, setShowSideBar] = useState(false);
const [showCookie, setShowCookie] = useState(false);


    return <Context.Provider value={{showSideBar, setShowSideBar, showCookie, setShowCookie}}>
{children}
    </Context.Provider>
}