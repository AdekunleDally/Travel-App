var path = require('path')
const express = require('express');
const app = express();
//const mockAPIResponse = require('./mockAPI');

/* Body Parser Dependencies*/
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))
app.use(bodyParser.json());

//CORS for cross origin allowance
const cors = require('cors');
//const Person = require('./mockAPI');
const { response } = require('express');
app.use(cors());

app.use(express.static('dist'));

//CREATE LOCAL SERVER
const port = 8081;

const server= app.listen(port, function(){
  console.log(`Listening on port ${port}`);
});

app.get('/', function(req, res){
  res.sendFile(path.resolve('dist/index.html'));
 //res.send("hello Worldie")
 //res.send('dist/index.html');
})