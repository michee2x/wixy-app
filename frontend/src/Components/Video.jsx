import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Ticker } from "./Ticker";
import {FaMusic} from "react-icons/fa"
import {CiSearch} from "react-icons/ci"
import {FaHeart, FaPlay, FaPause, FaSquarePlus} from "react-icons/fa6"
import {IoIosShareAlt, IoMdHome} from "react-icons/io"
import {IoChatbubbleOutline} from "react-icons/io5"
import {FaCartPlus} from "react-icons/fa6"
import { CreatePostPage } from "../Pages"
import { ContextAPI } from "../ContextApi"




export const Video = ({posts, setPost}) => {
    const {selectedProduct, setSelectedProduct} = ContextAPI()
    const [playing, setPlaying] = useState(false)
    const videoRef = useRef([]);
    const [showOption, setShowOption] = useState(false)
    const [videoPlaying, setVideoPlaying] = useState(0)
    const [postMode, setPostMode] = useState(false)

    const handleVideoPress = (id) => {
        setShowOption(true)
        videoRef.current.forEach((video, idx) => {
            if(video){
                if(idx === id)
                    if(video.paused){
                        video.play()
                    } else {
                        video.pause()
                    }
            } else {
                video.pause()
            }
        })
    }

   const data = [
        {
            icon:<FaCartPlus />, value:"10.7M"
        },
        {
            icon:<IoIosShareAlt />, value:"1.3M"
        }
    ]

    /* const control = (id) => {
        setShowOption(true)
        videoRef.current?.forEach((video, idx) => {
            if(video){
                if(idx === id)
                    if(video.paused){
                        video.play()
                    } else {
                        video.pause()
                    }
            } else {
                video.pause()
            }
        })
    } */

    const control = (id) => {
        setShowOption(true)
        const videoElement = videoRef.current[id];
        if(videoElement.paused){
            //pause all other vidoes
            videoRef.current.forEach((video, i) => {
                if(i !== id) video.pause();
            })
            //play the selected video
            videoElement.play();
            setPlaying(false);
        } else {
            //pause the selected video
            videoElement.pause()
            setPlaying(true);
        }
    }

    if(showOption){
        setTimeout(() => {
            setShowOption(false)
        }, 300)
    }

    return <>
     <div style={{scrollSnapType:"y mandatory"}} className={`w-full ${postMode ? "hidden" : "block"} relative bg-gray-950 grid grid-cols-1 lg:grid-cols-2 lg:gap-10 lg:px-10 max-h-screen overflow-y-scroll min-h-screen`}>
            
            <div className="w-full h-16 bg-blue-950/90 items-center fixed z-30 bottom-0 left-0 right-0 text-white text-2xl flex justify-between px-3">
                
                <div className="flex flex-col items-center justify-center w-1/4 h-full gap-[.2px]">
                    <span className="text-white text-2xl"><IoMdHome /></span>
                    <span className="text-gray-100 text-[16px]">Home</span>
                </div>
                <div onClick={() => setPostMode(true)} className="flex flex-col items-center justify-center w-1/4 h-full gap-[.2px]">
                    <span className="text-white text-3xl"><FaSquarePlus /></span>
                    <span className="text-gray-100 text-[16px]"></span>
                </div>
                <div className="flex flex-col items-center justify-center w-1/4 h-full gap-[.2px]">
                    <span className="text-white text-2xl"><CiSearch /></span>
                    <span className="text-gray-100 text-[16px]">Discover</span>
                </div>

            </div>
            
            
            <div className="fixed w-1/2 flex gap-4 items-center top-[5rem] z-30 transform left-1/2 -translate-x-1/2 h-auto">
                <span className="text-gray-100 text-lg">Following</span>
                <span className="text-gray-300 text-lg font-thin">|</span>
                <span className="text-gray-100 font-bold text-lg">For You</span>
            </div>
            
            
            { posts?.length > 0 && posts.map((e, i)=> {
                return <div className="w-full relative cursor-pointer bg-gray-800/30 h-screen">
                            <div onClick={() => control(i)} className={`w-full h-full translate-all duration-500 ${showOption ? "bg-gray-800/40 text-[7rem]" : "bg-transparent text-[0rem]"} flex items-center justify-center absolute top-0 bottom-0 left-0 right-0 z-20`}>
                                {playing ? <FaPlay /> : <FaPause />}
                            </div>
                            <video 
                                key={e?.postvideo}
                                loop options
                                onClick={() => { setVideoPlaying(i); handleVideoPress}}
                                className="w-full relative object-cover h-screen" style={{scrollSnapAlign:"start"}}
                                src={e?.postvideo}
                                ref={(el) => (videoRef.current[i] = el)}
                            />

                            <div className="w-16 z-30 h-[50%] absolute mr-3 flex flex-col gap-12 right-0 bottom-12">
                               <Link onClick={() => {setSelectedProduct(e); window.scrollTo(0,0)}} to={`/product/${e?._id}`}>
                                    <img src={e?.postimg} className="w-16 h-16 object-cover rounded-full" alt="" />
                               </Link>
                                {data.map(e => {
                                    return (
                                        <p className="flex items-center flex-col gap-1">
                                    <span className="flex shadow-black/60 shadow-md text-white p-2 bg-blue-950/80 rounded-full  text-2xl">{e.icon}</span>
                                    <span className="flex text-white  text-sm">{e.value}</span>
                                </p>
                                    )
                                })}

                            </div>


                            <div className="absolute z-30 ml-8 flex flex-col overflow-x-hidden bottom-20 w-1/2 h-auto">
                                <span className="flex gap-1 items-center text-[18px]">
                                    <Link to={`/profile/${e?.user?._id}`}>
                                        <img src={e?.user?.profilepic} className="w-10 border-[.5px] border-gray-500 h-10 object-cover rounded-full" alt="" />
                                    </Link>
                                    <span>{e?.user?.name}</span>
                                </span>
                               <span className="w-full mt-1 h-auto gap-2">
                                <Ticker text={e?.desc} />
                                </span>
                            </div>
                        </div>
            })}
    </div>

    <div className={`w-full ${postMode ? "block" : "hidden"} min-h-screen`}>
        <CreatePostPage setPostMode={setPostMode} setPost={setPost} posts={posts} />
    </div>
    </>
}

/* {
    "posts": [
        {
            "_id": "67772cb6651cc23b6bafa0bf",
            "user": {
                "unacceptedConnectRequests": [],
                "sentConnectionRequest": [],
                "_id": "6762f226815ee949ea7da018",
                "name": "will",
                "username": "will",
                "email": "michee@gmail.com",
                "password": "$2a$10$DckjUTyHJAy6hRIi4P30IOlWH3yyVu8PBsPYuYKf.11xqyquaLlSm",
                "profilepic": "blob:http://localhost:5173/f8eb9715-2efd-4e0c-9e4e-d154597897df",
                "bio": "",
                "link": "",
                "followers": [],
                "following": [],
                "bookmark": [],
                "isVerified": true,
                "createdAt": "2024-12-18T16:02:46.331Z",
                "updatedAt": "2025-01-02T20:16:25.116Z",
                "__v": 0,
                "profilecover": "blob:http://localhost:5173/fc4e218c-246a-431b-a3c0-6975679d783a",
                "website": "www.wixy-app.com",
                "desc": "we develop web applications for you",
                "number": "090400837693",
                "address": "opp total filling station yenegwe"
            },
            "name": "averoid",
            "price": "500000",
            "category": "electronics",
            "desc": "a humanoid robot",
            "postimg": "blob:http://localhost:5173/0204a2a5-d17d-4e37-8bb3-c0422e1734ad",
            "postvideo": "blob:http://localhost:5173/38a9cc69-9d74-432d-8010-6818d0b8feda",
            "Comments": [],
            "createdAt": "2025-01-03T00:17:58.813Z",
            "updatedAt": "2025-01-03T00:17:58.813Z",
            "__v": 0
        },
        {
            "_id": "67772d46651cc23b6bafa0c3",
            "user": {
                "unacceptedConnectRequests": [],
                "sentConnectionRequest": [],
                "_id": "6762f226815ee949ea7da018",
                "name": "will",
                "username": "will",
                "email": "michee@gmail.com",
                "password": "$2a$10$DckjUTyHJAy6hRIi4P30IOlWH3yyVu8PBsPYuYKf.11xqyquaLlSm",
                "profilepic": "blob:http://localhost:5173/f8eb9715-2efd-4e0c-9e4e-d154597897df",
                "bio": "",
                "link": "",
                "followers": [],
                "following": [],
                "bookmark": [],
                "isVerified": true,
                "createdAt": "2024-12-18T16:02:46.331Z",
                "updatedAt": "2025-01-02T20:16:25.116Z",
                "__v": 0,
                "profilecover": "blob:http://localhost:5173/fc4e218c-246a-431b-a3c0-6975679d783a",
                "website": "www.wixy-app.com",
                "desc": "we develop web applications for you",
                "number": "090400837693",
                "address": "opp total filling station yenegwe"
            },
            "name": "averoid",
            "price": "500000",
            "category": "electronics",
            "desc": "a humanoid robot",
            "postimg": "blob:http://localhost:5173/0204a2a5-d17d-4e37-8bb3-c0422e1734ad",
            "postvideo": "blob:http://localhost:5173/38a9cc69-9d74-432d-8010-6818d0b8feda",
            "Comments": [],
            "createdAt": "2025-01-03T00:20:22.781Z",
            "updatedAt": "2025-01-03T00:20:22.781Z",
            "__v": 0
        }
    ]
} */