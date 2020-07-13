var path=require('path');
const express= require ('express');
const app = express();

//const express = require('express');
//const mockAPIResponse = require('./mockAPI');

/* Body Parser Dependencies*/
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended:true }))
app.use(bodyParser.json());

//CORS for cross origin allowance
const cors = require('cors');
//const Person = require('./mockAPI');
//const { response } = require('express');
app.use(cors());

app.use(express.static('dist'));


const projectData= {
  geoData:[],
  weatherbitData:[],
  pixaBayData:[],
  cntryData: []
};

app.get('/', (req, res) => res.status(200).json({ message: 'Project started' }));

app.get('/', function(req, res){
  res.sendFile(path.resolve('dist/index.html'));
  res.send(projectData);
  console.log('The project is',projectData)
  res.send('dist/index.html');
})


//Get Route 1
app.get('/geoNameDataRoute', getGeoNameData)

function getGeoNameData(req,res){
 res.send(projectData.geoData); // This get request makes the object to be shown in the chrome browser
}

app.get('/weatherbitDataRoute', getWeatherbitData)

function getWeatherbitData(req,res){
// res.send(projectData.geoData); // This get request makes the object to be shown in the chrome browser
}


app.get('/pixaBayDataRoute', getPixaBayData)

function getPixaBayData(req,res){
// res.send(projectData.pixaBayData); // This get request makes the object to be shown in the chrome browser
}


app.get('/countryDataRoute', getcountryData)

function getcountryData(req,res){
// res.send(projectData.getcountryData); // This get request makes the object to be shown in the chrome browser
}



//GeoweatherData POST Route
app.post ('/geoNameDataRoute', postGeoNameData);
 
function postGeoNameData (req, res) {

  geoDataEntry = {
    cityName:req.body.cityName,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
    countryName: req.body.countryName,
    population: req.body.population,
    countryCode: req.body.countryCode,
   }
  
   //projectData.geoData.push(geoDataEntry);
    projectData.geoData.unshift(geoDataEntry);
    res.send(projectData.geoData);
    console.log('The project geoData is', projectData.geoData); //makes object shown in the vs bash terminal
    return projectData.geoData;
}

//weatherbitData POST Route
app.post ('/weatherbitDataRoute', postWeatherbitData);
 
function postWeatherbitData(req, res) {

  weatherbitDataEntry = {
    country_code:req.body.country_code,
    timezone:req.body.timezone,
    appMaxTemp:req.body.appMaxTemp,
    appMinTemp:req.body.appMinTemp,
    dateTime:req.body.dateTime,
    highTemp:req.body.highTemp,
    lowTemp:req.body.lowTemp,
    sunriseTs:req.body.sunriseTs,
    sunsetTs:req.body.sunsetTs,
    weatherDescription:req.body.weatherDescription
   }
  
    //projectData.weatherbitData.push(weatherbitDataEntry);
    projectData.weatherbitData.unshift(weatherbitDataEntry);
    res.send(projectData.weatherbitData);
    console.log('The project Weatherbit data is', projectData.weatherbitData); //makes object shown in the vs bash terminal
    return projectData.weatherbitData;
}


//PixaBayData POST Route
app.post ('/pixaBayDataRoute', postPixaBayData);
 
function postPixaBayData(req, res) {

  pixaBayDataEntry = {
  comments: req.body.comments,
  downloads: req.body.downloads,
  favorites: req.body.downloads,
  id: req.body.id,
  imageHeight: req.body.imageHeight,
  imageSize: req.body.imageSize,
  imageWidth: req.body.imageWidth,
  largeImageURL: req.body.largeImageURL,
  likes: req.body.likes,
  pageURL: req.body.pageURL,
  previewHeight: req.body.previewHeight,
  previewURL: req.body.previewURL,
  previewWidth: req.body.previewWidth,
  tags: req.body.tags,
  type: req.body.type,
  user: req.body.user,
  userImageURL: req.body.userImageURL,
  user_id: req.body.user_id,
  views: req.body.views,
  webformatHeight: req.body.webformatHeight,
  webformatURL: req.body.webformatURL,
  webformatWidth: req.body.webformatWidth
   }
  
   //projectData.geoData.push(pixaBayDataEntry);
   projectData.pixaBayData.unshift(pixaBayDataEntry);
    res.send(projectData.pixaBayData);
    console.log('The project pixaBayData is', projectData.pixaBayData); //makes object shown in the vs bash terminal
    return projectData.pixaBayData;
}


//Country Data Post Route
app.post ('/countryDataRoute', postCountryData);
 
function postCountryData(req, res) {

  countryDataEntry = {
    capital: req.body.capital,
    callingCodes: req.body.callingCodes,
    region: req.body.region,
    flag: req.body.flag,
    languages: req.body.languages,
    currencies: req.body.currencies,
    demonym: req.body.demonym
   }
  
   //projectData.geoData.push(geoDataEntry);
    projectData.cntryData.unshift(countryDataEntry);
    res.send(projectData.cntryData);
    console.log('The project countryData is', projectData.cntryData); //makes object shown in the vs bash terminal
    return projectData.cntryData;
}

//GetGeoNameData used to update the UI
app.get('/getGeoNameData', getRealGeoData);
function getRealGeoData(req, res){
// res.send(projectData.geoData);
res.send(projectData.geoData);
}

//GetWeatherData used to update the UI
app.get('/getWeatherData', getRealWeatherData);
function getRealWeatherData(req, res){
// res.send(projectData.geoData);
res.send(projectData.weatherbitData);
}

//GetPixaBayData used to update the UI
app.get('/getPixaBayData', getRealPixaBayData);
function getRealPixaBayData(req, res){
// res.send(projectData.geoData);
res.send(projectData.pixaBayData);
}

//GetCountryData used to update the UI
app.get('/getCountryData', getRealCountryData);
function getRealCountryData(req, res){
// res.send(projectData.geoData);
res.send(projectData.cntryData);
}


module.exports = app;
