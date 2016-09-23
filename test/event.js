var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var request = require('request');

var api = require('../index.js')('aToken');

describe('events', function() {

    var testAccount, testProject, testEvent;

    it('should get an account (GET /accounts/:account_id)', function(done) {
        var get = sinon.stub(request, 'get').yields(null, null, { id: 1 });

		api.accounts.get(1, function(err, account) {
            testAccount = account;
            expect(account.id).to.exist;

            get.restore();
			done();
		});
	});

    it('should get account projects (GET /:account_id/projects)', function(done) {
        var getProjects = sinon.stub(request, 'get').yields(null, null, [ { account_id: 1, id: 5 }, { account_id: 1, id: 6 } ]);

		testAccount.projects(function(err, projects) {
            expect(projects.length).to.equal(2);
            expect(projects[0].id).to.exist;
            expect(projects[0].account_id).to.equal(1);

            testProject = projects[0];
            getProjects.restore();
			done();
		});
	});

    it('project entity has methods', function(done) {
        expect(testProject.get).to.exist;
        expect(testProject.delete).to.exist;
        expect(testProject.put).to.exist;
        done();
    });

    it('should create an a account event (POST /:account_id/events)', function(done) {
        var postRequest = sinon.stub(request, 'post').yields(null, null, { account_id: 222, id: 1212 });

    	testAccount.createEvent({ name: 'Test' }, function(err, event) {
            // Was the mock called.
            expect(postRequest.calledOnce).to.be.true;

            // Do we get an array of two items.
            expect(event.id).to.exist;
            expect(event.id).to.equal(1212);

            // Does the prototype contains have its methods.
            expect(event.id).to.exist;
            expect(event.put).to.exist;
            expect(event.delete).to.exist;
            expect(event.get).to.exist;

            testEvent = event;

            postRequest.restore();
    		done();
    	});
    });

    it('should update a account event (PUT /:account_id/events/:event_id)', function(done) {
        var putRequest = sinon.stub(request, 'put').yields(null, null, { id: 1212, account_id: 222, time: 10 });

    	testEvent.put({ name: 'Test' }, function(err, event) {
            if (err) console.log('asdfasdfasdfasd', err);
            // Was the mock called.
            expect(putRequest.calledOnce).to.be.true;

            // Do we get an array of two items.
            expect(event.id).to.exist;
            expect(event.id).to.equal(1212);

            // Does the prototype contains have its methods.
            expect(event.id).to.exist;
            expect(event.put).to.exist;
            expect(event.delete).to.exist;
            expect(event.get).to.exist;

            putRequest.restore();
    		done();
    	});
    });

    it('should delete account event (DEL /:account_id/events/:event_id)', function(done) {
        var deleteRequest = sinon.stub(request, 'delete').yields(null, null, { status: true });

    	testEvent.delete(function(err, event) {
            if (err) console.log('asdfasdfasdfasd', err);
            // Was the mock called.
            expect(deleteRequest.calledOnce).to.be.true;


            deleteRequest.restore();
    		done();
    	});
    });

});
