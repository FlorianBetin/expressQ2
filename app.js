const express = require("express");
require("dotenv").config();


const app = express();
app.use(express.json());

const port = 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

// Route movie
const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.post("/api/movies", movieHandlers.postMovie);

// Route User
const userHandlers = require("./userHandlers");
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserByID);
app.post("/api/users", userHandlers.postUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
