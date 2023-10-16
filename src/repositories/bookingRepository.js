const bookingModel=require("../models/booking")

class BookingRepository{
   async bookTicket(data){
        return bookingModel.create(data)
    }

    async getSeatAlready({movieId,cinemaId,show_times}){
        const bookings =bookingModel.find({movieId,cinemaId,show_times})
        const seatNumber=(await bookings).map(booking=>booking.seat_number)
        return seatNumber
    }

    
}
module.exports=new BookingRepository()


