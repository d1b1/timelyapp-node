# TimelyApp-node for [TimelyApp.com](https://timelyapp.com/)

Node package to make the TimelyApp OAuth 2 API accessible to node apps. This is
very beta. It does not include an OAuth2 CLient (as yet). But it does implement the
full API as documented on the TimelyApp.

Note: This is not an official package. Is home grown and designed to scratch my
dev itch. so...

### Install
This package will stay on gh until it gets its tests and a bit more polish.

    npm install git+https://git@github.com/d1b1/timelyapp-node.git#master

### API Implemented
The following are the api routes implemented. The OAuth2 server side calls are not
relavent for this package. (Base URL https://api.timelyapp.com/1.0)

    Account API
        GET /accounts
        GET /accounts/:account_id

    Project API
        GET /:account_id/projects
        GET /:account_id/projects/:project_id
        POST /:account_id/projects
        PUT /:account_id/projects/:project_id
        DEL /:account_id/projects/:project_id

    Client API
        GET /:account_id/clients
        POST /:account_id/clients
        PUT /:account_id/clients/:client_id
        DEL /:account_id/clients/:client_id

    User API
        GET /:account_id/users
        POST /:account_id/users
        PUT /:account_id/users/:user_id
        DEL /:account_id/users/:user_id

    Event API (Time Records)
        GET /:account_id/events
        GET /:account_id/users/:user_id/events
        GET /:account_id/projects/:project_id/events
        POST /:account_id/events
        POST /:account_id/users/:user_id/events
        POST /:account_id/projects/:project_id/events
        PUT /:account_id/events/:event_id
        PUT /:account_id/projects/:project_id/events/:event_id
        PUT /:account_id/users/:user_id/events/:event_id
        DEL /:account_id/events/:event_id

    Report API
        POST /:account_id/reports

### Qualifications
This wrapper does not enforce pre-flight data validation. And will (soon) simple
echo back the response errors. So dev at your own risk.

### Why?
I am a Boston full stack dev, I have used a crap ton of different time and billing systems;
harvest, freshbooks, etc. (And I have written a few) TimelyApp.com is hands down the best
on the market. The UI is super skookum, and perfect for a distributed dev team. It's not feature
heavy so is fast to get started with. The iphone + desktop + web + iwatch apps make it
easy to access from any part of the day. The focus on daily billable makes it super easy
to track high and low billable days. This app has made it easier for me to mix in dev
work on side projects, by making it super clear where I stand for the day, week and
months.

But since they are a startup, there are some features missing, so I wrote this wrapper
to make it easier to write helper reports and app for myself and team.

At the time of this work, the client side OAuth2 implementation was not working
with their API, which required a server endpoint to handle the Auth workflow.

### References
1. https://dev.timelyapp.com/

### ToDOs
 1. Travis-ci setup.
 2. Coveralls setup.
 3. Heroku client app with server side auth.
 4. Tests
 5. Query fields in the callbacks.
 6. Client side app to enable implicit Oauth 2 workflow.
