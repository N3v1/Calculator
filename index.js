/*--------------------------------------------------------------------------------------
Calculator in HTML,CSS and JS - (c) 2023 NH (N3v1) - Use at your own risk, no warranty
--------------------------------------------------------------------------------------
*/

let lastInputIsOperator = false; // Variable to track the last input

function appendOperation(operation) {
    if (operation === ' . ' || operation === ' + ' || operation === ' - ' || operation === ' * ' || operation === ' / ') {
        if (lastInputIsOperator) {
            // Replace the last operator with the new one
            const resultContainer = document.getElementById('resultArea');
            resultContainer.innerHTML = resultContainer.innerHTML.slice(0, -3) + operation;
        } else {
            lastInputIsOperator = true;
            document.getElementById('resultArea').innerHTML += operation;
        }
    } else {
        lastInputIsOperator = false;
        document.getElementById('resultArea').innerHTML += operation;
    }
}

function appendDecimal(decimal) {
    // Prevent appending a decimal right after an operator
    if (!lastInputIsOperator) {
        // Reset lastInputIsOperator when a decimal is added
        lastInputIsOperator = false;

        // Rest of the function remains unchanged
        document.getElementById('resultArea').innerHTML += decimal;
    }
}

function calculateResult() {
    // Changed it to a constant because you shouldn't be able to set this variable during running of the result
    // With a constant you can only set the object once so you can still mutate the object @jiri132
    const previousExpressionContainer = document.getElementById('previousExpression');
    const resultContainer = document.getElementById('resultArea');
    
    const calculation = resultContainer.innerHTML;
    const splitUpCalculation = calculation.split(" ");
    let newCalculation = [];

    // `part` represents the part of the calculation 
    // example: `[100 * 55% + 9 * 10%] => p1 = 100, p2 = *, p3 = 55, p4 = %, p[n]......`
    // This function can also be used to find `sin(,cos(,tan(,root, exp, pi, ......`
    splitUpCalculation.forEach((part, index) => {
        // Is the part a %?
        if (part === '%') {
            // Get the number associated with %
            const number = splitUpCalculation[index - 1];
            const nC_index = newCalculation.length - 1;

            // instead of the normal number place the decimal value there
            newCalculation[nC_index] = percentageToDecimal(number);

            // Return it so that it doesn't add the % back into it
            return;
        }

        // If it is not a % just push the part that is in it
        newCalculation.push(part);
    });

    const previousExpression = splitUpCalculation.join(" ");
    previousExpressionContainer.innerHTML = previousExpression;

    let result = eval(newCalculation.join(" "));
    resultContainer.innerHTML = result;
}

// This gets the number input and makes it a decimal using the function `%value / 100 = decimal value` @jiri132
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
