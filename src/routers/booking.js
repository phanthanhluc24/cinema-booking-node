const express=require("express")
const route=express.Router()
const bookingController=require("../controllers/bookingController")

route.post("/ticket/cinema",bookingController.create)
route.post("/seat-already",bookingController.getSeatBook)
module.exports=route