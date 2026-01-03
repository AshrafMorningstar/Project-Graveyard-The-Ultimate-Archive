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
 * Maintainer: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */


var buyTicket = document.getElementsByClassName("tour-button");
var modal = document.getElementById("modal");
var modalClose = document.getElementsByClassName("modal-close-button");
for(i=0;i<=2;i++){
    buyTicket[i].addEventListener("click",()=>{
        modal.style.display="block";
    })
}

for(i=0;i<=0;i++){
    modalClose[i].addEventListener("click",()=>{
        modal.style.display="none";
    })
}
document.querySelector('.search').addEventListener('click', function(event) {
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    
    event.stopPropagation();

    searchContainer.classList.toggle('active');
    searchInput.classList.toggle('active');

    if (searchInput.classList.contains('active')) {
        searchInput.focus();
    }
});

document.addEventListener('click', function(event) {
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');

    if (!searchContainer.contains(event.target) && searchInput.classList.contains('active')) {
        searchContainer.classList.remove('active');
        searchInput.classList.remove('active');
    }
});

function highlightText(searchTerm) {
    const elementsToSearch = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, div, span, li'); // Add more tags if necessary

    const searchRegex = new RegExp(`(${searchTerm})`, 'gi');

    elementsToSearch.forEach(element => {
        const innerHTML = element.innerHTML;

        const highlightedHTML = innerHTML.replace(searchRegex, '<span class="highlight">$1</span>');
        
        element.innerHTML = highlightedHTML;
    });
}

document.getElementById('search-input').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const searchTerm = event.target.value.trim();
        if (searchTerm) {
            highlightText(searchTerm);
        }
    }
});