var mongoose = require('mongoose');
var BaseModel = require('./base_model');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:{type:String},
    loginname:{type:String},
    pass:{type:String},
    email:{type:String},
    create_at: { type: Date, default: Date.now },
    update_at: { type: Date, default: Date.now },
});

UserSchema.plugin(BaseModel);

UserSchema.index({loginname:1},{unique:true});
UserSchema.index({email: 1}, {unique: true});

UserSchema.pre('save',function(next){
    var now = new Date();
    this.update_at = now;
    next();
});

mongoose.model('User',UserSchema);