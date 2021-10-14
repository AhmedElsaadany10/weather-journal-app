// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const app = express();

// cros const
const cors = require("cors");
app.use(cors());

//body-parser const
const bodyParser = require("body-parser");

// port number
const port = 8000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());


// Initialize the main project folder
app.use(express.static("website"));

//get function 
const getAll = (req, res) => res.status(200).send(projectData);
app.get("/all", getAll);

//post function 
const postData = (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.status(200).send(projectData);
  }
app.post("/add", postData);

// function to test the server 
const listening = () =>
console.log(`server running on ${port}`);

// sign up the server
app.listen(port, listening);