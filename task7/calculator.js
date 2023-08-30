'use strict';

const MAX_NUM_LENGTH = 12;

const buttons = document.querySelectorAll('.btn');
const output = document.querySelector('.output');
const operationDisplay = document.querySelector('.operation-display');
const memoryHolder = document.querySelector('.memory');

let prevValue = '';
let nextValue = '';
let currentOperation = null;
let operationSequence = '';
let memory = 0;

buttons.forEach(x => x.addEventListener("click", eventHandler));

// Copy the value 
document.getElementById("copyBtn").addEventListener("click", function () {
    const outputText = output.innerHTML;
    const tempTextarea = document.createElement("textarea");
    tempTextarea.value = outputText;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextarea);
});

function eventHandler() {
    const currentContent = output.innerHTML;
    const updatedContent = parseFloat(output.innerHTML) === 0 ? this.innerHTML : currentContent + this.innerHTML;
    const isNumberInput = this.value === 'num' && !isOperator(currentContent.charAt(currentContent.length - 1));
    const decimalPartLength = currentContent.split('.')[1]?.length || 0;
    const totalLength = currentContent.replace('.', '').length;

    if (isNumberInput && currentContent.includes('.') && decimalPartLength >= 8) {
        return;
    }

    if (isNumberInput && !currentContent.includes('.') && totalLength >= 12) {
        return;
    }

    switch(this.value) {
        case '+':
        case '-':
        case '*':
        case '/':
            if (currentOperation === null) {
                currentOperation = this.value;
                prevValue = currentContent;
                output.innerHTML = prevValue + this.innerHTML;
                operationSequence = prevValue + this.innerHTML;
            } 
            
            else if (nextValue !== '') {
                const result = operate(parseFloat(prevValue), parseFloat(nextValue), currentOperation);
                prevValue = result.toString();
                nextValue = '';
                currentOperation = this.value;
                output.innerHTML = prevValue + this.innerHTML;
                operationDisplay.innerHTML = prevValue + this.innerHTML;
                operationSequence = prevValue + this.innerHTML;
            } 
            
            else {
                currentOperation = this.value;
                output.innerHTML = prevValue + this.innerHTML;
                operationDisplay.innerHTML = prevValue + this.innerHTML;
                operationSequence = prevValue + this.innerHTML;
            }
            
            break;  
        
        case '%':
            const isValid = currentOperation !== '=' && currentOperation !== null && !isOperator(operationSequence.charAt(operationSequence.length - 1));

            if (isValid) {
                    output.innerHTML = parseFloat(prevValue * nextValue / 100);
                    nextValue = parseFloat(prevValue * nextValue / 100);
                    operationSequence = prevValue + currentOperation + nextValue;  
            } 

            break;
            
        case '+/-':
            output.innerHTML = parseFloat(currentContent) * -1;

            if (currentOperation === null) {
                prevValue = parseFloat(output.innerHTML);
                operationSequence = prevValue.toString();
            } 
            
            else {
                nextValue = parseFloat(output.innerHTML);
                operationSequence = prevValue + currentOperation + nextValue;
            }

            break;

        case '√':
            output.innerHTML = roundDown(Math.sqrt(parseFloat(currentContent)));
            prevValue = roundDown(parseFloat(output.innerHTML));
            operationSequence = (this.innerHTML + prevValue).toString();

            break;

            case '→':
                if (output.innerHTML.length > 1) {
                    output.innerHTML = currentContent.slice(0, -1);
                    operationSequence = operationSequence.slice(0, -1);
                    if (nextValue.length > 0) {
                        nextValue = nextValue.slice(0, -1);
                    } else if (prevValue.length > 0) {
                        prevValue = prevValue.slice(0, -1);
                    }
                } else if (output.innerHTML.length < 2 && operationSequence.length < 2) {
                    prevValue = '';
                    nextValue = '';
                    currentOperation = null;
                    output.innerHTML = '0';
                    operationDisplay.innerHTML = '';
                    operationSequence = '';
                    adjustFontSize();
                } else {
                    if (nextValue.length > 0) {
                        nextValue = nextValue.slice(0, -1);
                        operationSequence = operationSequence.slice(0, -1);
                    } else if (currentOperation && nextValue === '') {
                        currentOperation = null;
                        operationSequence = operationSequence.slice(0, -1);
                        prevValue = operationSequence;
                    } else if (currentOperation) {
                        currentOperation = null;
                        operationSequence = operationSequence.slice(0, -1);
                    } else if (prevValue.length > 0) {
                        prevValue = prevValue.slice(0, -1);
                        operationSequence = operationSequence.slice(0, -1);
                    }
            
                    adjustFontSize();
                    output.innerHTML = operationSequence;
                }
                break;
            
            
        case 'num':
            if (currentOperation === null || currentOperation === "=") {
                if (prevValue === '' || prevValue === '0') {
                    if (this.innerHTML === '.') {
                        prevValue = '0.';
                    } else {
                        prevValue = this.innerHTML;
                    }
                } else if (currentOperation === "=") { 
                    prevValue = this.innerHTML;  
                    currentOperation = null;
                } else if (this.innerHTML === '.' && prevValue.includes('.')) {
                    break;
                } else {
                    prevValue += this.innerHTML;
                }
                output.innerHTML = prevValue;
                adjustFontSize();
                operationSequence += this.innerHTML;
            } else {
                if (this.innerHTML === '.' && nextValue.includes('.')) {
                    break;
                } else {
                    nextValue += this.innerHTML;
                }
                output.innerHTML = nextValue;
                adjustFontSize();
                operationSequence += this.innerHTML;
            }
            break;
 
        case 'M+':
            memory += parseFloat(currentContent);
            memoryHolder.innerHTML = 'M1: ' + memory; 
            break;

        case 'M-':
            memory -= parseFloat(currentContent);
            memoryHolder.innerHTML = 'M1: ' + memory; 
            break;

        case 'MR':
            output.innerHTML = memory;
            operationSequence = memory;
            prevValue = '';
            nextValue = '';
            currentOperation = null;
            break;

        case 'MC':
            memory = 0;
            memoryHolder.innerHTML = 'M1'; 
            break;

        case 'MU':
            if (currentOperation === null) {
                prevValue = parseFloat(currentContent);
                output.innerHTML = prevValue;
            }
            break;

        case '=':
            if (currentOperation !== null && currentOperation !== '=') {
                nextValue = currentContent;
                const result = operate(parseFloat(prevValue), parseFloat(nextValue), currentOperation);
                prevValue = result.toString();
                nextValue = '';
                currentOperation = this.innerHTML;
                output.innerHTML = result;
                operationDisplay.innerHTML = '';
                operationSequence = '';
            }
            break;

        case 'C':
            prevValue = '';
            nextValue = '';
            currentOperation = null;
            output.innerHTML = 0;
            operationDisplay.innerHTML = '';
            operationSequence = '';
            adjustFontSize();
            break;
    
        case 'AC':
            prevValue = '';
            nextValue = '';
            currentOperation = null;
            output.innerHTML = 0;
            operationDisplay.innerHTML = '';
            operationSequence = '';
            memory = 0;
            adjustFontSize();
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

function roundDown(num){
    return num.toFixed(8).replace(/\.?0+$/, '');
}

function operate(a, b, operator) {
    let result;
    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '*':
            result = a * b;
            break;
        case '/':
            if (b === 0) {
                return 0;
            }
            result = a / b;
            break;
        default:
            return NaN; 
    }
    return parseFloat(result.toFixed(8));
}


function adjustFontSize() {
    const contentLength = output.textContent.length;

    if (contentLength > 6) {
        output.style.fontSize = '30px';
    } else {
        output.style.fontSize = '10vw';
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/', '%'].includes(char);
}