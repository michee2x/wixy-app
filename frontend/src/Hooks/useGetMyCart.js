import React, {useEffect, useState} from 'react'
import { ContextAPI } from '../ContextApi'

export const useGetMyCart = (setCart, APIOrigin) => {

   useEffect(() => {
        const fetchCart = async () => {
          try{
            const res = await fetch(`${APIOrigin}/api/user/getmycart`, {
              method:"GET",
              credentials:"include"
            })
  
            if(!res.ok){
              const {error} = await res.json()
              throw new Error(error)
            }
  
            const {cart} = await res.json()
            setCart(cart)
  
          } catch(error){
            console.log("error in fetchCart func", error)
          }
        }
  
        fetchCart()
    },[])
}