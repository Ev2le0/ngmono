var mongoose = require('mongoose');
var BaseModel = require('./base_model');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var ReplySchema = new Schema({
    conent:{type:String},
    post_id:{type:ObjectId},
    reply_id:{type:ObjectId},
    create_at:{type:Date,default:Date.now},
    update_at:{type:Date,default:Date.now},
    deleted:{type:Boolean,default:false},
});

ReplySchema.plugin(BaseModel);
ReplySchema.index({post_id:1});
ReplySchema.index({author_id:1,create_at:-1});

mongoose.model('Reply',ReplySchema);