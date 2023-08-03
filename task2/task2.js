// 1.

function makeObjectDeepCopy(obj){
    
    const copy = Array.isArray(obj) ? [] : {};

        if (typeof obj !== "object" || obj === null) {
            return obj;
        } 

        Object.keys(obj).forEach((key) => {
            copy[key] = makeObjectDeepCopy(obj[key])
        })

    return copy;
}

const obj1 = {name: "elene", surname: "bibilashvili", age: "23"}

makeObjectDeepCopy(obj1)

// 2.

function selectFromInterval(arr = [], from, to) {
    if (!Array.isArray(arr) || !arr.every((value) => typeof value === 'number')) {
        throw new Error('Invalid input array. Array must contain only numbers.');
      }
    
    if (typeof from !== 'number' || typeof to !== 'number' || isNaN(from) || isNaN(to)) {
        throw new Error('Invalid interval values. Both values must be valid numbers.');
    }

    const sortedArr = [from, to].sort((a, b) => a - b);
    const res = arr.filter((value) => value >= sortedArr[0] && value <= sortedArr[1]);
    
    return res;

}

selectFromInterval([1,2,3], -13, -5);

// 3.

const myIterable = { 
    from: 1, 
    to: 10,
    [Symbol.iterator] () {
        if (typeof this.from !== 'number' || typeof this.to !== 'number' || isNaN(this.from) || isNaN(this.to)) {
            throw new Error('Invalid from/to values. Both must be valid numbers.');
          }
      
        if (this.to < this.from) {
        throw new Error('Invalid range. "to" value must be greater than "from" value.');
        }

        let res = this.from;
        return {
            next: () => {
                if (res <= this.to) {
                    return {value: res++, done: false}
                } else {
                    return {done: true}
                }
            }
        }
    }};

    
    for (let item of myIterable) {
        console.log(item); 
    }