const dotenv = require("dotenv");
const multer = require("multer");
dotenv.config();
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
const uploadRepository = require("../repositories/uploadRepository");
class AiController {
  async aiResponse(req, res) {
    const { question } = req.body;
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: question }],
        model: "gpt-3.5-turbo",
      });
      res.status(200).json(completion.choices[0].message.content);
    } catch (error) {
      res.status(501).json(error);
    }
  }

  async uploadImage(req, res) {
    const {image}=req.body
    const storageEngine = multer.diskStorage({
      destination: "../asset/",
      filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`);
      },
    });
    
    const upload = multer({
      storage: storageEngine,
      limits: { fieldSize: 1000000 },
      fileFilter: (req, file, cb) => {
        uploadRepository.checkFileType({file, cb});
      },
    }).single("image")
    try {
      upload(req,res,(err)=>{
        if (err instanceof multer.MulterError) {
          return res.status(400).send("Please upload a valid image");
        }else if(err){
          return res.status(491).json("Image can't upload ",err);
        }
        res.send({message:"Single file uploaded successfully",file:req.file});
      })
    } catch (error) {
      res.status(501).send("Image can't upload");
    }
  }
}

module.exports = new AiController();
