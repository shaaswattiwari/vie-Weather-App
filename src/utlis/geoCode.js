const request = require("request");

var geoCodeData = [];
const geoCode = function (address) {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2hhYXN3YXR0aXdhcmkiLCJhIjoiY2txOWU3eHc1MDY0bzJ3cXQ1YXJ3dWhxMiJ9.fxOeYmBMTXiHu-ojHwmqZQ&limit=1`;

  request({ url: url, json: true }, function (error, response) {
    if (error) {
      geoCodeData.push(["Unable to connect to server", undefined]);
    } else if (response.body.message || response.body.features.length === 0) {
      geoCodeData.push(["Please enter a valid location", undefined]);
    } else {
      geoCodeData.push([undefined, response]);
    }
  });
};

module.exports = {
  geoCode: geoCode,
  geoCodeData: geoCodeData,
};
