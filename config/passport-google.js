const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const User = require('../models/users');
const Provider_accounts = require('../models/provider_accounts');

require('dotenv').config();

passport.use(new GoogleStrategy({
  clientID: process.env.G_OAUTH_CLIENT_ID,
  clientSecret: process.env.G_OAUTH_CLIENT_SECRET,
  callbackURL: 'http://127.0.0.1:3000/accounts/oauth2/redirect/google',
}, callback));

async function callback (issuer, profile, cb) {
  // check if the user has created an account before with this app
  let userProvidedAcc = await Provider_accounts.findOne({ out_id: profile.id });
  
  // the user has signed up before
  if (userProvidedAcc) {
    let user = await User.findById(userProvidedAcc.user_id, '-password');
    
    if (!user) {
      cb(null, false);
    }
    else {
      cb(null, user);
    }
  }
  
  // the user doesn't have an account in the app
  if (!userProvidedAcc) {
    let appUser = new User({
      first_name: null,
      last_name: null,
      username: profile.id,
      password: null,
      date_of_birth: null,
      friends: null,
      location: null,
      profile_pic_url: null,
      rooms: null,
      privates: null,
    });
    
    let userProvided = new Provider_accounts({
      out_id: profile.id,
      provider: 'google',
      user_id: appUser._id,
    });
    
    userProvided.save();
    appUser.save();
    
    cb(null, appUser);
  }
}

module.exports = passport;
