/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/*
Created & Maintained by Ashraf Morningstar
GitHub: https://github.com/AshrafMorningstar
*/

document.addEventListener('DOMContentLoaded', () => {
    const balance = document.getElementById('balance');
    const money_plus = document.getElementById('money-plus');
    const money_minus = document.getElementById('money-minus');
    const list = document.getElementById('list');
    const form = document.getElementById('form');
    const text = document.getElementById('text');
    const amount = document.getElementById('amount');
    const emptyMsg = document.getElementById('empty-msg');

    const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

    let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

    function addTransaction(e) {
        e.preventDefault();

        if (text.value.trim() === '' || amount.value.trim() === '') {
            alert('Please add a description and amount');
            return;
        }

        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value // Convert to number
        };

        transactions.push(transaction);

        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        text.value = '';
        amount.value = '';
    }

    function generateID() {
        return Math.floor(Math.random() * 100000000);
    }

    function addTransactionDOM(transaction) {
        const sign = transaction.amount < 0 ? '-' : '+';
        const item = document.createElement('li');

        item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

        item.innerHTML = `
            ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        `;
        
        // Setup delete event listener more safely than inline HTML onclick if needed, 
        // but for this snippet we need to expose removeTransaction window-globally or use event delegation.
        // We will use event delegation on the UL instead of onclick attribute to be cleaner.
        // Re-writing innerHTML without onclick:
        item.innerHTML = `
            ${transaction.text} <span>${sign}$${Math.abs(transaction.amount).toFixed(2)}</span>
            <button class="delete-btn">x</button>
        `;
        
        item.querySelector('.delete-btn').addEventListener('click', () => removeTransaction(transaction.id));

        list.appendChild(item);
    }

    function updateValues() {
        const amounts = transactions.map(transaction => transaction.amount);

        const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
        const income = amounts.filter(item => item > 0).reduce((acc, item) => (acc += item), 0).toFixed(2);
        const expense = (amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

        balance.innerText = `$${total}`;
        money_plus.innerText = `+$${income}`;
        money_minus.innerText = `-$${expense}`;

        // Empty state
        if (transactions.length === 0) {
            emptyMsg.style.display = 'block';
        } else {
            emptyMsg.style.display = 'none';
        }
    }

    function removeTransaction(id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        updateLocalStorage();
        init();
    }

    function updateLocalStorage() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    function init() {
        list.innerHTML = '';
        transactions.forEach(addTransactionDOM);
        updateValues();
    }

    init();
    form.addEventListener('submit', addTransaction);
});
