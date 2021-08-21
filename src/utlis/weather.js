const request = require("request");
var weatherData = [];
function weather(lati, long) {
  const url = `http://api.weatherstack.com/current?access_key=dc5b57e1536b59a7fbef08415dbe3369&query=${lati},${long}`;
  request({ url: url, json: true }, function (error, response) {
    if (error) {
      weatherData.push(["Unable to connect to server", undefined]);
    } else if (response.body.error) {
      weatherData.push(["Please enter valid location", undefined]);
    } else {
      weatherData.push([undefined, response]);
    }
  });
}

module.exports = {
  weather: weather,
  weatherData: weatherData,
};
