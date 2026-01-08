function add(a, b){
    return a+b;
}

const subtract = function(a, b){
    return a-b;
}

const multiply = function (a, b){
    return a*b;
}

const divide = function(a, b){
    return a/b;
}

// console.log(add(3, 6))
// console.log(subtract(3, 6))
// console.log(multiply(3, 6))
// console.log(divide(3, 6))

const operate = function(operator, a, b){
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
// console.log(operate("+", 4, 6));
// console.log(operate("-", 4, 6));
// console.log(operate("x", 4, 6));
// console.log(operate("/", 4, 6));
