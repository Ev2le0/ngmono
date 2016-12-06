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
var auth = require('./middlewares/auth');
var config = require('./config');
var router = express.Router();
// home page
router.get("/",site.index);
router.get("/login",function(req,res) {
    res.render('login',{title:'登陆'});
});
router.post("/login",sign.signin);
router.get("/reg",function(req,res) {
    res.render('reg',{title:'注册'});
});
router.post("/reg",sign.signup);
router.get('/logout', sign.logout);  // 登出
router.get('/resetpwd',function(req,res) {
    res.render('resetpwd',{title:'修改密码'});
});
router.get('/say',function(req,res) {
    res.render('say',{title:'发表'});
});

router.get('/post',function(req,res) {
    res.render('posts',{title:'发表'});
});

router.get('/personal',auth.userRequired,function(req,res) {
    res.render('personal',{title:'个人中心'});
});
module.exports = router;