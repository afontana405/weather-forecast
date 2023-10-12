$(document).ready(function() { 
    var inputEl = $('#city');
    var submitbtn = $('#btn');
    var searchHistory = $('#searchHistory');
    weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=7ff589e4bc4b4b8d6fc8df8bb1158396'
    
    // on btn click, runs these functions
    submitbtn.click(function() {
        recentsearches();
        findCords();
    });
    
    // takes user input and converts them into buttons to be easily accessed later
    function recentsearches() {
        var city = inputEl.val();
        var lastSearchEl = document.createElement('button');
        lastSearchEl.textContent = city;
        searchHistory.append(lastSearchEl);
    } 
    
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
                getWeather(latitude, longitude)
            });
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

    function displayWeather(data) {
        console.log(data);
    }
});