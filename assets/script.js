const currentOperation = document.getElementById('current-operation');
const memoryOperation = document.getElementById('memory-operation');
const numberButton = document.querySelectorAll('[data-number]')
const operatorButton = document.querySelectorAll('#operator');
const evaluateButton = document.querySelector('#evaluate');
const clearButton = document.querySelector('#clear');
const deleteButton = document.querySelector('#delete');

let memoryNum = '';
let currentNum = '';
let operation = null;

function clearAll() {
  memoryNum = '';
  currentNum = '';
  operation = null;
  currentOperation.textContent = 0;
  memoryOperation.textContent = '';
}

function deleteNumber() {
  if(currentOperation.textContent !== '') {
    currentNum = currentNum.slice(0, -1);
    displayValue(currentNum)
  } 

  if(currentOperation.textContent === '') {
    currentOperation.textContent = 0;
  }
  
}

function selectOperation(operator) {
  if (memoryNum !== '') {
    operate();
  }

  operation = operator;
  memoryNum = currentNum;
  currentNum = '';

  memoryOperation.textContent = `${memoryNum} ${operation}`
}

function displayValue(value) {
  currentOperation.textContent = value;
}  

function insertNumber(number) {
  if (number === evaluateButton.textContent) return;
  if (number === "." && currentNum.includes(".")) return;
  if (currentNum.length > 10) return;
  currentNum += number;
  displayValue(currentNum)
}

function add(a,b) {
  return a + b;
}

function subtract(a,b) {
  return a - b;
}

function multiply(a,b) {
  return a * b;
}

function divide(a,b) {
  return a / b;
}

function operate() {
  let result;
  let a = Number.parseFloat(memoryNum);
  let b = Number.parseFloat(currentNum);

  
  if(b === 0 && operation === "/") {
    result = "ERROR!"
  } else {
    switch(operation) {
      case '+':
        result = add(a,b)
        break;
      case 'x':
        result = multiply(a,b);
        break;
      case '/':
        result = divide(a,b);
        break;
      case '-':
        result = subtract(a,b);
        break;
      default:   
        return;   
    }
  }

  

  operation = '';
  memoryNum = '';

  currentNum = result.toString();
  
  if(currentNum.length > 10) {
    currentNum =  Number.parseFloat(currentNum).toExponential(6)
  }

  
  displayValue(currentNum);
  memoryOperation.textContent = '';
}

numberButton.forEach((button) => {
  button.addEventListener('click', () => {
    insertNumber(button.textContent);
  })
})

operatorButton.forEach((button) => {
  button.addEventListener('click', () => {
    selectOperation(button.textContent);
  })
})

window.addEventListener('keydown', function(event) {
  if(event.defaultPrevented) return;

  if((event.key >= 0 && event.key <= 9) || event.key === ".") insertNumber(event.key);
  if(event.key === "Escape") clearAll();
  if(event.key === "Backspace" || event.key === "Delete") deleteNumber();
  if(event.key === "Enter" || event.key === "=") operate();
  if(event.key === "+" || event.key === "-" || event.key === "/" || event.key === "x") selectOperation(event.key);


  event.preventDefault();
})

evaluateButton.addEventListener('click', operate);
clearButton.addEventListener('click', clearAll)
deleteButton.addEventListener('click', deleteNumber);







