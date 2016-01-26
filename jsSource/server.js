var http = require('http');
var path = require('path');
var connect = require('connect');
var serveStatic = require('serve-static');


var app = connect();
app.use(serveStatic(path.join(process.cwd(), '../')));
 
// Listen 
app.listen(3000);
