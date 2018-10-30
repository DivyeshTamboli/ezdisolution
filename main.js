function loadWeather(url, cFunction) {
  var xhttp;
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cFunction(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}


function myFunction(xhttp) {
  var data = JSON.parse(xhttp.responseText);
  var lat = data.latitude;
  var lng = data.longitude;
  var url = "https://weathersync.herokuapp.com/weather/" + lat + "," + lng;
  loadWeather(url, weatherFunc);

}

function getIcon(a) {


  var url = "http://openweathermap.org/img/w/" + a+ ".png";
  var img = document.createElement('img');
  img.src = url;   
  document.getElementById("icon").appendChild(img);
}

function weatherFunc(xhttp) {
  var data = JSON.parse(xhttp.responseText);
  var temprature = data.main.temp;
  var temprature = temprature + "&#x2109;";
  var icon = getIcon(data.weather[0].icon);
  document.getElementById("city").innerHTML = data.name;
  document.getElementById("temp").innerHTML = temprature;
  document.getElementById("weather").innerHTML = data.weather[0].main;

}

window.onload= function(){
  loadWeather('https://weathersync.herokuapp.com/ip', myFunction);
}