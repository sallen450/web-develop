/**
 * Created by jiqinghua on 15/6/16.
 */

function clone(e) {
    if (e instanceof Object && typeof e !== 'function') {
        e = deepClone(e)
    }

    return e;
}
function deepClone(obj) {
    var o = obj instanceof Array ? [] : {};
    for (var k in obj)
        o[k] = (typeof obj[k] === 'object') ? deepClone(obj[k]) : obj[k];
    return o;
}

// number
var a = 1;
var b = clone(a);
console.log(b);
console.log(a === b);

// string
var a = "aaa";
var b = clone(a);
console.log(b);
console.log(a === b);

// undefined
var a = undefined;
var b = clone(a);
console.log(b);
console.log(a === b);

// null
var a = null;
var b = clone(a);
console.log(b);
console.log(a === b);

// NaN
var a = NaN;
var b = clone(a);
console.log(b);
console.log(isNaN(b));

// boolean
var a = true;
var b = clone(a);
console.log(b);
console.log(a === b);

// array
var a = [1,2,3,4,5];
var b = clone(a);
a.push(6);
console.log(a);
console.log(b);


// object
var a = {"a": "aa", "b": "bb"};
var b = clone(a);
a.cc = "cc";
console.log(a);
console.log(b);

// mix array
var a = [1,2,3,4,[1,2,3,4,5]];
var b = clone(a);
a.push(6);
console.log(a);
console.log(b);

// mix object
var a = {"a": "aa", "b": "bb", "dd": {"a": "aa", "b": "bb"}};
var b = clone(a);
a.cc = "cc";
console.log(a);
console.log(b);

// function
var a = function () {
    console.log("aaa");
};

var b = clone(a);
b();
