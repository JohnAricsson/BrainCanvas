import express from "express"; //package.json type = module
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import notesRoutes from "./routes/noteRoutes.js";

//use "dev": "nodemon server.js" in package.json, express version 4.18.2
//npm install nodemon -D
//npm install mongoose - for mongoDB
//.env install - npm i dotenv
dotenv.config();
console.log(process.env.MONGO_URI);
const PORT = process.env.PORT || 5001;
const app = express();
connectDB();
//middleware
app.use(express.json());

app.use("/api/notes", notesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
