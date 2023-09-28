const mongoose=require("mongoose")
const Schema=mongoose.Schema

const cinemasSchema= new Schema({
    cinema_name:{type:String,require:true},
    address:{type:String,required:true},
    phone:{type:String,required:true},
    show_times:{type:String,required:true},
    ticket_price:{type:String,required:true},
    service:{type:String,required:true},
    capacity:{type:Number,required:true},
    map:{type:String,required:true},
    image:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})
const cinema=mongoose.model("cinemas",cinemasSchema)
module.exports=cinema