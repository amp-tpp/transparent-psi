'use strict'

var express = require('express');
var path = require('path');
var https = require('https')

var fs = require('fs')

var hskey = fs.readFileSync('key.pem');
var hscert = fs.readFileSync('cert.pem')
var options = {
    key: hskey,
    cert: hscert
};

var app = express();

app.use('/assets', express.static('./assets'))

app.get('/99754106633f94d350db34d548d6091a', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/assets/index.html'));
})

var server = https.createServer(options,app)

server.listen(8081);
