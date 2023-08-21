Array.prototype.myFilter = function myFilter(callback, context) {
    if (typeof callback !== 'function') {
        throw new Error('Callback must be a function');
    }

    const filtered = [];
    let callbackResult = callback.call(context, this[i], i, this)

    for (let i = 0; i < this.length; i++) {
        if (callbackResult) {
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

