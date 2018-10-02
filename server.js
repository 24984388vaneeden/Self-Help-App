
require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('_helpers/jwt');
const bodyParser = require('body-parser');

const errorHandler = require('_helpers/error-handler');
const env = require('env');
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

//Begin
// use JWT auth to secure the api
//app.use(jwt());

// api routes
app.use('/users',require('./users/users.controller'));
//app.use('/todos',require('./todos/todo.controller'));

app.use(jwt());

// global error handler
app.use(errorHandler);

//End*/

 

 
// connect to database
//mc.connect();
 
// default route

 
// all other requests redirect to 404
app.all("*", function (req, res) {
    return res.status(404).send('page not found')
});
 
// port must be set to 8080 because incoming http requests are routed from port 80 to port 8080
// start server
const port = env.NODE_ENV === 'production' ? 80 : 8080;
const server = app.listen(8080, function () {
    console.log('Node app is running on port: '+ port);
});
 
// allows "grunt dev" to create a development server with livereload
//module.exports = app;