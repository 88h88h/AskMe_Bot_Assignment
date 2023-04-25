const express = require("express");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const Transcript = require("../models/Transcript");

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/convert", async (req, res) => {
  try {
    const filepath = path.join(__dirname, "../resource/audio.mp3");
    const transcript = await openai.createTranscription(
      fs.createReadStream(filepath),
      "whisper-1"
    );
    try {
      await Transcript.create({
        link: "https://www.youtube.com/watch?v=oL1uem6-3m4&ab_channel=BasicoServiceNowLearning",
        transcript: transcript.data.text,
      });
      res.json({ successdatabase: true });
    } catch (error) {
      console.log(error);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
