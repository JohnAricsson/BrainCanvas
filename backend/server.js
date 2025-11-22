import express from "express"; //package.json type = module
//use "dev": "nodemon server.js" in package.json, express version 4.18.2
//npm install nodemon -D
const app = express();

app.get("/api/notes", (req, res) => {
  res.status(200).send("You got 20 notes");
});

app.listen(5001, () => {
  console.log("Server running on 5001");
});
