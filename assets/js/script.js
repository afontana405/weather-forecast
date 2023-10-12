$(document).ready(function() {
    
    var inputEl = $('#city');
    var submitbtn = $('#btn');
    var searchHistory = $('#searchHistory');

    submitbtn.click(function() {
        var city = inputEl.val();
        console.log(city);
        recentsearches();
    });

    function recentsearches() {
        var city = inputEl.val();
        console.log(city);
        var lastSearchEl = document.createElement('button');
        lastSearchEl.textContent = city;
        searchHistory.append(lastSearchEl);
    }   
});