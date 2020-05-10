'use strict';

var fs = require('fs')

var hskey = fs.readFileSync('key.pem');
var hscert = fs.readFileSync('cert.pem')
var options = {
    key: hskey,
    cert: hscert
};

var https = require('https')

var app = require('./index');
var port = process.env.PORT || 8085;

var server = https.createServer(options,app)

server.listen(port, () => {
  console.log('Server running on port %d', port);
});
