const express = require("express");

const userRouter = express.Router();

userRouter.get("/", function (req, res) {
  res.send("Here it is good");
});

module.exports = {
  userRouter,
};
