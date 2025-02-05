import express from "express";
import {createPost,getPost, DeletePost, fetchFollowing, CommentPost, likeunlikepost, getAllPost, getUserPost, bookMarkPost, getBookMark} from "../controllers/post.controller.mjs"
import { protectedRoute} from "../middleware/protectedRoute.mjs";
import { suggestedUsers } from "../controllers/user.controller.mjs";


const router = express.Router()

router.post("/createpost", protectedRoute, createPost)
router.get("/getposts",protectedRoute, getAllPost)
router.get("/getfollowingposts",protectedRoute, fetchFollowing)
router.post("/deletepost/:id",protectedRoute, DeletePost)
router.post("/commentpost/:id",protectedRoute, CommentPost)
router.post("/likepost/:id",protectedRoute,likeunlikepost )
router.get("/getuserpost/:id",protectedRoute,getUserPost )
router.get("/getpost/:id",protectedRoute,getPost )
router.get("/bookmark/:id", protectedRoute, bookMarkPost)
router.get("/getbookmarks", protectedRoute, getBookMark)


export default router