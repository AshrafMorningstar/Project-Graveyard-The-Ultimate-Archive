#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

"""
PART 2: Additional Project Implementations
Author: Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
"""

# This file extends the main generator with more project implementations

def create_weight_converter():
    html_body = """
            <div class="input-group">
                <label for="weight">Weight:</label>
                <input type="number" id="weight" placeholder="Enter weight" step="0.01" required>
            </div>
            <div class="input-group">
                <label for="from">From:</label>
                <select id="from">
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lb">Pounds (lb)</option>
                    <option value="oz">Ounces (oz)</option>
                    <option value="g">Grams (g)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="to">To:</label>
                <select id="to">
                    <option value="lb">Pounds (lb)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="oz">Ounces (oz)</option>
                    <option value="g">Grams (g)</option>
                </select>
            </div>
            <button onclick="convertWeight()">Convert</button>
            <div id="result" class="result" style="display:none;"></div>
    """
    
    js_code = """
const conversions = {
    kg: 1,
    lb: 2.20462,
    oz: 35.274,
    g: 1000
};

function convertWeight() {
    const weight = parseFloat(document.getElementById('weight').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const resultDiv = document.getElementById('result');
    
    if (isNaN(weight)) {
        alert('Please enter a valid weight');
        return;
    }
    
    const inKg = weight / conversions[from];
    const result = inKg * conversions[to];
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<h3>${weight} ${from} = ${result.toFixed(4)} ${to}</h3>`;
}
"""
    
    return html_body, js_code

def create_height_converter():
    html_body = """
            <div class="input-group">
                <label for="height">Height:</label>
                <input type="number" id="height" placeholder="Enter height" step="0.01" required>
            </div>
            <div class="input-group">
                <label for="from">From:</label>
                <select id="from">
                    <option value="cm">Centimeters (cm)</option>
                    <option value="m">Meters (m)</option>
                    <option value="ft">Feet (ft)</option>
                    <option value="in">Inches (in)</option>
                </select>
            </div>
            <div class="input-group">
                <label for="to">To:</label>
                <select id="to">
                    <option value="ft">Feet (ft)</option>
                    <option value="cm">Centimeters (cm)</option>
                    <option value="m">Meters (m)</option>
                    <option value="in">Inches (in)</option>
                </select>
            </div>
            <button onclick="convertHeight()">Convert</button>
            <div id="result" class="result" style="display:none;"></div>
    """
    
    js_code = """
const heightConversions = {
    cm: 1,
    m: 0.01,
    ft: 0.0328084,
    in: 0.393701
};

function convertHeight() {
    const height = parseFloat(document.getElementById('height').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const resultDiv = document.getElementById('result');
    
    if (isNaN(height)) {
        alert('Please enter a valid height');
        return;
    }
    
    const inCm = height / heightConversions[from];
    const result = inCm * heightConversions[to];
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `<h3>${height} ${from} = ${result.toFixed(4)} ${to}</h3>`;
}
"""
    
    return html_body, js_code

def create_loan_calculator():
    html_body = """
            <div class="input-group">
                <label for="principal">Loan Amount ($):</label>
                <input type="number" id="principal" placeholder="Enter loan amount" required>
            </div>
            <div class="input-group">
                <label for="rate">Annual Interest Rate (%):</label>
                <input type="number" id="rate" placeholder="Enter interest rate" step="0.01" required>
            </div>
            <div class="input-group">
                <label for="years">Loan Term (years):</label>
                <input type="number" id="years" placeholder="Enter loan term" required>
            </div>
            <button onclick="calculateLoan()">Calculate</button>
            <div id="result" class="result" style="display:none;"></div>
    """
    
    js_code = """
function calculateLoan() {
    const principal = parseFloat(document.getElementById('principal').value);
    const annualRate = parseFloat(document.getElementById('rate').value);
    const years = parseFloat(document.getElementById('years').value);
    const resultDiv = document.getElementById('result');
    
    if (!principal || !annualRate || !years) {
        alert('Please fill all fields');
        return;
    }
    
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = years * 12;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPayment = monthlyPayment * numPayments;
    const totalInterest = totalPayment - principal;
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>Loan Summary:</h3>
        <p>Monthly Payment: <strong>$${monthlyPayment.toFixed(2)}</strong></p>
        <p>Total Payment: <strong>$${totalPayment.toFixed(2)}</strong></p>
        <p>Total Interest: <strong>$${totalInterest.toFixed(2)}</strong></p>
    `;
}
"""
    
    return html_body, js_code

def create_compound_interest():
    html_body = """
            <div class="input-group">
                <label for="principal">Principal Amount ($):</label>
                <input type="number" id="principal" placeholder="Initial investment" required>
            </div>
            <div class="input-group">
                <label for="rate">Annual Interest Rate (%):</label>
                <input type="number" id="rate" placeholder="Interest rate" step="0.01" required>
            </div>
            <div class="input-group">
                <label for="time">Time Period (years):</label>
                <input type="number" id="time" placeholder="Investment duration" required>
            </div>
            <div class="input-group">
                <label for="compound">Compound Frequency:</label>
                <select id="compound">
                    <option value="1">Annually</option>
                    <option value="2">Semi-annually</option>
                    <option value="4">Quarterly</option>
                    <option value="12">Monthly</option>
                    <option value="365">Daily</option>
                </select>
            </div>
            <button onclick="calculateCompound()">Calculate</button>
            <div id="result" class="result" style="display:none;"></div>
    """
    
    js_code = """
function calculateCompound() {
    const P = parseFloat(document.getElementById('principal').value);
    const r = parseFloat(document.getElementById('rate').value) / 100;
    const t = parseFloat(document.getElementById('time').value);
    const n = parseFloat(document.getElementById('compound').value);
    const resultDiv = document.getElementById('result');
    
    if (!P || !r || !t) {
        alert('Please fill all fields');
        return;
    }
    
    const A = P * Math.pow((1 + r/n), n*t);
    const interest = A - P;
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>Investment Results:</h3>
        <p>Initial Principal: <strong>$${P.toFixed(2)}</strong></p>
        <p>Final Amount: <strong>$${A.toFixed(2)}</strong></p>
        <p>Total Interest Earned: <strong>$${interest.toFixed(2)}</strong></p>
        <p>ROI: <strong>${((interest/P)*100).toFixed(2)}%</strong></p>
    `;
}
"""
    
    return html_body, js_code

def create_vat_calculator():
    html_body = """
            <div class="input-group">
                <label for="amount">Amount ($):</label>
                <input type="number" id="amount" placeholder="Enter amount" step="0.01" required>
            </div>
            <div class="input-group">
                <label for="vat">VAT Rate (%):</label>
                <input type="number" id="vat" placeholder="Enter VAT rate" value="20" step="0.01" required>
            </div>
            <div class="input-group">
                <label>Calculation Type:</label>
                <select id="type">
                    <option value="add">Add VAT</option>
                    <option value="remove">Remove VAT</option>
                </select>
            </div>
            <button onclick="calculateVAT()">Calculate</button>
            <div id="result" class="result" style="display:none;"></div>
    """
    
    js_code = """
function calculateVAT() {
    const amount = parseFloat(document.getElementById('amount').value);
    const vatRate = parseFloat(document.getElementById('vat').value) / 100;
    const type = document.getElementById('type').value;
    const resultDiv = document.getElementById('result');
    
    if (!amount || !vatRate) {
        alert('Please enter valid values');
        return;
    }
    
    let vatAmount, total, netAmount;
    
    if (type === 'add') {
        netAmount = amount;
        vatAmount = amount * vatRate;
        total = amount + vatAmount;
    } else {
        total = amount;
        netAmount = amount / (1 + vatRate);
        vatAmount = amount - netAmount;
    }
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>VAT Breakdown:</h3>
        <p>Net Amount: <strong>$${netAmount.toFixed(2)}</strong></p>
        <p>VAT Amount: <strong>$${vatAmount.toFixed(2)}</strong></p>
        <p>Total (inc. VAT): <strong>$${total.toFixed(2)}</strong></p>
    `;
}
"""
    
    return html_body, js_code

def create_exchange_rate():
    html_body = """
            <div class="input-group">
                <label for="amount">Amount:</label>
                <input type="number" id="amount" placeholder="Enter amount" step="0.01" value="100" required>
            </div>
            <div class="input-group">
                <label for="from">From Currency:</label>
                <select id="from">
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                </select>
            </div>
            <div class="input-group">
                <label for="to">To Currency:</label>
                <select id="to">
                    <option value="EUR">EUR - Euro</option>
                    <option value="USD">USD - US Dollar</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="INR">INR - Indian Rupee</option>
                    <option value="AUD">AUD - Australian Dollar</option>
                    <option value="CAD">CAD - Canadian Dollar</option>
                </select>
            </div>
            <button onclick="convertCurrency()">Convert</button>
            <div id="result" class="result" style="display:none;"></div>
            <p style="text-align:center; color: var(--text-secondary); font-size:0.9rem; margin-top:1rem;">
                Note: Using approximate exchange rates for demonstration
            </p>
    """
    
    js_code = """
// Approximate exchange rates (base: USD)
const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 149.50,
    INR: 83.12,
    AUD: 1.52,
    CAD: 1.36
};

function convertCurrency() {
    const amount = parseFloat(document.getElementById('amount').value);
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const resultDiv = document.getElementById('result');
    
    if (!amount) {
        alert('Please enter an amount');
        return;
    }
    
    // Convert to USD first, then to target currency
    const inUSD = amount / rates[from];
    const result = inUSD * rates[to];
    const rate = rates[to] / rates[from];
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>${amount.toFixed(2)} ${from} =</h3>
        <h2 style="color: #667eea; font-size: 2rem;">${result.toFixed(2)} ${to}</h2>
        <p>Exchange Rate: 1 ${from} = ${rate.toFixed(4)} ${to}</p>
    `;
}
"""
    
    return html_body, js_code

def create_lcm_hcf():
    html_body = """
            <div class="input-group">
                <label for="num1">First Number:</label>
                <input type="number" id="num1" placeholder="Enter first number" required>
            </div>
            <div class="input-group">
                <label for="num2">Second Number:</label>
                <input type="number" id="num2" placeholder="Enter second number" required>
            </div>
            <button onclick="calculate()">Calculate LCM & HCF</button>
            <div id="result" class="result" style="display:none;"></div>
    """
    
    js_code = """
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

function calculate() {
    const num1 = parseInt(document.getElementById('num1').value);
    const num2 = parseInt(document.getElementById('num2').value);
    const resultDiv = document.getElementById('result');
    
    if (!num1 || !num2 || num1 <= 0 || num2 <= 0) {
        alert('Please enter valid positive numbers');
        return;
    }
    
    const hcf = gcd(num1, num2);
    const lcmValue = lcm(num1, num2);
    
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>Results for ${num1} and ${num2}:</h3>
        <p>HCF (GCD): <strong>${hcf}</strong></p>
        <p>LCM: <strong>${lcmValue}</strong></p>
    `;
}
"""
    
    return html_body, js_code

# Export all functions
ADDITIONAL_PROJECTS = {
    "Calculators-Converters": [
        {"name": "Weight Converter", "desc": "Convert between different weight units", "func": create_weight_converter},
        {"name": "Height Converter", "desc": "Convert between different height units", "func": create_height_converter},
        {"name": "Loan Calculator", "desc": "Calculate loan payments and interest", "func": create_loan_calculator},
        {"name": "Compound Interest Calculator", "desc": "Calculate compound interest on investments", "func": create_compound_interest},
        {"name": "VAT Calculator", "desc": "Calculate VAT/Tax on amounts", "func": create_vat_calculator},
        {"name": "Exchange Rate Calculator", "desc": "Convert between different currencies", "func": create_exchange_rate},
        {"name": "LCM-HCF Calculator", "desc": "Calculate LCM and HCF of two numbers", "func": create_lcm_hcf},
    ]
}
