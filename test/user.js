var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var request = require('request');

var api = require('../index.js')('aToken');

describe('users', function() {

    var testAccount, testUser;

    it('should get an account (GET /accounts/:account_id)', function(done) {
        var getAccount = sinon.stub(request, 'get').yields(null, null, { id: 1 });

		api.getAccount(1, function(err, account) {
            testAccount = account;
            expect(account.id).to.exist;

            getAccount.restore();
			done();
		});
	});

    it('should get account projects (GET /:account_id/project)', function(done) {
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

    it('user entity has methods', function() {
        expect(testUser.events).to.exist;
        expect(testUser.get).to.exist;
        expect(testUser.delete).to.exist;
        expect(testUser.update).to.exist;
    });

    it('should delete account user (DEL /:account_id/users/:user_id)', function(done) {
        var deleteUser = sinon.stub(request, 'delete').yields(null, null, { status: 'Successfully deleted.' });

        testUser.delete(function(err, response) {
            expect(response.status).to.equal('Successfully deleted.');

            deleteUser.restore();
            done();
        });
    });

    it('should update account user (PUT /:account_id/users/:user_id)', function(done) {
        var putRequest = sinon.stub(request, 'put').yields(null, null, { name: 'New Name' });

        testUser.update({ name: 'Test Name' }, function(err, user) {
            expect(user.name).to.equal('New Name');

            putRequest.restore();
            done();
        });
    });

    it('should get a user (GET /:account_id/users/:user_id)', function(done) {
        var getProject = sinon.stub(request, 'get').yields(null, null, { account_id: 1, id: 5 });

        testUser.get(function(err, user) {
            expect(user.account_id).to.equal(1);
            expect(user.id).to.equal(5);

            getProject.restore();
            done();
        });
    });

    it('should get a user events (GET /:account_id/users/:user_id/events)', function(done) {
        var getEvents = sinon.stub(request, 'get').yields(null, null, [ { account_id: 1, id: 500 }, { account_id: 1, id: 501 }, { account_id: 1, id: 502 } ]);

        testUser.events(function(err, events) {
            expect(events.length).to.equal(3);

            getEvents.restore();
            done();
        });
    });

    it('should create an a user event (POST /:account_id/users/:user_id/events)', function(done) {
        var postRequest = sinon.stub(request, 'post').yields(null, null, { id: 1 });

    	testUser.createEvent({ name: 'Test' }, function(err, event) {
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
