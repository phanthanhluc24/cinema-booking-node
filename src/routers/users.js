const express=require("express")
const route=express.Router()
const userController=require("../controllers/usersController")

route.post("/register",userController.register)
route.post("/login",userController.userLogin)
route.get("/current-user",userController.authUser)
route.post("/auth-user-email",userController.confirmAccountUser)
route.get('/code-cookie',userController.token)
route.post("/logout",userController.logout)
module.exports=route