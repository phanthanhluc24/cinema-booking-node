const mongoose=require("mongoose")
const Schema=mongoose.Schema

const usersSchema=new Schema({
    full_name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,default:"URS"}
})

const user=mongoose.model("users",usersSchema)
module.exports=user 