// install & require express
var express = require('express');
var app = express();

var messages = [];


// set client folder to root
app.use(express.static('client'));

app.get('/', function (req, res) {
  res.sendFile('/index.html');
});


app.get('/classes/messages', function(req, res) {
  res.json({ results: messages });
});


app.post('/classes/messages', function(req, res) {

  var message = '';
  req.on('data', function(data) {
    message += data;
  });
  
  req.on('end', function () {
    messages.push(JSON.parse(message));
  });

  res.send('OK');
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});