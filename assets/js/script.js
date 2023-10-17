$(document).ready(function() { 
    var inputEl = $('#city');
    var submitbtn = $('#btn');
    var searchHistoryEl = $('#searchHistory');
    var currentWindEl = $('#currentWind');
    var currentTempEl = $('#currentTemp');
    var currentHumidityEl = $('#currentHumidity');
    var currentIconEl = $('#currentIcon');
    var cityEl = $('#cityName');
    var searchHistoryBtn = $('.searchHistoryBtn');
    var forecastDaySelector = [7,15,23,31,39];
    var searchedCities = JSON.parse(localStorage.getItem('searchedCities')) || [];
    // on page load, add search history pulled from local storage
    $(function() {
        for (i = 0; i < searchedCities.length; i++) {
            var lastSearchEl = document.createElement('button');
            lastSearchEl.className = 'searchHistoryBtn';
            lastSearchEl.textContent = searchedCities[i];
            searchHistoryEl.append(lastSearchEl);
        }
    });
    // on btn click, runs find cords function
    submitbtn.click(function() {
        currentIconEl.empty();
        findCords();
    });
    // converts city imputed by user into cords of city
    function findCords() {
        var city = inputEl.val();
        geoCoderUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=7ff589e4bc4b4b8d6fc8df8bb1158396'
        fetch(geoCoderUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var longitude = data[0].lon;
            var latitude = data[0].lat;
            getWeather(latitude, longitude);
            getForecast(latitude, longitude);
            recentsearches();
        });
    }
    // takes user input and converts them into buttons to be easily accessed later
    function recentsearches() {
        var city = inputEl.val();
        if (!searchedCities.includes(city)) {
            var lastSearchEl = document.createElement('button');
            lastSearchEl.className = 'searchHistoryBtn';
            lastSearchEl.textContent = city;
            searchHistoryEl.append(lastSearchEl);
            searchedCities.push(city);
            localStorage.setItem("searchedCities", JSON.stringify(searchedCities));
        };
    }
    // calls api to get weather tied to cordinates
    function getWeather(latitude, longitude) {
        weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude +  '&units=imperial&appid=7ff589e4bc4b4b8d6fc8df8bb1158396'
        fetch(weatherUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data){
                displayWeather(data)
            })
        }
    // displays weather info pulled from API
    function displayWeather(data) {
        var city = inputEl.val();
        cityEl.text(city);
        currentWindEl.text("wind speed: " + data.wind.speed + "mph");
        currentTempEl.text("temp: " + data.main.temp + "°F");
        currentHumidityEl.text("humidity: " + data.main.humidity + "%");
        var iconVal = data.weather[0].icon; // get the icon value
        var icon = 'https://openweathermap.org/img/wn/' + iconVal + '@2x.png'; // get the icon image
        var png = $('<img src="' + icon + '">');
        currentIconEl.append(png);
    }
    // calls api to get forecast
    function getForecast(latitude, longitude) {
        ForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude +  '&cnt=40&units=imperial&appid=7ff589e4bc4b4b8d6fc8df8bb1158396'
        fetch(ForecastUrl)
        .then(function (response){
                return response.json()
            })
            .then(function (data) {
                displayForecast(data);
            });
    }
    // displays forecast info pulled from API
    function displayForecast(data) {
        for (var i = 0; i < forecastDaySelector.length; i++) {
            var forecastDateEl = document.getElementById([i]).getElementsByClassName('date');
            forecastDateEl[0].textContent = data.list[forecastDaySelector[i]].dt_txt;
            var forecastTempEl = document.getElementById([i]).getElementsByClassName('temp');
            forecastTempEl[0].textContent = 'temp: ' + data.list[forecastDaySelector[i]].main.temp + '°F';
            var forecastWindEl = document.getElementById([i]).getElementsByClassName('wind');
            forecastWindEl[0].textContent = 'Wind Speed: ' + data.list[forecastDaySelector[i]].wind.speed + 'mph';
            var forecastHumidityEl = document.getElementById([i]).getElementsByClassName('humidity');
            forecastHumidityEl[0].textContent = 'Humidity: ' + data.list[forecastDaySelector[i]].main.humidity + '%';
            var forecastIconEl = document.getElementById([i]).getElementsByClassName('icon');
            forecastIconEl[0].textContent = '';
            var forecastIconVal = data.list[forecastDaySelector[i]].weather[0].icon; // get the icon value
            var forecastIcon = 'https://openweathermap.org/img/wn/' + forecastIconVal + '@2x.png'; // get the icon image
            var forecastPng = $('<img src="' + forecastIcon + '">');
            forecastIconEl[0].append(forecastPng[0]);

        }
    }
    // calls function when search history button is clicked
    $(document).on("click", searchHistoryBtn, function () {
        var cityName = event.target.textContent;
        if (cityName) {
            currentIconEl.empty();
            refindWeather(cityName);
        }
    });
    // finds weather after search button is clicked
    function refindWeather(cityName) {
        geoCoderUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=7ff589e4bc4b4b8d6fc8df8bb1158396'
        fetch(geoCoderUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var longitude = data[0].lon;
            var latitude = data[0].lat;
            reGetWeather(cityName, latitude, longitude);
            getForecast(latitude, longitude);
        });
    }
    // gets weather info after search button is clicked
    function reGetWeather(cityName, latitude, longitude) {
        weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude +  '&units=imperial&appid=7ff589e4bc4b4b8d6fc8df8bb1158396'
        fetch(weatherUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data){
                reDisplayWeather(cityName, data)
            })
    }
    // displays weather info after search button is clicked
    function reDisplayWeather(cityName, data) {
        cityEl.text(cityName);
        currentWindEl.text("wind speed: " + data.wind.speed + "mph");
        currentTempEl.text("temp: " + data.main.temp + "°F");
        currentHumidityEl.text("humidity: " + data.main.humidity + "%");
        var iconVal = data.weather[0].icon; // get the icon value
        var icon = 'https://openweathermap.org/img/wn/' + iconVal + '@2x.png'; // get the icon image
        var png = $('<img src="' + icon + '">');
        currentIconEl.append(png);
    }
});