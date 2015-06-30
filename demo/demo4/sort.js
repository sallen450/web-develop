/**
 * Created by jiqinghua on 15/5/11.
 */

var cusSort = {};

cusSort.isNeedSort = function (array) {
    if (Array.isArray(array) && array.length >= 2) {
        return true;
    }
    else {
        return false;
    }
};

cusSort.bubbleSort = function (array) {
    if (!this.isNeedSort(array)) {
        return array;
    }

    for (var i = array.length - 1; i > 0; i--) {
        for (var j = 0; j <= i; j++) {
            if (array[j] > array[j + 1]) {
                array.splice(j + 1, 0, array.splice(j, 1)[0]);
            }
        }
    }

    return array;
};

cusSort.quickSort = function (array) {
    if (!this.isNeedSort(array)) {
        return array;
    }

    function quickPartition(array, low, high) {

        //如果取第一个数组为基准，那么循环首先要从high索引元素开始比较；
        var base = array[low];

        while (low < high) {

            while (array[high] > base && low < high) {
                high--;
            }
            array[low] = array[high];


            while (array[low] <= base && low < high) {          // 这里要加上 =（相等）的情况，否则出现死循环
                low++;
            }
            array[high] = array[low];
        }

        array[low] = base;
        return low;
    }

    function sort(array, low, high) {
        var middle = 0;
        low = (low !== undefined) ? low : 0;
        high = (high !== undefined) ? high : array.length - 1;

        if (low < high) {
            middle = quickPartition(array, low, high);
            sort(array, low, middle - 1);
            sort(array, middle + 1, high);
        }
    }

    sort(array);

    return array;
};

cusSort.mergeSort = function (array) {
    if (!this.isNeedSort(array)) {
        return array;
    }

    function merge(array, low, high, mid) {
        var i = low,
            j = mid + 1,
            si = 0,
            sortedArray = [];

        while (i <= mid && j <= high) {
            if (array[i] <= array[j]) {
                sortedArray[si++] = array[i++];
            }
            else {
                sortedArray[si++] = array[j++];
            }
        }

        while (i <= mid) {
            sortedArray[si++] = array[i++];
        }

        while (j <= high) {
            sortedArray[si++] = array[j++];
        }

        sortedArray.forEach(function (element, index) {
            array[index + low] = element;
        });
    }

    function sort(array, low, high) {
        low = (low !== undefined) ? low : 0;
        high = (high !== undefined) ? high : array.length - 1;
        var mid = Math.floor((low + high) / 2);     //javascript只有数值概念，会出现int/int=float，所以这里要加上Math.floor
        if (low < high) {
            sort(array, low, mid);
            sort(array, mid + 1, high);
            merge(array, low, high, mid);
        }
    }

    sort(array);
    return array;
};


cusSort.insertSort = function (array) {
    if (!this.isNeedSort(array)) {
        return array;
    }

    var length = array.length;
    for (var i = 1; i < length; i++) {
        for (var j = 0; j < i; j++) {
            if (array[i] < array[j]) {
                array.splice(j, 0, array.splice(i, 1)[0]);
                break;
            }
        }
    }

    return array;
};


var testArray = [2, 5, 9, 3, 1, 8, 7, 6, 4, 10, 2, 12, 44, 12, 56, 100, 13, 22, 73];
console.log(cusSort.bubbleSort(2));

testArray = [2, 5, 9, 3, 1, 8, 7, 6, 4, 10, 2, 12, 44, 12, 56, 100, 13, 22, 73];
console.log(cusSort.quickSort("test"));

testArray = [2, 5, 9, 3, 1, 8, 7, 6, 4, 10, 2, 12, 44, 12, 56, 100, 13, 22, 73];
console.log(cusSort.mergeSort(testArray));

testArray = [2, 5, 9, 3, 1, 8, 7, 6, 4, 10, 2, 12, 44, 12, 56, 100, 13, 22, 73];
console.log(cusSort.insertSort(testArray));


