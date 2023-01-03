const path = require('path');

const express = require('express')
const app = express();

const { getLoginPage, spotifyRedirect, redirectAfterAuth, refreshToken, sendErrorFile  } =  require('./middleware/middleware.js');
const port = process.env.PORT || 8888;

app.use(express.static(path.join(__dirname, '/dist')))
app.get('/', getLoginPage) 
app.get('/login', spotifyRedirect)
app.get('/callback', redirectAfterAuth)
app.get('*', sendErrorFile)

// In Development
app.get('/refresh_token', refreshToken);

app.listen(port)