const CommentRepository=require("../repositories/commentRepository")
const jwt = require("jsonwebtoken");
const secretKey = "phan-thanh-luc-2003";
class CommentController{
   async store(req,res){
        const {comment,star}=req.body
        const token=req.headers.authorization.split(" ")
        jwt.verify(token[1],secretKey,(error,decode)=>{
            if (error) {
               return res.status(501).json({status:501,message:"Invalid token!"})
            }
            try {
                const comments= CommentRepository.store({
                    userId:decode._id,
                    movieId:req.params.id,
                    comment,
                    star
                })

                return res.status(201).json({status:201,message:comments})
            } catch (error) {
                return res.status(501).json("Comment fail")
            }
        })
    }
}
module.exports=new CommentController()