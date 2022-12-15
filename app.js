const path = require('path');

const express = require('express')
const app = express();

const { getLoginPage, spotifyRedirect, redirectAfterAuth, refreshToken, sendErrorFile, callbackAuthOptions, callBackAuthPost,  } =  require('./middleware/middleware.js');
const port = process.env.PORT || 8888;

app.use(express.static(path.join(__dirname, '/pages')))
app.get('/', getLoginPage) 
app.get('/login', spotifyRedirect)
app.get('/callback', redirectAfterAuth)
app.get('/error', sendErrorFile)
app.get('/refresh_token', function(req, res) {

    var refresh_token = req.query.refresh_token;
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });

app.listen(port)