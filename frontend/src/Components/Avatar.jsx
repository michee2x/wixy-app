import React from 'react'
import {MdPerson} from "react-icons/md"
import { useSocketContext } from '../SocketContext'

const Avatar = ({user}) => {
    const {onlineUsers, socket, setOnlineUsers, dbUsers, setDbUsers} = useSocketContext()
    const isOnline = onlineUsers.includes(user?._id)

  return (
    <div key={user?._id}>
        {user?.profilePic && <div className={`avatar ${isOnline ? "online" : "offline"} `}>
  <div className="w-24 rounded-full">
    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
  </div>
</div>}

{!user?.profilePic && (<div className={`avatar ${isOnline ? "online" : "offline"} placeholder`}>
  <div className="bg-neutral text-neutral-content w-16 rounded-full">
    <span className="text-xl">{user?.name?.slice(0,1)?.toUpperCase()}</span>
  </div>
</div>)}
    </div>
  )
}

export default Avatar
