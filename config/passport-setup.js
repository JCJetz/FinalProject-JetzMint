/*
movido todo a index pq no podia importarlo

import passport from "passport";
import TwitterStrategy from "passport-twitter";
//const keys = require("./keys");
import { TWITTER_TOKENS } from "./keys.js";
//import { TWITTER_TOKENS,DB_USER,DB_PASSWORD,MONGODB,SESSION,keys } from "./keys.js";
import User from "../models/user-model.js";

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(
  new TwitterStrategy(
    {
      // options for the twitter start
      consumerKey: TWITTER_TOKENS.TWITTER_CONSUMER_KEY,
      consumerSecret: TWITTER_TOKENS.TWITTER_CONSUMER_SECRET,
      callbackURL: "/auth/twitter/redirect"
    },
    async (token, tokenSecret, profile, done) => {
      // find current user in UserModel
      const currentUser = await User.findOne({
        twitterId: profile._json.id_str
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        const newUser = await new User({
          name: profile._json.name,
          screenName: profile._json.screen_name,
          twitterId: profile._json.id_str,
          profileImageUrl: profile._json.profile_image_url
        }).save();
        if (newUser) {
          done(null, newUser);
        }
      }
      done(null, currentUser);
    }
  )
);

*/