/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/* 
   Project: Time-Traveling Journal
   Level: Beginner
   Author: Ashraf Morningstar
   GitHub: https://github.com/AshrafMorningstar
*/

const timeDial = document.getElementById('time-dial');
const jumpBtn = document.getElementById('jump-btn');
const body = document.body;
const journalTitle = document.getElementById('journal-title');
const eraBadge = document.getElementById('era-badge');
const saveBtn = document.getElementById('save-btn');
const clearBtn = document.getElementById('clear-btn');
const journalEntry = document.getElementById('journal-entry');
const entriesList = document.getElementById('entries-list');

// Load saved entries
loadEntries();

jumpBtn.addEventListener('click', () => {
    const year = parseInt(timeDial.value);
    travelToYear(year);
});

saveBtn.addEventListener('click', () => {
    const content = journalEntry.value;
    if (!content) return;

    const year = timeDial.value;
    const entry = {
        id: Date.now(),
        year: year,
        content: content,
        timestamp: new Date().toLocaleString()
    };

    saveEntry(entry);
    journalEntry.value = '';
    loadEntries();
});

clearBtn.addEventListener('click', () => {
    if(confirm('Are you sure you want to erase all timelines?')) {
        localStorage.removeItem('time_journal_entries');
        loadEntries();
    }
});

function travelToYear(year) {
    // Remove all theme classes
    body.classList.remove('theme-modern', 'theme-1920s', 'theme-1980s', 'theme-future', 'theme-ancient');
    
    let theme = 'theme-modern';
    let eraName = 'Modern Age';

    if (year < 1900) {
        theme = 'theme-ancient';
        eraName = 'The Great Beyond (Past)';
    } else if (year >= 1920 && year < 1940) {
        theme = 'theme-1920s';
        eraName = 'Roaring Twenties';
    } else if (year >= 1980 && year < 2000) {
        theme = 'theme-1980s';
        eraName = 'Neon Era';
    } else if (year >= 2000 && year < 2050) {
        theme = 'theme-modern';
        eraName = 'Information Age';
    } else if (year >= 2050) {
        theme = 'theme-future';
        eraName = 'Chromium Age';
    }

    body.classList.add(theme);
    journalTitle.innerText = `Chronicles of ${year}`;
    eraBadge.innerText = `Era: ${eraName}`;
    
    // Add jump animation effect
    body.style.opacity = '0';
    setTimeout(() => {
        body.style.opacity = '1';
    }, 500);
}

function saveEntry(entry) {
    let entries = JSON.parse(localStorage.getItem('time_journal_entries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('time_journal_entries', JSON.stringify(entries));
}

function loadEntries() {
    const entries = JSON.parse(localStorage.getItem('time_journal_entries') || '[]');
    entriesList.innerHTML = '';

    entries.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'entry-card';
        div.innerHTML = `
            <div class="entry-meta">
                <span>Year: ${entry.year}</span>
                <span>${entry.timestamp}</span>
            </div>
            <p>${entry.content}</p>
        `;
        entriesList.appendChild(div);
    });
}
