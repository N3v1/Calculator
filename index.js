/*
--------------------------------------------------------------------------------------
Calculator in HTML,CSS and JS - (c) 2023 NH (N3v1) - Use at your own risk, no warranty
--------------------------------------------------------------------------------------
*/

function appendOperation(operation) {
    document.getElementById('resultArea').innerHTML += operation;
}

function calculateResult() {
    const previousExpressionContainer = document.getElementById('previousExpression');
    const resultContainer = document.getElementById('resultArea');
    
    const calculation = resultContainer.innerHTML;
    const splitUpCalculation = calculation.split(" ");
    let newCalculation = [];

    splitUpCalculation.forEach((part, index) => {
        if (part === '%') {
            const number = splitUpCalculation[index - 1];
            const nC_index = newCalculation.length - 1;
            newCalculation[nC_index] = percentageToDecimal(number);
            return;
        }
        newCalculation.push(part);
    });

    const previousExpression = splitUpCalculation.join(" ");
    previousExpressionContainer.innerHTML = previousExpression;

    let result = eval(newCalculation.join(" "));
    resultContainer.innerHTML = result;
}

function percentageToDecimal(percentage) {
    return percentage / 100;
}

function deleteLast() {
    let container = document.getElementById('resultArea');
    if (container.innerHTML.endsWith(' ')) {
        container.innerHTML = container.innerHTML.slice(0, -3);
    } else {
        container.innerHTML = container.innerHTML.slice(0, -1);
    }
}
