function concatStrings(arg, separator) {
    let result = arg;

    return function(...innerArgs) {
        const isValidArg = innerArgs.length > 0 && innerArgs[0] !== undefined && innerArgs[0] !== null && typeof innerArgs[0] === 'string';

        if (isValidArg) {
            result += (separator !== undefined ? separator : '') + innerArgs[0];
            return concatStrings(result, separator);
        } else {
            return result;
        }
    };
}


console.log(concatStrings('first')('second')('third')());
console.log(concatStrings('first', null)('second')());
console.log(concatStrings('first', '123')('second')('third')());
console.log(concatStrings('some-value')('333')(123n));
console.log(concatStrings('some-value')(2));
console.log(concatStrings('some-value')('')('')(null));
