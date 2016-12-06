var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
var UserProxy = require('../proxy').User;
var config = require('../config');
var eventproxy = require('eventproxy');
/*
 * 需要登录才能进行相应的操作
 * */
exports.userRequired = function(req,res,next){
    if(!req.session || !req.session.user || !req.session.user._id){
        return res.redirect('/login');
    }
    next();
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

//验证用户是否登录
exports.authUser = function(req,res,next){
    var ep = new eventproxy();
    ep.fail(next);

    // Ensure current_user always has defined.
    res.locals.current_user = null;

    ep.all('get_user',function(user){
        if(!user){
            return next();
        }
        user = res.locals.current_user = req.session.user = new UserModel(user);
        next();
    });
    if(req.session.user){
        ep.emit('get_user',req.session.user);
    }else{
        var auth_token = req.signedCookies[config.auth_cookie_name];
        if(!auth_token){
            return next();
        }
        var auth = auth_token.split('$$$$');
        var user_id = auth[0];
        UserProxy.getUserById(user_id,ep.done('get_user'));
    }
}