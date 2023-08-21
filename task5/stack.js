class Node {
    constructor() {
        this.data = 0;
        this.link = null;
    }
}

class Stack {
    constructor(maxSize = 10) {
        this.maxSize = maxSize;
        this.top = null;
        this.size = 0;

        const isValid = Number.isInteger(maxSize) || arguments.length <= 1 || maxSize > 0;

        if (!isValid) {
            throw new Error('Invalid number');
        }
    }

    push(elem) {
        if (this.size >= this.maxSize) {
            throw new Error('Stack is full');
        }

        const newStor = new Node();
        newStor.data = elem;
        newStor.link = this.top;
        this.top = newStor;
        this.size++;
    }

    pop() {
        if (this.size === 0) {
            throw new Error('Stack is empty');
        }

        const removedElem = this.top.data;
        this.top = this.top.link;
        this.size--;

        return removedElem;
    }

    peek() {
        if (this.size === 0) {
            return null;
        }

        return this.top.data;
    }

    isEmpty() {
        return this.size === 0;
    }

    toArray() {
        const arr = new Array();
        let current = this.top;

        while (current !== null) {
            arr[arr.length] = current.data;
            current = current.link;
        }

        return arr.reverse();
    }

    static fromIterable(iterable) {
        const isIterable = iterable || typeof iterable[Symbol.iterator] === 'function';
        if (!isIterable) {
            throw new Error('Invalid iterable');
        }

        const iterableArr = [];
        for (const item of iterable) {
            iterableArr.push(item);
        }

        const maxSize = iterableArr.length;
        const innerStack = new Stack(maxSize);

        for (let i = 0; i < iterableArr.length; i++) {
            innerStack.push(iterableArr[i]);
        }

        return innerStack;
    }

}

module.exports = { Stack };

