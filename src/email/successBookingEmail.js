const nodemailer=require("nodemailer")
const dotenv=require("dotenv")
dotenv.config()
class SuccessBookingEmail{
    confirm(email,money,seat,movie,time,address,movieId){
        const transporter=nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user:process.env.EMAIL_ADDRESS,
                pass:process.env.PASSWORD
            }
        })

        const contentEmail=`
        <html>
            <head>
            </head>
            <body>
                <div style="display:flex;justify-content:center;align-items:center;">
                    <div>
                        <h1 style="color: red;">Your information about movie</h1>
                        <p style="color:red; font-size:18">Total: ${money}</p>
                        <p style="color:red; font-size:18">Movie: ${movie}</p>
                        <p style="color:red; font-size:18">Seat: ${seat}</p>
                        <p style="color:red; font-size:18">Time: ${time}</p>
                        <p style="color:red; font-size:18">Address: ${address}</p>
                        <p style="color:red; font-size:18">If you finish to watching feel free to comment at:<a href="http://localhost:3000/comment/${movieId}">Link</a> </p>
                    </div>
                </div>
            </body>
        </html>
        `

        const mailOptions={
            from:"XHTD Cinema",
            to:email,
            subject:"Thank you for booking our movie",
            title:"Hi",
            html:contentEmail
        }

        transporter.sendMail(mailOptions,function(error,info){
            if (error) {
                console.log(error);
            }else{
                console.log("Success send mail");
            }
        })
    }

   async codeConfirm(email){
        const count=6
        const randomNumbers=[]
        for (let i = 0; i < count; i++) {
           const randomNumber=Math.floor(100000 + Math.random() *900000)
           randomNumbers.push(randomNumber)  
        }
        const transporter=nodemailer.createTransport({
            service:"Gmail",
            auth:{
                user:process.env.EMAIL_ADDRESS,
                pass:process.env.PASSWORD
            }
        })
        const mailOptions={
            from:"XHTD Cinema",
            to:email,
            subject:"Your code to confirm your account",
            title:"Hi",
            html:String(randomNumbers[0]) 
        }
        transporter.sendMail(mailOptions,function(error,info){
            if (error) {
                console.log(error);
            }else{
                console.log("Success send mail");
            }
        })
        return String(randomNumbers[0])
    }
}

module.exports=new SuccessBookingEmail()