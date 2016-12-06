var mongoose = require('mongoose');
var BaseModel = require('./base_model');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:{type:String},
    pass:{type:String},
    post_count: { type: Number, default: 0 },
    reply_count: { type: Number, default: 0 },
    is_admin: { type:Boolean,default:false },
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});

UserSchema.plugin(BaseModel);

UserSchema.index({name:1},{unique:true});

UserSchema.pre('save',function(next){
    var now = new Date();
    this.update_at = now;
    next();
});

mongoose.model('User',UserSchema);