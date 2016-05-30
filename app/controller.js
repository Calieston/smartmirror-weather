'use strict';

exports.get = function(params) {
  // Return new Promise
  return new Promise((resolve, reject) => {

    const city = params.city;

    // Select http or https module, depending on reqested url
    const urlStart = 'http://api.openweathermap.org/data/2.5/weather?q=';
    const urlEnd = '&lang=de&units=metric&APPID=384c499db848052e6aeed5df1388d5e7';

    // Fire the get request
    const request = lib.get(urlStart + city + urlEnd, (response) => {
      // Handle http errors
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Failed to load weather data, status code: ' + response.statusCode));
      }

      // Temporary data holder
      const body = [];

      // On every content chunk, push it to the data array
      response.on('data', (chunk) => {
        body.push(chunk);
      });

      // We are done, resolve promise with those joined chunks
      response.on('end', () => {
        resolve(JSON.stringify(body.join('')).responseData);
      });
    });

    // Handle connection errors of the request
    request.on('error', (err) => {
      reject(err);
    });
  });
};