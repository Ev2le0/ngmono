var mongoose = require('mongoose');
var BaseModel = require('./base_model');
var Schema = mongoose.Schema;
var ObjectId  = Schema.ObjectId;


var PostSchema = new Schema({
    title:{type:String},
    content:{type:String},
    author_id:{type:ObjectId},
    reply_count:{type:Number,default:0},
    visit_count:{type:Number,default:0},
    create_at:{type:Date,default:Date.now},
    update_at:{type:Date,default:Date.now},
    last_reply:{type:ObjectId},
    last_reply_at:{type:Date,default:Date.now},
    deleted:{type:Boolean,default:false},
});

PostSchema.plugin(BaseModel);
PostSchema.index({creat_at:-1});
PostSchema.index({last_reply_at:-1});
PostSchema.index({author_id:1,create_at:-1});

mongoose.model('Post', PostSchema);
