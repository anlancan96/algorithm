function merge(arr, l, m, r) {
        let i, j, k; 
        let n1 = m - l + 1; 
        let n2 = r - m; 
    
        /* create temp arrays */
        let L = [];
        let R = []; 
    
        /* Copy data to temp arrays L[] and R[] */
        for (i = 0; i < n1; i++) 
            L[i] = arr[l + i]; 
        for (j = 0; j < n2; j++) 
            R[j] = arr[m + 1+ j]; 
    
        /* Merge the temp arrays back into arr[l..r]*/
        i = 0; // Initial index of first subarray 
        j = 0; // Initial index of second subarray 
        k = l; // Initial index of merged subarray 
        while (i < n1 && j < n2) 
        { 
            if (L[i] <= R[j]) 
            { 
                arr[k++] = L[i++]; 
            } 
            else
            { 
                arr[k++] = R[j++]; 
            } 
        } 
    
        /* Copy the remaining elements of L[], if there 
        are any */
        while (i < n1) 
        { 
            arr[k++] = L[i++]; 
        } 
    
        /* Copy the remaining elements of R[], if there 
        are any */
        while (j < n2) 
        { 
            arr[k++] = R[j++];  
        } 
}

function mergeSort(arr, l, r) {
    if (l < r) { 
        let m = Math.floor(l+(r-l)/2); 

        // Sort first and second halves 
        mergeSort(arr, l, m); 
        mergeSort(arr, m+1, r); 

        merge(arr, l, m, r); 
    } 
}

function mergeParent(arr) {
    mergeSort(arr, 0, arr.length - 1);
    return arr;
}

module.exports = mergeParent;
