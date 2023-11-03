const express=require("express")
const route=express.Router()
const userController=require("../controllers/usersController")

route.post("/register",userController.register)
route.post("/login",userController.userLogin)
route.get("/current-user",userController.authUser)
route.post("/auth-user-email",userController.confirmAccountUser)
route.get('/code-cookie',userController.token)// not yet done
route.post("/logout",userController.logout)
route.get("/list-user/:id",userController.allUserChat)
module.exports=route