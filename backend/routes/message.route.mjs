import {Router} from "express"
import { protectedRoute } from "../middleware/protectedRoute.mjs";
import { getConversations, readMessage, receivedMessage, sendMessage, readMessages, getEveryConversation, createConversation } from "../controllers/message.controller.mjs";
const route = Router();

route.post("/sendmessage", protectedRoute, sendMessage)
route.get("/getconversation", protectedRoute, getConversations)
route.get("/receivedmessage", protectedRoute, receivedMessage)
route.get("/readmessage", protectedRoute, readMessage)
route.get("/readmessages", protectedRoute, readMessages)
route.get("/geteveryconversation", protectedRoute, getEveryConversation)
route.get("/createconversation", protectedRoute, createConversation)

export default route;