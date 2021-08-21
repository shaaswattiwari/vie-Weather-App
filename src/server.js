const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utlis/geoCode");
const weather = require("./utlis/weather");

//define paths
var app = express();
//for heroku
const port = process.env.PORT || 3000;

const directory = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../templates/views");
const partialDir = path.join(__dirname, "../templates/partial");

//setup handlebars
app.set("views", viewsDir);
app.set("view engine", "hbs");
hbs.registerPartials(partialDir);

//setup static directory, mounted
app.use(express.static(directory));

app.get("", (req, res) => {
  res.render("index", { name: "Vie" });
});

app.get("/about", (req, res) => {
  res.render("about", { name: "Vie" });
});

//querystring and res.query

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  }
  var address = req.query.address;
  geoCode.geoCode(address);
  var geoInterval = setInterval(checkGeoCode, 10);

  function checkGeoCode() {
    if (geoCode.geoCodeData.length == 1) {
      clearInterval(geoInterval);
      return callbackGeoCode(geoCode.geoCodeData);
    }
  }

  function callbackGeoCode(arr) {
    var error = arr[0][0];
    var response = arr[0][1];
    geoCode.geoCodeData.pop();
    if (response == undefined) {
      return res.send({ error });
    } else {
      var lati = response.body.features[0].center[1];
      var long = response.body.features[0].center[0];

      weather.weather(lati, long);

      var weaInterval = setInterval(checkWeaData, 1);

      function checkWeaData() {
        if (weather.weatherData.length == 1) {
          clearInterval(weaInterval);
          return callBackWeather(weather.weatherData);
        }
      }
    }
  }

  function callBackWeather(arr) {
    var error = arr[0][0];
    var response = arr[0][1];
    weather.weatherData.pop();
    if (response == undefined) {
      return res.send({ error });
    } else {
      return res.send({
        location: response.body.location.region,
        temperature: response.body.current.temperature,
        feelslike: response.body.current.feelslike,
      });
    }
  }
});

app.get("/help", (req, res) => {
  res.render("help", { name: "Vie" });
});

app.get("/*", (req, res) => {
  res.render("error", { name: "Vie" });
});

app.listen(port, () => {
  console.log("Up on port " + port);
});
