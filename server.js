// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require consts to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
// port number
const port = 8000;

// Start up an instance of app
const app = express();

// Cors for cross origin allowance
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

const getAll = (req, res) => res.status(200).send(projectData);
// GET Route
app.get('/all', getAll);

function postData(req, res) {
  projectData = req.body;
}
// GET Route
app.post('/add', postData);

// Setup Server
app.listen(port, () => {
  console.log('server runing');
  console.log(`runing on localhost :${port}.`);
});
