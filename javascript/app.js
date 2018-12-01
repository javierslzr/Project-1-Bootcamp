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
    cityBtn.addClass("btn-primary", "searchbtn");
    cityBtn.attr("btn-primary");
    cityBtn.text(city);
    btndump.append(cityBtn);

    // $(cityBtn).on("click", function () {



  });

});

// API MAP
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map-display"), {
    center: { lat: 25.6714, lng: -100.309 },
    zoom: 12
  });
}

$(document).ready(function () {

  var service
  var city;
  var geocoder;
  var typeOfInterest;
  var request;
  var latLong;
  var searchType;
  var radius;
  var marker;
  var infoWindow;
  var photos;
  var markers = [];

  function initialize() {
    geocoder = new google.maps.Geocoder();
    service = new google.maps.places.PlacesService(map);
    infoWindow = new google.maps.InfoWindow();
  }

  function geocodeAdress(geocoder, resultsMap) {
    var address = $("#inputCity").val();
    console.log(address);
    geocoder.geocode({ "address": address }, function (results, status) {
      if (status === 'OK') {
        resultsMap.setCenter(results[0].geometry.location);
        latLong = results[0].geometry.location;
        searchType = results[0].types[0];
        if (searchType == "country")
          resultsMap.setZoom(6);
        else if (searchType == "administrative_area_level_1") {
          resultsMap.setZoom(8);
        }
        else {
          resultsMap.setZoom(13);
        }
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }


  function interestPoints(results, status) {

    console.log(status);
    if (status == google.maps.places.PlacesServiceStatus.OK) {

      for (var i = 0; i < results.length; i++) {
        setTimeout(createMarker, 200, results[i]);
      }
    }
  }

  function searchTypes() {

    if (searchType == 'country')
      radius = '50000';
    else if (searchType == 'administrative_area_level_1')
      radius = '25000';
    else
      radius = '5000';
  }

  function makeRequest() {
    request = {
      location: latLong,
      radius: radius,
      query: typeOfInterest
    }
  }
  function clearMarkers() {
    setMapOnAll(null);
    markers = [];
  }

  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  function createMarker(results) {

    console.log(results);

    console.log(photos);
    var content = '<div id = "titleMarker">' + '<h2>' + results.name + '</h2>' + '</div>' + '<div id = "informationMarker"><p>' + results.formatted_address + '</p></div>';
    var marker = new google.maps.Marker({
      position: results.geometry.location,
      map: map,
      animation: google.maps.Animation.DROP,
      title: 'Hello World!'
    });
    markers.push(marker);
    google.maps.event.addListener(marker, 'click', function () {

      infoWindow.setContent(content);
      infoWindow.open(map, this);
    });
  }


  $("#searchCity").on("click", function () {
    city = $("#inputCity").val();
    geocodeAdress(geocoder, map);
  });

  $("#Restaurant").on("click", function () {
    clearMarkers();
    typeOfInterest = $("#Restaurant").text();
    console.log(typeOfInterest);
    searchTypes();
    makeRequest();
    console.log(request);
    service.textSearch(request, interestPoints);
  });

  $("#Store").on("click", function () {
    clearMarkers();
    typeOfInterest = $("#Store").text();
    console.log(typeOfInterest);
    searchTypes();
    makeRequest();
    console.log(request);
    service.textSearch(request, interestPoints);
  });

  $("#Bar").on("click", function () {
    clearMarkers();
    typeOfInterest = $("#Bar").text();
    console.log(typeOfInterest);
    searchTypes();
    makeRequest();
    console.log(request);
    service.textSearch(request, interestPoints);
  });
  $("#Museum").on("click", function () {
    clearMarkers();
    typeOfInterest = $("#Museum").text();
    console.log(typeOfInterest);
    searchTypes();
    makeRequest();
    console.log(request);
    service.textSearch(request, interestPoints);
  });

  initialize();

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
$("#searchCity").click(function () {
  $("#inputCity").trigger("geocode");
});

// SEARCH RESULTS ANIMATION
$("#searchCity").on("click", function () {
  $('#paperPlane').fadeOut('slow', function () {
    $('.search-results').fadeIn("slow");
  });
});


// API CITY COVER IMAGE
$(document).ready(function () {
  $('#searchCity').on('click', function (e) {
    e.preventDefault();

    var api = "https://api.unsplash.com/search/photos?per_page=1&query=";
    var searchInput = $("#inputCity").val();
    var appID = "a2cd819eb892c58dd92b472a39c35f0a71def1567b12b60b1de8e635ad7cce27";
    var queryURL = api + searchInput + "&client_id=" + appID;


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {

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




