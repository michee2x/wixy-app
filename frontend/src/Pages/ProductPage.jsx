import React, { useEffect, useState } from 'react'
import { ProductDetail } from '../Components/ProductDetail'
import { ContextAPI } from '../ContextApi'
import { useLocation, useParams } from 'react-router-dom'
import { BreadCrumb } from '../Components/BreadCrumb'

export const ProductPage = () => {
  const {id} = useParams()
  const [lastRoute, setLastRoute] = useState(null)
  const location = useLocation()
  const {selectedProduct, setSelectedProduct, cart} = ContextAPI()
  useEffect(() => {
    setLastRoute(location.pathname)
  }, [location])


  useEffect(() => {
        const getPost = async () => {
            try{
                const res = await fetch(`http://localhost:7000/api/post/getuserpost/${id}`, {
                    method:"GET",
                    credentials:"include"
                })

                if(!res.ok){
                    const {error} = await res.json()
                    toast.error(error)
                    throw new Error(error)
                }

                const {post} = await res.json()
                setSelectedProduct(post)

            } catch (error){
                console.log("error in getPost func", error)
            }
        }

        if(id){
          getPost()
        }
    }, [])

    /*  useEffect(() => {
      console.log("it is running///////////////////////")
          const InCart = () => {
                const index = cart?.find(e => e._id === productID)
                console.log("his is the product index/////////////////////////", index)
              }
          if(cart.length > 0){
            InCart()
          }
    }, [cart?.length]) */

  console.log("in the particlular user page", lastRoute)
  return (
    <div className='min-h-screen w-full dark:bg-gray-950'>
      <div className='w-full h-auto mt-16 px-4'>
        <BreadCrumb history={[{name:"home", link:"/dashboard/id", current:false}, {name:"product", current:true, link:`/product/${id}`}]} />
     </div>
      <ProductDetail />
    </div>
  )
}

