function selection(arr) {
    let len = arr.length;
   
    for(let i = 0; i < (len - 2); i ++) {
        let min = i;
        for(let j = i + 1; j < (len); j++) {
            if(arr[min] > arr[j]) {
                min = j;
            }
        }
        let temp = arr[i];
        arr[i] = arr[min];
        arr[min] = temp;
    }
    return arr;
}

module.exports = selection;