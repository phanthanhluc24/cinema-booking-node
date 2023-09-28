const moviesRouter=require("./movies")
const cinemaRouter=require("./cinemas")
const userRouter=require("./users")
const bookRouter=require("./booking")
const commentRouter=require("./comment")
function route(app){
    app.use("/admin",moviesRouter)
    app.use("/cinema",cinemaRouter)
    app.use("/auth/user",userRouter)
    app.use("/booking",bookRouter)
    app.use("/comment/",commentRouter)
}
module.exports=route;