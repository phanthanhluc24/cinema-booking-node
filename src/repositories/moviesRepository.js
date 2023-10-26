const Movies=require("../models/movies")

class ProductRepositories{
    async createMovie(data){
        return await Movies.create(data)
    }

    async getAllMovies(){
        return await Movies.find();
    }

    async getMovie(id){
        return await Movies.findById(id)
    }

    async deleteMovie(id){
        return await Movies.findByIdAndDelete(id)
    }

    async getAllMovieReleased(){
        const currentDay=new Date();
        currentDay.setHours(0,0,0,0)
        return await Movies.find({"release_date":{$lte: currentDay}})
    }

    async getAllMovieUpComing(){
        const currentDay=new Date();
        currentDay.setHours(0,0,0,0)
        return await Movies.find({"release_date":{$gt: currentDay}})
    }

    async updateMovie({id,data}){
        return await Movies.findByIdAndUpdate(id,data,{new:true})
    }

    async searchMovie(data){
        return await Movies.find({$or:[
            {title:{$regex:data,$options:"i"}},
            {genre:{$regex:data,$options:"i"}}
        ]})
       
    }
    
    async movieRelated(genre,_id){
        return await Movies.find({"genre":genre,"_id":{$ne:_id}})
    }
    
    async getRandomImage(){
        return await Movies.aggregate([
            {$project:{_id:0,image:1}},
            {$sample:{size:4}}
        ])
    }
}
module.exports=new ProductRepositories();