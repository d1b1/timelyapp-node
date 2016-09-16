# TimelyApp-node

Node package to make the TimelyApp OAuth 2 API accessible to node apps. This is
very beta. It does not include an OAuth2 CLient (as yet). But it does implement the
full API as documented on the TimelyApp.

### API Implemented
Account API
1. GET /accounts
1. GET /accounts/:account_id

Project API
1. GET /:account_id/projects
1. GET /:account_id/projects/:project_id
1. POST /:account_id/projects
1. PUT /:account_id/projects/:project_id
1. DEL /:account_id/projects/:project_id

Client API
1. GET /:account_id/clients
1. POST /:account_id/clients
1. PUT /:account_id/clients/:client_id
1. DEL /:account_id/clients/:client_id

User API
1. GET /:account_id/users
1. POST /:account_id/users
1. PUT /:account_id/users/:user_id
1. DEL /:account_id/users/:user_id

Event API (Time Records)
1. GET /:account_id/events
1. GET /:account_id/users/:user_id/events
1. GET /:account_id/projects/:project_id/events
1. POST /:account_id/events
1. POST /:account_id/users/:user_id/events
1. POST /:account_id/projects/:project_id/events
1. PUT /:account_id/events/:event_id
1. PUT /:account_id/projects/:project_id/events/:event_id
1. PUT /:account_id/users/:user_id/events/:event_id
1. DEL /:account_id/events/:event_id

Report API
1. POST /:account_id/reports

### Qualifications
This wrapper does not enforce pre-flight data validation. And will (soon) simple
echo back the response errors. So dev at your own risk.

### Why?
I am a Boston full stack dev, I have used a crap ton of different time and billing systems;
harvest, etc.  And I have written a few! TimelyApp.com is hands down the best on the market. But
since they are a startup, there are some features missing, so I wrote this wrapper
to make it easier to write helper reports and app for myself and team.

At the time of this work, the client side OAuth2 implementation was not working
with their API, which required a server endpoint to handle the Auth workflow.

### Install

    npm install git+https://git@github.com/d1b1/timelyapp-node.git#master

### References
1. https://dev.timelyapp.com/