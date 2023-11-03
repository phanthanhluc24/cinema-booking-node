const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const userRepository = require("../repositories/userRepository");
const secretKey = "phan-thanh-luc-2003";
const EmailCode = require("../email/successBookingEmail");
dotenv.config();
class UserController {
  async register(req, res) {
    try {
      const { full_name, email, phone, password } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await userRepository.register({
        full_name,
        email,
        phone,
        password: hashPassword,
      });
      res.status(201).json({ status: 201, message: "Register successfully" });
    } catch (error) {
      res.status(501).json(error);
    }
  }
  async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      const user = await userRepository.getUserByEmail(email);
      if (!user) {
        res.status(401).json({ error: "Invalid credentials" });
      }
      const isPasswordVal = await bcrypt.compare(password, user.password);

      if (!isPasswordVal) {
        res.status(401).json({ error: "Invalid credentials" });
      }
      const token = jwt.sign(
        { _id: user._id, name: user.full_name, email },
        secretKey,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, { httpOnly: true });
      return res.json({ token,role:user.role });
    } catch (error) {
      return res.status(501).json(error);
    }
  }

  async authUser(req, res) {
    try {
      const token = req.headers.authorization.split(" ");
      jwt.verify(token[1], secretKey, (err, decoded) => {
        if (err) {
          // Handle invalid token
          return res.status(401).json({ message: "Invalid token" });
        }
        res.json(decoded);
      });
    } catch (error) {
      res.status(501).json("User undefine");
    }
  }

  //not yet done
  async confirmAccountUser(req, res) {
    const { email } = req.body;
    try {
      const already = await userRepository.getUserByEmail(email);
      if (!already) {
        return res.status(404).json({ status: 404 });
      }
      const code= await EmailCode.codeConfirm(email);
      res.cookie("code",code,{httpOnly:true})
      // // document.cookie="code="+code
      // localStorage.setItem("code",JSON.stringify(code))
      return res.status(201).json({ status: 201});
    } catch (error) {
      return res.status(501).json("Invalid email");
    }
  }

  //not yet done
  async token(req,res){
    try {
      const code = document.cookie
      if (code) {
        res.json(code);
      } else {
        res.status(404).json({ error: 'Code cookie not found' });
      }
    } catch (error) {
        console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async logout(req,res){
    try {
      res.clearCookie("token",{httpOnly:true})
      res.status(201).json({status:201,message:"Logout successfully"})
    } catch (error) {
      res.status(501).json("Log out fail")
    }
  }

  async allUserChat(req,res){
    const id=req.params.id
    try {
      const allUser=await userRepository.getUserChat(id)
      res.status(201).json(allUser)
    } catch (error) {
      res.status(501).json(error)
    }
  }
}

module.exports = new UserController();
