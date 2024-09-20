const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://jadejakarmvir12:karmvir12@cluster0.wwier.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);
const UserSchema = new mongoose.Schema({
  userName: String,
  firstName: String,
  lastName: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
