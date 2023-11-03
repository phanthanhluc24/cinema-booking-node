const express=require("express")
const route=express.Router()
const ChatController=require("../controllers/chatController")
route.post("/",ChatController.sendMessage)
route.get("/:id",ChatController.userMessage)
route.get("/find/:firstId/:secondId",ChatController.getChat)

module.exports=route