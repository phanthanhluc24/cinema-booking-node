const express=require("express")
const route=express.Router()
const ChatController=require("../controllers/chatController")
const aiControler = require("../controllers/aiControler")
route.post("/ai-response",aiControler.aiResponse)
route.post("/",ChatController.sendMessage)
route.get("/:id",ChatController.userMessage)
route.get("/find/:firstId/:secondId",ChatController.getChat)
module.exports=route