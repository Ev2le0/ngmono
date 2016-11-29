/*
 * ngmono - router.js
 */

/*
 * Module dependencies
 */

var express = require('express');
//var sign = require('./controllers/sign');
//var site = require('./controllers/site');
var user = require('./controllers/user');
var config = require('./config');
var router = express.Router();
// home page
//router.get('/', site.index);

module.exports = router;