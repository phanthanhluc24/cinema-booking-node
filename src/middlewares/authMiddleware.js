const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")

dotenv.config()
const secretKey=process.env.JWT

function authMiddleware(req,res,next){
    const token=req.header("Authorization")

    if (!token) {
       return res.status(402).json({error:"Unauthorized"})
    }
    try {
        const decoded=jwt.verify(token.replace("Bearer",""),secretKey)
        req.user=decoded
        next()
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" });
    }
}

module.exports=authMiddleware