import React, {useState, useEffect} from "react";
import { Video } from "../Components/Video";
import toast from "react-hot-toast";

export const DashBoardPage = () => {
    const [post, setPost] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try{
                const res = await fetch("http://localhost:7000/api/post/getposts", {
                    method:"GET",
                    credentials:"include"
                })

                if(!res.ok){
                    const {error} = await res.json()
                    toast.error(error)
                    throw new Error(error)
                }

                const {posts} = await res.json()
                setPost(posts)

            } catch (error){
                console.log("error in fetchpost func", error)
            }
        }
        fetchPosts()
    }, [])


    return (
        <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-950 flex justify-center items-center text-3xl dark:text-gray-100">
        
        <Video posts={post} setPost={setPost} />
        </div>
    )
}