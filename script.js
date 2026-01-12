// logic variable
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let needResetScreen = false;
let needResetOperation = false;

// button selector
const allNumberButtons =  document.querySelectorAll('.operand');
const allOperatorButtons = document.querySelectorAll('.operator');
const equalButton = document.getElementById('equalButton');
const clearButton = document.getElementById('clearButton');
const backspaceButton = document.getElementById('backspaceButton');
const decimalButton = document.getElementById('decimalButton');

// display selector
const lastDisplay = document.getElementById('lastDisplay');
const currentDisplay = document.getElementById('currentDisplay');

const isDisplayEmpty = function(display){
    return display.textContent==='';
}

allNumberButtons.forEach((button)=>{
    button.addEventListener('click', () => appendNumberToDisplay(button.textContent))
});
const appendNumberToDisplay= function(number){
    clearOperationIfNeeded();
    clearScreenIfNeeded();
    console.log(number);
    currentDisplay.textContent += number;
}

decimalButton.addEventListener('click', () => appendDecimal());
const appendDecimal = function(){
    clearScreenIfNeeded();
    //if currentDisplay is empty add 0 first, 0.1 0.2 instead of .1.2
    if(currentDisplay.textContent==='')
        currentDisplay.textContent+=0;
    //current approach is does not add . if already has one in currentdisplay. will update to unclickable later
    if(!currentDisplay.textContent.includes('.'))
        currentDisplay.textContent+='.';
}

backspaceButton.addEventListener('click', ()=>backspaceHandler())
const backspaceHandler = function(){
    if(!isDisplayEmpty(currentDisplay))
        currentDisplay.textContent = currentDisplay.textContent.slice(0,-1);
}

clearButton.addEventListener('click', ()=> handleClear());
const handleClear = function(){
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    lastDisplay.textContent = '';
    currentDisplay.textContent = '';
}

const clearScreenIfNeeded = function(){
    if(needResetScreen)
        currentDisplay.textContent = '';
    needResetScreen = false;
}

const clearOperationIfNeeded = function(){
    if(needResetOperation)
        handleClear();
    needResetOperation = false;
}

equalButton.addEventListener('click', ()=>evaluate())
allOperatorButtons.forEach((button)=>{
    button.addEventListener('click', ()=>handleOperator(button.textContent))
})
const handleOperator = function(operator){
    if(currentOperator !== null)
        evaluate() 

    firstOperand = currentDisplay.textContent;
    currentOperator = operator;

    //move firstOperand(currently at currentDisplay) & operator to lastDisplay
    lastDisplay.textContent = `${firstOperand} ${currentOperator}`

    //toggle screen reset
    needResetScreen = true;

    //toggle reset operation
    needResetOperation = false;
}
const evaluate = function(){
    //skip evaluate if = pressed before secondOperand assigned example: 1 -> + -> = 
    //skip evaluate if = pressed before operator assigned example: 1 -> =
    if(currentOperator === null || needResetScreen)
        return

    //assign secondOperator
    secondOperand = currentDisplay.textContent;

    //move operator and both operand to last display
    lastDisplay.textContent = `${firstOperand} ${currentOperator} ${secondOperand}`

    //handle divide by 0
    if(currentOperator === '÷' && currentDisplay.textContent==='0'){
        currentDisplay.textContent = 'BRUH'
        // needResetScreen = true;
        return
    }

    //evaluate, round and put into new display
    currentDisplay.textContent = round(operate(currentOperator, firstOperand, secondOperand));

    //clear operator
    currentOperator = null;

    //flag clear operation
    needResetOperation = true;
}
const add = function(a,b) {return a+b;}
const subtract = function(a,b) {return a-b;}
const multiply = function(a,b) {return a*b;}
const divide = function(a,b) {return a/b;}

const operate = function(operator, a, b){
    a=Number(a);
    b=Number(b);
    switch(operator){
        case '+': 
            return add(a,b)
        case '-': 
            return subtract(a, b)
        case 'x': 
            return multiply(a, b)
        case '÷': 
            return divide(a, b)
    }
}

const round = function(number){
    return Math.round(number * 10000) / 10000; 
}