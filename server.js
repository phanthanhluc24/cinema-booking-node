const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const route=require("./src/routers")
const cors=require("cors")
const cookie=require("cookie-parser")
dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;
const MONGODB_URL=process.env.MONGODB_URL;
// middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json());
mongoose
.connect(MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connect success to Mongodb");
})
.catch((err)=>{
    console.log("Error connect with mongodb:",err);
    process.exit(1)
})
// config cors
const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your Next.js app's domain
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204, // Return a 204 status code for preflight requests
  };
  app.use(cors(corsOptions));
// config route
route(app)
//config cookie
app.use(cookie())


app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
})