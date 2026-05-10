import express from "express";
import { userModel } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Block fake/temp domains
const blockedDomains = [
  "tempmail.com",
  "10minutemail.com",
  "mailinator.com",
  "fake.com"
];

// Email validation
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return false;

  const domain = email.split("@")[1].toLowerCase();

  if (blockedDomains.includes(domain)) return false;

  return true;
};

// Strong password check
const isStrongPassword = (password) => {
  return password.length >= 6;
};


// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: "Enter valid email address"
      });
    }

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: newUser._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "Registered successfully",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
});

export default router;