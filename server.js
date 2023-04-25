const express = require("express");
const mongoDB = require("./db");
const app = express();
const port = 5000;

mongoDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./Routes/Apiany"));
app.use("/api", require("./Routes/Apitask"));
app.use("/api", require("./Routes/chatchroma"));
app.use("/api", require("./Routes/chatchromatask"));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
