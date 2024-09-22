const express = require("express");

const mongoose = require("mongoose");
const { Account } = require("../db");
const { authMiddleware } = require("../middleware");
const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.userId,
  });
  res.json({
    balance: account.balance,
  });
});

//Here using transaction in mongoose
//Before transactions a session must be created

// {
//   amount:
//   to:
// }
accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;
  console.log(amount);
  console.log(to);
  //Fetch the account from which money is to be transferred
  const fromAccount = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (!fromAccount || fromAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficient balance",
    });
  }
  //fetch the account where the money is to be sent
  const toAccount = await Account.findOne({ userId: to }).session(session);

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid Account",
    });
  }
  //send the money
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  //Commit the transaction
  await session.commitTransaction();
  res.json({
    message: "Transfer successfull",
  });
});
module.exports = {
  accountRouter,
};
