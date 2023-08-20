/*--------------------------------------------------------------------------------------
Calculator in HTML,CSS and JS - (c) 2023 NH (N3v1) - Use at your own risk, no warranty
--------------------------------------------------------------------------------------
*/

let lastInputIsOperator = false; // Variable to track the last input

function appendTrigonometric(trigFunction) { //handle trigonometric expressions buttons
  const resultContainer = document.getElementById("resultArea");
  resultContainer.innerHTML += trigFunction + " " + "(";
  lastInputIsOperator = false;
}

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
  } else if (operation === "e" || operation === "π") {
    document.getElementById("resultArea").innerHTML += operation;
    lastInputIsOperator = false;
  } else {
    lastInputIsOperator = false;
    document.getElementById("resultArea").innerHTML += operation; // ...
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

// Calculate and display the result of the expression
function calculateResult() {
  // Get containers for previous expression and result display
  const previousExpressionContainer =
    document.getElementById("previousExpression");
  const resultContainer = document.getElementById("resultArea");

  // Get the expression from the result display
  const expression = resultContainer.innerHTML;

  //Insert the current expression into the previousExpressionContainer on display
  previousExpressionContainer.innerHTML = expression;

  // Use the 'math.js' lib to first compile the expression and then evaluate it.
  let result = math.compile(expression).evaluate(); // Math.js - Compile(type 'string') then Evaluate() - returns number;
  resultContainer.innerHTML = result.toString(); // Convert result type 'number' to string for display
}

function deleteLast() {
  let container = document.getElementById("resultArea");
  if (container.innerHTML.endsWith(" ")) {
    container.innerHTML = container.innerHTML.slice(0, -3);
  } else {
    container.innerHTML = container.innerHTML.slice(0, -1);
  }
}

function clearResult() {
  let container = document.getElementById("resultArea");
  container.innerHTML = container.innerHTML.slice(0, 0);
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
  } else if (key === "Backspace" || key === "Delete") {
    deleteLast();
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  }
});

document.addEventListener('keydown', function(event) {
  if ((event.keyCode === 8 || event.keyCode === 46) && event.ctrlKey) {
    clearResult();
  }
});
