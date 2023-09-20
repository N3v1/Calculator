/*--------------------------------------------------------------------------------------
Calculator in HTML,CSS and JS - (c) 2023 NH (N3v1) - Use at your own risk, no warranty
--------------------------------------------------------------------------------------
*/

let lastInputIsOperator = false; // Variable to track the last input
let validPutOperator = false;
// added a resize to fit font - ify47
const output = document.querySelector('.resultCalc');
const outputContainer = document.getElementById('result');
const defaultFontSize = 30; // Default font size

function resize_to_fit() {
  let fontSize = defaultFontSize;
  while (output.clientHeight > outputContainer.clientHeight && fontSize > 10) {
    fontSize--;
    output.style.fontSize = fontSize + 'px';
  }
}

// Add an input event listener to monitor changes to the output container - ify47
output.addEventListener('input', resize_to_fit);
function appendTrigonometric(trigFunction) {
  //handle trigonometric expressions buttons
  const resultContainer = document.querySelector('.resultCalc');
  resultContainer.innerHTML += trigFunction + ' ' + '(';
  lastInputIsOperator = false;
  validPutOperator = false;
}
function appendOperation(operation) {
  if (!validPutOperator && operation === ' * ' ||
    operation === ' / ' || operation === '%')
    return;
  if (
    operation === ' . ' ||
    operation === ' + ' ||
    operation === ' - ' ||
    operation === ' * ' ||
    operation === ' / ' ||
    operation === '%'
  ) {
    if (lastInputIsOperator) {
      // Replace the last operator with the new one
      const resultContainer = document.querySelector('.resultCalc');
      resultContainer.innerHTML =
        resultContainer.innerHTML.slice(0, -3) + operation;
    } else {
      lastInputIsOperator = true;
      document.querySelector('.resultCalc').innerHTML += operation;
    }
  } else {
    lastInputIsOperator = false;
    validPutOperator=true;
    document.querySelector('.resultCalc').innerHTML += operation;
  }
  // adding it to each function - ify47
  resize_to_fit();
}
function appendFunction(functionName) {
  if (functionName === '^' && !validPutOperator)
    return;
  const resultContainer = document.querySelector('.resultCalc');
  resultContainer.innerHTML += functionName + '(';
  lastInputIsOperator = true;
}
function appendDecimal(decimal) {
  // Prevent appending a decimal right after an operator
  // Prevent appending a decimal right after an operator
  // 2*.4 is valid(decimal is right after operator ) so I don't think we need to do so. Instead we should stop repeated decimal and prevent appending operator right after decimal

  //algorithm below will counter the condition like "21.3.24.4" or "4....445" 0r 8*.3.2

  let presentOperators = "";
  let numbersI = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  for (let i = 0; i < output.innerText.length; i++) {
    if (!numbersI.includes(output.innerText[i])) {
      presentOperators += output.innerText[i];

    }

  }
  lastInputIsOperator = presentOperators[presentOperators.length - 1] == "."

  //to do remove the decimal when operator is added just after it to counter 2.*3 .

  if (!lastInputIsOperator) {
    // Reset lastInputIsOperator when a decimal is added
    lastInputIsOperator = false;

    // Rest of the function remains unchanged
    document.querySelector('.resultCalc').innerHTML += decimal;
  }
}
function addClothingParenthesis(expression) {
  const openParenCount = (expression.match(/\(/g) || []).length; // Check how many opening parentheses exist
  const closeParenCount = (expression.match(/\)/g) || []).length; // Check how many closing parentheses exist
  if (openParenCount > closeParenCount) {
    expression += ')'.repeat(openParenCount - closeParenCount); // Add all the missing closing parentheses
  }
  return expression;
}
// Calculate and display the result of the expression
function calculateResult() {
  // Get containers for previous expression and result display
  const previousExpressionContainer =
    document.getElementById('previousExpression');
  const resultContainer = document.querySelector('.resultCalc');

  // Get the expression from the result display
  let expression = resultContainer.innerHTML;
  //Insert the current expression into the previousExpressionContainer on display
  previousExpressionContainer.innerHTML = expression;
  expression = expression.replace('π', 'pi');
  // Replace the square root symbol with the Math.sqrt() method
  expression = expression.replace('√', 'sqrt');
  expression = addClothingParenthesis(expression);
  console.log(expression);
  // Use the 'math.js' lib to first compile the expression and then evaluate it.
  let result = math.compile(expression).evaluate(); // Math.js - Compile(type 'string') then Evaluate() - returns number;
  resultContainer.innerHTML = result.toString(); // Convert result type 'number' to string for display
  resize_to_fit();
}

function deleteLast() {
  let container = document.querySelector('.resultCalc');
  if (container.innerHTML.endsWith(' ')) {
    container.innerHTML = container.innerHTML.slice(0, -3);
  } else {
    container.innerHTML = container.innerHTML.slice(0, -1);
  }
  let fontSize = parseFloat(window.getComputedStyle(output).fontSize);
  const maxFontSize = 30; // Maximum font size for deleteLast() within media query - ify47
  if (fontSize < maxFontSize) {
    fontSize++;
    output.style.fontSize = fontSize + 'px';
  }
}

function clearResult() {
  let container = document.querySelector('.resultCalc');
  container.innerHTML = container.innerHTML.slice(0, 0);
  output.style.fontSize = '30px'; //adding maximum font size for clearResult - ify47
  validPutOperator=false;
}

let previous_key; // This would store the previouw key that was being pressed 

// Add a keydown event listener to the document
document.addEventListener('keydown', (event) => {
  // Get the pressed key
  const key = event.key;
  
  // When presing on of the F keys (F1 through F12) log the key to the console -v1.1 - Jiri132
  // And return from the function so that it won't get executed
  if (/F[1-9.]/.test(key)) {
    //console.log(/F[1-9.]/.test(key),key)
    return;
  }
  
  if (key === '%') {
    appendOperation(' % ');
  } else if (key === 'e') {
    appendOperation('e');
  } else if (key === '^') {
    appendFunction('^');
  } else if (previous_key === "s" && key === 'p') { // Changing these functions from using new eventlistener it would instantiate a new event listener what caused the duplication of the PI's and SQRT's  - Jiri132
    // Check if the next key pressed is "p"
    appendFunction('&#8730;'); // Append "sprt" to the expression
    event.preventDefault(); // Prevent the default behavior of the "p" key
      
  } else if (previous_key === "p" && key === "i") {
    //  Please note that this solution assumes that the calculator does not have any other functionality associated with the key combination "pi". If there are conflicting key combinations or additional requirements, further modifications may be neccessary
    // Check if the next key pressed is "i"
    appendOperation('π'); // Append "pi" to the expression
    event.preventDefault(); // Prevent the default behavior of the "i" key
      
  } else if (/[0-9.]/.test(key)) {
    appendOperation(key);
  } else if (/[+\-*/]/.test(key)) {
    appendOperation(` ${key} `);
  } else if (key === 'Backspace' || key === 'Delete') {
    deleteLast();
  } else if (key === 'Enter' || key === '=') {
    calculateResult();
  }

  previous_key = key; // Store the pressed key in the variable
});

document.addEventListener('keydown', function (event) {
  if ((event.keyCode === 8 || event.keyCode === 46) && event.ctrlKey) {
    clearResult();
  }
});
