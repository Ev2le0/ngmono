var mongoose = require('../common/mongoose');

//models
require('./user');
require('./post');
require('./reply');
exports.User = mongoose.model('User');
exports.Post = mongoose.model('Post');
exports.Reply = mongoose.model('Reply');