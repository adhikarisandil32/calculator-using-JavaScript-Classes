const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation");
const equalsButton = document.querySelector("[data-number]");
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
        this.operaiton = undefined;
    }

    operation(){
        
    }

    equals(){

    }

    appendNumber(number){
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