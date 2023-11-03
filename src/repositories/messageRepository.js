const messageModel=require("../models/message")

class MessageRepository{
    async addMessage(data){
            return messageModel.create(data)
    }

    async getMessage(chatId){
        return messageModel.find({chatId})
    }
}

module.exports=new MessageRepository