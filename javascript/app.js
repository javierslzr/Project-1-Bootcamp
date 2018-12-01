// FIREBASE

var config = {
  apiKey: "AIzaSyCzRedky3Rg5LZZdNPmZv4wIKCiE6bvAgk",
  authDomain: "where2go-db.firebaseapp.com",
  databaseURL: "https://where2go-db.firebaseio.com",
  projectId: "where2go-db",
  storageBucket: "where2go-db.appspot.com",
  messagingSenderId: "1037462210811"
};
firebase.initializeApp(config);

var database = firebase.database();

$(document).ready(function () {

  $("#searchCity").click(function (e) {

    e.preventDefault();

    var citysearched = $("#inputCity").val().trim();

    database.ref().push({
      citysearched: citysearched
    })

  });

  database.ref().on("child_added", function (snapshot) {
    
    var btndump = $(".modal-body");
    var city = snapshot.val().citysearched;
    var cityBtn = $("<button>");
    cityBtn.addClass("btn-primary" , "searchbtn ");
    cityBtn.attr("btn-primary");
    cityBtn.text(city);
    btndump.append(cityBtn);

  });

});

// SHOW MODAL
$(document).ready(function () {
  $("#myModal").on('shown.bs.modal', function () {
    $("#myModal").trigger('focus');
  });
});

// AUTOCOMPLETE LOCATION
$("input").geocomplete();

// Trigger geocoding request.
$("#searchCity").click(function(){
  $("#inputCity").trigger("geocode");
});

// SEARCH RESULTS ANIMATION
$("#searchCity").on("click", function () {
  $('#paperPlane').fadeOut('slow', function () {
    $('.search-results').fadeIn("slow");
  });
});


// CITY COVER IMAGE

$(document).ready(function() {
  $('#searchCity').on('click', function(e) {
    e.preventDefault();

    var api = "https://api.unsplash.com/search/photos?per_page=1&query=";
    var searchInput = $("#inputCity").val();
    var appID = "a2cd819eb892c58dd92b472a39c35f0a71def1567b12b60b1de8e635ad7cce27";
    var queryURL = api + searchInput +"&client_id=" + appID;


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

    console.log(response);
    var photoImage = $("<img class='card-img'>");
    photoImage.attr("src", response.results[0].urls.regular);
    
    $("#cover").append(photoImage);

});


 var citytName = $("<h1 class='card-title'>").text(searchInput);
$("#cover").empty();

 $("#cityNameDisplay").empty();

 $("#cityNameDisplay").append(citytName);

});
});

// API WEATHER
$(document).ready(function () {
  $("#searchCity").on("click", function (event) {

    event.preventDefault();

    var city = $("#inputCity").val().trim();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&APPID=0015317ad02a5bd572199f206fdd831f";

    $.ajax({
      url: queryURL,
      method: "GET"

    }).then(function (response) {
      console.log(response);
      console.log(queryURL);

      var temp = response.main.temp;
      var iconW = response.weather.icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconW + ".png";


      $("#temperature").text("Temperature:  " + parseInt(temp) + "°C");
      $("#max-min-temp").text("Max/Min Temp:  " + response.main.temp_max + "°C / " + response.main.temp_min + "°C");
      // $("#condition").attr("src", iconurl);
      // $("#wcondition").text("Condition: " + response.weather.id);
      $("#wind").text("Wind Speed: " + response.wind.speed + "km/h");
      $("#humidity").text("Humidity: " + response.main.humidity + "%");

      console.log(temp)

    });
  });
});



