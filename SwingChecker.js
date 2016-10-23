//Lets require/import the HTTP module
var http = require('http');
var request = require('request');
var dispatcher = require('httpdispatcher');

var headers =  'Content-Type: application/json';
var htmlBody = '<div style="width: 100%;"><div style="width: 800px; margin: 0px auto; padding: 0px;"><h1 style="font-family: Lobster; margin: 0px 0px 10px 0px;">SwingChecker</h1><p>October 21th, 2016</p></div></div><div style="width: 900px; height: 1200px; margin: auto;"><table><tr><th>Ticker</th><th>Price</th><th>Range</th><th>Solution</th></tr>';
var responseText;

var ticker, high, low, amount;


//Lets define a port we want to listen to
const PORT=8080; 

//For all your static (js/css/images/etc.) set the directory name (relative path).
dispatcher.setStatic('resources');

var urls = ['https://sandbox.feedzai.com/v1/payments/testmsft3','https://sandbox.feedzai.com/v1/payments/testamzn2',
'https://sandbox.feedzai.com/v1/payments/testtsla2','https://sandbox.feedzai.com/v1/payments/testatt3',
'https://sandbox.feedzai.com/v1/payments/testgoog','https://sandbox.feedzai.com/v1/payments/testaapl'];

for (var i = 0; i < urls.length; i++) {
  
  var options = {
      url: urls[i],
      auth: {
          'user': 'LqTJ6NrDVl3TzX6T2aFVWtjlK1dfwyb63w2YZBu1/SIK+KCjdrw8GOf5bsPk',
          'pass': ''
      }
  };
  
  var solutions = {
    'AMZN': ['809.00','818.99'],
    'T': ['36.96','38.67'],
    'TSLA': ['197.41','201.57'],
    'AAPL': ['116.28','116.91'],
    'GOOG': ['794.00','799.50'],
    'MSFT': ['59.49','60.45']
  }

  function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
          responseText = JSON.parse(body);
          ticker = responseText.payment.user_defined.ticker.toUpperCase();
          high = responseText.payment.user_defined.high;
          low = responseText.payment.user_defined.low;
          amount = responseText.payment.amount;
          
          high = decimalAdder(high);
          low = decimalAdder(low);
          amount = decimalAdder(amount);
          htmlBody += '<tr><td>' + ticker +  "</td><td>$" + amount + "</td><td>$" + low + "<br />$" + high  + "</td><td>$" + solutions[ticker][0] + "<br />$" + solutions[ticker][1] + "</td></tr>";

      }
  }

  request(options, callback);

  function handleRequest(request, response){
    var html = buildHtml();
    response.end(html);
    
    function buildHtml(req) {
      var header = '<title>SwingChecker</title><style type="text/css">  @import "https://fonts.googleapis.com/css?family=Lobster"; table {        margin: auto;        border-collapse: collapse;}                  tr:nth-child(even){background-color: #f2f2f2}            td {        font-size: 30px;        width: 200px;        text-align: center;      }            th {        font-size: 30px;      }          </style> '       
 
       return '<!DOCTYPE html>' + '<html><head>' + header + '</head><body>' + htmlBody + '</table></body></html>';
    };
  }

  function decimalAdder(number) {
    return number.toString().slice(0, number.toString().length-2) + "." + number.toString().slice(number.toString().length-2);
  }
}
//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});