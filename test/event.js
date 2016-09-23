var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var request = require('request');

var api = require('../index.js')('aToken');

describe('events', function() {

    var testAccount, testProject;

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

    it('should create an a project event (POST /:account_id/events)', function(done) {
        var postRequest = sinon.stub(request, 'post').yields(null, null, { id: 1 });

    	testAccount.createEvent({ name: 'Test' }, function(err, event) {
            // Was the mock called.
            expect(postRequest.calledOnce).to.be.true;

            // Do we get an array of two items.
            expect(event.id).to.exist;
            expect(event.id).to.equal(1);

            // Does the prototype contains have its methods.
            expect(event.id).to.exist;
            expect(event.put).to.exist;
            expect(event.delete).to.exist;
            expect(event.get).to.exist;

            postRequest.restore();
    		done();
    	});
    });


});