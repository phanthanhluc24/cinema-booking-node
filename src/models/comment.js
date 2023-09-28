const mongoose=require("mongoose")
const Schema=mongoose.Schema

const commentSchema =new Schema({
    userId:{type:String,require:true},
    movieId:{type:String,require:true},
    comment:{type:String,require:true},
    star:{type:String}
})
const comment=mongoose.model("comments",commentSchema)
module.exports=comment