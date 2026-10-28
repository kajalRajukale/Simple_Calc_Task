
const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "Error") {
        display.value = "0";
    }

    if (display.value === "0" && value !== ".") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    if (display.value === "Error" || display.value.length <= 1) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        const expression = display.value;

        // Allow only basic arithmetic characters.
        if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
            throw new Error("Invalid expression");
        }

        // Convert percentage values to decimal values.
        const preparedExpression = expression.replace(
            /(\d+(?:\.\d+)?)%/g,
            "($1/100)"
        );

        const result = Function(
            '"use strict"; return (' + preparedExpression + ')'
        )();

        if (!Number.isFinite(result)) {
            throw new Error("Invalid result");
        }

        display.value = String(
            Math.round((result + Number.EPSILON) * 1e10) / 1e10
        );
    } catch {
        display.value = "Error";
    }
}
