import passport from "passport"
import data from '../db/user.data.mjs'
import bcrypt from "bcryptjs"
import User from "../models/user.model.mjs"
import jwt from "jsonwebtoken"
import { returnVerifyTemplate } from "../verifyTemplate.mjs"
import {sendMail} from "../utils/sendMail.mjs"


export const verifyUser = async (req,res) => {
    try{
        const {token} = req.query;
        console.log("this is the token to verify",token)

        console.log("1")

        if(!token) return res.status(400).json({error:"pls a token is required"})

        const decoded = jwt.verify(token, "jwtSecret")

        if(!decoded) return res.status(400).json({message:`invalid token ${decoded}`})

        const userId = decoded?.user

        const verifiedUser = await User.findOne({_id:userId})
        

        if(verifiedUser.isVerified){
            return res.status(200).json({message:"you are already verified"})
        }

        verifiedUser.isVerified = true
    
        await verifiedUser.save()

        console.log("you are successfully verified", verifiedUser)

        res.status(200).json({message:'you are successfully verified. pls login'})



    }catch(error){
        res.status(500).json({message:"token is expired"})
    }
}


export const Signup = async (req, res) => {
    try{
const {name, username, email, password, profilePic} = req.body

    const existingUser = await User.findOne({username})
    if(existingUser){
        return res.status(400).json({error:"username already exists. try a different one"})
    }
    const existingEmail = await User.findOne({email})
    if(existingEmail){
        return res.status(400).json({error:"an account with that email already exists"})
    }
    /* const existingPassword = await User.findOne({password})
    if(existingUser){
        return res.status(400).json({error:"that password already exist..."})
    } */

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    

    const newUser = new User({
        name,
        username,
        password : hashedPassword,
        email,
        profilePic
    })

    await newUser.save()
     
    if(newUser) {
         generateToken(newUser._id, res)
        
        const token = jwt.sign({user:newUser._id}, "jwtSecret", {expiresIn:"2h"})

        await sendMail(newUser,"SignUp to Wixy Marketplace", `https://wixy-app.onrender.com/auth/verifytoken?token=${token}`, "signing up")

        res.status(200).json({loggedUser:{
            _id:newUser._id,
            name:newUser.name,
            username:newUser.username,
            profilePic:newUser.profilePic,
            email:newUser.email,
            followers:newUser.followers,
            following:newUser.following,
            profilecover:newUser.profilecover
        }, message:`we sent a verification linl to your email`, link:`http://localhost:5173/verifytoken?token=${token}`})
    
    
    } else {
        return res.status(400).json({
            error:"Invalid user data"
        })
    }
    } catch(error){
console.log("there was an error in signup controller: ", error)
    }
}

export const login = async (req, res) => {
   try{
    const {username,password} = req.body

    console.log("this is the user", username, password)
    const user = await User.findOne({username}).populate("followers")
    if(!user) return res.status(404).json({error:"Invalid credentials...pls signup"})

    console.log("hey we finally got the suer", user)


    const wrongPasword = await bcrypt.compare(password || "", user.password)


    if(!wrongPasword){
        return res.status(401).json({error:"Invalid credentials...pls signup"})
}
  if(!user.isVerified){
    const token = jwt.sign({user:user._id}, "jwtSecret", {expiresIn:"60s"})
    await sendMail(user,"User not verified", `https://wixy-app.onrender.com/auth/verifytoken?token=${token}`, "logging back")
    return res.status(401).json({error:"token expired"})
  }
   generateToken(user._id, res)
    res.json({loggedUser:user})

   } catch(error){
console.log("there was an error in signup controller: ", error)
    }
}

export const logout = (req, res) => {
    try{
        res.clearCookie("jwtToken")
    res.status(200).json({message:"logged out successfully"})
    }catch (error) {
        console.log("loggedout successful")
    }
}
/*  const  generateToken = (payload, res) => {
    console.log("i am generating it...")
    try{
    const token = jwt.sign({payload}, "thi is jwt secret", {
        expiresIn:`15d`
    })
    res.cookie("jwtToken", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite:"None",
        secure:false,
        httpOnly:true,
    })

    } catch (error){
console.log("there was an error in signup controller: ", error)
    }
}  */


const  generateToken = (payload, res) => {
    try{
    const token = jwt.sign({payload}, "thi is jwt secret", {
        expiresIn:`15d`
    })
    res.cookie("jwtToken", token, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        sameSite:"Strict",
        secure:false,
        httpOnly:true
    })

    } catch (error){
console.log("there was an error in signup controller: ", error)
    }
}