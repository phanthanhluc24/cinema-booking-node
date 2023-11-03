const messageRepository=require("../repositories/messageRepository")

class MessageController{
    async newMessage(req,res){
        const {chatId,senderId,text} =req.body
        try {
            const newMessage=await  messageRepository.addMessage({chatId,senderId,text})
            res.status(201).json(newMessage)
        } catch (error) {
            res.status(501).json(error)   
        }
    }

    async getMessage(req,res){
        const chatId=req.params.id
        try {
            const message=await messageRepository.getMessage(chatId)
            res.status(201).json(message)
        } catch (error) {
            res.status(501).json(error)
        }
    }
}

module.exports=new MessageController