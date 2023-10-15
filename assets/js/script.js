$(document).ready(function() { 
    var inputEl = $('#city');
    var submitbtn = $('#btn');
    var searchHistory = $('#searchHistory');
    var currentWindEl = $('#currentWind');
    var currentTempEl = $('#currentTemp');
    var currentHumidityEl = $('#currentHumidity');
    var currentIconEl = $('#currentIcon');
    var forecastEl = $('#forecastWeather');
    var cityEl = $('#cityName');
    var forecastDaySelector = [0,8,16,24,32];

    // on btn click, runs find cords function
    submitbtn.click(function() {
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
        var lastSearchEl = document.createElement('button');
        lastSearchEl.textContent = city;
        searchHistory.append(lastSearchEl);
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
        currentIconEl.text(data.weather[0].icon);
    }
    // calls api to get forecast
    function getForecast(latitude, longitude) {
        ForecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude +  '&cnt=33&units=imperial&appid=7ff589e4bc4b4b8d6fc8df8bb1158396'
        fetch(ForecastUrl)
            .then(function (response){
                return response.json()
            })
            .then(function (data) {
                console.log(data);
                displayForecast(data);
            });
    }
    // displays forecast info pulled from API
    function displayForecast(data) {
        for (var i = 0; i < forecastDaySelector.length; i++) {
            var forecastDisplayEl = document.getElementById([i]);
            console.log(forecastDisplayEl);
            forecastDisplayEl.textContent = data.list[forecastDaySelector[i]].dt_txt + '\ntemp: ' + data.list[forecastDaySelector[i]].main.temp + '°F' + 'Wind Speed: ' + data.list[forecastDaySelector[i]].wind.speed + 'mph' + '\nHumidity: ' + data.list[forecastDaySelector[i]].main.humidity + '%';
        }
    }
});