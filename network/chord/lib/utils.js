function in_range(key, low, high) {
    //return (low < high && key > low && key < high) ||
    //    (low > high && (key > low || key < high)) ||
    //    (low === high && key !== low);
    return (less_than(low, high) && less_than(low, key) && less_than(key, high)) ||
        (less_than(high, low) && (less_than(low, key) || less_than(key, high))) ||
        (equal_to(low, high) && !equal_to(key, low));
}

// Is key in (low, high]
function in_half_open_range(key, low, high) {
    //return (low < high && key > low && key <= high) ||
    //    (low > high && (key > low || key <= high)) ||
    //    (low == high);
    return (less_than(low, high) && less_than(low, key) && less_than_or_equal(key, high)) ||
        (less_than(high, low) && (less_than(low, key) || less_than_or_equal(key, high))) ||
        (equal_to(low, high));
}

function less_than_or_equal(low, high) {
    if (low.length !== high.length) {
        // Arbitrary comparison
        return low.length <= high.length;
    }

    for (var i = 0; i < low.length; ++i) {
        if (low[i] < high[i]) {
            return true;
        } else if (low[i] > high[i]) {
            return false;
        }
    }

    return true;
}
// Key comparison
function less_than(low, high) {
    if (low.length !== high.length) {
        // Arbitrary comparison
        return low.length < high.length;
    }

    for (var i = 0; i < low.length; ++i) {
        if (low[i] < high[i]) {
            return true;
        } else if (low[i] > high[i]) {
            return false;
        }
    }

    return false;
}

function equal_to(a, b) {
    if (a.length !== b.length) {
        return false;
    }

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) {
            return false;
        }
    }

    return true;
}
//process.env.NODE_ENV === 'PRODUCTION' ? false :
var ChordUtils = {
    DebugNodeJoin: true,
    DebugNodePredecessor: true,
    DebugSuccessor: true,
    DebugStabilise: true,
    in_range: in_range,
    in_half_open_range: in_half_open_range,
}


module.exports = ChordUtils;