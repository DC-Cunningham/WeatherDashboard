var searchHistory = [];

$("#search-form").on("submit", function(event) {
  event.preventDefault();
  let queryParameter = $("#searchFormInput")
    .val()
    .trim();
  itemSearch(queryString(queryParameter));
});
//get the search terms from the input, store in variable
function itemSearch(queryString) {
  $("#forecastBlock").empty();
  $.ajax({
    url: queryString,
    method: "GET"
  }).then(function(response) {
    let temperatures = response.list;
    let temps = [];
    temperatures.forEach(function(item, index) {
      temps.push(item.main.temp);
    });
    let result = $("<div>");
    let city = $("<h2>").text(response.city.name + "," + response.city.country);
    let icon = $("<img>").attr(
      "src",
      "http://openweathermap.org/img/wn/" +
        response.list[0].weather[0].icon +
        "@2x.png"
    );
    let currentDescription = $("<h3>").text(
      response.list[0].weather[0].description
    );
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
    result.append(city);
    result.append(icon);
    result.append(currentDescription);
    result.append(
      $("<h4>").text("Current Temperature: " + currentTemp.toFixed(2) + "°C")
    );
    result.append(
      $("<h4>").text("Minimum Temperature: " + minTemp.toFixed(2) + "°C")
    );
    result.append(
      $("<h4>").text("Maximum Temperature: " + maxTemp.toFixed(2) + "°C")
    );
    result.append($("<h4>").text("Current Humidity: " + currentHumidity + "%"));
    result.append(
      $("<h4>").text(
        "Current Windspeed: " + currentWindSpeed.toFixed(2) + "km/h"
      )
    );
    $("#forecastBlock").append(result);
    var searchTerm = response.city.name + "," + response.city.country;

    appendHistory();
    function appendHistory() {
      let searchTerm = response.city.name + "," + response.city.country;
      if (searchHistory.includes(searchTerm) === false) {
        searchHistory.push(searchTerm);
      }
    }
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
  renderHistory();
}
displaySearchHistory();

function storeHistory() {
  localStorage.setItem("search-history", JSON.stringify(searchHistory));
}

function queryString(queryParameter) {
  queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=";
  const appID = "fc90701830b39a5a74f0509b12344c7c";
  return queryURL + queryParameter + "&appid=" + appID;
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
