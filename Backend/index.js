const express = require("express");
const { mainRouter } = require("./routes/index.js");
const User = require("./db");
const app = express();
const port = 3000;

//Also used to route request with certain URL
app.use("/api/v1", mainRouter);
app.listen(port, () => {
  console.log("Here is My backend");
});
