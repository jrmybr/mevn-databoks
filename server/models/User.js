const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const keys = require('../secret/keys');

var UserSchema = new mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  username: {type: String, lowercase: true, unique: true, match: [/^[a-zA-Z0-9\.]+$/, 'is invalid'], index: true},
  firstname: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z\-]+$/, 'is invalid']},
  lastname: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z\-]+$/, 'is invalid']},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  hash: String,
  salt: String,
  // firstConnection: {type: Boolean, default: true},
  address: {type: String, default: ''},
  codePostal: {type: String, default: ''},
  city: {type: String, default: ''},
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, keys.local.secret);
};

UserSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    token: this.generateJWT(),
  };
};

UserSchema.methods.toProfileJSONFor = function(user){
  return {
    username: this.username,
    firstname: this.firstname,
    lastname: this.lastname,
    email: this.email,
    address: this.address,
    codePostal: this.codePostal,
    city: this.city,
    fullname: this.getFullName()
    // firstConnection: this.firstConnection,
  };
};

UserSchema.methods.setUsername = function() {
  users.find({username: {"$regex": `${this.firstname}.${this.lastname}`}})
  .then(res => {
    this.username = `${this.firstname}.${this.lastname}.${res.length}`
  })
}

UserSchema.methods.getFullName = function() {
  return `${this.firstname[0].toUpperCase()}${this.firstname.slice(1)} ${this.lastname.toUpperCase()}`
}

UserSchema.methods.getShortName = function() {
  return `${this.firstname[0].toUpperCase()}. ${this.lastname.toUpperCase()}`
}

const users = mongoose.model('User', UserSchema);
