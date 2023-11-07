const dotenv = require("dotenv");
dotenv.config();
const { OpenAI } = require("openai");
const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
class AiController {
  async aiResponse(req, res) {
    const {question}=req.body
    try {
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: question }],
            model: "gpt-3.5-turbo",
          });
        res.status(200).json(completion.choices[0].message.content)
    } catch (error) {
        res.status(501).json(error)
    }
  }
}

module.exports = new AiController();
