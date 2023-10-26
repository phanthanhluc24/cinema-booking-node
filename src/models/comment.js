const mongoose=require("mongoose")
const Schema=mongoose.Schema

const commentSchema =new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"users",require:true},
    movieId:{type:Schema.Types.ObjectId,ref:"movies",require:true},
    comment:{type:String,require:true},
    star:{type:String}
})
const comment=mongoose.model("comments",commentSchema)
module.exports=comment