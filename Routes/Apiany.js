const express = require("express");
const path = require("path");
const fs = require("fs");
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const YouTubeVideoId = require("youtube-video-id");
const ffmpeg = require("fluent-ffmpeg");
require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const Transcript = require("../models/Transcript");

const router = express.Router();

ffmpeg.setFfmpegPath("C:/ffmpeg/bin/ffmpeg.exe");
ffmpeg.setFfprobePath("C:/ffmpeg/bin/ffprobe.exe");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.post("/convert2", async (req, res) => {
  try {
    const targetfilepath = path.join(__dirname, "../resource/");
    var YD = new YoutubeMp3Downloader({
      ffmpegPath: "C:/ffmpeg/bin/ffmpeg.exe", // FFmpeg binary location
      outputPath: targetfilepath, // Output file location (default: the home directory)
      youtubeVideoQuality: "lowest", // Desired video quality (default: highestaudio)
      queueParallelism: 1, // Download parallelism (default: 1)
      progressTimeout: 2000, // Interval in ms for the progress reports (default: 1000)
      allowWebm: false, // Enable download from WebM sources (default: false)
    });

    const youtubelink = req.body.link;
    const youtubeid = YouTubeVideoId(youtubelink);
    //Download video and save as MP3 file
    YD.download(youtubeid, "audio2.mp3");

    YD.on("error", function (error) {
      console.log(error);
    });

    YD.on("progress", function (progress) {
      console.log(JSON.stringify(progress));
    });
    YD.on("finished", async function (err, data) {
      console.log(JSON.stringify(data));

      const filepath = path.join(__dirname, "../resource/audio2.mp3");
      const transcript = await openai.createTranscription(
        fs.createReadStream(filepath),
        "whisper-1"
      );

      try {
        await Transcript.create({
          link: youtubelink,
          transcript: transcript.data.text,
        });
        res.json({ successdatabase: true });
      } catch (error) {
        console.log(error);
        res.json({ success: false });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
