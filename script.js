document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                // Clear everything
                currentInput = '';
                operator = '';
                previousInput = '';
                display.innerText = '0';
            } else if (value === '=') {
                // Perform calculation
                if (currentInput && operator && previousInput) {
                    currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                    display.innerText = currentInput;
                    operator = '';
                    previousInput = '';
                }
            } else if (this.classList.contains('operator')) {
                // Handle operators
                if (currentInput) {
                    if (previousInput && operator) {
                        // Chain calculations
                        currentInput = calculate(parseFloat(previousInput), parseFloat(currentInput), operator).toString();
                        display.innerText = currentInput;
                    }
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                }
            } else {
                // Handle numbers and decimal
                if (value === '.' && currentInput.includes('.')) return; // Prevent multiple decimals
                currentInput += value;
                display.innerText = currentInput;
            }
        });
    });

    function calculate(a, b, op) {
        switch(op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
            default: return b;
        }
    }
});