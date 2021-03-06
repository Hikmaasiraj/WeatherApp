//Name: Himat
//Class CSI 250
//Date: 11/1/21
//Assignment: Midterm

const express = require('express');
const bodyParser = require('body-parser');
const  request = require('request');
const app = express();

const apikey ='e79d27ece5b908c7b2fd9a30cdd458a7';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');

app.get('/', function (req, res){
    res.render('index', {weather: null, error: null});
   
});
app.post('/', function(req, res){
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`;
 
    request(url, function(err, response, body){
        if(err){
            res.render('index',{weather: null, error: 'Error, please try again'});
         }else{
             let weather = JSON.parse(body)
             if(weather.main == undefined){
                 res.render('index',{weather: null, error: 'Error, please try again'});
             }else{
                 let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                 res.render('index', {weather: weatherText, error: null});
             }
         }
});  

});

app.listen(8000, function(){
    console.log('Weather app listening on port 8000!');

});