console.log("nodejs start");


var http = require("http");

http.createServer(function (request,response){
    
    response.writeHead(200,{'Content-Type' : 'text/plain'});

    response.end("Hello Word");
}).listen(8081);

