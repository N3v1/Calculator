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
      const resultContainer = document.getElementById("resultArea");
      resultContainer.innerHTML =
        resultContainer.innerHTML.slice(0, -3) + operation;
    } else {
      lastInputIsOperator = true;
      document.getElementById("resultArea").innerHTML += operation;
    }
  }
  else if (operation === "e" ||
    operation === "π") {
    document.getElementById("resultArea").innerHTML += operation;
    lastInputIsOperator = false;
  }
  else {
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
  // Evaluate the new expression with support for trigonometric functions, e, and pi
  let result = evalWithTrigAndSpecial(newCalculation.join(" "));
  resultContainer.innerHTML = result.toString(); // Convert result to string for display
}
// Evaluate the expression with support for trigonometric functions, e, and pi
function evalWithTrigAndSpecial(expression) {
  // Replace trigonometric functions with their calculated values
  expression = expression.replace(/sin/gi, "Math.sin");
  expression = expression.replace(/cos/gi, "Math.cos");
  expression = expression.replace(/tan/gi, "Math.tan");
  // Replace special numbers with their values
  expression = expression.replace(/e/gi, "Math.E");
  expression = expression.replace(/pi/gi, "Math.PI");
  expression = expression.replace('π', "Math.PI");
  console.log(expression);
  // Use eval to evaluate the modified expression
  return eval(expression);
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
  } else if (key === "Backspace") {
    deleteLast();
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  }
});
