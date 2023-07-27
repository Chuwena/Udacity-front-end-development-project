// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/*Dependencies*/
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
// Set port variable
const port = 3000; 
// Utillize the .listen() method
const server = app.listen(port, listening); 
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

// GET function
app.get('/getAllData', getData);
function getData(request, response) {
    console.log('Here to get data');
    response.send(projectData);
}

// POST function
app.post('/postAllData', postData);
async function postData(request, response) {
    // let requestData = request.body;
    console.log('Here to post data');
    projectData = {
        date: await request.body.date,
        temp: await request.body.temp,
        content: await request.body.content
        
    };
    console.log(projectData);
    response.send(projectData);
}