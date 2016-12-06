var User = require('../proxy').User;
//var User = require('../proxy').Post;

exports.index = function(req,res){
    //var user = User.getUserBySession();
    //var post = User.getAllPost();
    res.render("index",{
        title:"首页",
        user:'',
    });
};

