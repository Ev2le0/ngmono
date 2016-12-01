/**
 project config file
 */

var path = require('path');

var config = {
    debug:true,
    get mini_assets() { return !this.debug; }, // 是否启用静态文件的合并压缩，详见视图中的Loader
    name:'ngmono',
    description:'a projtct use angularJS mongoDB nodeJS',
    // mongodb 配置
    db: 'mongodb://127.0.0.1/test',
    //redis配置
    redis_host:'127.0.0.1',
    redis_port:6379,
    redis_db:0,
    redis_passwrod:'',
    //程序运行端口
    port:5000,
    session_secret:'ngmono',
};
module.exports = config;