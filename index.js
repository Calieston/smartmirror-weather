'use strict';

var express = require('express');
var app = express();

var controller = require('./app/controller');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  let city = 'Stuttgart'
  controller.get({city: city})
  .then((id) => {
    console.log(id);
    res.render('app/view.jade', {
      title: 'Weather Module',
      /*weatherData:*/ /*weatherData*/
    });
  });
});

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});