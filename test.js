var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var arr = [2, 7, 4, 1, 5, 3];
var result = [1, 2, 3, 4, 5, 7];
var { bubble, optimize_bubble } = require('./sort/bubble');

describe('array', function() {
    describe('sort', function() {
        it('bubble normal', function() {
            expect(result).to.eql(bubble(arr));
        });

        it('bubble optimize', function() {
            expect(result).to.eql(optimize_bubble(arr));
        });
    });
});
