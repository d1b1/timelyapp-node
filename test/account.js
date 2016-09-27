var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var request = require('request');

var api = require('../index.js')('aToken');

describe('accounts', function() {

    var testAccount;

    it('account entity has methods', function(done) {
        expect(api.accounts.list).to.exist;
        expect(api.accounts.get).to.exist;
        done();
    });

    it('should get an account (GET /accounts/:account_id)', function(done) {
        var get = sinon.stub(request, 'get').yields(null, null, { id: 1 });

		api.accounts.get(1, function(err, account) {
            testAccount = account;
            expect(account.id).to.exist;

            get.restore();
			done();
		});
	});

    it('should get all accounts (GET /accounts)', function(done) {
        var getRequest = sinon.stub(request, 'get').yields(null, null, [ { id: 5 }, { id: 6 } ]);

		api.accounts.list(function(err, accounts) {
            expect(accounts.length).to.equal(2);
            expect(accounts[0].id).to.exist;
            expect(accounts[0].id).to.equal(5);

            testAccount = accounts[0];
            getRequest.restore();
			done();
		});
	});

    it('should get account projects (GET /accounts/:account_id)', function(done) {
        var getRequest = sinon.stub(request, 'get').yields(null, null, { account_id: 1, id: 6, name: 'Bart'} );

		testAccount.get(function(err, user) {
            expect(user.id).to.exist;
            expect(user.account_id).to.equal(1);

            getRequest.restore();
			done();
		});
	});

    it('should get account projects (GET /:account_id/projects)', function(done) {
        var getUsers = sinon.stub(request, 'get').yields(null, null, [ { account_id: 1, id: 5, name: 'Stephan' }, { account_id: 1, id: 6, name: 'Bart'} ]);

		testAccount.users(function(err, users) {

            expect(users.length).to.equal(2);

            expect(users[0].id).to.exist;
            expect(users[0].account_id).to.equal(1);

            testUser = users[0];
            getUsers.restore();
			done();
		});
	});

    it('should get account clients (GET /:account_id/clients)', function(done) {
        var getRequest = sinon.stub(request, 'get').yields(null, null, [ { account_id: 1, id: 5, name: 'Stephan' }, { account_id: 1, id: 6, name: 'Bart'} ]);

		testAccount.clients(function(err, clients) {
            expect(clients.length).to.equal(2);
            expect(clients[0].id).to.exist;
            expect(clients[0].account_id).to.equal(1);

            testClient = clients[0];
            getRequest.restore();
			done();
		});
	});

    it('should get a accont events (GET /:account_id/events)', function(done) {
        var getEvents = sinon.stub(request, 'get').yields(null, null, [ { account_id: 1, id: 500 }, { account_id: 1, id: 501 }, { account_id: 1, id: 502 } ]);

        testAccount.events(function(err, events) {
            expect(events.length).to.equal(3);

            getEvents.restore();
            done();
        });
    });

    it('should create an a project (POST /:account_id/projects)', function(done) {
        var postRequest = sinon.stub(request, 'post').yields(null, null, { id: 1 });

    	testAccount.createProject({ name: 'Test' }, function(err, project) {
            // Was the mock called.
            expect(postRequest.calledOnce).to.be.true;

            // Do we get an array of two items.
            expect(project.id).to.exist;
            expect(project.id).to.equal(1);

            // Does the prototype contains have its methods.
            expect(project.id).to.exist;
            expect(project.events).to.exist;
            expect(project.get).to.exist;

            postRequest.restore();
    		done();
    	});
    });

    it('should create an a client (POST /:account_id/clients)', function(done) {
        var postRequest = sinon.stub(request, 'post').yields(null, null, { id: 1 });

    	testAccount.createClient({ name: 'Test' }, function(err, client) {
            // Was the mock called.
            expect(postRequest.calledOnce).to.be.true;

            // Do we get an array of two items.
            expect(client.id).to.exist;
            expect(client.id).to.equal(1);

            // Does the prototype contains have its methods.
            expect(client.id).to.exist;
            expect(client.update).to.exist;
            expect(client.delete).to.exist;
            expect(client.get).to.exist;

            postRequest.restore();
    		done();
    	});
    });

    it('should create an a user (POST /:account_id/users)', function(done) {
        var postRequest = sinon.stub(request, 'post').yields(null, null, { id: 1 });

    	testAccount.createUser({ name: 'Test' }, function(err, client) {
            // Was the mock called.
            expect(postRequest.calledOnce).to.be.true;

            // Do we get an array of two items.
            expect(client.id).to.exist;
            expect(client.id).to.equal(1);

            // Does the prototype contains have its methods.
            expect(client.id).to.exist;
            expect(client.update).to.exist;
            expect(client.delete).to.exist;
            expect(client.get).to.exist;

            postRequest.restore();
    		done();
    	});
    });

    it('should create an account event (POST /:account_id/events)', function(done) {
        var postRequest = sinon.stub(request, 'post').yields(null, null, { id: 1 });

    	testAccount.createEvent({ name: 'Test' }, function(err, event) {
            // Was the mock called.
            expect(postRequest.calledOnce).to.be.true;

            // Do we get an array of two items.
            expect(event.id).to.exist;
            expect(event.id).to.equal(1);

            // Does the prototype contains have its methods.
            expect(event.id).to.exist;
            expect(event.update).to.exist;
            expect(event.delete).to.exist;
            expect(event.get).to.exist;

            postRequest.restore();
    		done();
    	});
    });

});
