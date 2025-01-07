import React, { useEffect, useState } from 'react'
import { BreadCrumb } from '../Components/BreadCrumb'
import {MdPerson, MdCancel, MdFmdGood} from "react-icons/md"
import {IoMdCheckmark} from "react-icons/io"
import {FaXmark} from "react-icons/fa6"
import toast from 'react-hot-toast'
import { ContextAPI } from '../ContextApi'

export const InvitationPage = () => {
  const [sent, setSent] = useState(true);
  const {loggedUser, setLoggedUser} = ContextAPI()
  const [request, setRequest] = useState({})

  useEffect(() => {
    const getMyRequests = async () => {
         try{
                    const res = await fetch(`http://localhost:7000/api/user/requests`, {
                    method:"GET",
                    credentials:"include"
                    })
                    if(!res.ok) throw new Error(res)

                    const data = await res.json()
                    setRequest(data?.requests)

            } catch(error){
                console.log(error)
            }
        }

        getMyRequests()
  },  [])

  const createConversation = async (_id) => {
    try{
        const res = await fetch(`http://localhost:7000/api/message/createconversation?receiverId=${_id}`, {
          method:"GET",
          credentials:"include"
        })

        if(!res.ok){
          throw new Error(res)
        }
        const {requests} = await res.json()
        console.log("this is thefucking request", requests)
        if(Object.keys(request).length > 0){
          toast.success("connection request accepted successfully...")
          setRequest(requests)
          console.log("this is the updated request after creating a conversatio n with someone", requests)
        }

    }catch(error){
      console.log("there was an error in createconverstion func", error)
    }
  }
  /* const removeItem = (_id) => {
    const newArray = loggedUser?.unacceptedConnectRequests?.filter(e => e !== _id)
    const newUser = {...loggedUser, unacceptedConnectRequests:newArray}
    console.log("new User", request)
    setLoggedUser(newUser)
    const newRequestArray = request?.unacceptedConnectRequests?.filter(e => e !== _id)
    const newRequest = {...request, unacceptedConnectRequests:newRequestArray}
    setRequest(newRequest)
    console.log("new request", newRequest)
  } */

  console.log("thsi is itttt", request?.sentConnectionRequest)

  return (
    <div className='w-full pt-16 min-h-screen dark:bg-gray-950'>
      <div className='px-4'>
        <BreadCrumb history={[{name:"My Network", link:"/network", current:false}, {name:"Invitation", current:true, link:`/invitation`}]} />
    </div>

    <div className='w-full text-gray-200 mb-6 h-16 justify-between gap-2 flex'>
      <span onClick={() => setSent(true)} className={`w-1/2 flex items-center py-6 justify-center h-full border-b-[.5px] ${sent ? "border-blue-300" : "border-gray-500"} border-gray-500`}>sent</span>
      <span onClick={() => setSent(false)} className={`w-1/2 flex items-center py-6 justify-center h-full border-b-[.5px] ${!sent ? "border-blue-300" : "border-gray-500"} border-gray-500`}>received</span>
    </div>

    {Object.keys(request).length > 0 && (
      <>
        <div className={`w-full h-auto ${sent ? "block" : "hidden"} flex flex-col`}>
      {request?.sentConnectionRequest.map(e => {
        return <div className="w-full p-4 border-b-[.5px] border-gray-800 min-h-16 flex gap-2">
                  <span className='text-3xl w-10 h-10 bg-primary rounded-full text-blue-300 flex items-center justify-center'><MdPerson /></span>
                  <div className="flex flex-col w-[70%] h-full">
                    <p className='text-gray-200 text-[15px]'>
                      You sent <span className='font-bold '>{e?.name}</span> a connection  request
                    </p>
                    <p className="text-gray-300">{e?.bio}</p>
                  </div>
                  <div className='w-[20%] justify-end h-full flex gap-1'>
                    <span className='text-xl w-8 border-blue-300 h-8 border-[.9px] rounded-full flex items-center justify-center text-blue-500'><FaXmark /></span>
                  </div>
                </div>
      })}
    </div>

    <div className={`w-full h-auto ${!sent ? "block" : "hidden"} flex flex-col`}>
      {request?.unacceptedConnectRequests.map(e => {
        return <div className="w-full p-4 border-b-[.5px] border-gray-800 min-h-16 flex gap-2">
                  <span className='text-3xl w-10 h-10 bg-primary rounded-full text-blue-300 flex items-center justify-center'><MdPerson /></span>
                  <div className="flex flex-col w-[70%] h-full">
                    <p className='text-gray-200 text-[15px]'>
                      <span className='font-bold '>{e?.name}</span> follows you and is inviting you to connect
                    </p>
                    <p className="text-gray-300">{e?.bio}</p>
                  </div>
                  <div className='w-[20%] justify-end h-full flex gap-1'>
                    <span onClick={() => removeItem(e._id)} className='text-xl w-8 border-blue-300 h-8 border-[.9px] rounded-full flex items-center justify-center text-blue-500'><FaXmark /></span>
                    <span onClick={() => createConversation(e._id)} className='text-xl w-8 border-blue-300 h-8 border-[.9px] rounded-full flex items-center justify-center text-blue-500'><IoMdCheckmark /></span>
                  </div>
                </div>
      })}
    </div>
      </>
    )}
    </div>
  )
}
