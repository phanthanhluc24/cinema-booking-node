const moviesRouter=require("./movies")
const cinemaRouter=require("./cinemas")
const userRouter=require("./users")
const bookRouter=require("./booking")
const commentRouter=require("./comment")
const chatRouter=require("./chat")
const messageRouter=require("./messages")
const paymentRouter=require("./payment")
function route(app){
    app.use("/admin",moviesRouter)
    app.use("/cinema",cinemaRouter)
    app.use("/auth/user",userRouter)
    app.use("/booking",bookRouter)
    app.use("/comment/",commentRouter)
    app.use("/chat",chatRouter)
    app.use("/message",messageRouter)
    app.use("/payment",paymentRouter)
}
module.exports=route;