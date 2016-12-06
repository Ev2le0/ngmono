/*
 * ngmono - router.js
 */

/*
 * Module dependencies
 */

var express = require('express');
var site = require('./controllers/site');
var user = require('./controllers/user');
var sign = require('./controllers/sign');
var config = require('./config');
var router = express.Router();
// home page
router.get("/",site.index);
router.get("/login",function(req,res) {
    res.render('login',{user:'',title:'登陆'});
});
router.post("/login",sign.signin);
router.get("/reg",function(req,res) {
    res.render('reg',{user:'',title:'注册',});
});
router.post("/reg",sign.signup);
router.get('/logout', sign.logout);  // 登出
module.exports = router;