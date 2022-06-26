//esto es el punto de entrada para todos los puntos finales del servidor
import https from 'https'
import http from 'http'
import fs from 'fs'
import util from 'util';
import path from 'path';
import 'dotenv/config';

import cookieSession from "cookie-session";
import express from 'express';
const app = express();
//const port = 4000;
const port = process.env.PORT || 5000;
import passport from 'passport';
// Esto no puedo dividirlo e importarlo
//import passportSetup from './config/passport-setup.js';
import session from 'express-session';
import {router as authRoutes} from "./routes/auth-routes.js";
import mongoose from "mongoose";
import { MONGODB,SESSION } from "./config/keys.js";
import cors from 'cors';
import cookieParser from 'cookie-parser';

//import SlackStrategy from "passport-slack"; Esto en dos partes, St y luego Strategy
import St from "passport-slack-oauth2";
const SlackStrategy = St.Strategy;

import { SLACK_TOKENS } from "./config/keys.js";
import User from "./models/user-model.js";

import winston from 'winston';

// Info Logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' })
  ]
});

const errorlogger = winston.createLogger({
  level: 'error',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logfile.log' })
  ]
});

export const connectToMongo = async() => {
  await mongoose.connect(MONGODB.MONGODB_URI, {
  });
  return mongoose;
};

await connectToMongo().then(async() => {
  logger.info("Mongo connected");  
  console.log("connected to mongo db");
});

// Esto debería ser ./config/passport-setup.js :/

// serialize the user.id to save in the cookie session
// so the browser will remember the user when login
passport.serializeUser((user, done) => {
  console.log('Serializing user: ', user.id);
  done(null, user.id);
});

// deserialize the cookieUserId to user in the database
passport.deserializeUser((id, done) => {
  console.log('Unserializing user');
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(e => {
      done(new Error("Failed to deserialize an user"));
    });
});

passport.use(new SlackStrategy({
  clientID: SLACK_TOKENS.SLACK_CLIENT_ID,
  clientSecret: SLACK_TOKENS.SLACK_CLIENT_SECRET,
  callbackURL: "/api/auth/slack/redirect",
  skipUserProfile: false, // default
  scope: ['identity.basic', 'identity.avatar', 'identity.team'], // default
  approvalPrompt: 'force'
},
  async (accessToken, refreshToken, profile, done) => {
    // optionally persist user data into a database
    // Log info devuelta por oAuth passport
    console.log("Token:");
    console.log(util.inspect(accessToken, false, null));
    console.log("Refresh:");
    console.log(util.inspect(refreshToken, false, null));
    console.log("Profile:");
    console.log(profile);

    await connectToMongo().then(async() => {

      const currentUser = await User.findOne({
        slackId: profile.user.id
      });
      // create new user if the database doesn't have this user
      if (!currentUser) {
        console.log('Creando usuario en mongoodb..');
        const newUser = await new User({
          name: profile.user.name,
          screenName: profile.displayName,
          teamId: profile.team.id,
          teamName: profile.team.name,
          slackId: profile.user.id,
          profileImageUrl: profile.user.image_192
        }).save();
        if (newUser) {
          console.log('Usuario creado!: ', newUser);
          done(null, newUser);
        } else {
          console.log('User creation failed.');
        }
      } else {
        //console.log('User already present on db.');
        done(null, currentUser);
        //done(null, profile);
      }
    });
  }
));

/*
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "../", "build", 
  "index.html"))
    //res.sendFile(path.join(__dirname, '../build'))
})
//const buildPath = path.join(__dirname, '..', 'build');
//app.use(express.static(buildPath));
*/

app.use(
  cookieSession({
    name: "session",
    keys: [SESSION.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100
  })
);
  
// parse cookies
app.use(cookieParser());

// initalize passport
app.use(passport.initialize());
// deserialize cookie from the browser
app.use(passport.session());

const corsOrigin = process.env.ORIGIN
// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "https://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);
app.get('/ping', (req, res) => {
  console.log('ping!');
  res.send('Pong?');
});


// set up routes
app.use("/api/auth", authRoutes);


// checkeo si logeado en visita a página principal
const authCheck = (req, res, next) => {
    if (!req.user) {
      res.status(401).json({
        authenticated: false,
        message: "user has not been authenticated"
      });
    } else {
      next();
    }
};
// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/bootcamp-neoland", authCheck, (req, res) => {
    res.status(200).json({
      authenticated: true,
      message: "user successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
});

// static files (build of your frontend)

if (process.env.NODE_ENV === "production") {
  logger.info("SERVING IN PRODUCTION"); 
  
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  //logger.info('info', { dirname: path.join(__dirname, '../', 'build')})

  app.use(express.static("client/build"))
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/client/build/index.html"));
  })
}
const options = {
  key: fs.readFileSync('./localhost-key.pem'),
  cert: fs.readFileSync('./localhost.pem'),
};

https.createServer(app).listen(port, () => {
  console.log('Https API listening on port ' + port);
});