const path = require('path');
const randomstring = require("randomstring");
const Buffer = require('buffer/').Buffer
const axios = require('axios');
const redirect_uri = 'https://spotify-search.onrender.com//callback';
// http://localhost:8888
// Setup backend local Storage

// Set up ENV file and bring in data
require('dotenv').config();
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
// Access Token
let accessToken;

// Filepaths
const filePathMain = path.join(__dirname, '../','/dist'+'/index.html');
const filePathDashboard = path.join(__dirname, '../','/dist'+'/dashboard.html');
const filePathError = path.join(__dirname, '../','/dist'+'/error.html');


// Serve Log in Page
function getLoginPage(req, res)  {
  res.sendFile(filePathMain)  
}

// Redirect from login page to Spotify
function spotifyRedirect (req, res) {
    const state = randomstring.generate(16);
    const scope = 'user-read-private user-read-email user-library-modify user-library-read';
  
    const usp = new URLSearchParams({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    })
    res.redirect('https://accounts.spotify.com/authorize?' + usp)
}


// Serve page after authorizaton. Store authorization code into a cookie for front end can access token
 function redirectAfterAuth(req, res) {
  const code = req.query.code || null;
  const state = req.query.state || null;


  const usp = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirect_uri
})

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: usp,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        accessToken = response.data.access_token
        res.setHeader('Set-Cookie', `spotifyToken=${response.data.access_token}`)
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

  const usp = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refresh_token
})

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: usp,
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