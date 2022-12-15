const path = require('path');
const http = require('http')
const randomstring = require("randomstring");
const querystring = require('node:querystring');
const { Buffer } = require('node:buffer');
var redirect_uri = 'http://localhost:8888/callback';

// Set up ENV file and bring in data
require('dotenv').config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const spotifyURL = 'https://api.spotify.com/v1';
// Access Token
let accessToken;


// Filepaths
const filePathMain = path.join(__dirname, '../','/pages'+'/index.html');
const filePathDashboard = path.join(__dirname, '../','/pages'+'/dashboard.html');
const filePathError = path.join(__dirname, '../','/pages'+'/error.html');


// Serve Log in Page
function getLoginPage(req, res)  {
  res.sendFile(filePathMain)  
}

// Redirect from login page to Spotify
function spotifyRedirect (req, res) {
    const state = randomstring.generate(16);
    const scope = 'user-read-private user-read-email';
  
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      })
    );
}

// Serve page after authorizaton
function redirectAfterAuth(req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;
  console.log(code)
  if (state === null) {
    res.redirect('/error' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    const authOptions = {
      const: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    }
    accessToken = authOptions.form.code
    
    // If user deny access authOptions contains an error field which can be used to server error page
    if(authOptions.form.error) {
      res.sendFile(filePathError)  
    }
    res.sendFile(filePathDashboard)  
  }
}


// Refresh token
function refreshToken(req, res) {
  const refresh_token = req.query.refresh_token;
  callbackAuthOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

};

// Send Error file
function sendErrorFile(req, res) {
  res.statusCode = 404;
  res.sendFile(filePathError)
}



module.exports =  { getLoginPage, spotifyRedirect, redirectAfterAuth, refreshToken, sendErrorFile }