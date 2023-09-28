const mongoose=require("mongoose")
const Schema=mongoose.Schema

const SchemaBooking=new Schema({
    userId:{type:Schema.Types.ObjectId,ref:"users",require:true},
    movieId:{type:Schema.Types.ObjectId,ref:"movies",require:true},
    cinemaId:{type:Schema.Types.ObjectId,ref:"cinemas",require:true},
    show_times:{type:String,require:true},
    booking_day:{type:Date},
    ticket_status:{type:String,default:"active"},
    ticket_price:{type:String},
    seat_number:{type:String},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now}
})

const booking=mongoose.model("booking",SchemaBooking)
module.exports=booking