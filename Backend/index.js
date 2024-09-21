const express = require("express");
const { mainRouter } = require("./routes/index.js");
const User = require("./db");
const cors = require("cors");

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

//As the backend and frontend are in different directory then Cors middleware is needed

//Also used to route request with certain URL
app.use("/api/v1", mainRouter);
app.listen(port, () => {
  console.log("Here is My backend");
});
