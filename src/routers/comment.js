const express=require("express")
const route=express.Router();

const commentController=require("../controllers/commentController")

route.post("/movie/:id",commentController.store)

module.exports=route