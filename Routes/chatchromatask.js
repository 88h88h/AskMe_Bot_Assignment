const express = require("express");
const { OpenAI } = require("langchain/llms/openai");
const { RetrievalQAChain } = require("langchain/chains");
const { Chroma } = require("langchain/vectorstores/chroma");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
require("dotenv").config();
const Transcript = require("../models/Transcript");

const router = express.Router();

// to run this first run chroma's docker-container with `docker-compose up -d --build`
router.post("/chat", async (req, res) => {
  let link =
    "https://www.youtube.com/watch?v=oL1uem6-3m4&ab_channel=BasicoServiceNowLearning";
  let transcriptData = await Transcript.findOne({ link });
  console.log(transcriptData.transcript);
  if (!transcriptData) {
    return res.status(400).json({ errors: "System Fault" });
  }
  /* Initialize the LLM to use to answer the question */
  const model = new OpenAI();
  /* Load in the file we want to do question answering over */
  const text = transcriptData.transcript;
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
  const docs = await textSplitter.createDocuments([text]);
  console.log(docs);
  /* Create the vectorstore */
  const vectorStore = await Chroma.fromDocuments(docs, new OpenAIEmbeddings(), {
    collectionName: "test",
  });
  /* Create the chain */
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  /* Ask it a question */
  const question = req.body.query;
  const response = await chain.call({ query: question });
  res.json({ success: true, answer: response });
  console.log(response);
});

module.exports = router;
