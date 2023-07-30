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
    container.innerHTML = container.innerHTML.slice(0, -1);
}