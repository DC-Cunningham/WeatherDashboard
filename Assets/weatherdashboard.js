var searchHistory = [];
var lastSearch = [];
var lastSearchLat;
var lastSearchLon;
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

$("#search-form").on("submit", function(event) {
  event.preventDefault();
  let queryParameter = $("#searchFormInput")
    .val()
    .trim();
  itemSearch(queryString(queryParameter));
});

function UVSearch(queryStringUV) {
  $.ajax({
    url: queryStringUV,
    method: "GET"
  }).then(function(response) {
    let UVindex = $("<h4>").text("UV Index: " + response.value);
    if (response.value > 7) {
      UVindex.attr("class", "bg-danger text-white");
    } else if (response.value > 2 && response.value < 7) {
      UVindex.attr("class", "bg-warning text-dark");
    } else {
      UVindex.attr("class", "bg-success text-white");
    }
    $("#currentBlock").append(UVindex);
  });
}
//get the search terms from the input, store in variable
function itemSearch(queryString) {
  $("#currentBlock").empty();
  $("#forecastBlock").empty();
  $.ajax({
    url: queryString,
    method: "GET"
  }).then(function(response) {
    searchTerm = response.city.name + "," + response.city.country;
    let temperatures = response.list;
    let temps = [];
    temperatures.forEach(function(item, index) {
      temps.push(item.main.temp);
    });
    let resultOne = $("<div>");
    let city = $("<h2>").text(searchTerm);
    let icon = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[0].weather[0].icon +
        "@2x.png"
    );
    let currentDescription = $("<h3>").text(
      response.list[0].weather[0].description
    );
    console.log(response);
    let today = new Date();
    let currentTime = today.getHours();
    if (0 < currentTime < 2) {
      currentTemp = response.list[0].main.temp - 273.15;
      currentHumidity = response.list[0].main.humidity;
      currentWindSpeed = response.list[0].wind.speed * 3.6;
    } else if (2 < currentTime < 5) {
      currentTemp = response.list[1].main.temp - 273.15;
      currentHumidity = response.list[1].main.humidity;
      currentWindSpeed = response.list[1].wind.speed;
    } else if (5 < currentTime < 8) {
      currentTemp = response.list[2].main.temp - 273.15;
      currentHumidity = response.list[2].main.humidity;
      currentWindSpeed = response.list[2].wind.speed;
    } else if (8 < currentTime < 11) {
      currentTemp = response.list[3].main.temp - 273.15;
      currentHumidity = response.list[3].main.humidity;
      currentWindSpeed = response.list[3].wind.speed;
    } else if (11 < currentTime < 14) {
      currentTemp = response.list[4].main.temp - 273.15;
      currentHumidity = response.list[4].main.humidity;
      currentWindSpeed = response.list[4].wind.speed;
    } else if (14 < currentTime < 17) {
      currentTemp = response.list[5].main.temp - 273.15;
      currentHumidity = response.list[5].main.humidity;
      currentWindSpeed = response.list[5].wind.speed;
    } else if (17 < currentTime < 20) {
      currentTemp = response.list[6].main.temp - 273.15;
      currentHumidity = response.list[6].main.humidity;
      currentWindSpeed = response.list[6].wind.speed;
    } else if (20 < currentTime < 23) {
      currentTemp = response.list[7].main.temp - 273.15;
      currentHumidity = response.list[7].main.humidity;
      currentWindSpeed = response.list[7].wind.speed;
    }
    let currentDayTemps = temps.slice(0, 8);
    let minTemp = Math.min(...currentDayTemps) - 273.15;
    let maxTemp = Math.max(...currentDayTemps) - 273.15;
    resultOne.append($("<h4>").text("Today"));
    resultOne.append(city);
    resultOne.append(icon);
    resultOne.append(currentDescription);
    resultOne.append(
      $("<h4>").text("Current Temperature: " + currentTemp.toFixed(2) + "°C")
    );
    resultOne.append(
      $("<h4>").text("Minimum Temperature: " + minTemp.toFixed(2) + "°C")
    );
    resultOne.append(
      $("<h4>").text("Maximum Temperature: " + maxTemp.toFixed(2) + "°C")
    );
    resultOne.append(
      $("<h4>").text("Current Humidity: " + currentHumidity + "%")
    );
    resultOne.append(
      $("<h4>").text(
        "Current Windspeed: " + currentWindSpeed.toFixed(2) + "km/h"
      )
    );
    $("#currentBlock").append(resultOne);

    let resultTwo = $("<div>");
    resultTwo.attr("class", "col-3 forecast-day flex");
    let iconTwo = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[13].weather[0].icon +
        "@2x.png"
    );
    let dayTwoTemps = temps.slice(8, 16);
    let minTempTwo = Math.min(...dayTwoTemps) - 273.15;
    let maxTempTwo = Math.max(...dayTwoTemps) - 273.15;
    if (today.getDay() <= 5) {
      resultTwo.append($("<h4>").text(days[today.getDay() + 1]));
    } else {
      resultTwo.append($("<h4>").text(days[today.getDay() - 6]));
    }
    resultTwo.append(iconTwo);
    resultTwo.append($("<h4>").text("Min: " + minTempTwo.toFixed(2) + "°C"));
    resultTwo.append($("<h4>").text("Max: " + maxTempTwo.toFixed(2) + "°C"));

    let resultThree = $("<div>");
    resultThree.attr("class", "col-3 forecast-day flex");
    let iconThree = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[22].weather[0].icon +
        "@2x.png"
    );
    let dayThreeTemps = temps.slice(16, 24);
    let minTempThree = Math.min(...dayThreeTemps) - 273.15;
    let maxTempThree = Math.max(...dayThreeTemps) - 273.15;
    if (today.getDay() <= 4) {
      resultThree.append($("<h4>").text(days[today.getDay() + 2]));
    } else {
      resultThree.append($("<h4>").text(days[today.getDay() - 5]));
    }
    resultThree.append(iconThree);
    resultThree.append(
      $("<h4>").text("Min: " + minTempThree.toFixed(2) + "°C")
    );
    resultThree.append(
      $("<h4>").text("Max: " + maxTempThree.toFixed(2) + "°C")
    );

    let resultFour = $("<div>");
    resultFour.attr("class", "col-3 forecast-day flex");
    let iconFour = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[28].weather[0].icon +
        "@2x.png"
    );
    let dayFourTemps = temps.slice(24, 32);
    let minTempFour = Math.min(...dayFourTemps) - 273.15;
    let maxTempFour = Math.max(...dayFourTemps) - 273.15;
    if (today.getDay() <= 3) {
      resultFour.append($("<h4>").text(days[today.getDay() + 3]));
    } else {
      resultFour.append($("<h4>").text(days[today.getDay() - 4]));
    }
    resultFour.append(iconFour);
    resultFour.append($("<h4>").text("Min: " + minTempFour.toFixed(2) + "°C"));
    resultFour.append($("<h4>").text("Max: " + maxTempFour.toFixed(2) + "°C"));

    let resultFive = $("<div>");
    resultFive.attr("class", "col-3 forecast-day flex");
    let iconFive = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[36].weather[0].icon +
        "@2x.png"
    );
    let dayFiveTemps = temps.slice(32, 39);
    let minTempFive = Math.min(...dayFiveTemps) - 273.15;
    let maxTempFive = Math.max(...dayFiveTemps) - 273.15;
    if (today.getDay() <= 2) {
      resultFive.append($("<h4>").text(days[today.getDay() + 4]));
    } else {
      resultFive.append($("<h4>").text(days[today.getDay() - 3]));
    }
    resultFive.append(iconFive);
    resultFive.append($("<h4>").text("Min: " + minTempFive.toFixed(2) + "°C"));
    resultFive.append($("<h4>").text("Max: " + maxTempFive.toFixed(2) + "°C"));

    $("#forecastBlock").append(resultTwo);
    $("#forecastBlock").append(resultThree);
    $("#forecastBlock").append(resultFour);
    $("#forecastBlock").append(resultFive);

    appendHistory();
    function appendHistory() {
      if (searchHistory.includes(searchTerm) === false) {
        searchHistory.push(searchTerm);
      }
      lastSearch = searchTerm;
      lastSearchLat = response.city.coord.lat;
      lastSearchLon = response.city.coord.lon;
    }
    UVSearch(queryStringUV(lastSearchLat, lastSearchLon));
    renderHistory();
  });
}

$("#search-history").on("click", function(event) {
  event.preventDefault();
  queryParameter = event.target.value;
  itemSearch(queryString(queryParameter));
});

function renderHistory() {
  $("#search-history").empty();
  searchHistory.forEach(search);
  function search(item, index) {
    let button = $("<button>").text(searchHistory[index]);
    button.attr("value", searchHistory[index]);
    button.attr("class", "btn btn-light btn-block");
    $("#search-history").prepend(button);
  }
  renderClearBtn();
  storeHistory();
}

function displaySearchHistory() {
  let searchHistoryList = JSON.parse(localStorage.getItem("search-history"));
  if (searchHistoryList !== []) {
    searchHistory = searchHistoryList;
  }
  let lastSearchHistory = JSON.parse(localStorage.getItem("last-search"));
  if (lastSearchHistory !== []) {
    lastSearch = lastSearchHistory;
    itemSearch(queryString(lastSearch));
  }
  renderHistory();
}
displaySearchHistory();

function storeHistory() {
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
  localStorage.setItem("last-search", JSON.stringify(lastSearch));
}

function queryString(queryParameter) {
  queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
  const appID = "fc90701830b39a5a74f0509b12344c7c";
  return queryURL + queryParameter + "&appid=" + appID;
}

function queryStringUV(lastSearchLat, lastSearchLon) {
  queryURLUV = "http://api.openweathermap.org/data/2.5/uvi?";
  const appID = "fc90701830b39a5a74f0509b12344c7c";
  return (
    queryURLUV +
    "lat=" +
    lastSearchLat +
    "&lon=" +
    lastSearchLon +
    "&appid=" +
    appID
  );
}

$("#clear-history").on("click", function(event) {
  event.preventDefault();
  window.localStorage.clear();
  searchHistory = [];
  renderHistory();
});

function renderClearBtn() {
  if (searchHistory && searchHistory.length == 0) {
    $("#clear-history").hide();
  } else {
    $("#clear-history").show();
  }
}
renderClearBtn();
