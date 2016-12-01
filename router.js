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
router.get("/",function(req,res) {
    res.render('index',{user:'',title:'你好,ngmono',message:'假行僧',body:'崔健'});
});

module.exports = router;