var logger =  require('../common/logger');
var ignore = /^\/(public|agent)/;

exports = module.exports = function(req,res,next){
    if(ignore.test(req.url)){
        next();
        return;
    }

    var t = new Date();
    logger.info('Started', t.toISOString(), req.method, req.url, req.ip);

    res.on('finish', function () {
        var duration = ((new Date()) - t);
        logger.info('Completed', res.statusCode, ('(' + duration + 'ms)').green);
    });

    next();
};