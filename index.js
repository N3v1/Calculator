/*
--------------------------------------------------------------------------------------
Calculator in HTML,CSS and JS - (c) 2023 NH (N3v1) - Use at your own risk, no warranty
--------------------------------------------------------------------------------------
*/

// Function to append an operation to the result area
function appendOperation(operation) {
    document.getElementById('resultArea').innerHTML += operation;
}

// Function to calculate the result of the expression
function calculateResult() {
    // Changed it to a constant because you shouldn't be able to set this variable during running of the result
    // With a constant you can only set the object once so you can still mutate the object @jiri132
    const container = document.getElementById('resultArea');

    // Get the full calculation and split it into parts
    const calculation = container.innerHTML;
    const splitUpCalculation = calculation.split(" ");
    let newCalculation = [];

    // `part` represents the part of the calculation 
    // example: `[100 * 55% + 9 * 10%] => p1 = 100, p2 = *, p3 = 55, p4 = %, p[n]......`
    // This function can also be used to find `sin(,cos(,tan(,root, exp, pi, ......`
    splitUpCalculation.forEach((part,index) => {
        // Check if the current part is a percentage sign
        if (part === '%') {
            // If it is, get the number before the percentage sign
            const number = splitUpCalculation[index - 1];
            
            // Find the index of the latest item in the newCalculation array
            const nC_index = newCalculation.length - 1;
            
            // Replace the latest item with the decimal value of the percentage
            newCalculation[nC_index] = percentageToDecimal(number);
            
            // Return to skip adding the percentage sign back to the newCalculation array
            return;
        }
        
        // If it's not a percentage sign, add the part to the newCalculation array
        newCalculation.push(part);
    });

    // Join the modified newCalculation array to create a new expression
    const previousExpression = splitUpCalculation.join(" ");
    
    // Update the previous expression container with the new expression
    previousExpressionContainer.innerHTML = previousExpression;

    // Evaluate the newCalculation to get the result
    let result = eval(newCalculation.join(" "));
    
    // Update the result container with the calculated result
    resultContainer.innerHTML = result;
}

// Function to convert a percentage to its decimal equivalent
function percentageToDecimal(percentage) {
    return percentage / 100;
}

// Function to delete the last character in the result area
function deleteLast() {
    let container = document.getElementById('resultArea');
    
    // Check if the container ends with a space
    if (container.innerHTML.endsWith(' ')) {
        // If it does, remove the last three characters (operator and space)
        container.innerHTML = container.innerHTML.slice(0, -3);
    } else {
        // If it doesn't, remove only the last character
        container.innerHTML = container.innerHTML.slice(0, -1);
    }
}
