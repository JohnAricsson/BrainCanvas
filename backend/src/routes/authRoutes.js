import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

// Helper to sign token safely
const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return jwt.sign({ id: user._id }, "temporary_fallback_secret_change_this", {
      expiresIn: "7d",
    });
  }

  return jwt.sign({ id: user._id }, secret, { expiresIn: "7d" });
};

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
    failureRedirect: "/login",
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user);
      res.redirect(`http://localhost:5173/login?token=${token}`);
    } catch (error) {
      console.error("JWT Signing Error:", error);
      res.redirect("http://localhost:5173/login?error=auth_failed");
    }
  },
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] }),
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    try {
      const token = generateToken(req.user);
      res.redirect(`http://localhost:5173/login?token=${token}`);
    } catch (error) {
      console.error("JWT Signing Error:", error);
      res.redirect("http://localhost:5173/login?error=auth_failed");
    }
  },
);

export default router;
