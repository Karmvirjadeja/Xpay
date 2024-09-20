const express = require("express");
const z = require("zod");
const { User } = require("../db");
const signupSchema = z.object({
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password cannot exceed 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[\W_]/,
    "Password must contain at least one special character (e.g., !@#$%^&*)"
  );

const userRouter = express.Router();

userRouter.post("/signup", function (req, res) {
  const body = req.body;
  const response = signupSchema.safeParse(body);
  if (!response.success) {
    res.status(411).json("Email already Exist/ Wrong Inputs");
  }

  const existingUser = User.findOne({
    userName: req.body.userName,
  });

  if (existingUser) {
    res.json({
      msg: "Email already Exist/ Wrong Inputs",
    });
  }

  User.create({
    userName: body.userName,
    firstName: body.firstName,
    lastName: body.lastName,
    password: body.password,
  });
  res.json({
    msg: "User added Successfullys",
  });
});

module.exports = {
  userRouter,
};
