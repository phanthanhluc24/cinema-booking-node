const commentModel=require("../models/comment")

class CommentRepository{
    async store(data){
        return await commentModel.create(data)
    }
}

module.exports=new CommentRepository()