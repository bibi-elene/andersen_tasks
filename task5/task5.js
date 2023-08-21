
class Stack {
    constructor(maxSize = 3) {
        this.maxSize = maxSize;
        this.lastNum = -1;
        this.data = Object.create(null);

        if (typeof maxSize !== 'number'){
            throw new Error('must be a num')
        }
    }

    push = (el) => {
        if (this.data.length > 10) {
            throw new Error('stack is full')
        } 
        this.lastNum++;
        this.data[this.lastNum] = el;
    };

    pop = () => { 
        if (this.lastNum === -1) {
            throw new Error('stack is empty')
        }

        const removedEl = this.data[this.lastNum];
        delete this.data[this.lastNum];
        this.lastNum--;
        return removedEl;
    }

    peek = () => {
        if (this.lastNum === -1) {
            return null;
        }

        return this.data[this.lastNum]
    }

    isEmpty = () => {
        return this.lastNum === -1;
    }

    toArray = () => {
        const arr = new Array();

        for (let i = 0; i <= this.lastNum; i++) {
            arr[i] = this.data[i]
        }

        return arr;
    }

}

const stackArr = new Stack(5);

stackArr.push(5)
stackArr.push(2)
stackArr.push(3)
stackArr.push(10)


console.log(stackArr.toArray())

module.exports = { Stack };
