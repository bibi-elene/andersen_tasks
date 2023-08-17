function concatStrings(arg, separator) {
    let result = arg;

    return function(...innerArgs) {
        const isValidArg = innerArgs.length > 0 && innerArgs[0] !== undefined && innerArgs[0] !== null && typeof innerArgs[0] === 'string';
        const concatStr = (separator !== undefined && separator !== null ? separator : '') + innerArgs[0];

        if (isValidArg) {
            result += concatStr;
            return concatStrings(result, separator);
        } else {
            return result;
        }
    };
};

class Calculator {
    constructor(x, y) {
        if (!this.isValidNumber(x) || !this.isValidNumber(y)){
            throw new Error('Invalid Number')
        }

        this.x = x;
        this.y = y;
    }

    isValidNumber(num) {
        return typeof num === 'number' && isFinite(num) && !isNaN(num);
    }

    setX = (num) => {
        if (!this.isValidNumber(num)) {
          throw new Error('Invalid Number');
        }
        return this.x = num;
      }
    
    setY = (num) => {
        if (!this.isValidNumber(num)) {
            throw new Error('Invalid Number');
        }
        return this.y = num;
    }

    logSum = () => this.x + this.y;

    logMul = () => this.x * this.y;

    logSub = () => this.x - this.y;

    logDiv = () => {
        if (this.y === 0) {
            throw new Error('Cannot divide by 0');
        }
    return this.x / this.y;
    }

};
