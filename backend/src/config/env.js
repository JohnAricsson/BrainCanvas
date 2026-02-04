import dotenv from "dotenv";
dotenv.config();

// Debugging: This will tell you if the variable is actually being read
console.log(
  "Loaded Google Client ID:",
  process.env.GOOGLE_CLIENT_ID ? "✅ Found" : "❌ Missing",
);
