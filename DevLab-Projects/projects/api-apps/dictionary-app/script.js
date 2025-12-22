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
    const inputWord = document.getElementById('input-word');
    const searchBtn = document.getElementById('search-btn');
    const result = document.getElementById('result');
    const error = document.getElementById('error');
    const wordEl = document.getElementById('word');
    const phoneticEl = document.getElementById('phonetic');
    const meaningsEl = document.getElementById('meanings');
    const audioBtn = document.getElementById('audio-btn');
    const audio = document.getElementById('audio');

    searchBtn.addEventListener('click', fetchWord);
    inputWord.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') fetchWord();
    });

    audioBtn.addEventListener('click', () => {
        if (audio.src) audio.play();
    });

    async function fetchWord() {
        const word = inputWord.value.trim().toLowerCase();
        if (!word) return;

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            
            if (!response.ok) {
                throw new Error('Word not found');
            }

            const data = await response.json();
            displayResult(data[0]);
        } catch (err) {
            showError();
        }
    }

    function displayResult(data) {
        error.classList.add('hidden');
        result.classList.remove('hidden');

        // Word and Phonetic
        wordEl.textContent = data.word;
        phoneticEl.textContent = data.phonetic || '';

        // Audio
        const audioUrl = data.phonetics.find(p => p.audio)?.audio;
        if (audioUrl) {
            audio.src = audioUrl;
            audioBtn.style.display = 'block';
        } else {
            audioBtn.style.display = 'none';
        }

        // Meanings
        meaningsEl.innerHTML = '';
        data.meanings.forEach(meaning => {
            const group = document.createElement('div');
            group.className = 'meaning-group';

            const pos = document.createElement('div');
            pos.className = 'part-of-speech';
            pos.textContent = meaning.partOfSpeech;
            group.appendChild(pos);

            const defList = document.createElement('ul');
            defList.className = 'definitions';

            meaning.definitions.slice(0, 3).forEach(def => {
                const li = document.createElement('li');
                li.textContent = def.definition;
                defList.appendChild(li);
            });

            group.appendChild(defList);
            meaningsEl.appendChild(group);
        });
    }

    function showError() {
        result.classList.add('hidden');
        error.classList.remove('hidden');
    }

    // Load default word on start
    fetchWord();
});
