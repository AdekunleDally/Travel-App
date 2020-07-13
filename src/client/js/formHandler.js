const card =document.querySelector('.card');
const details= document.querySelector('.details');
const time= document.querySelector('.timeOfDay');
const icon= document.querySelector('div .icon img');

const baseURL = 'http://api.geonames.org/searchJSON?formatted=true&q=';
const userName='adekunledally';

const form = document.querySelector('.Travel-Input-form');

//Callback function that calls the weather Api, geoname API, PixabatAPI including the posted data and dynamically updates to the U.I.
export async function handleSubmit(e){
  form.addEventListener('submit', handleSubmit)

  e.preventDefault();
  const cityName= document.getElementById('city').value;
  const dateOfTrip= document.getElementById('tripDate').value;
  form.reset(); 
  
  (cityName === '' || dateOfTrip ==='')?alert('Please Enter the name of city you are travelling to as well as the date you intend to travel ')
  :GeoNameCityData(cityName, 'adekunledally')
  .then(function(geoData){

const postGeoNameResult= postData('http://localhost:8080/geoNameDataRoute', {
  cityName :geoData.geonames[0].toponymName,
  latitude : geoData.geonames[0].lat,
  longitude : geoData.geonames[0].lng,
  countryName : geoData.geonames[0].countryName,
  population : geoData.geonames[0].population,
  countryCode : geoData.geonames[0].countryCode,
})
console.log('Post GeoName results: ', postGeoNameResult);
updateGeoUI();

 /*  // set local storage to store data
localStorage.setItem('cityName', cityName);
//localStorage.setItem('dateTrip', dateOfTrip);

if(localStorage.getItem('cityName')){
  GeoNameCityData(localStorage.getItem('cityName'), 'adekunledally')
  .then(data =>  updateGeoUI(data))
  .catch(err=> console.log(err));
}
  */

const lat =  geoData.geonames[geoData.geonames.length - 1].lat;
const lng =    geoData.geonames[geoData.geonames.length - 1].lng;

// WEATHERBIT DATA
  weatherbitData(lat, lng)
  .then(function(weatherData){
    const postweatherbitResult= postWeatherbitData('http://localhost:8080/weatherbitDataRoute', {
      country_code :weatherData.country_code,
      timezone : weatherData.timezone,
      appMaxTemp: weatherData.data[0].app_max_temp,
      appMinTemp:  weatherData.data[0].app_min_temp,
      dateTime:  weatherData.data[0].datetime,
      highTemp:  weatherData.data[0].high_temp,
      lowTemp:  weatherData.data[0].low_temp,
      sunriseTs:  weatherData.data[0].sunrise_ts,
      sunsetTs:  weatherData.data[0].sunset_ts,
      weatherDescription:  weatherData.data[0].weather.description,
    })
  
console.log('Post WeatherbitResult Results: ', postweatherbitResult);
updateWeatherUI();      
  });
  
const latestGeoData = geoData.geonames[geoData.geonames.length - 1]
console.log("The latestGeoData is: ", latestGeoData )

//pixabay postData

getPixaBayData(PixabayBaseURL, cityName)
.then(function(pixaBayData){
  console.log("The top pixaBayData is", pixaBayData.hits[0])
  
const postPixaBayResult= postPixaBayData('http://localhost:8080/pixaBayDataRoute', {
  comments: pixaBayData.hits[0].comments,
  downloads: pixaBayData.hits[0].downloads,
  favorites: pixaBayData.hits[0].favorites,
  id: pixaBayData.hits[0].id,
  imageHeight: pixaBayData.hits[0].imageHeight,
  imageSize: pixaBayData.hits[0].imageSize,
  imageWidth: pixaBayData.hits[0].imageWidth,
  largeImageURL: pixaBayData.hits[0].largeImageURL,
  likes: pixaBayData.hits[0].likes,
  pageURL: pixaBayData.hits[0].pageURL,
  previewHeight: pixaBayData.hits[0].previewHeight,
  previewURL: pixaBayData.hits[0].previewURL,
  previewWidth: pixaBayData.hits[0].previewWidth,
  tags: pixaBayData.hits[0].tags,
  type: pixaBayData.hits[0].type,
  user: pixaBayData.hits[0].user,
  userImageURL: pixaBayData.hits[0].userImageURL,
  user_id: pixaBayData.hits[0].user_id,
  views: pixaBayData.hits[0].views,
  webformatHeight: pixaBayData.hits[0].webformatHeight,
  webformatURL: pixaBayData.hits[0].webformatURL,
  webformatWidth: pixaBayData.hits[0].webformatWidth,
})

console.log('Post pixaBayData Results: ', postPixaBayResult);
updatePixaBayUI();
});

const latestGeoDatas = geoData.geonames[geoData.geonames.length - 1]
console.log("GEODATAS :",latestGeoDatas)

getCountryData(latestGeoDatas.countryName)
.then(function(countryData){

const postcountryDataResult= postcountryData('http://localhost:8080/countryDataRoute', {
  capital: countryData[0].capital,
  callingCodes: countryData[0].callingCodes,
  region: countryData[0].region,
  flag: countryData[0].flag,
  languages: countryData[0].languages[0].name,
  currencies: countryData[0].currencies[0].symbol,
  demonym: countryData[0].demonym
})

console.log('The countryData Results: ', postcountryDataResult);
updateCountryUI();
 });
});
}

// Async Country Data function that asynchronously fetches from the geoName API and displays result in JSON
const baseURLForRestCountries = 'https://restcountries.eu/rest/v2/name/';

export async function getCountryData(searchTerm){
  const response= await fetch(`${baseURLForRestCountries}${searchTerm}`);
  try {
    const Data= await response.json();
    return Data;
   } catch(error){
     console.log('The error is ', error);
   }
}
  
  //An asynchronous function to fetch the  country data from the app endpoint
export async function postcountryData(url, data){
  const dataResult= await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  
  try{
    const responseData  = await dataResult.json();
    return responseData;
  } catch(error){
        console.log('error is', error);
    }
}
  
 
//fetch data from pixaBay API
const PixabayBaseURL = 'https://pixabay.com/api/';
const pixabayKEY = '17376454-f5702e95961e06a28713dca48';

export async function getPixaBayData(baseURL, cityName){
const response=await fetch(`${PixabayBaseURL}?key=${pixabayKEY}&q=${encodeURIComponent(cityName)}&category=places&image_type=photo&pretty=true`);
  try {
      const pixaBaydata = await response.json();
      console.log("My PixaBayData is", pixaBaydata)
      return pixaBaydata;
    } catch (error) {
      console.log('Error here: ', error);
    }
  };

//fetch data from pixaBay API
  export async function postPixaBayData(url, data){
    const pixaBayDataResult= await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    try{
      const responsePixaBayData  = await pixaBayDataResult.json();
      return (responsePixaBayData);
    } catch(error){
        console.log('error is', error);
    }
  }

 

 //fetch data from weatherbit API
 export async function weatherbitData(lat, lng){
 const weatherbitBaseURL='http://api.weatherbit.io/v2.0/forecast/daily?';
 const weatherbitAPIKey= '7c66768c670b451dba52afd5a1bd085a';

   const response = await fetch(`http://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbitAPIKey}`);
   try {
     const data = await response.json();
     console.log("The fetched weatherbit data is : ", data)
     return data;
   } catch (error) {
     console.log('Error here: ', error);
   }
 };

 // making post request to weatherbit endpoint
export async function postWeatherbitData(url, data){
  const weatherbitDataResult= await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try{
    const responseweatherbitData  = await weatherbitDataResult.json();
    return (responseweatherbitData);
  } catch(error){
      console.log('error is', error);
  }
}


// Async GeoName Data function that asynchronously fetches from the geoName API and displays result in JSON
export async function GeoNameCityData(cityName, userName){
const response= await fetch(`http://api.geonames.org/searchJSON?formatted=true&q=${encodeURIComponent(cityName)}&maxRows=10&lang=es&username=${userName}`);
try {
  const newData= await response.json();
  return newData;
 } catch(error){
   console.log('The error is ', error);
 }

}

//An asynchronous function to fetch the data from the app endpoint
export async function postData(url, data){
  const dataResult= await fetch(url, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try{
    const responseData  = await dataResult.json();
    return (responseData);
  } catch(error){
      console.log('error is', error);
  }
}

// Update GeoData UI
export async function updateGeoUI (){
  const geoResponse = await fetch ('http://localhost:8080/getGeoNameData');
  try {
    const alGeoData= await geoResponse.json();
    document.querySelector('.cityName').innerHTML =  alGeoData[0].cityName;
    document.querySelector('.countryName').innerHTML = alGeoData[0].countryName;
  } catch(error){
console.log('error is ', error);
    }
}

//Update Weather UI
export async function updateWeatherUI (){
  const weatherResponse = await fetch ('http://localhost:8080/getWeatherData');
  try {
    const alWeatherData= await weatherResponse.json();
    console.log("The UI alWeatherData is : ", alWeatherData)
    document.querySelector('.weather-details .weather').innerHTML =  alWeatherData[0].weatherDescription;
    document.querySelector('.weather-details .tempClass').innerHTML = alWeatherData[0].appMaxTemp; 
  } catch(error){
console.log('error is ', error);
  }
}

//Update PixaBay UI
export async function updatePixaBayUI (){
  const pixaBayResponse = await fetch ('http://localhost:8080/getPixaBayData');
  try {
    const alPixaBayData= await pixaBayResponse.json();
    console.log("The  AlpixaBayData is: " , alPixaBayData)
    document.querySelector('.country-picture').src =  alPixaBayData[0].previewURL;
} catch(error){
console.log('error is ', error);
  }
}

//Update Country UI
export async function updateCountryUI (){
  const countryResponse = await fetch ('http://localhost:8080/getCountryData');
  try {
    const alCountryData= await countryResponse.json();
    console.log("The UI alCountryData is : ", alCountryData)
    document.querySelector('.city-region').innerHTML =  alCountryData[0].region;
    document.querySelector('.country-code').innerHTML =  alCountryData[0].callingCodes[0];
    document.querySelector('.country-currencies').innerHTML =  alCountryData[0].currencies;
    document.querySelector('img .country-flag').innerHTML = alCountryData[0].flag;
    document.querySelector('span .lang-Class').innerHTML =  alCountryData[0].languages;
} catch(error){
console.log('error is ', error);
  }
}