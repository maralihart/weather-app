const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = "a589d8204167a02e43da6524174e4a9d";

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})
app.post('/', function (req, res) {
    res.render('index');
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', {weather: null, error: 'Error, please try again"'}); // error string
        } else {
            let weather = JSON.parse(body)

            if(weather.main == undefined) {
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    })
})
app.listen(3000, function () { // server listening to port 3000
  console.log('Example app listening on port 3000!')
})