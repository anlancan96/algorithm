
function bubble(arr) {
    let len = arr.length;
   
    for(let i = len; i >= 1; --i) {
        for(let j = 0; j <= i -1; j++) {
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }

    return arr;
}


function optimize_bubble(arr) {
    let i = arr.length;
    while (i >= 1) {
        let has_swapped = 0;
        for(let j = 0; j <= (i - 1); j++) {
            if(arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                has_swapped = 1;
            }
        }

        if(has_swapped == 0) {
            break;
        } else {
            i = i - 1;
        }
    }
    return arr;
}

module.exports = {
    bubble,
    optimize_bubble
};