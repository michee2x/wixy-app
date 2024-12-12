import express from "express";
import { Signup, logout, login, verifyUser } from "../controllers/auth.controller.mjs";


const router = express.Router()

router.post('/signUp', Signup)
router.post('/logout', logout)
router.post('/login', login)
router.get('/verify', verifyUser)

export default router