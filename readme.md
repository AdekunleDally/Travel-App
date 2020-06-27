# Travel App
###### This web application is a travel app that obtains a desired trip location
###### and date from the user then displays the weather and an image of the location using information obtained from external APIs

### Install
###### The following were installed in order to get the app up and running
* package.json  using npm init
* express, cors and body-parser were installed
* webpack and webpack cli  were installed using  npm i webpack webpack-cli. The webpack.config.js file was also created in the root directory

* Added necessary require statement and module.exports to config file as seen below
const path = require('path') 
const webpack = require('webpack')

* added entry point to the webpack.config.js
   module.exports = {
   entry:'./src/client/index.js'
}

* Added a new webpack script to package.json i.e.  "build": "webpack"
