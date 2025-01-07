import express from "express";
import {getUserProfile, updateProfile, follow, suggestedUsers, searchProfile, getUsers, connectWithChannel, returnRequests, addToCart, getMyCart} from "../controllers/user.controller.mjs"
import { protectedRoute} from "../middleware/protectedRoute.mjs";


const router = express.Router()

router.get("/userprofile/:id",protectedRoute, getUserProfile)
router.get("/verify-user",protectedRoute, getUserProfile)
router.post("/searchprofile",protectedRoute, searchProfile)
router.post("/follow/:id",protectedRoute, follow)
router.post("/updateProfile",protectedRoute, updateProfile)
router.get("/suggestedusers",protectedRoute, suggestedUsers)
router.get("/requests",protectedRoute, returnRequests)
router.get("/getusers",protectedRoute, getUsers)
router.get("/connect/:id",protectedRoute, connectWithChannel)
router.get("/addtocart",protectedRoute, addToCart)
router.get("/getmycart",protectedRoute, getMyCart)



export default router