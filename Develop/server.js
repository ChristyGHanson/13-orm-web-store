// Create the server here. 

const express = require('express');

// run a function. 
const app = express();

//saves the port number to PORT variable. 
// Dynamic variable. 
const PORT = 3001;

// Unit 11 - parsing, static, route middleware. build routes. exhcnage data from the route. 
app.use(express.json());
// build the parsing
app.use(express.urlencoded({
    // create a POST route, create the body parsing. 
    extended: true,
}));
// connect public folder. loads public folder 3001.
app.use(express.static('public'));

app.listen(PORT,()=>{
    console.log('Listening on port http://localhost:' + PORT)
});
