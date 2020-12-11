// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

//set port name variable
const port = 8000;

//set variable to server to listen for app
const server = app.listen(port, listening);

// start listen server on port
function listening() {
    console.log('server is runnig');
    console.log(`running on localhost: ${port}`);
}

// post route function to post data in localhost
app.post('/add', postData);
function postData(req, res) {
    console.log('post recieved') // log to check data is recieved
    /// set posted data to endpoint object
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        feeling: req.body.feeling
    }
}


// get route function by sending data to update ui
app.get('/getProjectData', getDataFromLocalServer);
function getDataFromLocalServer(req, res) {
    res.send(projectData);
    projectData = {};  /// set empty object again for new entering data
}