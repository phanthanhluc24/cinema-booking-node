const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
  members: { type: Array },
},
{
    timestamps:true
});

const chat=mongoose.model("chat",chatSchema)
module.exports=chat