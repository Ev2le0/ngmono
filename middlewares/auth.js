var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var UserProxy = require('../proxy').User;
var config = require('../config');
/*
 * 需要登录才能进行相应的操作
 * */
exports.userRequired = function(req,res,next){
    if(!req.session || !req.session.user || req.session.user._id){
        return res.redirect('/login');
    }
};

/*
 * 需要管理员权限才能进行的操作
 * */

exports.adminRequired = function(req,res,next){
    if(!req.session.user){
        return res.render('notify', { error: '你还没有登录。' });
    }
    if(!req.session.user.is_admin){
        return res.render('nottify',{ error: '需要管理员权限。' })
    }
};

exports.generate_session = function(user,res){
    var auth_token = user._id + '$$$$'; // 以后可能会存储更多信息，用 $$$$ 来分隔
    var opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true
    };
    res.cookie(config.auth_cookie_name, auth_token, opts); //cookie 有效期30天
};