const chatRepository=require("../repositories/chatRepository")

class ChatController{
    async sendMessage(req,res){
        const data={
            senderId:req.body.senderId,
            receiverId:req.body.receiverId
        }
        try {
            const userMessage=await chatRepository.createChat([data.senderId,data.receiverId])
           res.status(201).json(userMessage)
        } catch (error) {
            res.status(501).json(error)
        }
    }

    async userMessage(req,res){
        const idUser=req.params.id
        try {
            const userChat=await chatRepository.userChat(idUser)
           return res.status(201).json(userChat)
        } catch (error) {
            res.status(501).json(error)
        }
    }
    async getChat(req,res){
        const id={
            firstId:req.params.firstId,
            secondId:req.params.secondId
        }
        try {
            const privateChat=await chatRepository.finChat([id.firstId,id.secondId])
            res.status(201).json(privateChat)
        } catch (error) {
            res.status(501).json(error)
        }
    }
}
module.exports=new ChatController