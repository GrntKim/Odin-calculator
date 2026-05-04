const state = {
    firstNumber: null,
    operator: null,
    secondNumber: null,
    currentInput: "",
    shouldResetInputDisplay: false,
    shouldResetOperationDisplay: false,
};

const operationDisplay = document.querySelector('.display-panel--operation');
const inputDisplay = document.querySelector('.display-panel--input');

const operationButtons = document.querySelectorAll('.calc-btn--operator');
operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        state.shouldResetOperationDisplay = false;
        if (state.currentInput === "") return;
        state.firstNumber = Number(state.currentInput);
        state.operator = button.dataset.action;
        state.currentInput = "";
        operationDisplay.textContent = `${state.firstNumber} ${button.textContent}`;
        state.shouldResetInputDisplay = true;
        console.log(state);
    });
});

const controlButtons = document.querySelectorAll('.calc-btn--control');
controlButtons.forEach((button) => {
    button.addEventListener('click', () => {
    });
});

const numberButtons = document.querySelectorAll('.calc-btn--number');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(state.shouldResetInputDisplay) {
            inputDisplay.textContent = "";
            state.shouldResetInputDisplay = false;
        }
        if(state.shouldResetOperationDisplay) {
            operationDisplay.textContent = "";
            state.shouldResetOperationDisplay = false;
        }
        state.currentInput += button.dataset.value;
        inputDisplay.textContent += button.dataset.value;
    });
});

const resultButton = document.querySelector('.calc-btn--result');
resultButton.addEventListener('click', () => {
    if (state.shouldResetInputDisplay) return;

    state.secondNumber = Number (state.currentInput);
    const op = state.operator;

    let result;

    if (op === "add") {
        result = state.firstNumber + state.secondNumber;
    } else if (op === "subtract") {
        result = state.firstNumber - state.secondNumber;
    } else if (op === "multiply") {
        result = state.firstNumber * state.secondNumber;
    } else if (op === "divide") {
        if (state.secondNumber === 0) {
            operationDisplay.textContent = "DIVISION BY ZERO";
            return;
        } else {
            result = state.firstNumber / state.secondNumber;
        }
    }

    operationDisplay.textContent += ` ${state.secondNumber} =`;
    state.currentInput = String(result);
    inputDisplay.textContent = state.currentInput;
    state.operator = null;
    state.firstNumber = null;
    state.secondNumber = null;
    state.shouldResetOperationDisplay = true;
    console.log(state);
});