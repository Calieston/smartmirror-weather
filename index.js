'use strict';

var express = require('express');
var app = express();
var fs = require('fs');

var controller = require('./app/controller');

app.set('views', __dirname);
app.set('view engine', 'jade');

app.get('/', function (req, res) {
  let pckg = fs.readFileSync('package.json');
  pckg = JSON.parse(pckg);

  let city = 'Stuttgart'
  let urlStart='http://api.openweathermap.org/data/2.5/weather?q='
  let urlEnd='&lang=de&units=metric&APPID=384c499db848052e6aeed5df1388d5e7'

  let widget = {};
  widget._id = '1234567890';
  widget.size = pckg.smartmirror.size[0];

  controller.get({city: city, urlStart: urlStart, urlEnd: urlEnd })
  .then((data) => {
    res.render('./index.jade', {
      data: data,
      widget: widget,
    });
  });
});

app.listen(8080, function () {
  console.log('App listening on port 8080!');
});