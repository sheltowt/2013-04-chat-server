var requestHandler = require('./request-handler');
/* Import node's http module: */
var http = require("http");

var port = 8080;
var ip = "127.0.0.1";

var server = http.createServer(requestHandler);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
