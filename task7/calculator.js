'use strict';

const MAX_NUM_LENGTH = 12;

const buttons = document.querySelectorAll('.btn');
const output = document.querySelector('.output');
const operationDisplay = document.querySelector('.operation-display');

let prevValue = '';
let nextValue = '';
let currentOperation = null;
let count = 0;
let operationSequence = '';

buttons.forEach(x => x.addEventListener("click", eventHandler));

function eventHandler() {
    const currentContent = output.innerHTML;
    const updatedContent = parseFloat(output.innerHTML) === 0 ? this.innerHTML : currentContent + this.innerHTML;

    switch(this.value) {
        case '+':
        case '-':
        case '*':
        case '/':
            if (currentOperation === null) {
                currentOperation = this.value;
                prevValue = currentContent;
                count++;
                output.innerHTML = prevValue + this.innerHTML;
                operationSequence = prevValue + this.innerHTML;
            } else {
                nextValue = currentContent;
                const result = operate(parseFloat(prevValue), parseFloat(nextValue), currentOperation);
                prevValue = result.toString();
                nextValue = '';
                count++;
                output.innerHTML = result + this.innerHTML;
                operationSequence = prevValue + this.innerHTML;
            }
            break;

        case '%':
            if (currentOperation === null) {
                prevValue = parseFloat(currentContent) / 100;
                output.innerHTML = prevValue;
            }
            break;

        case 'AC':
        case 'C':
            prevValue = '';
            nextValue = '';
            currentOperation = null;
            count = 0;
            output.innerHTML = 0;
            operationDisplay.innerHTML = '';
            operationSequence = '';
            break;

        case '=':
            if (currentOperation !== null) {
                nextValue = currentContent;
                const result = operate(parseFloat(prevValue), parseFloat(nextValue), currentOperation);
                prevValue = result.toString();
                nextValue = '';
                currentOperation = null;
                output.innerHTML = result;
                operationDisplay.innerHTML = '';
                operationSequence = '';
            }
            break;

        case 'num':
            if (currentOperation === null) {
                prevValue += this.innerHTML;
                output.innerHTML = prevValue;
                operationSequence += this.innerHTML;
            } else {
                nextValue += this.innerHTML;
                output.innerHTML = nextValue;
                operationSequence += this.innerHTML;
            }
            break;

        default:
            if (output.innerHTML.length > 24) {
                break;
            }

            output.innerHTML = updatedContent;
            adjustFontSize();
    }

    operationDisplay.innerHTML = operationSequence;
}

function operate(a, b, operator) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return a / b;
        default:
            return NaN;
    }
}

function adjustFontSize() {
    const contentLength = output.textContent.length;

    if (contentLength > 6) {
        output.style.fontSize = '30px';
    } else {
        output.style.fontSize = '10vw';
    }
}
