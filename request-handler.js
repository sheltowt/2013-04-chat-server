/* You should implement your request handler function in this file.
 * But you need to pass the function to http.createServer() in
 * basic-server.js.  So you must figure out how to export the function
 * from this file and include it in basic-server.js. Check out the
 * node module documentation at http://nodejs.org/api/modules.html. */

var http = require("http");
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};
var messages = [];
var handleRequest = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var statusCode = 200;

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/plain";

  response.writeHead(statusCode, headers);


  if (request.method === 'POST') {
    request.setEncoding('utf8');
    var chunks = [];
    request.on('data', function (chunk) {
      console.log('got this data', chunk);
      chunks.push(chunk);
    });

    request.on('end', function () {
      var newMessage = JSON.parse(chunks.join(''));
      messages.push(newMessage);
      console.log(messages);
      sendGetResponse();
      response.end("BOOM");
    });
  }


  // if(request.method === 'GET' && messages.length > 0){
  //   console.log("I'm in the get");
  //   var thingWeSendBack = JSON.stringify(messages);
  //   //response.write(thingWeSendBack);
  //   response.end(thingWeSendBack);
  //   // response.end(messages);
  // }

  if (request.method === 'OPTIONS') {
    // Options doesn't need a body, just headers, so end the response
    response.end();
  }
  var sendGetResponse = function(){
    var thingWeSendBack = JSON.stringify(messages);
    //response.write(thingWeSendBack);
    response.end(thingWeSendBack);
  };
  // response.write('whatevs');
  // response.end('something else');
};

module.exports = handleRequest;

