# TimelyApp-node for [TimelyApp.com](https://timelyapp.com/)

Node package to make the TimelyApp OAuth 2 API accessible to node apps. This is
very beta. It does not include an OAuth2 CLient (as yet). But it does implement the
full API as documented on the TimelyApp.

Note: This is not an official package. It's home grown and designed to scratch my
dev itch. so...

[ ![Codeship Status for d1b1/timelyapp-node](https://codeship.com/projects/155bddf0-63da-0134-68f7-3efe9c97f668/status?branch=master)](https://codeship.com/projects/175463)

[![Coverage Status](https://coveralls.io/repos/github/d1b1/timelyapp-node/badge.svg)](https://coveralls.io/github/d1b1/timelyapp-node)

### Install
This package will stay on gh until it gets its tests and a bit more polish.

    npm install git+https://git@github.com/d1b1/timelyapp-node.git#master

    // Coming soon.
    // npm install timelyapp-node

### API Implemented
The following are the api routes implemented. The OAuth2 server side calls are not
relevant for this package. (Base URL https://api.timelyapp.com/1.0). The package
API extends each entity with get, UPDATE, DELETE, and Entity specific list
queries. The API structure is in flux, so `account.get` might change to `account.fetch`.
Right now to access any sub entity, the users needs to walk the entity tree, this
is changing. The four base APIs return User, Project, Account, Client or Event
entities.

Root Functions (No entity required).
 * `accounts.list(cb)` /accounts - Get a list of all accounts.
 * `getAccount(account_id)` GET /accounts/:account_id - Get a specific account entity by Id.
 * `getProject(account_id, project_id)` GET /:account_id/projects/:project_id - Get a specific account project by Id.
 * `getClient(account_id, project_id)` GET /:account_id/clients/:client_id - Get a specific account client by Id.
 * `getUser(account_id, user_id)` GET /:account_id/users/:user_id - Get a specific account user by Id.
 * `getEvent(account_id, event_id)` GET /:account_id/events/:event_id - Get a specific event by Id.

Account API (returns one or more `Account` Entities)
 * `[account].get(cb)` /accounts/:account_id - Get/Fetch a given account again.
 * `[account].users(cb)` /:account_id/users - Get an array of all account users (returns array of * `[Accounts])
 * `[account].clients(cb)` /:account_id/clients - Get all clients for a given Account Entity.
 * `[account].projects(cb)` /:account_id/projects - Get all projects for a given Account Entity.
 * `[account].createProject(params, cb)` /:account_id/projects - Get a specific project by id.
 * `[account].createUser(params, cb)` /:account_id/users - Get a specific User by id.
 * `[account].createEvent(params, cb)` /:account_id/events - Get a specific event by id.

Project API (returns one or more `Project` Entities)
 * `[project].get(cb)` /:account_id/projects/:project_id - Reload/Fetchea given project again.
 * `[project].update(params, cb)` /:account_id/projects/:project_id - Updates a Project values.
 * `[project].delete(cb)` /:account_id/projects/:project_id - Deletes a given project.
 * `[project].events(cb)` /:account_id/projects/:project_id/events - Returns an list of all project events entities.
 * `[project].createEvent(params, cb)` /:account_id/projects/:project_id/events

Client API (returns one or more `Client` Entities)
 * `[client].get(id, cb)` /:account_id/clients - Reload/Fetch a given client entity.
 * `[client].update(params, cb)` /:account_id/clients/:client_id - Update a client.
 * `[client].delete(cb)` /:account_id/clients/:client_id - Delete a client.

User API (returns one or more `User` Entities)
 * `[user].get(cb)` /:account_id/users - Reload/Fetch a given user.
 * `[user].update(params, cb)` /:account_id/users/:user_id - Update a given user.
 * `[user].delete(cb)` /:account_id/users/:user_id - Delete a user.
 * `[user].events(cb)` /:account_id/users/:user_id/events - Get all events for the user.
 * `[user].createEvent(params, cb)` /:account_id/users/:user_id/events - Create an event for the user.

Event API (Time Records, returns one or more `Event` Entities)
 * `[event].get(cb)` /:account_id/users/:user_id/events - Reload/Fetch a given event.
 * `[event].update(params, cb)` /:account_id/events/:event_id - Update a given event.
 * `[event].changeProject(project_id, cb)` /:account_id/projects/:project_id/events/:event_id - Change the project associated wth a given event.
 * `[event].changeUser(user_id, cb)` /:account_id/users/:user_id/events/:event_id - Change the user associate with a given event.
 * `[event].delete(cb)` /:account_id/events/:event_id - Delete an event.

Report API
    post /:account_id/reports

### Examples
The following require this to access the API.

    var timelyapp-node = require('timelyapp-node');

    // Assumes an existing user token.
    var timely = new timelyapp-node(<token>);

Get a specific entity, using a helper.

    timely.getAccount(1212, function(err, account) {
        account.users(function(err, users) {
            res.json(users);
        });
    });

    timely.getProject(1, 1212, function(err, project) {
        res.json(project);
    });

    timely.getUser(1, 3333, function(err, user) {
        res.json(user);
    });

    timely.getEvent(1, 20202, function(err, event) {
        res.json(event);
    });

    timely.getClient(1, 39322, function(err, client) {
        res.json(client);
    });

Get all Accounts for a given token.

    timely.accounts.list(function(err, accounts) {
        res.json(accounts);
    });

Create an Event (uses entity methods)

    timely.getAccount(1212, function(err, account) {
        account.createEvent({ ... }, function(err, event) {
            res.json(event);
        });
    });

Create an Project (uses an account entity)

    account.createProject({ ... }, function(err, project) {
        res.json(project);
    });

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
 1. DONE - CI setup.
 2. DONE - Coveralls setup.
 3. ??? - Heroku client app with server side auth.
 4. DONE - Tests
 5. ??? - Query fields in the callbacks.
 6. Client side app to enable implicit Oauth 2 workflow.
