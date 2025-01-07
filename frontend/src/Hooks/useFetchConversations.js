import React, {useEffect} from 'react'
import { ContextAPI } from '../ContextApi'

const useFetchConversations = () => {
    /* const {allConversations, setAllConversations} = ContextAPI()

    return useEffect(() => {
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
  
        fetchEveryConversation()
    }, []) */
}

export default useFetchConversations