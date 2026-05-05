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

const operate = (op, a, b) => {
    const num1 = Number(a)
    const num2 = Number(b);
    if (op === "add") {
        return add(num1, num2);
    } else if (op === "subtract") {
        return subtract(num1, num2);
    } else if (op === "multiply") {
        return multiply(num1, num2);
    } else if (op === "divide") {
        return divide(num1, num2);
    }
};

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) throw new Error("Cannot divide by zero");
    return num1 / num2;
}

const resultButton = document.querySelector('.calc-btn--result');
resultButton.addEventListener('click', () => {
    if (state.shouldResetInputDisplay) return;

    state.secondNumber = Number (state.currentInput);
    let result;
    try {
        result = Number(operate(state.operator, state.firstNumber, state.secondNumber).toFixed(12));
        operationDisplay.textContent += ` ${state.secondNumber} =`;
        state.currentInput = result.toString();
        inputDisplay.textContent = state.currentInput;
        state.operator = null;
        state.firstNumber = null;
        state.secondNumber = null;
        state.shouldResetOperationDisplay = true;
    } catch (error) {
        operationDisplay.textContent = error.message;
    }

    console.log(state);
});