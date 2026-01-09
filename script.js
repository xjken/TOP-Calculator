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
const operatorButtons = document.querySelectorAll('.operator')
const operatorEqual = document.querySelector('.operatorEqual')
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
    debugChecker();
})

//Event Listerner for inputing number (operand) to display
operandButtons.forEach((operandButton)=>{
    operandButton.addEventListener('click', function(){
        if(parseFloat(display.textContent)===number1 && number1!=undefined){
            console.log("test");
            number1=undefined;
            display.textContent=undefined;
        }

        clearButton.textContent = "CE";
        console.log(operandButton.textContent);
        display.textContent = display.textContent + operandButton.textContent;
        debugChecker();
    })
})

//Event Listener for handling operator button
operatorButtons.forEach((operatorButton)=>{
    operatorButton.addEventListener('click', function(){
        if(operator===undefined){ //if there is no operator yet
            // display has numbers
            if( display.textContent!=''){
                number1 = display.textContent;
                operator = operatorButton.textContent;
            }
            //if display empty, clicking operator buttons do nothing
        }else{// already have operator
            //number1 and display already filled, then do the evaluation, put it into number1 and add new operator
            if(number1!=undefined && display.textContent!=''){
                number2 = display.textContent;
                const ans = operate(operator, number1, number2)
                if(Number.isFinite(ans)){
                    number1 = ans; //assign ans to number 1
                    display.textContent = number1;
                    operator = operatorButton.textContent;
                }else{
                    number1 = undefined;
                    display.textContent = 'BRUH...';
                    operator = undefined;
                }
                number2 = undefined
            }else{ //display is empty
                //change to new operator
                operator = operatorButton.textContent;
            }
        }
        //clear display
        display.textContent=undefined;
        clearButton.textContent='AC';
        debugChecker();
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
    
})



