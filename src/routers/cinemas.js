const express=require("express")
const route=express.Router()
const cinemaController=require("../controllers/cinemasController")

route.post("/create",cinemaController.create)
route.get("/all-cinemas",cinemaController.index)
route.get("/cinema-name",cinemaController.cinemaName)
route.get("/get-time-show/:id",cinemaController.cinemaById)
route.get("/edit-cinema/:id",cinemaController.cinemaById)
route.put("/update-cinema/:id",cinemaController.update)
module.exports=route