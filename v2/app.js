var express = require('express');
var app = express();
var db = require('./db');
global.__root   = __dirname + '/';

var VerifyToken = require('./auth/VerifyToken');

app.get('/api', function (req, res) {
  res.status(200).send('API works.');
});

app.use('/api/users', VerifyToken, require(__root + 'user/UserController'));

app.use('/api/auth', require(__root + 'auth/AuthController'));

module.exports = app;
