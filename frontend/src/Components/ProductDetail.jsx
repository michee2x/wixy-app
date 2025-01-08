import React, {useEffect, useState} from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Aos from "aos"
import "aos/dist/aos.css"
import { ContextAPI } from "../ContextApi";
import toast from "react-hot-toast"

export const ProductDetail = () => {
  const {id:productID} = useParams()
  const {selectedProduct, setSelectedProduct, loggedUser, cart, APIOrigin} = ContextAPI()
  const [navigate, setNavigate] = useState(false)
  useEffect(() => {
    Aos.init({duration:2000})
  }, [])


const moveToCart = async (id) => {
  try{
      const res = await fetch(`${APIOrigin}/api/user/addtocart?id=${productID}`, {
        method:"GET",
        credentials:"include"
      })
      if(!res.ok){
        const {error} = await res.json()
        toast.error(error)
        throw new Error(error)
      }

      const {success} = await res.json()
      if(success){
        toast.success("product successfully added to cart!")
        setNavigate(true)
      }
  } catch(error){
    console.log("error in moveToCart func", error)
  }
}

if(navigate){
  return <Navigate to={`/cart/${loggedUser?._id}`} />
}
    return (
        <>
            <div data-aos="fade-up" className="bg-white dark:bg-gray-950  sm:py-8 lg:py-12">
  <div className="mx-auto max-w-screen-lg px-4 md:px-8">
    <div className="grid gap-8 md:grid-cols-2">
      {/* <!-- images - start --> */}
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-lg bg-gray-100">
          <img src={selectedProduct?.postimg} loading="lazy" alt="Photo by Himanshu Dewangan" className="h-full w-full object-cover object-center" />

          <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">sale</span>
        </div>
      </div>
      {/* <!-- images - end --> */}

      {/* <!-- content - start --> */}
      <div className="md:py-8">
        {/* <!-- name - start --> */}
        <div className="mb-2 md:mb-3">
          <span className="mb-0.5 inline-block text-gray-500">{selectedProduct?.name}</span>
        </div>
        {/* <!-- name - end --> */}

        {/* <!-- price - start --> */}
        <div className="my-8">
          <div className="flex my-8 items-end gap-2">
            <span className="text-xl font-bold dark:text-gray-300 text-gray-800 md:text-2xl">{selectedProduct?.price} Naira</span>
          </div>

          <span className="text-sm text-gray-500">incl. VAT plus shipping</span>
        </div>
        {/* <!-- price - end --> */}

        {/* <!-- shipping notice - start --> */}
        <div className="mb-16 flex items-center gap-2 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
          </svg>

          <span className="text-sm">2-4 day shipping</span>
        </div>
        {/* <!-- shipping notice - end --> */}

        {/* <!-- buttons - start --> */}
        <div className="flex gap-2.5">
          <button onClick={moveToCart} className="inline-block flex-1 rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 sm:flex-none md:text-base">Add to cart</button>

          <a href="#" className="inline-block rounded-lg bg-gray-200 px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </a>
        </div>
        {/* <!-- buttons - end --> */}

        {/* <!-- description - start --> */}
        <div className="mt-10 md:mt-16 lg:mt-20">
          <div className="mb-3 text-lg font-semibold text-gray-800">Description</div>

          <p className="text-gray-500">
            {selectedProduct?.desc}
         </p>
        </div>
        {/* <!-- description - end --> */}
      </div>
      {/* <!-- content - end --> */}
    </div>
  </div>
</div>
        </>
    )
}