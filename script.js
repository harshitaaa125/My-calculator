const calculator = {
    displayvalue: '0',
    firstOperand: null,
    waitingforsecondoperand: false,
    operator: null,
};

function updateDisplay() {
    const display = document.querySelector(".display");
    display.textContent = calculator.displayvalue;
}

function inputDigit(digit) {
    const { displayvalue, waitingforsecondoperand } = calculator;

    if (waitingforsecondoperand === true) {
        calculator.displayvalue = digit; // Fixed from calculator.display to displayvalue
        calculator.waitingforsecondoperand = false;
    } else {
        calculator.displayvalue = displayvalue === '0' ? digit : displayvalue + digit;
    }
    updateDisplay();
}

function inputDecimal(dot) {
    if (!calculator.displayvalue.includes(dot)) {
        calculator.displayvalue += dot;
    }
    updateDisplay();
}

function handleOperator(nextOperator) {
    const { firstOperand, displayvalue, operator } = calculator;
    const inputValue = parseFloat(displayvalue); // Fixed typo

    if (operator && calculator.waitingforsecondoperand) {
        calculator.operator = nextOperator;
        return;
    }

    if (firstOperand == null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    } else if (operator) {
        const result = performCalculation[operator](firstOperand, inputValue);
        calculator.displayvalue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingforsecondoperand = true;
    calculator.operator = nextOperator;

    updateDisplay();
}

const performCalculation = {
    "+": (firstOperand, secondOperand) => firstOperand + secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "÷": (firstOperand, secondOperand) => firstOperand / secondOperand,
    "x": (firstOperand, secondOperand) => firstOperand * secondOperand,
    "=": (firstOperand, secondOperand) => secondOperand,
};

function resetCalculator() {
    calculator.displayvalue = '0';
    calculator.firstOperand = null;
    calculator.waitingforsecondoperand = false;
    calculator.operator = null;
    updateDisplay();
}

function toggleSign() {
    calculator.displayvalue = String(parseFloat(calculator.displayvalue) * -1);
    updateDisplay();
}

function handlePercentage() {
    calculator.displayvalue = String(parseFloat(calculator.displayvalue) / 100); // Fixed incorrect case
    updateDisplay();
}

function deleteLastDigit() {
    calculator.displayvalue = calculator.displayvalue.slice(0, -1);
    if (calculator.displayvalue === '') {
        calculator.displayvalue = '0';
    }
    updateDisplay();
}

const keys = document.querySelector('.buttons');
keys.addEventListener('click', (event) => {
    const { target } = event;

    if (!target.matches('button')) {
        return;
    }
    if (target.textContent === 'C') {
        resetCalculator();
        return;
    }
    if (target.textContent === '+/-') {
        toggleSign();
        return;
    }
    if (target.textContent === '%') {
        handlePercentage();
        return;
    }
    if (target.classList.contains("operator")) {
        handleOperator(target.textContent);
        return;
    }
    if (target.textContent === ".") {
        inputDecimal(target.textContent);
        return;
    }
    if (target.textContent === "Del") {
        deleteLastDigit();
        return;
    }
    inputDigit(target.textContent);
});