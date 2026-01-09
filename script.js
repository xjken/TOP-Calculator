function add(a, b){
    return parseFloat(a)+parseFloat(b);
}

const subtract = function(a, b){
    return parseFloat(a)-parseFloat(b);
}

const multiply = function (a, b){
    return parseFloat(a)*parseFloat(b);
}

const divide = function(a, b){
    return parseFloat(a)/parseFloat(b);
}

const operate = function(operator, a, b){
    console.log(operator + "__" + a +"__" +b)
    switch(operator){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x":
            return multiply(a, b);
        case "/":
            return divide(a,b)
    }
}


//button input to display
const display =document.querySelector('.display');
const operandButtons = document.querySelectorAll('.operand')
const decimalButton = document.querySelector('.decimal')
const operatorButtons = document.querySelectorAll('.operator')
const operatorEqual = document.querySelector('.equal')
const clearButton = document.querySelector('.clear')
let number1;
let number2;
let operator;

// NOTE : assigning undefined to display make it an empty string. 

const debugChecker = function(){
    console.log("Number 1 : "+ number1 );
    console.log("Operator : "+ operator);
    console.log("Number 2 : "+ number2 );
    console.log("Display : "+ display.textContent)
}
const clearAll = function(){
    number1 = undefined;
    number2 = undefined;
    operator = undefined;
    display.textContent = undefined;
    enableDecimalButton;
}

//Event Listener for AC CE button
clearButton.addEventListener('click', function(){
    //All Celar
    if(display.textContent === ''){
        number1 = undefined;
        number2 = undefined;
        operator = undefined;
    }else{
        //clear entry
        console.log('test');
        display.textContent = undefined;
        clearButton.textContent = 'AC'
    }
    checkIfDisplayContainDecimal();
    debugChecker();
})

const isAnsAlreadyInDisplay = function(){
    return parseFloat(display.textContent)===number1 && number1!=undefined;
}
const setClearToCE = function(){
    clearButton.textContent = "CE";
}
const setClearToAC = function(){
    clearButton.textContent = "AC"
}
const isOperatorEmpty = function(){
    return operator===undefined;
}
//Event Listerner for inputing number (operand) to display
operandButtons.forEach((operandButton)=>{
    operandButton.addEventListener('click', function(){
        //if Answer already in display
        if(isAnsAlreadyInDisplay()){
            if(isOperatorEmpty()){// no operator yet, usually this triggered when evaluation was done and Answer(also number1) is on display and user want to input new number, so we clear previous number1 and display.
                console.log("test");
                clearAll();
            }else{// alreay have operator, so we just clear display
                clearDisplay()
            }
        }
        setClearToCE();
        display.textContent = display.textContent + operandButton.textContent;
        debugChecker();
        checkIfDisplayContainDecimal();
    })
})

function disableDecimalButton(){
    decimalButton.disabled = true;
}
function enableDecimalButton(){
    decimalButton.disabled = false;
}
const checkIfDisplayContainDecimal = function(){
    if(display.textContent.includes("."))
        disableDecimalButton();
    else
        enableDecimalButton();
}
//Event listner for inputting decimal operand (.)
decimalButton.addEventListener('click', function(){
    //if display is empty
    if(display.textContent===''){
        display.textContent = 0+".";
    }else if(isAnsAlreadyInDisplay()){ //is ans already there
        clearAll(); //reset
        display.textContent = 0+'.';
    }else{
        //display is not empty
        display.textContent = display.textContent+'.';
    }
    checkIfDisplayContainDecimal();
})

const isDisplayEmpty = function(){
    return display.textContent===''
}
const isNumber1Empty = function(){
    return number1===undefined;
}
const isNumber2Empty = function(){
    return number2===undefined;
}
const getDisplayAsNum = function(){
    return parseFloat(display.textContent);
}
const setDisplay = function(number){
    display.textContent = number
}
const clearDisplay = function(){
    display.textContent = undefined;
}
const getOperator = function(operatorButton){
    return operatorButton.textContent;
}

//Event Listener for handling operator button
operatorButtons.forEach((operatorButton)=>{
    operatorButton.addEventListener('click', function(){
        // an operator button is clicked
        if(isNumber1Empty()){ // If number1 is empty
            if(!isDisplayEmpty()){ //display has number
                //assign display to number1 
                number1 = getDisplayAsNum();
                operator = getOperator(operatorButton);
                clearDisplay();
            }else{
                //do nothing
            }
        }else if(isOperatorEmpty()){ //operator is emtpy
            operator = getOperator(operatorButton);
            clearDisplay();
        }else if( !isOperatorEmpty() ){ //number1 is not empty, operator is not empty
            if(!isDisplayEmpty()){
                //assign display to number2
                number2 = getDisplayAsNum();
                //calculate result
                const ans = operate(operator, number1, number2)//operator before current input
                setDisplay(ans); // put into display
                number1 = ans; // assign ans to number 1
                number2 = undefined;
                operator = getOperator(operatorButton); //assign new operator
            }
        }
        debugChecker();
        //after every operator, user can use decimal button again
        enableDecimalButton();
    })
})

//Event listener for equal
operatorEqual.addEventListener('click', function(){
    if(number1 != undefined && operator!=undefined){ //if num1 and operator filled
        if(display.textContent!=undefined){//and display not empty
            number2 = display.textContent; //assign display to num2
        }else{//if display is empty
            //do nothing
        }
        if(number2!=undefined){ //and number 2 is also filled
            //calculate
            const ans = operate(operator, number1, number2)
            // console.log(ans);
            if(Number.isFinite(ans)){
                number1 = ans; //assign ans to number 1
                display.textContent = number1;
            }else{
                number1 = undefined;
                display.textContent = 'BRUH...';
            }
            number2 = undefined; //clear number2
            operator = undefined;
        }else{// but number2 is undefined
            //do nothing
        }
    }
    debugChecker();
    checkIfDisplayContainDecimal();
    
})



