const input = document.querySelector(".input");
const btn = document.querySelector(".btn");
const newdata = document.querySelector(".newdata");

input.focus();

btn.addEventListener("click", () => {
  working();
});

input.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    working();
  }
});

function working() {
  var address = input.value;

  if (!address) {
    newdata.innerHTML = "";
    newdata.innerHTML = "Kindly enter an address.";
  } else {
    input.value = "";
    newdata.innerHTML = "connecting..";
    input.blur();
    checkWeather(address);
  }
}

//url for heroku
async function checkWeather(address) {
  var url = `/weather?address=${address}`;
  var data = await fetch(url);

  var dataParsed = await data.json();
  if (!(dataParsed.error == undefined)) {
    newdata.innerHTML = `Sorry, ${dataParsed.error}.`;
  } else {
    newdata.innerHTML = `It is currently <small class="newdata"> ${dataParsed.temperature} degrees</small> in your location in <small class="newdata">${dataParsed.location}</small> but feels like <small class="newdata">${dataParsed.feelslike}</small>.`;
  }
}
