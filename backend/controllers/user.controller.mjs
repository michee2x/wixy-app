import User from "../models/user.model.mjs"
import bcrypt from "bcryptjs"
import cloudinary from "cloudinary"
import Posts from "../models/post.model.mjs"
import {Cart} from "../models/cartModel.mjs"

export const verifyUser = () => {
    try{
        

    }catch(error){
        console.log("this is the error")
    }
}

export const getUsers = async (req, res) => {
    try{
        const userId = req.user._id
        const users = await User.find({_id: {$ne:userId}})
        res.status(200).json({allUsers:users})

    }catch(error){
        return res.status(500).json({error:error.message})
    }
}


export const getUserProfile = async (req, res) => {
    try{
        const {id} = req.params
        console.log("This is the user", id, req.params)

        const userProfile = await User.findById(id).select("-password").populate("followers")

        console.log("HEY USER IS FOUND O", userProfile)

        if(!userProfile) return res.status(404).json({error:'usernotfound error... pls reAuthenticate'})

        res.status(200).json({userProfile})

    } catch (error) {
        console.log("there was an error in geetuserprofile controller", error)
        res.status(500).json({error:"Internal server error"})
    }
}
export const followers = async (req, res) => {
    try{
        const {id} = req.params
        const userid = id.toString()

        if(!id) return res.status(401).json({error:"id not found"})

        let user = await User.findById(userid)

        if(!user) return res.status(404).json({error:"user not found err"})


        if(user.followers.includes(id)){
        await User.updateOne({_id:userid}, {$pull:{followers:id}})

        } else{
            user.followers.push(userid)
        }

        
        user.save()

        res.status(200).json({message:"follow/unfollow sucessfull"})


    } catch (error){
        console.log("error in comentuser controller", error)
        res.status(500).json({error:"Internal server error"}) 
  }
}

export const follow =  async(req, res) => {
    try{
        const id = req.params.id
        
        const user = await User.findById(id)
        const loggedInUser = await User.findById(req.user._id)

        if(!user || !loggedInUser) return res.status(401).json({error:"user not found error"})

        if(!user.followers.includes(req.user._id)){
            await User.findByIdAndUpdate(user._id, {$push:{followers:req.user._id}})
        }
        else{
            console.log("you are following this user...")
            await User.findByIdAndUpdate(user._id, {$pull:{followers:req.user._id}})
        }

        if(!loggedInUser.following.includes(user._id)){
            await User.findByIdAndUpdate(req.user._id, {$push:{following:user._id}})
            return res.status(200).json({message:`you are now following ${user.name}`})
        }
        else{
            await User.findByIdAndUpdate(req.user._id, {$pull:{following:user._id}})
            return res.status(200).json({message:`you just unfollowed ${user.name}`})
        }

    }catch(error) {
        console.log("there is ana error in follow controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}
export const updateProfile = async (req, res) => {
    const {Update} = req.body
    const loggedInUserId = req.user._id
    console.log("thisisthe infoto upate profile", Object.keys(Update)[0], Update[Object.keys(Update)[0]]);
    try{
        const user = await User.findById(loggedInUserId)

        if(!user){
            return res.status(401).json({error:"User not found ERR: signup"})
        }

        if(Object.keys(Update)[0] === "username" || Object.keys(Update)[0] === "email"){
            const nameExist = await User.find(Update)
            if(nameExist.length){
                return res.status(401).json({error:`${Object.keys(Update)[0]} already exist`});
            }
            const newUser = {
                _id:user._id,
                [Object.keys(Update)[0]]:Update[Object.keys(Update)[0]] || user[Object.keys(Update)[0]],
            }

            await User.findByIdAndUpdate(req.user._id, newUser)
            const updatedUser = await User.findById(loggedInUserId)
            console.log("USER UPDATED SUCCESSFULLY", updatedUser)

            res.status(200).json({newUser})

        } else {
            const newUser = {
                _id:user._id,
                [Object.keys(Update)[0]]:Update[Object.keys(Update)[0]] || user[Object.keys(Update)[0]],
            }

            await User.findByIdAndUpdate(req.user._id, newUser)
            const updatedUser = await User.findById(loggedInUserId)
            res.status(200).json({updatedUser})
        }
    }catch(error){
        console.log("error in updateProfile controller", error)
        return res.status(500).json({error:"Server ERR"})
    }
    /* try{
        const user = await User.findById(loggedInUserId)
        const nameExist = await User.find({name:name})
        const usernameExist = await User.find({username:username})

        const correctPassword = await bcrypt.compare(oldPassword, user?.password || "")

        if(!user) return res.status(401).json({error:"user not found.."})

        if(nameExist.length){
            return res.status(200).json({error:"name already exist"})
        }
        if(usernameExist.length){
            return res.status(200).json({error:"username already exist"})

        }

        if(!correctPassword) return res.status(200).json({error:"old password is not correct"})

        if(profilepic){
            if(user.profilepic){
                const userProfId = user.profile.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(userProfId)
            }
            const uploadedResponse = await cloudinary.uploader.upload(profilepic)
            profilepic = uploadedResponse.secure_url
        }
        if(ProfileCover){
            if(user.profilecover){
                const userCoverId = user.profile.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(userCoverId)
            }
            const uploadedResponse = await cloudinary.uploader.upload(ProfileCover)
            ProfileCover = uploadedResponse.secure_url
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        const newUser = {
            _id:user._id,
            name:name || user.name,
            username:username || user.username,
            email:email || user.email,
            password:hashedPassword || user.password,
            profilepic:profilepic || user.profilepic,
            profilecover:ProfileCover || user.profilecover,
        }

        await User.findByIdAndUpdate(req.user._id, newUser)

        res.status(200).json({message:"update successful"})

    }catch(error){
        console.log("error i create post controller", error)
    } */
}
export const suggestedUsers = async (req, res) => {
    try{
        const userId = req.user._id
        const fields = await User.findById(userId).select("following sentConnectionRequest unacceptedConnectRequests")
        console.log('THIS ARE ALL THE FIELDS TO ITERATE OVER', fields)
        const total = [...fields.following, ...fields.sentConnectionRequest, ...fields.unacceptedConnectRequests]
        console.log("THIS IS THE TOTAL FIELD================= ", total)
        const users = await User.aggregate([
                {$match:{
                    _id: {$ne:userId}
                }
            },
                {
                    $sample:{
                        size:6
                    }
                }
        ])

        const filterOutUsersIFollow = users.filter((user) => !total?.includes(user._id))
        const suggestedUsers = filterOutUsersIFollow
        /* const suggestedUsers = filterOutUsersIFollow.slice(0, 4) */
        console.log("this is the suggested users", suggestedUsers)
        res.status(200).json({suggestedUsers})

    }catch(error){
        console.log("error in suggestedUsers controllers", error)
    }
}

export const searchProfile = async (req, res) => {
    try{
        const {search} = req.body

        const foundUser = await User.find({name:{$regex:search, $options:'i'}}).populate("followers").limit(10)
        

        if(!foundUser) return res.status(404).json({message:"user not found"})
        else{
    res.status(200).json({foundUser})
    }

    }catch(error){
        console.log("error in search profile controller",error)
    }
}

export const connectWithChannel = async (req, res) => {
    try{
        const id = req.params.id
        
        const user = await User.findById(id)
        const loggedInUser = await User.findById(req.user._id)

        if(!user || !loggedInUser) return res.status(401).json({error:"user not found error"})

        if(!user.unacceptedConnectRequests.includes(req.user._id)){
            await User.findByIdAndUpdate(user._id, {$push:{unacceptedConnectRequests:req.user._id}})
        }
        else{
            console.log("you sent a connection request to this user...")
            await User.findByIdAndUpdate(user._id, {$pull:{unacceptedConnectRequests:req.user._id}})
        }

        if(!loggedInUser.sentConnectionRequest.includes(user._id)){
            await User.findByIdAndUpdate(req.user._id, {$push:{sentConnectionRequest:user._id}})
            return res.status(200).json({message:`you are successfully sent a connection request to ${user.name}`})
        }
        else{
            await User.findByIdAndUpdate(req.user._id, {$pull:{sentConnectionRequest:user._id}})
            return res.status(200).json({message:`you just withdrawed a connection request from ${user.name}`})
        }

    } catch (error){
        console.log("error in connectWithChannel controller", error)
    }
}

export const returnRequests = async (req, res) => {
    try{
        const userId = req.user._id
        const requests = await User.findOne({_id:userId}).select('sentConnectionRequest unacceptedConnectRequests').populate("sentConnectionRequest unacceptedConnectRequests")
        console.log("a request was made to this endpoint", requests)
        res.status(200).json({requests})
    } catch (error) {
        console.log("error in return requests controller", error)
    }
}

export const addToCart = async (req, res) => {
    try{
        const {id} = req.query
        const userId = req.user._id
        if(!id){
            return res.status(401).json({error:"Pls id is undefined.."})
        }
        const foundPost = await Posts.findOne({_id:id})
        const user = await User.findOne({_id:userId})
        if(!foundPost){
            return res.status(401).json({error:"Product is currently not active.."})
        }

        //time to create or add to cart

        let cart = await Cart.findOne({userId})
        if(!cart){
            //create a cart for the user if they haven't created a cart yet
            cart = await Cart.create({
                userId, products:[]
            })

            const newProduct = {
                productId:id
            }
            cart.products.push(newProduct)
            cart.totalProducts += 1
            await cart.save()

            return res.status(200).json({success:true})
        }

        //add a logic as product cart already exist

        const productIndex = cart.products.findIndex(e => e.productId.toString() === id.toString())
        if(productIndex === -1){
            const newProduct = {
                productId:id
            }
            cart.products.push(newProduct)
            await cart.save()
            return  res.status(200).json({success:true})
        }

        cart.products[productIndex].amount += 1
        cart.totalProducts += 1
        await Cart.findOneAndUpdate({_id:cart._id}, cart)

        res.status(200).json({success:true})
    
    }catch (error){
        console.log("there was an error in addToCart controller", error)
    }
}

export const getMyCart = async (req, res) => {
    try{
        const userId = req.user._id
        const cart = await Cart.findOne({userId}).populate("products.productId", "postimg desc tech product _id price name")

        if(!Object.keys(cart || {}).length){
            return res.status(404).json({error:"you haven't added any product to cart"})
        }

        res.status(200).json({cart})

    }catch(error){
        console.log("error in getMyCart controller", error)
    }
}