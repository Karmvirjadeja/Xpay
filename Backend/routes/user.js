const express = require("express");
const z = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || require("../config"); // Ensure secret is loaded
const signupSchema = z.object({
  userName: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

const userRouter = express.Router();

// Password validation schema (You can uncomment this and use it as part of validation)
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(100, "Password cannot exceed 100 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[\W_]/, "Password must contain at least one special character");

userRouter.post("/signup", async (req, res) => {
  const body = req.body;

  // Validate request body against signupSchema
  const response = signupSchema.safeParse(body);
  if (!response.success) {
    return res.status(400).json({
      msg: "Invalid inputs",
      errors: response.error.errors,
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ userName: body.userName });
    if (existingUser) {
      return res.status(409).json({
        msg: "User already exists",
      });
    }

    // Create new user
    const newUser = await User.create({
      userName: body.userName,
      firstName: body.firstName,
      lastName: body.lastName,
      password: body.password,
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send success response
    res.status(201).json({
      token,
      msg: "User added successfully",
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

module.exports = {
  userRouter,
};
