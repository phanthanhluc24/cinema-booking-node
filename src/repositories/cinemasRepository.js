const Cinemas=require("../models/cinemas")

class cinemasRepositories{
    async createCinema(data){
        return await Cinemas.create(data);
    }

    async getAllCinemas(){
        return await Cinemas.find();
    }

    async getCinemaById(id){
        return await Cinemas.findById(id)
    }
    async getCinemaName(){
        return await Cinemas.find().select("cinema_name _id")
    }

    async updateCinema({id,data}){
        return await Cinemas.findByIdAndUpdate(id,data,{new:true})
    }

}

module.exports=new cinemasRepositories()