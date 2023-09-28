const express=require("express")
const route=express.Router();

const moviesController=require("../controllers/moviesController")

route.post("/create",moviesController.create);
route.get("/all-movies",moviesController.index)
route.get("/movie/:id",moviesController.edit)
route.put("/update-movie/:id",moviesController.update)
route.get("/get-movies-released",moviesController.moviesReleased)
route.get("/get-movies-upcoming",moviesController.moviesUpComing)
route.post("/search-movie",moviesController.searchMovie)
module.exports=route;
