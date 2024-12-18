import passport from "passport"
import data from '../db/user.data.mjs'
import bcrypt from "bcryptjs"
import User from "../models/user.model.mjs"
import jwt from "jsonwebtoken"


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
        return res.status(400).json({error:{type:"existingUser"}})
    }
    const existingEmail = await User.findOne({email})
    if(existingEmail){
        return res.status(400).json({error:{type:"existingEmail"}})
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

    newUser.save()
     
    if(newUser) {
         generateToken(newUser._id, res)
        
        const token = jwt.sign({user:newUser._id}, "jwtSecret", {expiresIn:"60s"})

        res.status(200).json({user:{
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
    if(!user) return res.status(404).json({error:{type:"nameError"}})

    console.log("hey we finally got the suer", user)


    const wrongPasword = await bcrypt.compare(password || "", user.password)


    if(!wrongPasword){
        return res.status(401).json({error:{type:"password"}})
}
  if(!user.isVerified){
    const token = jwt.sign({user:user._id}, "jwtSecret", {expiresIn:"60s"})

    return res.status(401).json({message:"you are not verified yet", link:`http://localhost:5173/verifytoken?token=${token}`})
  }
   generateToken(user._id, res)
    res.json({loggedUser:user})

   } catch(error){
console.log("there was an error in signup controller: ", error)
    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwtToken", "", {
        maxAge:0
    })
    res.json({message:"logged out successfully"})
    }catch (error) {
        console.log("loggedout successful")
    }
}
const  generateToken = (payload, res) => {
    try{
    const token = jwt.sign({payload}, "thi is jwt secret", {
        expiresIn:`15d`
    })
    res.cookie("jwtToken", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        sameSite:"strict",
        secure:false,
    })

    } catch (error){
console.log("there was an error in signup controller: ", error)
    }
}