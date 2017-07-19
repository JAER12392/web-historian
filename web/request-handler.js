var path = require('path');
var archive = require('../helpers/archive-helpers');
var urlParser = require('url');
var fsFileSystem = require('fs');
// require more modules/folders here!

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};
  
exports.handleRequest = function (req, res) {
  
   
  var parsedUrl = urlParser.parse(req.url);
  var files = fsFileSystem.readdirSync('./');
  
  console.log(parsedUrl);
  
  
  if (req.method === 'GET' && parsedUrl.pathname === '/') {
    fsFileSystem.readFile('./web/public/index.html', (err, data) => {
      if (err) {
        throw err;
      }
      
      var localHeader = headers;
      
      localHeader['Content-Type'] = 'text/html; charset=utf-8';
      var body = '';
      body += data;
  
      res.writeHead(200, localHeader);     
      
      res.end(body);
    });
    
  }
  if (req.method === 'GET' && parsedUrl.pathname === '/styles.css') {
    fsFileSystem.readFile('./web/public/styles.css', (err, data) => {
      if (err) {
        throw err;
      }
      
      var localHeader = headers;
      
      localHeader['Content-Type'] = 'text/css';
      var body = '';
      body += data;

      res.writeHead(200, localHeader);      
      
      res.end(body);
    });
  }
};


