/*---
 Author: Rojina Deuja
Create Date: 01/25/2020
Last Modified: 01/25/2020
The server.js file houses all the code required for the weather application.
---*/
//Require the express package
const express = require('express');
//body-parser allows to use the key-value pairs stored on the req-body object
const bodyParser = require('body-parser');
const request = require('request');
//Create instance of express named app 
const app = express();
const apiKey = 'YOUR_API_HERE';

//Allow the use of static files
app.use(express.static('public'));
//Parse the URL
app.use(bodyParser.urlencoded({extended: true}));
//Set up Embedded JS (EJS) template engine
app.set('view engine','ejs')

//Get the root url '/', send given response
app.get('/', function(req, res){
    //Render our view file
    res.render('index', {weather: null, error: null}); 
})

//To go after the form data is entered
app.post('/', function(req, res) {
    //get city from the req.body
    let city = req.body.city;
    //url string to access the OpenWeatherMap API
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function(err, response, body){
        if(err){
            //if error render index page and show error string
            res.render('index', {weather:null, error:'Error, please try again'});
        }
        else{
            //parse JSON into usable JS ojbect
            let weather = JSON.parse(body)
            //if user inputs undefined = not a city
            if(weather.main == undefined){
                res.render('index', {weather:null, error: 'Error, please try again'});
            }
            else{
                //send the weather back to the index view
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
         res.render('index', {weather:weatherText, error:null});
            }
        }
    })
})

//Get the app to listen on port 3000 for connections
app.listen(3000,function(){
    console.log('Example app listening on port 3000')
})

//http://localhost:3000/ or http://127.0.0.1:3000/