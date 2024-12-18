import { useState } from "react"
import { ContextAPI } from "../ContextApi"

export const useAuth = async () => {
    const {loggedUser} = ContextAPI()
    const [loading, setLoading] = useState(false)

    const AuthUser = async (login, data, setShow) => {
        try{
            console.log("ths is the inpuet benene", data)

        const res = await fetch(`http://localhost:7000/api/auth/${login ? "login" : "signup"}`, {
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({
            ...data
          })
        })

        if(!res.ok){
          setShow(true)
          setAlertType("bad")
        } else {
          const logged_user = await res.json()
          console.log("ths is the logged-user", logged_user?.loggedUser)
          localStorage.setItem("logged-user", JSON.stringify(logged_user?.loggedUser))
          console.log("this is the localStorage", loggedUser)
          setShow(true)
          setAlertType("good")
        }

      }catch(error){
        console.log(error)
      }finally{
            setLoading(false)
        }
    }

    return {loading, AuthUser}
}