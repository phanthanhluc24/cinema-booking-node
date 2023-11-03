const chatModel=require("../models/chats")

class ChatRepository{
   async createChat(data){
       return chatModel.create({members:data})
   }

   async userChat(idUser){
    return chatModel.find({members:{$in:[idUser]}})
   }

   async finChat(allId){
    return chatModel.findOne({members:{$all:allId}})
   }
}

module.exports=new ChatRepository