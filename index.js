/*
--------------------------------------------------------------------------------------
Calculator in HTML,CSS and JS - (c) 2023 NH (N3v1) - Use at your own risk, no warranty
--------------------------------------------------------------------------------------
*/

function appendOperation(operation) {
    document.getElementById('resultArea').innerHTML +=operation;
}

function calculateResult() {
    let container = document.getElementById('resultArea');
    let result = eval(container.innerHTML);

    container.innerHTML = result;
}

function deleteLast() {
    let container = document.getElementById('resultArea');
    if(container.innerHTML.endsWith(' ')) {
        container.innerHTML = container.innerHTML.slice(0, -3);
    } else {
        container.innerHTML = container.innerHTML.slice(0, -1);
    }
}