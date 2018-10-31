var selection = require('./selection');
var { bubble, optimize_bubble } = require('./bubble');
var insert = require('./insert'); 
var mergeSort = require('./merge');

module.exports = {
    selection,
    insert,
    bubble,
    optimize_bubble,
    mergeSort
}