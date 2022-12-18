const path = require('path');
const randomstring = require("randomstring");
const querystring = require('node:querystring');
const { Buffer } = require('node:buffer');
const axios = require('axios');
var redirect_uri = 'http://localhost:8888/callback';

// Setup backend local Storage

// Set up ENV file and bring in data
require('dotenv').config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
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

// Serve page after authorizaton. Store authorization code into a cookie for front end can access token
 function redirectAfterAuth(req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;

  axios(
    {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirect_uri
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        accessToken = response.data.access_token
        res.setHeader('Set-Cookie', `spotifyToken=${response.data.access_token}`)
        console.log(accessToken)
        res.sendFile(filePathDashboard);  
      } else {
        res.send(response);
      }
    })
    .catch(error => {
      if(error.response.status) {
        res.redirect('/login')
      } else {
        res.send(error);
      }
    });

    // res.sendFile(filePathDashboard)  
  
}


// Refresh token
function refreshToken(req, res) {
  const { refresh_token } = req.query;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        accessToken = response.data.access_token;
        res.setHeader('Set-Cookie', `spotifyToken=${response.data.access_token}`)
        res.sendFile(filePathDashboard);  
      } else {
        res.send(response);
      }
    })
    .catch(error => {
      res.send(error);
    });
};

// Send Error file
function sendErrorFile(req, res) {
  res.statusCode = 404;
  res.sendFile(filePathError)
}



module.exports =  { getLoginPage, spotifyRedirect, redirectAfterAuth, refreshToken, sendErrorFile, accessToken }