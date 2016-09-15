'use strict';

const ClientOAuth2 = require('client-oauth2')
const express = require('express');
const app = express();
const timely = require('./timely');
const _ = require('underscore');
const async = require('async');
const moment = require('moment');

var timelyAppAuth = new ClientOAuth2({
  clientId:         '294fc29c6e22f6b3c005bad44d767da8f47b055575a9e96951f7a020ba7a3e60',
  clientSecret:     'ce96f7a7feeb6b32b6f47a8e366598a91c9ca3252ba0d5e86e955f2ecf97409d',
  accessTokenUri:   'https://api.timelyapp.com/1.0/oauth/token',
  authorizationUri: 'https://api.timelyapp.com/1.0/oauth/authorize',
  redirectUri:      'http://bobo2.com:2000/callback',
});

app.get('/auth', function (req, res) {
    var redir = timelyAppAuth.code.getUri();
    res.redirect(redir);
});

var timelyAPI = new timely('8e39bc671021ff14beaf226dfab01faa412afc2e85ec13d89b63ab29b35705e2')

app.get('/callback', function (req, res) {
  timelyAppAuth.code.getToken(req.url)
    .then(function (user) {
        res.json(user.data);
    });
});

app.get('/accounts', function (req, res) {

  timelyAPI.accounts.list({}, function(err, accounts) {

      var account = _.first(accounts);

      async.parallel({
          account: function(callback) {
              account.get(function(err, data) {
                  callback(err, data);
              });
          },
          projects: function(callback) {
              account.projects(function(err, data) {
                  callback(err, data);
              });
          },
          events: function(callback) {
              account.events(function(err, data) {
                  callback(err, data);
              });
          }
      }, function(err, results) {
          res.json(results);
      });

  });

});


app.get('/', (req, res) => {
  res.send('Hello<br><a href="/auth">Log in with TimelyApp 2</a>');
});

var port = 2000;
// process.env.PORT || 4000;

app.listen(port, () => {
  console.log('Express server started on port ' + port); // eslint-disable-line
});
