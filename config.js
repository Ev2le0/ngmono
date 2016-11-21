/**
 project config file
 */

var path = require('path');

var config = {
    name:'ngmono',
    description:'a projtct use angularJS mongoDB nodeJS',
    // mongodb 配置
    db: 'mongodb://127.0.0.1/ngmodb',
    //redis配置
    redis_host:'127.0.0.1',
    redis_port:6379,
    redis_db:0,
    redis_passwrod:'',
    //程序运行端口
    port:3000,
};
