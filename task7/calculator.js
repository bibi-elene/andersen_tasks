'use strict';

const MAX_NUM_LENGTH = 12;


const buttons = document.querySelectorAll('.btn');
const output = document.querySelector('.output');

let prevValue = 0;
let nextValue = 0;
let currentOperation = null; 

buttons.forEach(x => x.addEventListener("click", eventHandler))
function eventHandler() {
    
    const currentContent = output.innerHTML;
    const updatedContent = parseFloat(output.innerHTML) === 0 ? this.innerHTML : currentContent + this.innerHTML;
    
    switch(this.value){        
        case '+': 
        if (currentOperation === null) {
            prevValue = currentContent;
            currentOperation = this.value;
            return output.innerHTML = updatedContent;
        }
        break;
        
        case '-': console.log(10-2)

        case 'AC': 
        prevValue = 0;
        nextValue = 0;
        currentOperation = null;
        return output.innerHTML = 0;

        case 'C': 
        return output.innerHTML = 0;

        case '=': 
        if (currentOperation === '+'){
        const result = parseFloat(prevValue) + parseFloat(nextValue);
        prevValue = output.innerHTML;
        nextValue = 0;
        currentOperation = null;
        return output.innerHTML = result;
        }
        break;

        default: 
        if (output.innerHTML.length > 24) {
            break;
        }
        if (currentOperation !== null) {
            nextValue += this.innerHTML
        }
        output.innerHTML = updatedContent;
        adjustFontSize();
    }
}

function adjustFontSize() {
    const contentLength = output.textContent.length;

        if (contentLength > 6) {
        output.style.fontSize = '30px'; 
        } 
        else {
            output.style.fontSize = '10vw';
        }
}