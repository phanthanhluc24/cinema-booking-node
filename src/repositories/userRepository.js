const userModel=require("../models/users")

class UserRepositories{
    async register(data){
       return await userModel.create(data)
    }

    async getUserByEmail(email){
        return await userModel.findOne({email})
    }
}

module.exports=new UserRepositories();
