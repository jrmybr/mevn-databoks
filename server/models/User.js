var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
const keys = require('../secret/keys');

var UserSchema = new mongoose.Schema({
  username: {type: String, lowercase: true, unique: true, match: [/^[a-zA-Z0-9\.]+$/, 'is invalid'], index: true},
  firstname: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z\-]+$/, 'is invalid']},
  lastname: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z\-]+$/, 'is invalid']},
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  bio: String,
  image: String, // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hash: String,
  salt: String,
  firstConnection: {type: Boolean, default: true}
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
    bio: this.bio,
    image: this.image
  };
};

UserSchema.methods.toProfileJSONFor = function(user){
  return {
    username: this.username,
    firstname: this.firstname,
    lastname: this.lastname,
    bio: this.bio,
    image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    following: user ? user.isFollowing(this._id) : false
  };
};

UserSchema.methods.setUsername = function() {
  users.find({username: {"$regex": `${this.firstname}.${this.lastname}`}})
  .then(res => {
    this.username = `${this.firstname}.${this.lastname}.${res.length}`
  })
  console.log(this.username);
}
// UserSchema.methods.favorite = function(id){
//   if(this.favorites.indexOf(id) === -1){
//     this.favorites.push(id);
//   }
//
//   return this.save();
// };
//
// UserSchema.methods.unfavorite = function(id){
//   this.favorites.remove(id);
//   return this.save();
// };
//
// UserSchema.methods.isFavorite = function(id){
//   return this.favorites.some(function(favoriteId){
//     return favoriteId.toString() === id.toString();
//   });
// };

UserSchema.methods.follow = function(id){
  if(this.following.indexOf(id) === -1){
    this.following.push(id);
  }

  return this.save();
};

UserSchema.methods.unfollow = function(id){
  this.following.remove(id);
  return this.save();
};

UserSchema.methods.isFollowing = function(id){
  return this.following.some(function(followId){
    return followId.toString() === id.toString();
  });
};



const users = mongoose.model('User', UserSchema);

// UserSchema.post('save', (next) => {
//   const self = this
//   console.log(this.firstname, this.lastname);
//   user.where({username: {"$regex": `${self.firstname}.${self.lastname}`}})
//     .then((res) => {
//       console.log(self.firstname, self.lastname);
//       if(!this.username) {
//         self.username = `${self.firstname}.${self.lastname}.${res.length + 1}`
//       }
//       next()
//     })
//
// })
