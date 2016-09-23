var assert = require('assert');
var expect = require('chai').expect;
var sinon = require('sinon');
var PassThrough = require('stream').PassThrough;
var request = require('request');

var api = require('../index.js')('aToken');

describe('api', function() {

    var requestGet;

    before(function(done){
        requestGet = sinon
          .stub(request, 'get')
          .yields(null, null, [ { id: 1 }, { id: 2 } ] );

        requestPost = sinon
            .stub(request, 'post')
            .yields(null, null, { id: 3, name: 'Test' } );

        requestPut = sinon
            .stub(request, 'put')
            .yields(null, null, { id: 3, name: 'Test 22' } );

        done();
    });

	// We will place our tests cases here

    it('api.accounts has methods', function(done) {
        expect(api.accounts.list).to.exist;
        expect(api.accounts.post).to.exist;
        expect(api.accounts.get).to.exist;
        done();
    });

    it('api.accounts returns accounts', function(done) {

    	api.accounts.list({}, function(err, result) {
            // Was the mock called.
            expect(requestGet.calledOnce).to.be.true;

            // Do we get an array of two items.
            expect(result.length).to.equal(2);

            // Does the prototype contains have its methods.
            expect(result[0].id).to.exist;
            expect(result[0].projects).to.exist;
            expect(result[0].reports).to.exist;
            expect(result[0].events).to.exist;
            expect(result[0].clients).to.exist;
            expect(result[0].get).to.exist;
    		done();
    	});

    });

    it('api.accounts post', function(done) {

    	api.accounts.post({ name: 'Test' }, function(err, account) {
            // Was the mock called.
            expect(requestPost.calledOnce).to.be.true;

            expect(1).to.equal(1);
            // Do we get an array of two items.
            expect(account.id).to.exist;
            expect(account.id).to.equal(3);

            // Does the prototype contains have its methods.
            expect(account.id).to.exist;
            expect(account.projects).to.exist;
            expect(account.reports).to.exist;
            expect(account.events).to.exist;
            expect(account.clients).to.exist;
            expect(account.get).to.exist;
    		done();
    	});

    });

});
