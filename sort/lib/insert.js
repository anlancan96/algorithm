function insert(arr) {
    let len = arr.length;

    for(let i = 1; i < len; i++) {
        let hole = i;
        let value = arr[i];
        while(hole > 0 && arr[hole - 1] > value) {
            arr[hole] = arr[hole - 1];
            hole = hole - 1;
        }
        arr[hole] = value;
    }
    return arr;
}

module.exports = insert;