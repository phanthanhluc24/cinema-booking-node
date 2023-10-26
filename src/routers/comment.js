const express=require("express")
const route=express.Router();

const commentController=require("../controllers/commentController");

route.post("/movie/:id",commentController.store)
route.get("/all-comment/:id",commentController.getAllComment)
module.exports=route