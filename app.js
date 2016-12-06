var config = require('./config');

require('color');
var path = require('path');
var Loader = require('loader');
var LoaderConnect = require('loader-connect');
var express = require('express');
var session = require('express-session');
require('./middlewares/mongoose_logs');//mongodb 查询日志
require('./models');
var errorPageMiddleware = require('./middlewares/error_page');
var proxyMiddleware = require('./middlewares/proxy');
var auth = require('./middlewares/auth');
var RedisStore = require('connect-redis')(session);
var _ = require('lodash');
var router = require('./router');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler');
var requestLog = require('./middlewares/request_log');
var renderMiddleware = require('./middlewares/render');
var logger = require('./common/logger');
var staticDir = path.join(__dirname,'public');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = 'layout.html';
app.enable('trust proxy');

// custom middleware
//Request logger 请求时间
app.use(requestLog);
if(config.debug){
    //渲染时间
    app.use(renderMiddleware.render);
}

//静态资源
if(config.debug){
    app.use(LoaderConnect.less(__dirname)); //测试环境用
}
app.use('/public',express.static(staticDir));

app.use(require('response-time')());
app.use(bodyParser.json({limit:'1mb'}));
app.use(bodyParser.urlencoded({extended:true,limit:'1mb'}));
app.use(require('method-override')());
app.use(require('cookie-parser')(config.session_secret));
app.use(session({
    secret:'ngmono',
    store:new RedisStore({
        port:config.redis_port,
        host:config.redis_host,
        db:config.redis_db,
        pass:config.redis_passwrod,
    }),
    resave:false,
    saveUninitialized:false,
}));

app.use(auth.authUser);

// set static, dynamic helpers
// assets
//var assets = {};
//_.extend(app.locals, {
//    config: config,
//    //Loader: Loader,
//    assets: assets
//});
//
//app.use(errorPageMiddleware.errorPage);
//_.extend(app.locals,require('./common/render_helper'));
app.use('/',router);
//
////error handler
//if(config.debug){
//    app.use(errorhandler());
//}else{
//    app.use(function(err,req,res,next){
//        logger.error(err);
//        return res.status(500).send('500 status');
//    });
//}

if(!module.parent){
    app.listen(5000,function(){
        logger.info('project is listening on port:',config.port);
    });
}

module.exports = app;