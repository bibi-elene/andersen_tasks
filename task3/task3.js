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

const arr = [1, 2, 3, 4, 5, 6];


arr.myFilter((x, index) => {
    return index % 2 === 0;
});

function createDebounceFunction(callback, delay) {
    let timeoutId;

    return function() {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback.apply(this, arguments);
        }, delay);
    };
}


const log100 = () => console.log(100);
const debounceLog100 = createDebounceFunction(log100, 600);
debounceLog100();
setTimeout(debounceLog100, 200);
setTimeout(debounceLog100, 400);