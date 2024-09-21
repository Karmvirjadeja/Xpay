const mongoose = require("mongoose");
const { number } = require("zod");
mongoose.connect(
  "mongodb+srv://jadejakarmvir12:karmvir12@cluster0.wwier.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const UserSchema = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
});

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
const Account = mongoose.model("Account", AccountSchema);

module.exports = {
  User,
  Account,
};
