Array.prototype.myFilter = function myFilter(callback, context) {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
    }

    const filtered = [];

     for (var i = 0; i < this.length; i++) {
        if (callback.call(context, this[i], i, this)) {
            filtered.push(this[i]);
        } 
     }
     return filtered;
 }

const arr = [1, 2, 3, 4, 5, 6];


console.log(arr.myFilter((x, index) => {return index % 2 === 0}))