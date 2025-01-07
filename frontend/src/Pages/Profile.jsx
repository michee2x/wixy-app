import React, {useRef, useState, useEffect}  from "react";
import { ContextAPI } from "../ContextApi";
import {MdBusiness, MdStoreMallDirectory, MdLocationOn, MdMail, MdPerson, MdShare, MdLink, MdInfo, MdCall} from "react-icons/md"
import {BsCamera, BsGlobe} from "react-icons/bs"
import {IoPencil, IoPencilSharp} from "react-icons/io5"
import toast from "react-hot-toast"
import { useParams } from "react-router-dom";



export const ProfilePage = () => {
    const [loading, setLoading] = useState(false)
    const {id:userId} = useParams(null)
    const [editing, setEditing] = useState(false)
    const {loggedUser, setLoggedUser} = ContextAPI()
    const [file, setFile] = useState({profilepic:null, profilecover:null})
    const [previewURL, setPreviewURL] = useState({profilepic:null, profilecover:null})
    const picRef = useRef(null)
    const coverRef = useRef(null)
    const [user, setUser] = useState({})
    const [editMode, setEditMode] = useState({})
    const Options = [
        {icon:<MdPerson />, title:`${user?.name}`, desc:"name", field:"name"},
        {icon:<MdPerson />, title:`${user?.username}`, desc:"username", field:"username"},
        {icon:<MdLocationOn />, title:`${user?.address || "no address"}`, desc:"Address", field:"address"},
        {icon:<BsGlobe />, title:`${user?.website || "no website"}`, desc:"website", field:"website"},
        {icon:<MdMail />, title:`${user?.email}`, desc:"Email", desc:"email", field:"email"},
        {icon:<MdStoreMallDirectory />, title:`${user?.desc || "no description"}`, desc:"description", field:"desc"},
        {icon:<MdCall />, title:`${user?.number || "no phone number"}`, desc:"phone NO.", field:"number"}
    ]
    const [editInfo, setEditInfo] = useState("")

    useEffect(() => {
        const fetchOtherUsers = async () => {
                console.log("this is the id to get the userprofile", userId)
            try{
                const res = await fetch(`http://localhost:7000/api/user/userprofile/${userId}`, {
                    method:"GET",
                    credentials:"include"
                })
                if(!res.ok){
                    const {error} = await res.json()
                    toast.error(error)
                }

                const {userProfile} = await res.json()
                if(Object.keys(userProfile).length){
                    setUser(userProfile)
                }
            } catch(err){
                console.log("ERR in fetchOtherUsers", err)
            }
        }

        if(Object.keys(loggedUser).length){
        if(userId === loggedUser?._id){
            setUser(loggedUser)
            console.log("its has been set firend", user)
        } else {
            fetchOtherUsers()
            console.log("we have to fetvh otehr users", user)
        }
        }
    }, [Object.keys(loggedUser).length, loading])

    const handleFileChange = async (e, field) => {
        console.log(":ITS IS TIME TO GET THE FILE", e?.target?.files)
        const file = e?.target?.files[0];
        if(file){
            setFile({...file, [field]:file});
            const objectUrl = URL.createObjectURL(file);
            console.log("thisis the blob", objectUrl)
            setPreviewURL({...previewURL, [field]:objectUrl})


            try{
            console.log("This is the edit profile info", {[field]:objectUrl})
            setLoading(true)
            const Update = {[field]:objectUrl}


             const res = await fetch("http://localhost:7000/api/user/updateProfile", {
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({
                    Update
                }),
                credentials:"include"
            })

            if(!res.ok){
                const {error} = await res.json()
                toast.error(error)
            }

            const {updatedUser} = await res.json()
            if(Object.keys(loggedUser).length){
                toast.success("Profile update successfully!")
                localStorage.setItem("logged-user", JSON.stringify(updatedUser))
                setLoggedUser(updatedUser)
                setUser(updatedUser)
                setLoading(false)
            }
        } catch (error) {
            console.log("error in EditProfile func", error)
        } finally {
            setEditInfo("")
        }
        }
    }

    const EditProfile = async (e) => {
        e.preventDefault()
        try{
            console.log("This is the edit profile info", {[editMode.field]:editInfo})
            const Update = {[editMode.field]:editInfo}


             const res = await fetch("http://localhost:7000/api/user/updateProfile", {
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({
                    Update
                }),
                credentials:"include"
            })

            if(!res.ok){
                const {error} = await res.json()
                toast.error(error)
            }

            const {updatedUser} = await res.json()
            if(Object.keys(loggedUser).length){
                toast.success("Profile update successfully!")
                localStorage.setItem("logged-user", JSON.stringify(updatedUser))
                setLoggedUser(updatedUser)
                setUser(updatedUser)
                setLoading(false)
            }

        } catch (error) {
            console.log("error in EditProfile func", error)
        }
    }

    return (
        <>
          <div className={`min-h-screen ${Object.keys(editMode).length > 0 ? "hidden" : "block"} font-sans lg:px-40 lg:py-24 w-full bg-gray-100 dark:bg-gray-950 text-3xl dark:text-gray-100`}>
           <div className="w-full lg:rounded-xl p-[.8px] relative h-64 from-accent/0  via-accent to-primary bg-gradient-to-b">
                <div className="w-full lg:rounded-xl relative h-full bg-gray-950">
                    <img src={user?.profilecover || previewURL.profilecover} alt="" className={`${user?.profilecover ||  previewURL.profilecover ? "block" : "hidden"} w-full h-full object-cover`}/>
                    <span onClick={() => coverRef.current.click()} className={`w-12 cursor-pointer h-12 bg-gray-100 rounded-full text-[18px] ${loggedUser?._id === user?._id ? "block" : "hidden"} text-black font-bold flex items-center justify-center absolute bottom-4 right-4`}>
                        <BsCamera />
                        <input ref={coverRef} type="file" onChange={(e) => handleFileChange(e, "profilecover")} className="hidden w-full h-full"/>
                    </span>
                <span className="w-32 h-32 rounded-full flex items-center justify-center left-1/2 p-[.9px] transform -translate-x-1/2 bg-blue-700 absolute bottom-[-3.7rem]">
                    <img src={user?.profilepic || loggedUser?.profilepic} alt="" className={`${user?.profilepic || loggedUser?.profilepic ? "block" : "hidden"} w-full h-full rounded-full object-cover`}/>
                     <span className={`flex w-full h-full rounded-full relative bg-gray-950`}>
                        <span onClick={() => picRef.current.click()} className={`w-12 cursor-pointer ${loggedUser?._id === user?._id ? "block" : "hidden"} h-12 bg-gray-100 rounded-full text-[18px] text-black font-bold flex items-center justify-center absolute bottom-[-5px] right-1`}>
                            <BsCamera />
                             <input ref={picRef} type="file" onChange={(e) => handleFileChange(e, "profilepic")} className="hidden w-full h-full"/>
                        </span>
                
                    </span>
                </span>
                </div>
           </div>

           <div className="w-full border-b-[1px] gap-5 py-10 border-gray-700 flex items-end justify-between px-4 min-h-[15rem] ">
                <div className="w-1/2  lg:w-1/3 rounded-xl h-[5rem] flex flex-col justify-center gap-2 font-semibold items-center border-primary border-[1.5px]">
                    <span className="text-gray-200 text-2xl"><MdShare /></span>
                    <span className="text-gray-200 text-lg tracking-widest">Share</span>
                </div>

                <div className="w-1/2 lg:w-1/3 rounded-xl h-[5rem] flex flex-col justify-center gap-2 font-semibold items-center border-primary border-[1.5px]">
                    <span className="text-gray-200 text-2xl"><MdShare /></span>
                    <span className="text-gray-200 text-lg tracking-widest">Share</span>
                </div>
           </div>

           <div className="w-full border-b-[1px] border-gray-700 flex flex-col gap-5 h-auto py-10">
                {
                    Options.map(e => {
                        return (
                            <div onClick={() => setEditMode(e)} className="w-full px-4 flex gap-2 justify-between h-16">
                    <span className="text-2xl flex items-center mt-1 text-primary">{e.icon}</span>
                    <span className="flex justify-between items-center gap-2 w-[90%]">
                        <b className="text-gray-300 font-sans tracking-widest  text-[15px]">{e.title}</b>
                        <i className={`text-gray-400 ${loggedUser?._id === userId ? "block" : "hidden"} font-bold text-[13px]`}><IoPencil /></i>
                    </span>

                </div>
                        )
                    })
                }
           </div>

           <div className="w-full border-b-[1px] border-gray-700 flex flex-col gap-5 h-auto py-10">
            <p className="w-full flex justify-between px-4">
                <b className="text-white/90 text-xl ">Products</b>
                <i className="text-xl text-white/90 cursor-pointer">Manage</i>
            </p>
            <div className="w-full p-3 h-auto flex justify-between list-none gap-2 lg:gap-4">
                {[1,2,3].map(e => {
                    return <li className="w-1/3 rounded-xl bg-gray-800/20 h-32 lg:h-64"></li>
                })}
            </div>
           </div>
        </div>

        <form onSubmit={EditProfile} className={`w-full ${Object.keys(editMode).length > 0 ? "block" : "hidden"} relative pt-16 text-gray-100 max-h-screen h-screen dark:bg-gray-950`}>
            <div className="w-full min-h-10 px-3 py-5 text-white font-bold text-xl border-b-[.5px] border-gray-800">
                Enter a new {editMode.desc}
            </div>
            
            <input value={editing ? editInfo : editMode.title} disabled={userId === loggedUser?._id ? false : true} onFocus={() => {setEditInfo(editMode.title);setEditing(true)}} onChange={(e) => setEditInfo(e.target.value)} type="text" className="w-full min-h-12 text-white text-lg font-semibold px-3 py-5 bg-transparent border-b-[1.2px] borer-gray-500 outline-none"/>

            <div className="w-full border-t-[.5px] absolute bottom-0 right-0 left-0 border-blue-500 h-16 flex">
                <div onClick={() => setEditMode({})} className="w-1/2 h-full border-r-[.5px] border-blue-500 flex justify-center items-center text-blue-400 text-lg">Cancel</div>
                <button onClick={() => {setTimeout(() => {setEditMode({})}, 1000)}} type="submit" className="w-1/2 h-full flex justify-center items-center text-blue-400 text-lg">ok</button>
            </div>
        </form>
        </>
    )
}