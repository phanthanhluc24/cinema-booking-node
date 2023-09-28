const mongoose=require("mongoose")
const Schema=mongoose.Schema

const moviesSchema=new Schema({
    title:{type:String,require:true},
    release_date:{type:Date,require:true},
    genre:{type:String,require:true},
    director:{type:String,require:true},
    actors:{type:String,require:true},
    duration:{type:Number,require:true},
    rating:{type:Number},
    description:{type:String,require:true},
    language:{type:String,require:true},
    country:{type:String,require:true},
    price:{type:String,require:true},
    movie_url:{type:String,require:true},
    image:{type:String,require:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})

const movies=mongoose.model("movies",moviesSchema)

module.exports=movies 