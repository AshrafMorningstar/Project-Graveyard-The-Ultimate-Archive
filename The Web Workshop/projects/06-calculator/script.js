/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

let result = document.getElementById('result');

function append(val) {
    if (result.value === '0' && val !== '.') {
        result.value = val;
    } else {
        result.value += val;
    }
}

function clearScreen() {
    result.value = '';
}

function deleteChar() {
    result.value = result.value.slice(0, -1);
}

function calculate() {
    try {
        // Warning: eval() can be dangerous in untrusted environments.
        // For a simple calculator without user-generated code execution vulnerability, it's okay-ish.
        // But better to use a safer parser. For this demo, we'll keep it simple but sanitize.
        let expression = result.value.replace(/[^0-9+\-*/.%]/g, '');
        if (expression) {
            result.value = eval(expression);
        }
    } catch (error) {
        result.value = 'Error';
    }
}
