const display = document.getElementById('display');
const resetBtn = document.getElementById('reset');
const dotSign = document.getElementById('dot');
const equalSign = document.getElementById('equal');
const operationSignsBtns = document.querySelectorAll('#operation');
const nuberBtns = document.querySelectorAll('#btn');

let inputNumber = '';
let result = '';
let sign = '';
let dot = '';
let hasResult = false;

const missingNumberMessage = 'Введите сначала число!';
const hasResultMessage = 'Нажмите Reset';
const loadingMessage = 'Reset...';

const resetAllValue = () => {
  display.textContent = '';
  inputNumber = '';
  result = '';
  sign = '';
  dot = '';
  hasResult = false;
}

const displayResult = () => {
  setTimeout(() => display.textContent = result, 700);
}

const setDot = (e) => {
  const clickedElem = e.srcElement.dataset.value;
  if (hasResult) {
    display.textContent = hasResultMessage;
    displayResult();
  } else if (!dot && inputNumber) {
    dot = clickedElem;
    inputNumber += clickedElem;
    display.textContent = inputNumber;
  } else {
    display.textContent = missingNumberMessage;
    displayResult();
  }
}

const setOperationSign = (e) => {
  const clickedElem = e.srcElement.dataset.value;
  if (inputNumber && !hasResult) {
    sign = clickedElem;
    display.textContent += clickedElem;
    result += inputNumber;
    result += clickedElem;
    inputNumber = '';
    dot = '';
    hasResult = false;
  } else if (inputNumber && hasResult) {
    inputNumber = result;
    sign = clickedElem;
    display.textContent += clickedElem;
    result += clickedElem;
    inputNumber = '';
    dot = '';
  } else {
    result = result.substring(0, result.length - 1);
    sign = clickedElem;
    result += inputNumber;
    result += clickedElem;
    inputNumber = '';
    dot = '';
    hasResult = false;
    displayResult();
  }
}

const addNumber = (e) => {
  const clickedElem = e.srcElement.dataset.value;
  if (!hasResult) {
    inputNumber += clickedElem;
    display.textContent = inputNumber;
  } else if (hasResult && sign) {
    hasResult = false;
    inputNumber += clickedElem;
    display.textContent = inputNumber;
  } else {
    resetAllValue();
    display.textContent = loadingMessage;
    inputNumber += clickedElem;
    setTimeout(() => display.textContent = inputNumber, 500);
  }
}

const getResult = () => {
  if (result && inputNumber && !hasResult) {
    result += inputNumber;
    result = +(eval(result).toFixed(8));
    if (result === Infinity) {
      display.textContent = 'На ноль делить нельзя!';
      setTimeout(resetAllValue, 1000);
    } else {
      inputNumber = result;
      sign = '';
      hasResult = true;
      display.textContent = result;
    }
  }
  else {
    display.textContent = 'Введите еще значение.';
    displayResult();
  }
};

nuberBtns.forEach(btn => btn.addEventListener('click', (e) => addNumber(e)));

operationSignsBtns.forEach(btn => btn.addEventListener('click', (e) => setOperationSign(e)));

dotSign.addEventListener('click', (e) => setDot(e));

resetBtn.addEventListener('click', () => resetAllValue());

equalSign.addEventListener('click', () => getResult());