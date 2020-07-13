# Travel App
###### This web application is a travel app that obtains a desired trip location
###### and date from the user then displays the weather obtained from external APIs

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
* html webpack plugin  and babel were also installed
* web dev server, was also installed and setup as well as the clean plugin
* Service Workers was installed
* webpack.config.js was set up for production and development

### The website layout was done
### After setting up account with webpack,  google Geonames and Create an account with Geonames.
#### The parameter 'username' needs to be passed with each request. The username for your application should be registered here. 
#### Enable your account for the webservice on your account page
#### Don't forget to url encode string parameters containing special characters or spaces.
#### Use the JSON services if you want to use GeoNames from javascript, as most browsers do not allow to call xml services from ANOTHER server.

#### File loader was installed to load in images
#### For Testing , supertest was implemented and jest was ensured it exit gracefully after the tests are done 
#### pixaBay API was used to display the location of the image searched
### Instructions
#### Use npm start command to  start server. This should start the server
#### use npm run build-prod  to start tha application in production mode. This would start the application in production mode.
#### use npm test to run test on the application. The application should pass the tests


## Additional Feature Implemented
#### The REST Country API was implemented as an additonal feature