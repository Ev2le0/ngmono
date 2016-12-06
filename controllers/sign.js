var validator = require('validator');
var eventproxy  = require('eventproxy');
var config = require('../config');
var User = require('../proxy').User;
var tools = require('../common/tools');
var utility = require('utility');
var authMiddleware = require('../middlewares/auth');
var uuid = require('node-uuid');

exports.signin = function(req,res,next){
    //console.log(req.body);
    //process.exit(1);
    var loginname = validator.trim(req.body.username).toLowerCase();
    var pwd = validator.trim(req.body.password);
    var ep = new eventproxy();
    ep.fail(next);
    if(!loginname || !pwd){
        res.status(422);
        return res.render('login', {error: '信息不完整。',title:'登录',user:'' });
    }
    ep.on('login_error',function(login_error){
        res.status(403);
        res.render('login',{error:'用户名或密码错误',title:'登录',user:''});
    });

    User.getUserByLoginName(loginname,function(err,user){
        if(err){
            return  next(err);
        }
        if(!user){
            return ep.emit('login_error');
        }
        var passhash = user.pass;
        tools.bcompare(pwd,passhash,ep.done(function(bool){
            if(!bool){
                return ep.emit('login_error');
            }
            //store session cookie
            authMiddleware.generate_session(user,res);
            //after login success redirect to index
            res.redirect('/');
        }));
    });
};

exports.signup = function(req,res,next){
    var loginname = validator.trim(req.body.username).toLowerCase();
    var pwd = validator.trim(req.body.pass);
    var repwd = validator.trim(req.body.repass);
    var ep = new eventproxy();
    ep.fail(next);
    ep.on('reg_error',function(msg){
        res.status(422);
        res.render('reg',{error:msg,title:'注册',user:''});
    });
    //验证注册信息的完整性
    if([loginname,pwd,repwd].some(function(item){return item === '';})){
        return ep.emit('reg_error','信息不完整');
    }
    if(loginname.length < 5){
        return ep.emit('reg_error','用户名至少需要5个字符');
    }
    if(!tools.validateId(loginname)){
        return  ep.emit('reg_error','用户名不合法');
    }
    if(pwd !== repwd){
        return ep.emit('reg_error','两次密码输入不一致');
    }
    User.getUserByLoginName(loginname,function(err,user){
        if(err){
            return  next(err);
        }

        if(user){
            return ep.emit('reg_error','用户名已被使用');
        }
        tools.bhash(pwd,ep.done(function(passhash){
            User.newAndSave(loginname,passhash,function(err){
                if(err){
                    return next(err);
                }
                res.render('reg',{success:'注册成功',title:'注册',user:''});
            });
        }));
    });
};

exports.logout = function(req,res){
    req.session.destroy();
    res.clearCookie(config.auth_cookie_name, { path: '/' });
    res.redirect('/');
};