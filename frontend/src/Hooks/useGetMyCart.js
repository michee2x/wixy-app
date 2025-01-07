import React, {useEffect, useState} from 'react'
import { ContextAPI } from '../ContextApi'

export const useGetMyCart = (setCart) => {

   useEffect(() => {
        const fetchCart = async () => {
          try{
            const res = await fetch("http://localhost:7000/api/user/getmycart", {
              method:"GET",
              credentials:"include"
            })
  
            if(!res.ok){
              const {error} = await res.json()
              setError(error)
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