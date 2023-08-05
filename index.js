/*
--------------------------------------------------------------------------------------
Calculator in HTML, CSS and JS - (c) 2023 NH (N3v1) - Use at your own risk, no warranty
--------------------------------------------------------------------------------------
*/

// Function to append an operation to the result area
function appendOperation(operation) {
    document.getElementById('resultArea').innerHTML += operation;
}

// Function to calculate the result of the expression
function calculateResult() {
    // Changed it to a constant because you shouldn't be able to set this variable during running of the result
    // With a constant, you can only set the object once so you can still mutate the object @jiri132
    const container = document.getElementById('resultArea');

    // Get the full calculation and split it into parts
    const calculation = container.innerHTML;
    const splitUpCalculation = calculation.split(" ");
    let newCalculation = [];

    // `part` represents the part of the calculation 
    // example: `[100 * 55% + 9 * 10%] => p1 = 100, p2 = *, p3 = 55, p4 = %, p[n]......`
    // This function can also be used to find `sin(,cos(,tan(,root, exp, pi, ......`
    splitUpCalculation.forEach((part, index) => {
        // Is the part an %?
        if (part === '%') {
            // Get the number associated with %
            const number = splitUpCalculation[index - 1];
            // The latest item of the `newCalculation` array
            const nC_index = newCalculation.length - 1; 

            // Instead of the normal number, place the decimal value there
            newCalculation[nC_index] = percentageToDecimal(number);

            // Return it so that it doesn't add the % back into it
            return;
        }

        // If it is not a % just push the part that is in it
        newCalculation.push(part);
    })

    // Find the result using the new calculation method
    let result = eval(newCalculation.join(" "));

    // Set the calculation result
    container.innerHTML = result;
}

// This gets the number input and makes it a decimal using the function `%value / 100 = decimal value` @jiri132
function percentageToDecimal(percentage) {
    return percentage / 100;
}

// Function to delete the last character in the result area
function deleteLast() {
    let container = document.getElementById('resultArea');
    if (container.innerHTML.endsWith(' ')) {
        container.innerHTML = container.innerHTML.slice(0, -3);
    } else {
        container.innerHTML = container.innerHTML.slice(0, -1);
    }
}
