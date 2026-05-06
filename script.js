const state = {
    // values
    firstNumber: null,
    operator: null,
    operatorSymbol: null,
    secondNumber: null,
    inputText: "",
    operationText: "",
    inputTarget: "first",

    // conditions
    isAlreadyDecimal: false,
    shouldResetInput: false,
    shouldResetAll: false,
};

function clearCalculator() {
    state.firstNumber = null;
    state.operator = null;
    state.operatorSymbol = null;
    state.secondNumber = null;
    state.inputText = "";
    state.operationText = "";
    state.inputTarget = "first";
    state.isAlreadyDecimal = false;
    state.shouldResetInput = false;
    state.shouldResetAll = false;
}

const operationDisplay = document.querySelector('.display-panel--operation');
const inputDisplay = document.querySelector('.display-panel--input');
const isOperator = (action) => ["add", "subtract", "multiply", "divide"].includes(action);
const isInputZero = (input) => Number(input) === 0;

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => {
    if (y === 0) throw new Error("Cannot divide by zero");
    return x / y;
}

const operate = (op, x, y) => {
    let res;
    if (op === "add") res = add(x, y);
    else if (op === "subtract") res = subtract(x, y);
    else if (op === "multiply") res = multiply(x, y);
    else if (op === "divide") res = divide(x, y);
    return res;
}
const formattedResult = (result) => Number(result.toFixed(12)).toString();

function updateDisplay() {
    operationDisplay.textContent = state.operationText;
    inputDisplay.textContent = state.inputText;
}

function syncNumber() {
    state.isAlreadyDecimal = state.inputText.includes(".");
    const value = state.inputText === "" ? null : Number(state.inputText);
    if (state.inputTarget === "first") {
        state.firstNumber = value;
    } else {
        state.secondNumber = value;
    }
}

function numberButton(value) {
    if (state.shouldResetInput) {
        state.inputText = "";
        state.shouldResetInput = false;
        state.isAlreadyDecimal = false;
    }

    if (value === ".") {
        if (state.isAlreadyDecimal) return;
        if (state.inputText === "") state.inputText = "0";
    }

    state.inputText += value;
    syncNumber();
}

function flipButton() {
    if (state.inputText === "") return;
    state.inputText = (-Number(state.inputText)).toString();
    syncNumber();
}

function backspaceButton() {
    if (state.inputText === "") return;
    state.inputText = state.inputText.slice(0, -1);
    syncNumber();
}

function handleError(error) {
    state.operationText = `Error: ${error.message}`;
    state.inputText = "Please Clear the calculator.";
    state.shouldResetAll = true;
}

function handleOperatorButton(action, symbol) {
    if (state.firstNumber === null) return;

    if (state.secondNumber !== null) {
        calculate();
    }

    state.inputTarget = "second";
    state.operator = action;
    state.shouldResetInput = true;
    state.operatorSymbol = symbol;
    state.operationText = `${state.firstNumber} ${state.operatorSymbol}`
}

function calculate() {
    if (state.firstNumber === null ||
        state.operator === null ||
        state.secondNumber === null)
        return;
    
    try {
        const result = operate(
            state.operator, 
            state.firstNumber, 
            state.secondNumber
        );
        state.operationText = `${state.firstNumber} ${state.operatorSymbol} ${state.secondNumber} =`
        state.inputText = formattedResult(result);
        state.inputTarget = "first";
        state.firstNumber = Number(formattedResult(result));
        state.secondNumber = null;
        state.shouldResetInput = true;
        state.operator = null;
        state.operatorSymbol = null;
    } catch (error) {
        handleError(error);
    }
}

document.querySelectorAll('.calc-btn').forEach((button) => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;
        const action = button.dataset.action;

        if (state.shouldResetAll && action !== "clear-all") {
            return;
        }

        if (value !== undefined) {
            numberButton(value);
        } else if (isOperator(action)) {
            handleOperatorButton(action, button.textContent);
        } else if (action === "calculate") {
            calculate();
        } else if (action === "clear-all") {
            clearCalculator();
        } else if (action === "clear") {
            backspaceButton();
        } else if (action === "flip") {
            flipButton();
        }

        updateDisplay();
    });
});