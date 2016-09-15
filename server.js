'use strict';

const express = require('express');
const simpleOauthModule = require('simple-oauth2');

const app = express();
const oauth2 = simpleOauthModule.create({
  client: {
    id: '7b13759641c953444808165062907bd537fa8ffb488a5a55e8233e3e48c8a7ee',
    secret: '5806498ead278d07c952f187253442891b7c7d39f0d72585ffb2b9369ae6b3fd',
  },
  auth: {
    tokenHost: 'https://api.timelyapp.com/1.0',
    tokenPath: '/oauth/token',
    authorizePath: '/oauth/authorize',
  },
});

// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'https://totalworth.herokuapp.com/callback',
  scope: 'notifications',
  state: '3(#0/!~',
});

// Initial page redirecting to Github
app.get('/auth', (req, res) => {
  console.log('Sending to Auth', authorizationUri);
  res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', (req, res) => {
  const code = req.query.code;
  const options = {
    code,
  };

  console.log('Got here for a callback');

  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.message);
      return res.json('Authentication failed');
    }

    console.log('The resulting token: ', result);
    const token = oauth2.accessToken.create(result);

    return res
      .status(200)
      .json(token);
  });
});

app.get('/success', (req, res) => {
  res.send('');
});

app.get('/', (req, res) => {
  res.send('Hello<br><a href="/auth">Log in with TimelyApp</a>');
});

app.listen(process.env.PORT, () => {
  console.log('Express server started on port ' + process.env.PORT); // eslint-disable-line
});
