const express=require("express")
const route=express.Router()
const paymentController=require("../controllers/paymentController")

route.post("/",paymentController.Payment)
module.exports=route