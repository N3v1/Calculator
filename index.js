/*
--------------------------------------------------------------------------------------
Calculator in HTML,CSS and JS - (c) 2023 NH (N3v1) - Use at your own risk, no warranty
--------------------------------------------------------------------------------------
*/

function appendOperation(operation) {
    document.getElementById('resultArea').innerHTML +=operation;
}

function calculateResult() {
    // Changed it to a constant because you shouldn't be able to set this variable during running of the result
    //  With a constant you can only set the object once so you can still mutate the object @jiri132
    const container = document.getElementById('resultArea');

    // Get the full calculation
    const calculation = container.innerHTML;
    const splitUpCalculation = calculation.split(" ");

    if (splitUpCalculation.includes("%")) {
        // Get the index and the number that is tied to the % value
        const index = splitUpCalculation.indexOf("%");
        const number = splitUpCalculation[index - 1];

        // Remove the % index
        splitUpCalculation.splice(index, 1);

        // The past number of example `7% -> 7 -> 0,07`
        splitUpCalculation[index - 1] = percentageToDecimal(number)
    }

    // Find the result using the new calculation method
    let result = eval(splitUpCalculation.join(" "));

    // set the calculation result
    container.innerHTML = result;
}


/// This gets the number input and makes it to decimal using the function `%value / 100 = decimal value` 
function percentageToDecimal(percentage) {
    return percentage / 100;
}

function deleteLast() {
    let container = document.getElementById('resultArea');
    if(container.innerHTML.endsWith(' ')) {
        container.innerHTML = container.innerHTML.slice(0, -3);
    } else {
        container.innerHTML = container.innerHTML.slice(0, -1);
    }
}