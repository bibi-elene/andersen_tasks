Array.prototype.myFilter = function myFilter(callback, context) {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
    }

    const filtered = [];

    for (let i = 0; i < this.length; i++) {
        if (callback.call(context, this[i], i, this)) {
            filtered.push(this[i]);
        } 
    }

     return filtered;
 };

function createDebounceFunction(callback, delay) {
    let timeoutId;

    return function() {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback.apply(this, arguments);
        }, delay);
    }
};
