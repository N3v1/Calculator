/*--------------------------------------------------------------------------------------
Calculator in HTML,CSS and JS - (c) 2023 NH (N3v1) - Use at your own risk, no warranty
--------------------------------------------------------------------------------------
*/

let lastInputIsOperator = false; // Variable to track the last input
function appendTrigonometric(trigFunction) {//handle trigonometric expressions buttons
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
      const resultContainer = document.getElementById("result");
      resultContainer.innerHTML =
        resultContainer.innerHTML.slice(0, -3) + operation;
    } else {
      lastInputIsOperator = true;
      document.getElementById("result").innerHTML += operation;
    }
  } else {
    lastInputIsOperator = false;
    document.getElementById("result").innerHTML += operation;
  }
}

function appendDecimal(decimal) {
  // Prevent appending a decimal right after an operator
  if (!lastInputIsOperator) {
    // Reset lastInputIsOperator when a decimal is added
    lastInputIsOperator = false;

    // Rest of the function remains unchanged
    document.getElementById("result").innerHTML += decimal;
  }
}

// Calculate and display the result of the expression
function calculateResult() {
  // Get containers for previous expression and result display
  const previousExpressionContainer =
    document.getElementById("previousExpression");
  const resultContainer = document.getElementById("resultArea");

  // Get the expression from the result display
  let expression = resultContainer.innerHTML;

  //Insert the current expression into the previousExpressionContainer on display
  previousExpressionContainer.innerHTML = expression;
  expression = expression.replace('π', "pi");
  console.log(expression);
  // Use the 'math.js' lib to first compile the expression and then evaluate it.
  let result = math.compile(expression).evaluate(); // Math.js - Compile(type 'string') then Evaluate() - returns number;
  resultContainer.innerHTML = result.toString(); // Convert result type 'number' to string for display
}

function deleteLast() {
  let container = document.getElementById("result");
  if (container.innerHTML.endsWith(" ")) {
    container.innerHTML = container.innerHTML.slice(0, -3);
  } else {
    container.innerHTML = container.innerHTML.slice(0, -1);
  }
}

function clearResult() {
  let container = document.getElementById("result");
  container.innerHTML = container.innerHTML.slice(0, 0);
}

// Add a keydown event listener to the document
document.addEventListener("keydown", (event) => {
  // Get the pressed key
  const key = event.key;
  if (key === "%") {
    appendOperation(" % ");
  } else if (key === "e") {
    appendOperation("e");
  } else if (key === "p") {//  Please note that this solution assumes that the calculator does not have any other functionality associated with the key combination "pi". If there are conflicting key combinations or additional requirements, further modifications may be neccessary
    // Check if the next key pressed is "i"
    document.addEventListener("keydown", (nextEvent) => {
      if (nextEvent.key === "i") {
        appendOperation('π'); // Append "pi" to the expression
        nextEvent.preventDefault(); // Prevent the default behavior of the "i" key
      }
    });
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

document.addEventListener("keydown", function (event) {
  if ((event.keyCode === 8 || event.keyCode === 46) && event.ctrlKey) {
    clearResult();
  }
});
