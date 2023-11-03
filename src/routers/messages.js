const express=require("express")
const route=express.Router()
const messageController=require("../controllers/messageController")
route.post("/",messageController.newMessage)
route.get("/:id",messageController.getMessage)

module.exports=route