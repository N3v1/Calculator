/*--------------------------------------------------------------------------------------
Calculator in HTML,CSS and JS - (c) 2023 NH (N3v1) - Use at your own risk, no warranty
--------------------------------------------------------------------------------------
*/

let lastInputIsOperator = false; // Variable to track the last input
// added a resize to fit font - ify47
const output = document.querySelector(".resultCalc");
const outputContainer = document.getElementById("result");
const defaultFontSize = 30; // Default font size

function resize_to_fit() {
  let fontSize = defaultFontSize;
  while (output.clientHeight > outputContainer.clientHeight && fontSize > 10) {
    fontSize--;
    output.style.fontSize = fontSize + "px";
  }
}

// Add an input event listener to monitor changes to the output container - ify47
output.addEventListener("input", resize_to_fit);
function appendTrigonometric(trigFunction) {
  //handle trigonometric expressions buttons
  const resultContainer = document.querySelector(".resultCalc");
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
      const resultContainer = document.querySelector(".resultCalc");
      resultContainer.innerHTML =
        resultContainer.innerHTML.slice(0, -3) + operation;
    } else {
      lastInputIsOperator = true;
      document.querySelector(".resultCalc").innerHTML += operation;
    }
  } else {
    lastInputIsOperator = false;
    document.querySelector(".resultCalc").innerHTML += operation;
  }
  // adding it to each function - ify47
  resize_to_fit();
}
function appendFunction(functionName) {
  const resultContainer = document.querySelector(".resultCalc");
  resultContainer.innerHTML += functionName + "(";
  lastInputIsOperator = true;
}
function appendDecimal(decimal) {
  // Prevent appending a decimal right after an operator
  if (!lastInputIsOperator) {
    // Reset lastInputIsOperator when a decimal is added
    lastInputIsOperator = false;

    // Rest of the function remains unchanged
    document.querySelector(".resultCalc").innerHTML += decimal;
  }
}

// Calculate and display the result of the expression
function calculateResult() {
  // Get containers for previous expression and result display
  const previousExpressionContainer =
    document.getElementById("previousExpression");
  const resultContainer = document.querySelector(".resultCalc");

  // Get the expression from the result display
  let expression = resultContainer.innerHTML;

  //Insert the current expression into the previousExpressionContainer on display
  previousExpressionContainer.innerHTML = expression;
  expression = expression.replace("π", "pi");
    // Replace the square root symbol with the Math.sqrt() method
    expression = expression.replace("√", "sqrt");
  console.log(expression);
  // Use the 'math.js' lib to first compile the expression and then evaluate it.
  let result = math.compile(expression).evaluate(); // Math.js - Compile(type 'string') then Evaluate() - returns number;
  resultContainer.innerHTML = result.toString(); // Convert result type 'number' to string for display
  resize_to_fit();
}

function deleteLast() {
  let container = document.querySelector(".resultCalc");
  if (container.innerHTML.endsWith(" ")) {
    container.innerHTML = container.innerHTML.slice(0, -3);
  } else {
    container.innerHTML = container.innerHTML.slice(0, -1);
  }
  let fontSize = parseFloat(window.getComputedStyle(output).fontSize);
  const maxFontSize = 30; // Maximum font size for deleteLast() within media query - ify47
  if (fontSize < maxFontSize) {
    fontSize++;
    output.style.fontSize = fontSize + "px";
  }
}

function clearResult() {
  let container = document.querySelector(".resultCalc");
  container.innerHTML = container.innerHTML.slice(0, 0);
  output.style.fontSize = "30px"; //adding maximum font size for clearResult - ify47
}

// Add a keydown event listener to the document
document.addEventListener("keydown", (event) => {
  // Get the pressed key
  const key = event.key;
  if (key === "%") {
    appendOperation(" % ");
  } else if (key === "e") {
    appendOperation("e");
  }else if (key==="^")
  {
    appendFunction("^")
  }
  else if (key === "s") {
    // Check if the next key pressed is "p"
    document.addEventListener("keydown", (nextEvent) => {
      if (nextEvent.key === "p") {
        appendFunction('&#8730;'); // Append "sprt" to the expression
        nextEvent.preventDefault(); // Prevent the default behavior of the "p" key
      }
    });
  }
   else if (key === "p") {
    //  Please note that this solution assumes that the calculator does not have any other functionality associated with the key combination "pi". If there are conflicting key combinations or additional requirements, further modifications may be neccessary
    // Check if the next key pressed is "i"
    document.addEventListener("keydown", (nextEvent) => {
      if (nextEvent.key === "i") {
        appendOperation("π"); // Append "pi" to the expression
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
