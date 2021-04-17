// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

const port = 8000;

const server = app.listen(port, listening);

function listening(){
    console.log("Your Server is running on port " + port);
}

// Get Route
app.get('/all', sendData);

function sendData(request,response){
    response.send(projectData);
    console.log(projectData)
}

//Post Route
app.post('/data', addData);

function addData(request, response) {
    projectData.temperature = request.body.temp;
    projectData.date = request.body.date;
    projectData.response = request.body.response;
    console.log(projectData)
}