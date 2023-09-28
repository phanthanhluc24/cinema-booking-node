const cinemasRepositories=require("../repositories/cinemasRepository")

class cinemasController{
   async create(req,res){
        try {
            const cinema=await cinemasRepositories.createCinema(req.body)
            res.status(201).json(cinema)
        } catch (error) {
            res.status(500).json("Can not add new cinema")
        }
    }

    async index(req,res){
        try {
            const cinemas=await cinemasRepositories.getAllCinemas();
            res.status(201).json(cinemas)
        } catch (error) {
            res.status(500).json("Can not get all cinemas")
        }
    }

    async cinemaName(req,res){
        try {
            const cinemas=await cinemasRepositories.getCinemaName()
            res.status(201).json(cinemas)
        } catch (error) {
            res.status(500).json("Can not get all cinemas name")
        }
    }

    async cinemaById(req,res){
        try {
            const cinema=await cinemasRepositories.getCinemaById(req.params.id)
            res.status(201).json(cinema)
        } catch (error) {
            res.status(501).json("Movie not found")
        }
    }

    async update(req,res){
        const {cinema_name,address,phone,show_times,ticket_price,service,capacity,map,image}=req.body
        const id=req.params.id
        const data={
        cinema_name:cinema_name,
        address:address,
        phone:phone,
        show_times:show_times,
        ticket_price:ticket_price,
        service:service,
        capacity:capacity,
        map:map,
        image:image
        }
        try {
            const cinema=await cinemasRepositories.updateCinema({id,data})
            res.status(201).json({status:201,message:"update successfully"})
        } catch (error) {
            res.status(501).json("update fail")
        }
}
}

module.exports=new cinemasController()