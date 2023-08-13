/*--------------------------------------------------------------------------------------
Calculator in HTML,CSS and JS - (c) 2023 NH (N3v1) - Use at your own risk, no warranty
--------------------------------------------------------------------------------------
*/

let lastInputIsOperator = false; // Variable to track the last input

function appendOperation(operation) {
  if (
    operation === " . " ||
    operation === " + " ||
    operation === " - " ||
    operation === " * " ||
    operation === " / " ||
    operation === "%"
  ) {
    if (lastInputIsOperator) {
      // Replace the last operator with the new one
      const resultContainer = document.getElementById("resultArea");
      resultContainer.innerHTML =
        resultContainer.innerHTML.slice(0, -3) + operation;
    } else {
      lastInputIsOperator = true;
      document.getElementById("resultArea").innerHTML += operation;
    }
  } else {
    lastInputIsOperator = false;
    document.getElementById("resultArea").innerHTML += operation;
  }
}

function appendDecimal(decimal) {
  // Prevent appending a decimal right after an operator
  if (!lastInputIsOperator) {
    // Reset lastInputIsOperator when a decimal is added
    lastInputIsOperator = false;

    // Rest of the function remains unchanged
    document.getElementById("resultArea").innerHTML += decimal;
  }
}

// Assuming you've included the decimal.js library in your HTML

// Assuming you've included the decimal.js library in your HTML

// Convert a percentage value to a decimal
function percentageToDecimal(percentage) {
  return new Decimal(percentage) / 100; // Divide the percentage value by 100 to get the decimal value
}

// Calculate and display the result of the expression
function calculateResult() {
  // Get containers for previous expression and result display
  const previousExpressionContainer =
    document.getElementById("previousExpression");
  const resultContainer = document.getElementById("resultArea");

  // Get the expression from the result display
  const calculation = resultContainer.innerHTML;
  const splitUpCalculation = calculation.split(" "); // Split the expression into parts

  let newCalculation = [];

  // Iterate through the expression parts
  splitUpCalculation.forEach((part, index) => {
    if (part === "%") {
      // If the part is a percentage symbol
      const number = splitUpCalculation[index - 1]; // Get the number before the percentage symbol
      const nC_index = newCalculation.length - 1;

      // Check if the number is already a decimal or needs conversion
      if (typeof number === "number") {
        newCalculation[nC_index] = number / 100; // Convert the number to a decimal
      } else {
        newCalculation[nC_index] = percentageToDecimal(number); // Convert the percentage value to a decimal
      }
      return;
    }

    newCalculation.push(part); // Push non-percentage parts to the newCalculation array
  });

  const previousExpression = splitUpCalculation.join(" "); // Join the parts back to the expression
  previousExpressionContainer.innerHTML = previousExpression;

  // Use Decimal type for calculations
  let result = new Decimal(eval(newCalculation.join(" "))); // Evaluate the new expression
  resultContainer.innerHTML = result.toString(); // Convert result to string for display
}

function deleteLast() {
  let container = document.getElementById("resultArea");
  if (container.innerHTML.endsWith(" ")) {
    container.innerHTML = container.innerHTML.slice(0, -3);
  } else {
    container.innerHTML = container.innerHTML.slice(0, -1);
  }
}

// Add a keydown event listener to the document
document.addEventListener("keydown", (event) => {
  // Get the pressed key
  const key = event.key;

  if (key === "%") {
    appendOperation(" % ");
  } else if (/[0-9.]/.test(key)) {
    appendOperation(key);
  } else if (/[+\-*/]/.test(key)) {
    appendOperation(` ${key} `);
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  }
});
