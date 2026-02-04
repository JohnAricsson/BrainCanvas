import "./config/env.js"; // MUST BE LINE 1
import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import passport from "passport"; // Import the passport object
import "./config/passport.js"; // Import your strategies
import session from "express-session";
//use "dev": "nodemon server.js" in package.json, express version 4.18.2
//npm install nodemon -D
//npm install mongoose - for mongoDB
//.env install - npm i dotenv
//npm i cors
//npm install passport passport-google-oauth20 passport-facebook express-session

console.log(process.env.MONGO_URI);

const PORT = process.env.PORT || 5001;
const app = express();
connectDB();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "braincanvas-secret",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
