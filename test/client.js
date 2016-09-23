var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var request = require('request');

var api = require('../index.js')('aToken');

describe('clients', function() {

    var testAccount, testUser;

    it('should get an account (GET /accounts/:account_id)', function(done) {
        var get = sinon.stub(request, 'get').yields(null, null, { id: 1 });

		api.accounts.get(1, function(err, account) {
            testAccount = account;
            expect(account.id).to.exist;

            get.restore();
			done();
		});
	});

    it('should get account clients (POST /:account_id/clients)', function(done) {
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

    it('client entity has methods', function() {
        expect(testClient.get).to.exist;
        expect(testClient.delete).to.exist;
        expect(testClient.put).to.exist;
    });

    it('should delete a client (DEL :account_id/clients/:user_i)', function(done) {
        var deleteRequest = sinon.stub(request, 'delete').yields(null, null, { status: 'Successfully deleted.' });

        testClient.delete(function(err, response) {
            expect(response.status).to.equal('Successfully deleted.');

            deleteRequest.restore();
            done();
        });
    });

    it('should update a client (PUT :account_id/clients/:client_id)', function(done) {
        var putRequest = sinon.stub(request, 'delete').yields(null, null, { name: 'New Name' });

        testClient.delete(function(err, project) {
            expect(project.name).to.equal('New Name');

            putRequest.restore();
            done();
        });
    });

    it('should get a client (GET :account_id/clients/:client_id)', function(done) {
        var getRequest = sinon.stub(request, 'get').yields(null, null, { account_id: 1, id: 5 });

        testClient.get(function(err, client) {
            expect(client.account_id).to.equal(1);
            expect(client.id).to.equal(5);

            getRequest.restore();
            done();
        });
    });

});
