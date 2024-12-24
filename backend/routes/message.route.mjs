import {Router} from "express"
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import { getConversations, readMessage, receivedMessage, sendMessage } from "../controllers/message.controller.mjs";
const route = Router();

route.post("/sendmessage", protectedRoute, sendMessage)
route.get("/getconversation", protectedRoute, getConversations)
route.get("/receivedmessage", protectedRoute, receivedMessage)
route.get("/readmessage", protectedRoute, readMessage)

export default route;