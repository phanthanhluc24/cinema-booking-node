const MoviesRepositories=require("../repositories/moviesRepository")

class MoviesController{
   async create(req,res){
        try {
            const movie=await MoviesRepositories.createMovie(req.body)
            res.status(201).json({status:201,message:"Add new movie success"})
        } catch (error) {
            res.status(501).json({error:"Unable to create new Movies"})
        }
    }

    async index(req,res){
        try {
            const movies=await MoviesRepositories.getAllMovies()
            if (movies.length<1) {
                res.status(200).json("Movies is empty")
            }
            res.status(200).json(movies)
        } catch (error) {
            res.status(501).json({error:"Can't get movies"})
        }
    }

    async edit(req,res){
        try {
            const movie=await MoviesRepositories.getMovie(req.params.id)
            res.status(200).json(movie)
        } catch (error) {
            res.status(500).json("Movie not found")
        }
    }

    async update(req,res){
        try {
            const {title,release_date,genre,director,actors,duration,description,language,country,price,movie_url,image,}=req.body
            const data={
                    title:title,
                    release_date:release_date,
                    genre:genre,
                    director:director,
                    actors:actors,
                    duration:duration,
                    description:description,
                    language:language,
                    country:country,
                    price:price,
                    movie_url:movie_url,
                    image:image
            }
            const id=req.params.id
            const target= await MoviesRepositories.updateMovie({id,data})
            res.status(201).json({status:201,message:"Update successfully"})
        } catch (error) {
            res.status(501).json({status:501,message:"Update failed"})
        }
    }

    async destroy(req,res){
        try {
            const movie = await MoviesRepositories.deleteMovie(req.params.id)
            res.status(200).json("Delete movie successful!")
        } catch (error) {
            res.status(500).json("Movie not found")
        }
    }

    async moviesReleased(req,res){
        try {
            const movie=await MoviesRepositories.getAllMovieReleased();
            res.status(201).json(movie)
        } catch (error) {
            res.status(500).json("Error to get movies")
        }
    }

    async moviesUpComing(req,res){
        try {
            const movie=await MoviesRepositories.getAllMovieUpComing()
            res.status(201).json(movie)
        } catch (error) {
            res.status(500).json("error to get movies")
        }
    }

    async searchMovie(req,res){
        const data=req.body
        try {
            const search=await MoviesRepositories.searchMovie(data.search)
            res.status(201).json(search)
        } catch (error) {
            res.status(401).json("Data not found")
        }
    }
}

module.exports=new MoviesController();