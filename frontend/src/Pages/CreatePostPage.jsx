import React, {useState, useRef} from 'react'
import img from "../assets/ai-generated-8249225_1280.jpg"
import img2 from "../assets/AdobeStock_645633031_Preview.jpeg"
import {MdUploadFile} from "react-icons/md"
import toast from 'react-hot-toast'

/* 
    this component has a post logic.
    1. it has the following fields:
        file:file to upload. video && audio
        name:name of the product
        price:price of the product
        desc:description of the product
        category:category of the product. this will be provided as select where you choose from a set of options. e.g clothings, shoes, housing etc

*/

export const CreatePostPage = ({setPostMode, setPost, posts}) => {
    const [productData, setProductData] = useState({name:"", price:null, desc:"", category:"", instock:false})
    const fileRef = useRef(null)
    const videoFileRef = useRef(null)
    const [file, setFile] = useState(null)
    const [preview, setPreview] = useState(null)
    const [videofile, setVideoFile] = useState(null)
    const [videoPreview, setVideoPreview] = useState(null)
    const [posting, setPosting] = useState(false)

    const setFileFunc = (e) => {
            const file = e.target.files[0]
            if(file){
                setFile(file);
                const previewUrl = URL.createObjectURL(file)
                setPreview(previewUrl)
            }
    }

    const setFileFunc2 = (e) => {
            const file = e.target.files[0]
            if(file){
                setVideoFile(file);
                const previewUrl = URL.createObjectURL(file)
                setVideoPreview(previewUrl)
            }
    }


    const uploadProduct = async(e) => {
        if(!productData.category && !productData.desc && !productData.instock && !productData.name && !productData.price && !file && !videofile){
            toast.error("all fields are required except stocks")
            return;
        }
        e.preventDefault()
        try{
            console.log("this is the product data to be posted", {...productData, postimg:preview, postvideo:videoPreview || ""})
            const res = await fetch("http://localhost:7000/api/post/createpost", {
                method:"POST",
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify({
                    ...productData, postimg:preview, postvideo:videoPreview || ""
                }),
                credentials:"include"
            })

            if(!res.ok){
                const {error} = await res.json()
                toast.error(error)
                throw new Error(error)
            }

            const {newProduct} = await res.json()
            setPost([newProduct, ...posts])
            toast.success("🎉product posted successfuly")
            setPostMode(false)
        } catch (error){
            console.log("an error occurred in uploadProduct func", error)
        }
    }
  return (
    <>
    <div className={`w-full ${posting ? "hidden" : "block"} min-h-screen dark:bg-gray-950 pt-16`}>
        <div className='absolute w-full h-full'>
            <div className='relative w-full h-full'>
            <img src={img2} className='w-full absolute h-full object-cover' alt="" />
            <div className='w-full relative h-full bg-gradient-to-tr from-black via-gray-900/50 to-black'>
            </div>
        </div>
        </div>
        <div className={`w-full flex bg-gradient-to-tl from-gray-950 via-blue-950/40  to-blue-950/90 relative z-10 flex-col items-center h-screen`}>
            <img src={img} alt="" className="w-[15rem] h-[15rem] object-cover rounded-full my-10 lg:my-5"/>

            <p className='max-w-sm text-lg text-center text-gray-200 lg:my-2 my-10'>Make your product avalaible to the world by clicking the upload button 😎</p>
            <p className='mt-10 lg:my-3'>🔵🔵🔵🔵</p>
            <button onClick={() => setPosting(true)} className='w-[60%] lg:w-[30%] rounded-2xl p-2 absolute bottom-[8rem] left-1/2 transform -translate-x-[50%] text-[18px] min-h-10 bg-blue-800 text-white flex items-center justify-center'>Start Upload </button>
    
        </div>
    </div>
    <form onSubmit={uploadProduct} className={`w-full ${posting ? "block" : "hidden"} px-4 lg:px-40 flex flex-col items-center min-h-screen dark:bg-gray-950 pt-16`}>
        <div className='w-[8rem] h-[8rem] rounded-full flex items-center justify-center bg-gray-800 my-5 overflow-hidden'>
            {file && <img src={preview} alt="" className="w-full h-full object-cover" />}
            {!file && (<p onClick={() => fileRef.current.click()} className="text-[3rem] w-full h-full cursor-pointer flex flex-col justify-center items-center text-white"><MdUploadFile /> <span className='text-xs'>product image</span> </p>)}
            <input accept="image/*" onChange={(e) => setFileFunc(e)} ref={fileRef} type="file" className='hidden'/>
        </div>

        <div className='w-full flex-col gap-1 h-auto my-3 flex justify-center'>
            <label className='text-[20px]'>Product name</label>
            <input value={productData.name} onChange={(e) => setProductData({...productData, name:e.target.value})} type="text" className='p-3 text-[18px] bg-transparent border-[.5px] outline-none rounded-xl border-gray-700'/>
        </div>

        <div className='w-full flex-col my-3 gap-1 h-auto flex justify-center'>
            <label className='text-[20px]'>Product price</label>
            <input value={productData.price} onChange={(e) => setProductData({...productData, price:e.target.value})} type="number" className='p-3 text-[18px] bg-transparent border-[.5px] outline-none rounded-xl border-gray-700'/>
        </div>

        <div className='w-full flex-col gap-1 h-auto my-3 flex justify-center'>
            <label className='text-[20px]'>Product description</label>
            <textarea value={productData.desc} onChange={(e) => setProductData({...productData, desc:e.target.value})} type="text" className='p-3 text-[18px] bg-transparent border-[.5px] outline-none rounded-xl border-gray-700'/>
        </div>

        <div className='w-full flex-col gap-1 h-auto my-3 flex justify-center'>
            <label className='text-[20px]'>Product category</label>
            <select value={productData.category} onChange={(e) => setProductData({...productData, category:e.target.value})} className='p-4 border-[.5px] text-[18px] focus:ring-0 focus:outline-0 bg-transparent outline-none rounded-xl border-gray-700'>
                <option className='text-xl bg-gray-950 text-white' value="">category</option>
                <option className='text-xl bg-gray-950 text-white' value="shoes">Shoes</option>
                <option className='text-xl bg-gray-950 text-white' value="cloths">Cloths</option>
                <option className='text-xl bg-gray-950 text-white' value="electronics">Electronics</option>
                <option className='text-xl bg-gray-950 text-white' value="house">House</option>
            </select>
        </div>

        <div className='w-full h-auto flex flex-col gap-1 my-10'>
            <label className='text-[20px]'>In stock</label>
            <input type="checkbox" value={productData.instock} className='w-6 h-6' onChange={() => setProductData((prev) => ({...productData, instock:!prev.instock}))} />
        </div>

        <div className={`w-full h-auto flex flex-col gap-1 my-10`}>
            <label className='text-[20px]'>Video upload</label>
            <div className='w-full h-64 border-[.5px] overflow-hidden border-gray-600 rounded-xl'>
                {videofile && <video src={videoPreview} autoPlay controls alt="" className="w-full h-full object-cover" />}
                {!videofile && (<p onClick={() => videoFileRef.current.click()} className="text-[3rem] w-full h-full cursor-pointer flex flex-col justify-center items-center text-white"><MdUploadFile /> <span className='text-xs'>product video</span> </p>)}
                <input type="file" accept='video/*' ref={videoFileRef} className='hidden' onChange={(e) => setFileFunc2(e)} />
            </div>
            <p className='text-xs text-gray-400'>upload a short video as for describing you product. This will be made available in users feed</p>
        </div>

        <div className='w-full flex justify-between h-auto my-10'>
            <button type='submit' className={`w-[60%] lg:w-[30%] ${productData.category && productData.name && productData.desc && productData.price && file && videofile ? "bg-blue-800" : "bg-gray-800"} rounded-2xl p-2 text-[18px] min-h-10 text-white flex items-center justify-center`}>
                upload product
            </button>
            <button onClick={() => setPostMode(false)} className='w-[60%] lg:w-[30%] rounded-2xl p-2 text-[18px] min-h-10 bg-blue-800 text-white flex items-center justify-center'>
                cancel
            </button>
        </div>
    
    </form>
    </>
  )
}
