import {Router} from "express"
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import { getConversations, sendMessage } from "../controllers/message.controller.mjs";
const route = Router();

route.post("/sendmessage", protectedRoute, sendMessage)
route.get("/getconversation", protectedRoute, getConversations)

export default route;