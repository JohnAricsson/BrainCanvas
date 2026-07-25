import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { signup } from "../controllers/authController.js";
const router = express.Router();

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt.sign(
    {
      id: user._id,
    },
    secret,
    { expiresIn: "1d" },
  );
};

router.post("/signup", signup);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect:
      "https://braincanvas007.onrender.com/login?error=cancelled",
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user);
      res.redirect(`https://braincanvas007.onrender.com/login?token=${token}`);
    } catch (error) {
      console.error("JWT Signing Error:", error);
      res.redirect(
        "https://braincanvas007.onrender.com/login?error=auth_failed",
      );
    }
  },
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.password) {
      return res.status(400).json({
        message: "Please login with Google or Facebook",
      });
    }

    // Note: Make sure to hash your passwords with bcrypt in production!
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
