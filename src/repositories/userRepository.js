const userModel=require("../models/users")

class UserRepositories{
    async register(data){
       return await userModel.create(data)
    }

    async getUserByEmail(email){
        return await userModel.findOne({email})
    }

    async getUserChat(id){
        return await userModel.find({_id:{$in:id}})
    }
}

module.exports=new UserRepositories();
