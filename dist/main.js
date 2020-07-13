var Client=function(e){var t={};function o(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,o),a.l=!0,a.exports}return o.m=e,o.c=t,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=1)}([function(e,t,o){},function(e,t,o){"use strict";o.r(t),o.d(t,"handleSubmit",(function(){return a})),o.d(t,"GeoNameCityData",(function(){return d})),o.d(t,"postData",(function(){return y})),o.d(t,"weatherbitData",(function(){return l})),o.d(t,"postWeatherbitData",(function(){return h})),o.d(t,"getPixaBayData",(function(){return s})),o.d(t,"postPixaBayData",(function(){return u})),o.d(t,"getCountryData",(function(){return r})),o.d(t,"postcountryData",(function(){return i})),o.d(t,"updateGeoUI",(function(){return m})),o.d(t,"updateWeatherUI",(function(){return g})),o.d(t,"updatePixaBayUI",(function(){return p})),o.d(t,"updateCountryUI",(function(){return f}));document.querySelector(".card"),document.querySelector(".details"),document.querySelector(".timeOfDay"),document.querySelector("div .icon img");const n=document.querySelector(".Travel-Input-form");async function a(e){n.addEventListener("submit",a),e.preventDefault();const t=document.getElementById("city").value,o=document.getElementById("tripDate").value;n.reset(),""===t||""===o?alert("Please Enter the name of city you are travelling to as well as the date you intend to travel "):d(t,"adekunledally").then((function(e){const o=y("http://localhost:8080/geoNameDataRoute",{cityName:e.geonames[0].toponymName,latitude:e.geonames[0].lat,longitude:e.geonames[0].lng,countryName:e.geonames[0].countryName,population:e.geonames[0].population,countryCode:e.geonames[0].countryCode});console.log("Post GeoName results: ",o),m();l(e.geonames[e.geonames.length-1].lat,e.geonames[e.geonames.length-1].lng).then((function(e){const t=h("http://localhost:8080/weatherbitDataRoute",{country_code:e.country_code,timezone:e.timezone,appMaxTemp:e.data[0].app_max_temp,appMinTemp:e.data[0].app_min_temp,dateTime:e.data[0].datetime,highTemp:e.data[0].high_temp,lowTemp:e.data[0].low_temp,sunriseTs:e.data[0].sunrise_ts,sunsetTs:e.data[0].sunset_ts,weatherDescription:e.data[0].weather.description});console.log("Post WeatherbitResult Results: ",t),g()}));const n=e.geonames[e.geonames.length-1];console.log("The latestGeoData is: ",n),s(c,t).then((function(e){console.log("The top pixaBayData is",e.hits[0]);const t=u("http://localhost:8080/pixaBayDataRoute",{comments:e.hits[0].comments,downloads:e.hits[0].downloads,favorites:e.hits[0].favorites,id:e.hits[0].id,imageHeight:e.hits[0].imageHeight,imageSize:e.hits[0].imageSize,imageWidth:e.hits[0].imageWidth,largeImageURL:e.hits[0].largeImageURL,likes:e.hits[0].likes,pageURL:e.hits[0].pageURL,previewHeight:e.hits[0].previewHeight,previewURL:e.hits[0].previewURL,previewWidth:e.hits[0].previewWidth,tags:e.hits[0].tags,type:e.hits[0].type,user:e.hits[0].user,userImageURL:e.hits[0].userImageURL,user_id:e.hits[0].user_id,views:e.hits[0].views,webformatHeight:e.hits[0].webformatHeight,webformatURL:e.hits[0].webformatURL,webformatWidth:e.hits[0].webformatWidth});console.log("Post pixaBayData Results: ",t),p()}));const a=e.geonames[e.geonames.length-1];console.log("GEODATAS :",a),r(a.countryName).then((function(e){const t=i("http://localhost:8080/countryDataRoute",{capital:e[0].capital,callingCodes:e[0].callingCodes,region:e[0].region,flag:e[0].flag,languages:e[0].languages[0].name,currencies:e[0].currencies[0].symbol,demonym:e[0].demonym});console.log("The countryData Results: ",t),f()}))}))}async function r(e){const t=await fetch("https://restcountries.eu/rest/v2/name/"+e);try{return await t.json()}catch(e){console.log("The error is ",e)}}async function i(e,t){const o=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});try{return await o.json()}catch(e){console.log("error is",e)}}const c="https://pixabay.com/api/";async function s(e,t){const o=await fetch(`${c}?key=17376454-f5702e95961e06a28713dca48&q=${encodeURIComponent(t)}&category=places&image_type=photo&pretty=true`);try{const e=await o.json();return console.log("My PixaBayData is",e),e}catch(e){console.log("Error here: ",e)}}async function u(e,t){const o=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});try{return await o.json()}catch(e){console.log("error is",e)}}async function l(e,t){const o=await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${e}&lon=${t}&key=7c66768c670b451dba52afd5a1bd085a`);try{const e=await o.json();return console.log("The fetched weatherbit data is : ",e),e}catch(e){console.log("Error here: ",e)}}async function h(e,t){const o=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});try{return await o.json()}catch(e){console.log("error is",e)}}async function d(e,t){const o=await fetch(`http://api.geonames.org/searchJSON?formatted=true&q=${encodeURIComponent(e)}&maxRows=10&lang=es&username=${t}`);try{return await o.json()}catch(e){console.log("The error is ",e)}}async function y(e,t){const o=await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});try{return await o.json()}catch(e){console.log("error is",e)}}async function m(){const e=await fetch("http://localhost:8080/getGeoNameData");try{const t=await e.json();document.querySelector(".cityName").innerHTML=t[0].cityName,document.querySelector(".countryName").innerHTML=t[0].countryName}catch(e){console.log("error is ",e)}}async function g(){const e=await fetch("http://localhost:8080/getWeatherData");try{const t=await e.json();console.log("The UI alWeatherData is : ",t),document.querySelector(".weather-details .weather").innerHTML=t[0].weatherDescription,document.querySelector(".weather-details .tempClass").innerHTML=t[0].appMaxTemp}catch(e){console.log("error is ",e)}}async function p(){const e=await fetch("http://localhost:8080/getPixaBayData");try{const t=await e.json();console.log("The  AlpixaBayData is: ",t),document.querySelector(".country-picture").src=t[0].previewURL}catch(e){console.log("error is ",e)}}async function f(){const e=await fetch("http://localhost:8080/getCountryData");try{const t=await e.json();console.log("The UI alCountryData is : ",t),document.querySelector(".city-region").innerHTML=t[0].region,document.querySelector(".country-code").innerHTML=t[0].callingCodes[0],document.querySelector(".country-currencies").innerHTML=t[0].currencies,document.querySelector("img .country-flag").innerHTML=t[0].flag,document.querySelector("span .lang-Class").innerHTML=t[0].languages}catch(e){console.log("error is ",e)}}o(0)}]);