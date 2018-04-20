var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var Profile = mongoose.model('Profile');
var auth = require('../auth');
const sendMail = require('./../../config/nodemailer')
const keys = require('./../../secret/keys')
const mails = require('./../../models/mails/mails')

router.get('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

router.put('/user', auth.required, function(req, res, next){
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.firstname !== 'undefined'){
      user.firstname = req.body.user.firstname;
    }
    if(typeof req.body.user.lastname !== 'undefined'){
      user.lastname = req.body.user.lastname;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.address !== 'undefined'){
      user.address = req.body.user.address;
    }
    if(typeof req.body.user.codePostal !== 'undefined'){
      user.codePostal = req.body.user.codePostal;
    }
    if(typeof req.body.user.city !== 'undefined'){
      user.city = req.body.user.city;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});

router.post('/users/login', function(req, res, next){
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

router.post('/users', function(req, res, next){
  let profile = new Profile();
  // profile.user = user._id
  profile.save().then(() => {
    let user = new User();
    user.firstname = req.body.user.firstname;
    user.lastname = req.body.user.lastname;
    user.email = req.body.user.email;
    user.profile = profile._id;
    user.setUsername();
    user.setPassword(req.body.user.password);
    user.save().then(function(){
      const transporter = sendMail
      transporter.sendMail(mails.welcome(req.body.user), (error, info) => {
          if (error) {
              return console.log(error);
          }
      });
      return res.json({user: user.toAuthJSON()});
    }).catch(next);
  })
});

module.exports = router;
