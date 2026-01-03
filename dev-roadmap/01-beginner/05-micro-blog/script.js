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
 * Project: Micro-Blog Card Layout
 */

document.addEventListener('DOMContentLoaded', () => {
    const feedContainer = document.getElementById('feed-container');

    const posts = [
        {
            user: "Alice Coder",
            handle: "@alice_dev",
            content: "Just shipped my first React app! 🚀 The component lifecycle is finally clicking for me.",
            likes: 42,
            type: "text",
            size: "normal"
        },
        {
            user: "Bob Design",
            handle: "@bobby_ui",
            content: "Glassmorphism is here to stay. Check out this gradient overlay I made today.",
            likes: 128,
            type: "image",
            size: "wide" // Spans 2 cols
        },
        {
            user: "Charlie Script",
            handle: "@js_wizard",
            content: "Why does `[] + {}` equal `[object Object]` but `{} + []` equal `0`? JavaScript is wild! 😂",
            likes: 350,
            type: "text",
            size: "tall" // Spans 2 rows
        },
        {
            user: "Dana Databases",
            handle: "@sql_queen",
            content: "Normalization is key. Don't repeat yourself, even in your DB schema.",
            likes: 89,
            type: "text",
            size: "normal"
        },
        {
            user: "Ethan Tech",
            handle: "@ethan_stack",
            content: "Spending the weekend learning Rust. The borrow checker is my new best friend (and enemy).",
            likes: 56,
            type: "text",
            size: "normal"
        }
    ];

    function renderPosts() {
        feedContainer.innerHTML = posts.map(post => `
            <div class="card ${post.size === 'wide' ? 'wide-card' : ''} ${post.size === 'tall' ? 'tall-card' : ''}">
                <div class="card-header">
                    <div class="avatar">${post.user[0]}</div>
                    <div class="user-info">
                        <h4>${post.user}</h4>
                        <span>${post.handle}</span>
                    </div>
                </div>
                <div class="card-body">
                    ${post.type === 'image' ? '<div class="card-image" style="background: linear-gradient(120deg, #84fab0, #8fd3f4);"></div>' : ''}
                    <p>${post.content}</p>
                </div>
                <div class="card-footer">
                    <span class="action-btn"><i class="far fa-comment"></i> 4</span>
                    <span class="action-btn"><i class="fas fa-retweet"></i> 2</span>
                    <span class="action-btn"><i class="far fa-heart"></i> ${post.likes}</span>
                    <span class="action-btn"><i class="far fa-share-square"></i></span>
                </div>
            </div>
        `).join('');
    }

    renderPosts();

    // New Post Interaction
    document.getElementById('new-post-btn').addEventListener('click', () => {
        alert("Compose feature coming soon!");
    });
});
