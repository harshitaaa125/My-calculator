const calculator={
    displayvalue: '0',
    firstOperand:null,
    waitingforsecondoperand: false,
    operater: null,
};

function updateDisplay(){
    const display=document.querySelector(".display")
    display.textContent = calculator.displayvalue;

}
function inputDigit(digit){
    const {displayvalue, waitingforsecondoperand}= calculator;

    if(waitingforsecondoperand===true){
        calculator.display=digit;
        calculator.waitingforsecondoperand===false
    }else{
        calculator.display=displayvalue==='0'? digit: displayvalue + digit;
    }
    updateDisplay()
}
function inputDecimal(dot){
    if(! calculator.displayvalue.includes(dot)){
        calculator.displayvalue+=dot
    }
    updateDisplay();

}
function handleOperator(nextOperator){
    const {firstOperand, displayvalue,operator}=calculator;
    const inputValue=perseFloat(displayvalue)
    if(operator && calculator.waitingforsecondoperand){
        calculator.operater = nextOperator;
        return;
    }
    if (firstOperand == null && !isNaN(inputValue)){
        calculator.firstOperand=inputvalue;
    }else if(operator){
        const result = peformCalculation[operator](firstOperand, inputValue);
        calculator.displayvalue = String(result);
        calculator.firstOperand = result;
    }
    calculator.waitingforsecondoperand=true;
    calculator.operater=nextOperator;
    
    updateDisplay();
}

const performCalculation={
    "+":(firstOperand,secondOperand)=>firstOperand+secondOperand,
    "-": (firstOperand, secondOperand) => firstOperand - secondOperand,
    "÷": (firstOperand, secondOperand) => firstOperand/secondOperand,
    "x": (firstOperand, secondOperand) => firstOperand*secondOperand,
    "=": (firstOperand, secondOperand) => secondOperand,


}
function resestCalculator(){
    calculator.displayvalue='0'
    calculator.firstOperand=null;
    calculator.waitingforsecondoperand=false;
    calculator.operator=null
    updateDisplay()
}
function toggleSign(){
    calculator.displayvalue = String(parseFloat(calculator.displayvalue) * -1);
    updateDisplay()
}
function handlePercentage(){
    calculator.displayvalue = String(parseFloat(calculator.displayvalue) / 100);
    updateDisplay()
}
function deleteLastDigit(){
    calculator.displayvalue = calculator.displayvalue.slice(0. -1);
    if(calculator.displayvalue===''){
        calculator.displayvalue='0'
    }
    updateDisplay()

}
const keys=document.querySelector('.buttons');
keys.addEventListener('click',(event)=>{
    const {target}=event;

    if(!target.matches('button')){
        resestCalculator();
        return;
    }
    if(target.textContent==='c'){
        toggleSign();
        return;
    }
    if (target.textContent === '%'){
        handlePercentage();
        return;
    }
    if (target.classList.contains("operator")){
        handleOperator(target.textContent);
        return;
    }
    if (target.textContent === '.') {
        inputDecimal(target.textContent);
        return;
    }
    if (target.textContent === 'Del') {
        deleteLastDigit(target.textContent);
        return;
    }
    inputDigit(target.textContent)
}
    )