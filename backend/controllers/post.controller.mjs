import Posts from "../models/post.model.mjs"
import User from "../models/user.model.mjs"
import { Notification } from "../models/notification.model.mjs"
import cloudinary from "cloudinary"
import fs from "fs"


export const createPost = async (req, res) => {
    try{
        const userId = req.user._id
        const data = req.body
        console.log("this is the product data to post to database", data)
        const user = await User.findOne(userId);
        if(!user) return res.status(401).json({error:"user not found in database."})

        const newProduct = new Posts({
            ...data, user:userId
        })

        if(newProduct){
            await newProduct.save()
            res.status(200).json({newProduct})
        }
    } catch (error){
        console.log("error in post controller", error)
        res. status(500).json({error:"Internal server error..."})
    }
}

export const DeletePost = async (req, res) => {
    try{
        const {id} = req.params
        const post = await Posts.findById(id)
        
        if(!post) return res.status(404).json({error:"post not found"})

        if(post){

          const id = post?.file.split("/").pop().split(".")[0]
          console.log("this file is being deleted", id)
          await cloudinary.uploader.destroy(id)
          
          const comments = post.Comments
        if(comments){
            for(const comment of comments){
                const fileId = comment?.file?.split("/").pop().split(".")[0]
                await cloudinary.uploader.destroy(fileId) 
            }
        }
          

            
          
        }
        

        await Posts.findByIdAndDelete(id)

        res.json({message:"post deleted successfully"})
    }catch (error) {
        console.log("error in deletepost controller", error)
        res.status(500).json({eror:"Internal server Error.."})
    }
}

export const CommentPost = async (req, res) => {
    try{
        const {id} = req.params
        const postid = id.toString()
        const {text} = req.body
        let {serverFile:file} = req.body
        const userid = req.user._id

        if((!text || !file) && ! id) return res.status(401).json({error:"pls send a post"})

        const post = await Posts.findById(postid)

        if(!post) return res.status(404).json({error:"Post no found err"})

        if(file){
            const uploadedResponse = await cloudinary.uploader.upload(file)
            file = uploadedResponse.secure_url
        }

        const comment = {
           text, file, userid
        }

        await Posts.updateOne({_id:postid}, {$push:{Comments:comment}})

        await res.status(200).json({message:post})


    } catch (error){
        console.log("error in comentPost controller", error)
        res.status(500).json({error:"Internal server error"}) 
  }
}
export const likeunlikepost =  async(req, res) => {
    try{
        const {id} = req.params
        const postid = id.toString()
        
        const post = await Posts.findById(postid)
        const loggedInUser = await User.findById(req.user._id)
        const postUser = await User.findById(post.user)

        if(!post || !loggedInUser) return res.status(401).json({error:"post not found error"})

        

        if(!post.likes.includes(req.user._id)){
            await Posts.findByIdAndUpdate(post._id, {$push:{likes:req.user._id}})
            const notification = {
                from:req.user._id, to:postUser._id, type:"like"
            }

            const newNotification = new Notification(notification)
            await newNotification.save()
            return res.status(200).json({message:`you just liked ${postUser.name}'s post`})
        }
        else{
            await Posts.findByIdAndUpdate(post._id, {$pull:{likes:req.user._id}})
            
            return res.status(200).json({message:`you just unliked ${postUser.name}'s post`})
        }

    }catch(error) {
        console.log("there is ana error in likeunlike controller", error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const getAllPost = async(req, res) => {
    try{
        const posts = await Posts.find({}).populate("user").sort({createAt: -1})
        res.status(200).json({posts})
    } catch (error) {
        console.log("error in getAll post route", error)
        res.status(500).json({error:"Internal server error"})
    }
}

export const getUserPost = async (req, res) => {
    try{
        console.log("it is timeeeee toget post")
        const id = req.params.id.toString()

        const post = await Posts.findOne({_id:id})

        if(!post) return res.status(404).json({error:"product not found..."})

        res.status(200).json({post})

    } catch (error){
        console.log("error in getAll post route", error)
        res.status(500).json({error:"Internal server error"})
    }
}
export const getPost = async (req, res) => {
    try{
        const id = req.params.id.toString()

        const userPost = await Posts.findById(id).populate({path:"user"})
        .populate({path:"Comments.userid"})

        if(!userPost) return res.status(404).json({error:"userpost not found..."})

        res.status(200).json(userPost)

    } catch (error){
        console.log("error in getAll post route", error)
        res.status(500).json({error:"Internal server error"})
    }
}
export const fetchFollowing = async (req, res) => {
    try{
        const userid = req.user._id
        const user = await User.findById(userid)

        if(!user) return res.status(400).json({error:"user not found error..."})

        const following = user.following;
        const feedPost = await Posts.find({user:{$in:following}}).sort({createAt: -1}).populate({path:"user", select:"-password"})
        
        if(!feedPost) return res.status(404).json({message:"no post found of the current users you follow"})

        res.status(200).json(feedPost)
    } catch(error){
        console.log("error in fetchFollowing controller", error)
    }
}
export const bookMarkPost = async (req, res) => {
    try{

        const {id} = req.params
        const loggedInUserId = req.user._id

        const Post = await Posts.findById(id)
        const loggedInUser = await User.findById(loggedInUserId)

        if(Post.bookmark?.includes(loggedInUserId)){
            await Posts.findByIdAndUpdate(id, {$pull:{bookmark:loggedInUserId}})
        }else{
            await Posts.findByIdAndUpdate(id, {$push:{bookmark:loggedInUserId}})
        }
        if(loggedInUser.bookmark?.includes(id)){
            await User.findByIdAndUpdate(loggedInUserId, {$pull:{bookmark:id}})
        }else{
            await User.findByIdAndUpdate(loggedInUserId, {$push:{bookmark:id}})
        }

        const post = await Posts.findById(id)
        const bookmarks = post.bookmark?.length

        res.status(200).json({bookmarks})

    }catch(error){
        console.log("error in bookmark constroller", error)
    }
}
export const getBookMark = async (req, res) => {
    try{
        const user = await User.findById(req.user._id)
        const bookmarks = user.bookmark
        if(!bookmarks){
            return res.status(200).json({message:"no bookmarks"})
        }
        const bookMarkPost = await Posts.find({_id:{$in:bookmarks}}).populate("user")
        if(!bookMarkPost){
            return res.status(404).json({message:[]})
        }

        res.status(200).json(bookMarkPost)

    }catch(error){
        console.log("error in getBookMark controller", error)
    }
}