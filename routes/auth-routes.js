//contains all the authentication endpoints.
import express from 'express';
export const router = express.Router();
import passport from "passport";
import {connectToMongo} from '../server.js'
import bodyParser from 'body-parser';
import User from "../models/user-model.js";
import mintToAddress from '../config/mintToAddress.js'
import path from 'node:path';
import 'dotenv/config';

const CLIENT_HOME_PAGE_URL = process.env.CLIENT_HOME_PAGE_URL;

// para poder parsear body del post a addaddress
router.use(bodyParser.json());

// Production test
/*
const __dirname = path.dirname(new URL(import.meta.url).pathname);

router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
*/

router.get('/pingauth', (req, res) => {
  res.send('Pong? desde auth routes');
});

// when login is successful, retrieve user info
router.get("/login/success", (req, res) => {
  console.log('req user from frontend?: ', req.user ? req.user.name : 'Not logged in');
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  } else {
    console.log('401 desde backend');
    res.status(401).json({
      success: false,
      message: "user didn't authenticate successfully",
      cookies: req.cookies
    });
  }
});

router.post("/mintNFT", (req, res) => {
  console.log('address add request from frontend?:  ', req.body?.address ? req.body.address : 'No address in requests\'s body');
  if (req.user && req.body?.address) {

    connectToMongo().then(async() => {
    
      const updatedate = {isMinting:true}
      
      let mintingUpdate = await User.findOneAndUpdate({slackId: req.user.slackId}, updatedate, {
        returnOriginal: false
      });
      console.log('Updated minting status: ', mintingUpdate);

      // mintArray [tx,tokenId]
      const mintArray = await mintToAddress(req.user.slackId,req.body?.address);

      //añadimos wallet address a usuario en base de datos, y marcamos como ya minteado
      const update = {alreadyMinted: true, ethAddress: req.body?.address, mintTx: mintArray[0], tokenId: mintArray[1], nftData: mintArray[2], isMinting:false }

      let newUser = await User.findOneAndUpdate({slackId: req.user.slackId}, update, {
        returnOriginal: false
      });
      console.log('Updated user: ', newUser);

      res.json({
        success: true,
        message: "NFT successfully Minted!",
        mintArray: mintArray,
        //aqui debería ir tx del mint para mostrar estado en front
        user: req.user,
        cookies: req.cookies
        
      });
      //let mintArray = await mintToAddress(req.user.slackId,req.body?.address)
    });
  } else {
    console.log('no user or address passed');
  }
});

// chckeo si mint se ha completado
// no funciona :(
async function finishedMinting (tx) {
  await tx.data().then(async(nft) => {
    return nft;    
})};


// ruta chekeo de estado de mint
router.get("/mintstatus", (req, res) => {
  console.log('req user from frontend?:  ', req.tx ? req.tx : 'No hay tx en request');
  if (req.user && req.tx) {
    finishedMinting(req.tx).then(async(nft) => {

      res.json({
        success: true,
        message: "user has successfully authenticated",
        user: req.user,
        cookies: req.cookies,
        nft: nft
      });

    })
  } else {
    console.log('sending err 400');
    res.status(401).json({
      success: false,
      message: "user didn't authenticate successfully",
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  res.redirect(CLIENT_HOME_PAGE_URL);
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get('/slack', passport.authenticate('Slack'));

router.get('/slack/redirect',
  passport.authenticate('Slack', { failureRedirect: '/login/failed', successRedirect: CLIENT_HOME_PAGE_URL }),
  (req, res) => res.redirect('/login/success') // Successful authentication, redirect home.
);

//module.exports = router;