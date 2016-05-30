'use strict';

var express = require('express');
var app = express();

var controller = require('./app/controller');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  let city = 'Stuttgart'
  let urlStart='http://api.openweathermap.org/data/2.5/weather?q='
  let urlEnd='&lang=de&units=metric&APPID=384c499db848052e6aeed5df1388d5e7'
  controller.get({city: city, urlStart: urlStart, urlEnd: urlEnd })
  .then((weatherData) => {
    res.render('app/view.jade', {
      title: 'Weather Information',
      weatherData: weatherData
    });
  });
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});