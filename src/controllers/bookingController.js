const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const secretKey = "phan-thanh-luc-2003";
dotenv.config();
const BookingRepository = require("../repositories/bookingRepository");
const BookingEmail = require("../email/successBookingEmail");
const Movies = require("../models/movies");
const Cinemas=require("../models/cinemas")
class BookingController {
  async create(req, res) {
    try {
      const { movieId, cinemaId, show_times, ticket_price, seat_number } =req.body;
      const token = req.headers.authorization.split(" ");
      const movieName =await Movies.findById(movieId).select({title:1,_id:0});
      const addressCinema =await Cinemas.findById(cinemaId).select({address:1,_id:0});
      jwt.verify(token[1], secretKey, (err, decoded) => {
        if (err) {
          res.status(501).json("Invalid token");
        }
        try {
          const day = new Date();
           BookingRepository.bookTicket({
            movieId,
            cinemaId,
            seat_number,
            show_times,
            ticket_price,
            userId: decoded._id,
            booking_day: day.setHours(0, 0, 0, 0),
          });
          const mail = BookingEmail.confirm(
            decoded.email,
            ticket_price,
            seat_number,
            movieName.title,
            show_times,
            addressCinema.address,
            movieId
          );
          return res.json({ status: 201, message: "Booking success"});
        } catch (error) {
          res.status(501).json("Can't book ticket");
        }
      });
    } catch (error) {
      res.status(501).json("Bad request");
    }
  }

  async getSeatBook(req, res) {
    const { movieId, cinemaId, show_times } = req.body;
    const number=[]
    try {
      const seatNumber = await BookingRepository.getSeatAlready({
        movieId,
        cinemaId,
        show_times,
      });
      for (let i = 0; i < seatNumber.length; i++) {
        const arrayNumber=seatNumber[i].split(",")
        for (let j = 0; j < arrayNumber.length; j++) {
          const convert=parseInt(arrayNumber[j],10)
          if(!isNaN(convert)){
            number.push(convert)
          }
        }
      }
      res.status(201).json(number);
    } catch (error) {
      res.status(501).json("Error");
    }
  }
}

module.exports = new BookingController();
