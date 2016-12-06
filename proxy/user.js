var models = require('../models');
var User = models.User;
var utility = require('utility');
var uuid = require('node-uuid');


/**
 * 根据登录名查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} loginName 登录名
 * @param {Function} callback 回调函数
 */

exports.getUserByLoginName = function (loginName, callback) {
    //console.log(loginName);
    //process.exit(1);
    User.findOne({'name':loginName}, callback);
};

exports.newAndSave = function(loginname,pass,callback){
    var user = new User();
    user.name = loginname;
    user.pass = pass;
    user.save(callback);
};

/**
 * 根据用户ID，查找用户
 * Callback:
 * - err, 数据库异常
 * - user, 用户
 * @param {String} id 用户ID
 * @param {Function} callback 回调函数
 */
exports.getUserById = function (uid, callback) {
    if(!uid){
        return callback();
    }
    User.findOne({_id:uid},callback);
};