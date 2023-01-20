const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation");
const equalsButton = document.querySelector("[data-equals]");
const allclearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const currentOperand = document.querySelector(".current-operand");
const previousOperand = document.querySelector(".previous-operand");

class Calculator{
    constructor(previousOperand, currentOperand){
        this.currentOperandTextElement = currentOperand;
        this.previousOperandTextElement = previousOperand;
        this.currentOperand = "0";
        this.previousOperand = "";
        this.operator = "";
    }

    delete(){
        //if currentOperand === 0, we don't want to eliminate that 0 as well
        if(this.currentOperand === "0"){
            return
        }
        else{
            this.currentOperand = this.currentOperand.slice(0, this.currentOperand.length-1);
            if(this.currentOperand === ""){
                this.currentOperand = "0";
            }
        }
    }

    allclear(){
        this.currentOperand = "0";
        this.previousOperand = "";
        this.operator = undefined;
    }

    operation(operator){
        //if operator is clicked if previousOperand and currentOperand both non blank, then evaluation needs to be done.
        if(this.previousOperand !== "" && this.currentOperand !== ""){
            this.compute();
            this.currentOperand = this.result;
        }
        //currentOperand is "" when previousOperand is present, else it's 0. 
        if(this.currentOperand === ""){
            //replace the operator with most recently clicked operator
            this.currentOperand = this.previousOperand.slice(0, this.previousOperand.length - 1);
        }
        this.previousOperand = this.currentOperand+operator;
        this.currentOperand = "";
    }

    equals(){
        this.compute();
        this.currentOperand = this.result;
        this.previousOperand = "";
    }

    appendNumber(number){
        if(this.currentOperand.length >= 12){
            alert("Number cannot have more than 12 digits");
            return
        }
        //if . is presesnt once, it cannot be again in the same operand
        if(this.currentOperand.includes(".") && number === "."){
            return
        }
        //if no number other than 0 is entered, only then appending happens
        if(this.currentOperand === "0" && number === "0"){
            return
        }
        //the first non-0 number that's clicked is going to replace the existing 0
        if(this.currentOperand[0] === "0"){
            this.currentOperand = "";
        }
        //after all of above, only then just go on appending
        this.currentOperand += number.toString();
    }

    compute(){
        //because × and ÷ are not valid operator, replace it by * and / during evaluation
        let symbol = this.previousOperand.slice(this.previousOperand.length-1);
        if(symbol === "×"){
            this.previousOperand = this.previousOperand.slice(0, this.previousOperand.length-1)+"*";
        }
        else if(symbol === "÷"){
            this.previousOperand = this.previousOperand.slice(0, this.previousOperand.length-1)+"/";
        }
        this.result = eval(this.previousOperand+this.currentOperand);
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText = this.currentOperand;
        this.previousOperandTextElement.innerText = this.previousOperand;
    }
}

const calculator = new Calculator(previousOperand, currentOperand);
calculator.updateDisplay();

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
})

allclearButton.addEventListener("click", ()=>{
    calculator.allclear();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
})

operationButtons.forEach(button => {
    button.addEventListener("click", ()=>{
        calculator.operation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", ()=>{
    calculator.equals();
    calculator.updateDisplay();
})
