const mongoose = require("mongoose");

const mongoURI =
  "mongodb+srv://harshprakashdps:chatbot123@cluster0.30xgub3.mongodb.net/?retryWrites=true&w=majority";

async function mongoDB() {
  await mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((err) => {
      console.log(err);
    });
}

module.exports = mongoDB;
