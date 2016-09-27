var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var request = require('request');

var api = require('../index.js')('aToken');

describe('projects', function() {

    var testAccount, testProject;

    it('should get an account (GET /accounts/:account_id)', function(done) {
        var get = sinon.stub(request, 'get').yields(null, null, { id: 1 });

		api.getAccount(1, function(err, account) {
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
        expect(testProject.update).to.exist;
        done();
    });

    it('should delete a project (DEL /:account_id/projects/:project_id)', function(done) {
        var deleteProject = sinon.stub(request, 'delete').yields(null, null, { status: 'Successfully deleted.' });

        testProject.delete(function(err, response) {
            expect(response.status).to.equal('Successfully deleted.');

            deleteProject.restore();
            done();
        });
    });

    it('should update a project (PUT /:account_id/projects/:project_id)', function(done) {
        var putProject = sinon.stub(request, 'put').yields(null, null, { name: 'New Name' });

        testProject.update({ name: 'New Name' }, function(err, project) {
            expect(project.name).to.equal('New Name');

            putProject.restore();
            done();
        });
    });

    it('should get a project (GET /:account_id/projects/:project_id)', function(done) {
        var getProject = sinon.stub(request, 'get').yields(null, null, { account_id: 1, id: 5 });

        testProject.get(function(err, project) {
            expect(project.account_id).to.equal(1);

            getProject.restore();
            done();
        });
    });

    it('should get a project events (GET /:account_id/projects/:project_id/events)', function(done) {
        var getEvents = sinon.stub(request, 'get').yields(null, null, [ { account_id: 1, id: 500 }, { account_id: 1, id: 501 }, { account_id: 1, id: 502 } ]);

        testProject.events(function(err, events) {
            expect(events.length).to.equal(3);

            getEvents.restore();
            done();
        });
    });

    it('should create an a project event (POST /:account_id/projects/:project_id/events)', function(done) {
        var postRequest = sinon.stub(request, 'post').yields(null, null, { id: 1 });

    	testProject.createEvent({ name: 'Test' }, function(err, event) {
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
