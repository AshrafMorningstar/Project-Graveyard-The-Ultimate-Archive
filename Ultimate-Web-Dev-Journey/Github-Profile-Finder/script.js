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

const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('profile');
const form = document.querySelector('.form');
const search = document.getElementById('search');
const btn = document.getElementById('btn');

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username);
        createUserCard(data);
        getRepos(username);
    } catch(err) {
        if(err.response.status == 404) {
            createErrorCard('No profile with this username');
        }
    }
}

async function getRepos(username) {
    try {
        const { data } = await axios(APIURL + username + '/repos?sort=created');
        addReposToCard(data);
    } catch(err) {
        createErrorCard('Problem fetching repos');
    }
}

function createUserCard(user) {
    const cardHTML = `
    <div class="card">
        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
        </div>
        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            <ul>
                <li>${user.followers} <strong>Followers</strong></li>
                <li>${user.following} <strong>Following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>
            <div id="repos"></div>
        </div>
    </div>
    `;
    main.innerHTML = cardHTML;
}

function createErrorCard(msg) {
    const cardHTML = `
        <div class="card">
            <h1>${msg}</h1>
        </div>
    `;
    main.innerHTML = cardHTML;
}

function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');
    repos
        .slice(0, 5)
        .forEach(repo => {
            const repoEl = document.createElement('a');
            repoEl.classList.add('repo');
            repoEl.href = repo.html_url;
            repoEl.target = '_blank';
            repoEl.innerText = repo.name;
            reposEl.appendChild(repoEl);
        });
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;
    if(user) {
        getUser(user);
        search.value = '';
    }
});

btn.addEventListener('click', (e) => {
     const user = search.value;
    if(user) {
        getUser(user);
        search.value = '';
    }
})

// Created by Ashraf Morningstar - https://github.com/AshrafMorningstar
// Note: This requires Axios. We'll add it via CDN in index.html in a real scenario, but for now assuming it's there or user adds it.

// 🤣 Fun Fact: This project was built with 99% caffeine and 1% code.
console.log("%cThis project was built with 99% caffeine and 1% code.", "color: #6C63FF; font-size: 20px; font-weight: bold;");
