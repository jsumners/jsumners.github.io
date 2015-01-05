'use strict';

// A simple web server for previewing the site locally

var http = require('http');
var fs = require('fs');

var server = http.createServer(function requestHandler(request, response) {
  if (request.method === 'GET') {
    var requestFile = (request.url === '/') ?
      './index.html' : '.' + request.url;
    
    fs.readFile(requestFile, null, function fileRead(err, data) {
      if (err) {
        response.writeHead(500);
        response.end(JSON.stringify(err));
        return;
      }

      if (requestFile.indexOf('.html') > -1) {
        response.writeHead(200, {
          'content-type': 'text/html'
        });
      } else if (requestFile.indexOf('.css') > -1) {
        response.writeHead(200, {
          'content-type': 'text/css'
        });
      } else {
        response.writeHead(200);
      }
      response.end(data);
    });
  }
});

server.on('clientError', function errorHandler(ex, socket) {
  console.log(ex);
});

server.listen(8080);