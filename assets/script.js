const currentOperation = document.getElementById('current-operation');
const memoryOperation = document.getElementById('memory-operation');
const numberButton = document.querySelectorAll('[data-number]')
const operatorButton = document.querySelectorAll('#operator');
const evaluateButton = document.querySelector('#evaluate');
const clearButton = document.querySelector('#clear');

let firstNum = '';
let secondNum = '';
let operation = null;

function clearAll() {
  firstNum = '';
  secondNum = '';
  operation = null;
  currentOperation.textContent = 0;
  memoryOperation.textContent = '';
}

function selectOperation(operator) {
  if (firstNum !== '') {
    operate();
  }

  operation = operator;
  firstNum = secondNum;
  secondNum = '';

  memoryOperation.textContent = `${firstNum} ${operation}`
}

function displayValue(value) {
  currentOperation.textContent = value;
}  

function insertNumber(number) {
  secondNum += number;
  displayValue(secondNum)
}

function add(a, b) {
  return a + b;
}

function multiply(a,b) {
  return a * b;
}

function operate() {
  let result;
  let a = parseFloat(firstNum);
  let b = parseFloat(secondNum);

  switch(operation) {
    case '+':
      result = add(a,b)
      break;
    case 'x':
      result = multiply(a,b);
      break;
    default:   
      return;   
  }

  operation = '';
  firstNum = '';
  secondNum = result

  displayValue(secondNum);
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

evaluateButton.addEventListener('click', operate);
clearButton.addEventListener('click', clearAll)






