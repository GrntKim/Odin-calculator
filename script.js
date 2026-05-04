const state = {
    firstNumber: null,
    operator: null,
    secondNumber: null,
    currentInput: "",
    result: null,
};

const operationButtons = document.querySelectorAll('.calc-btn--operator');
operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const op = button.dataset.action;
        console.log(op);
    });
});

const controlButtons = document.querySelectorAll('.calc-btn--control');
controlButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const op = button.dataset.action;
        console.log(op);
    });
});

const numberButtons = document.querySelectorAll('.calc-btn--number');
numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const num = button.dataset.value;
        console.log(num);
    });
});

const resultButton = document.querySelector('.calc-btn--result');
resultButton.addEventListener('click', () => {
    const op = resultButton.dataset.action;
    console.log(op);
});