/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: Personal Finance Dashboard
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Chart Initialization
    const ctx = document.getElementById('financeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Income',
                data: [4000, 4200, 4100, 4800, 4500, 4200],
                borderColor: '#10b981',
                tension: 0.4
            }, {
                label: 'Expenses',
                data: [1800, 1900, 2200, 1700, 2500, 1840],
                borderColor: '#ef4444',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // 2. Transaction List
    const transactions = [
        { name: "Apple Store", date: "Today", amount: -1299.00, type: "expense" },
        { name: "Freelance Client", date: "Yesterday", amount: 1500.00, type: "income" },
        { name: "Netflix", date: "Jun 12", amount: -15.00, type: "expense" },
        { name: "Grocery Market", date: "Jun 10", amount: -124.50, type: "expense" }
    ];

    const list = document.getElementById('tx-list');
    
    list.innerHTML = transactions.map(tx => `
        <li class="tx-item">
            <div class="tx-info">
                <h4>${tx.name}</h4>
                <span>${tx.date}</span>
            </div>
            <div class="tx-amount ${tx.type === 'income' ? 'positive' : 'negative'}">
                ${tx.amount > 0 ? '+' : ''}$${Math.abs(tx.amount).toFixed(2)}
            </div>
        </li>
    `).join('');
});
