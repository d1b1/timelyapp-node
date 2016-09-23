var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var request = require('request');

var api = require('../index.js')('aToken');

describe('reports', function() {

    var testAccount, testUser;

    it('should get an account (GET /accounts/:account_id)', function(done) {
        var getAccount = sinon.stub(request, 'get').yields(null, null, { id: 1 });

		api.accounts.get(1, function(err, account) {
            testAccount = account;
            expect(account.id).to.exist;

            getAccount.restore();
			done();
		});
	});

    it('should create an a user event (POST /:account_id/reports)', function(done) {
        var postRequest = sinon.stub(request, 'post').yields(null, null, [ { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 } ]);

    	testAccount.createReport({ name: 'Test' }, function(err, report) {
            // Was the mock called.
            expect(postRequest.calledOnce).to.be.true;

            // Do we get an array of two items.
            expect(report.length).to.equal(4);

            postRequest.restore();
    		done();
    	});
    });

});
