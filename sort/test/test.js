var assert = require('assert');
var chai = require('chai');
var expect = chai.expect;
var arr = [2, 7, 4, 1, 5, 3];
var result = [1, 2, 3, 4, 5, 7];
var _ = require('..');

describe('array', function() {
    describe('sort', function() {
        it('bubble normal', function() {
            expect(result).to.eql(_.bubble(arr));
        });

        it('bubble optimize', function() {
            expect(result).to.eql(_.optimize_bubble(arr));
        });

        it('selection sort', function() {
            expect(result).to.eql(_.selection(arr));
        });

        it('insert sort', function() {
            expect(result).to.eql(_.insert(arr));
        });

        it('merge sort', function() {
            expect(result).to.eql(_.mergeSort(arr));
        });
    });
});
