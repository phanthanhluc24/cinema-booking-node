const commentModel=require("../models/comment")

class CommentRepository{
    async store(data){
        return await commentModel.create(data)
    }

    async getStarMovie(id){
        return await commentModel.find({"movieId":id}).select("star -_id")
    }
}

module.exports=new CommentRepository()