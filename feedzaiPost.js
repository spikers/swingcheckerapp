//Lets require/import the HTTP module
var http = require('http');
var request = require('request');
var dispatcher = require('httpdispatcher');

var headers =  'Content-Type: application/json';

//Lets define a port we want to listen to
const PORT=8080; 

//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');

request({
  url: 'https://sandbox.feedzai.com/v1/payments',
  auth: {
        'user': 'LqTJ6NrDVl3TzX6T2aFVWtjlK1dfwyb63w2YZBu1/SIK+KCjdrw8GOf5bsPk',
        'pass': ''
    },
  method: 'POST',
  json: {
      'user_id': 'af00-bc14-777',
      'id': 'testmsft3',
      'amount': 5969,
      'user_defined': {
        'date': 20160901,
        'ticker': 'msft',
        'high': 5752,
        'low': 5666
      }
}
}, function (error, response, body) {
  if (!error) console.log('Working');
});

/*
request({
  url: 'https://sandbox.feedzai.com/v1/payments/test5',
  auth: {
        'user': 'LqTJ6NrDVl3TzX6T2aFVWtjlK1dfwyb63w2YZBu1/SIK+KCjdrw8GOf5bsPk',
        'pass': ''
    },
  method: 'GET',
}, function (error, response, body) {
  console.log(error);
  console.log(response);
  console.log(body);
  if (!error) console.log('Working');
});
*//*

var options = {
    url: 'https://api.feedzai.com/v1/payments/test5',
    auth: {
        'user': 'LqTJ6NrDVl3TzX6T2aFVWtjlK1dfwyb63w2YZBu1/SIK+KCjdrw8GOf5bsPk',
        'pass': ''
    }
};

function callback(error, response, body) {
  console.log(body);
    if (!error && response.statusCode == 200) {
        console.log(body);
    }
}

    request(options, callback);

*/

function handleRequest(request, response){
    response.end('It Works!! Path Hit: ' + request.url);
}



//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

















