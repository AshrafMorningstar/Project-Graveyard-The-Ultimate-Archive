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

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const playPauseBtn = document.querySelector('.play-pause');
    const progressBar = document.querySelector('.progress-bar');
    const currTimeEl = document.querySelector('.curr-time');
    const totalTimeEl = document.querySelector('.total-time');
    const greetingEl = document.querySelector('#greeting');
    const contentScroll = document.querySelector('.content-scroll');
    const topBar = document.querySelector('.top-bar');
    const trackListContainer = document.querySelector('#track-list-container');
    
    // State
    let isPlaying = false;
    let progress = 30; // 30%
    let intervalId;

    // Greeting Logic
    const hour = new Date().getHours();
    if (hour < 12) greetingEl.textContent = 'Good morning';
    else if (hour < 18) greetingEl.textContent = 'Good afternoon';
    else greetingEl.textContent = 'Good evening';

    // Mock Data for Tracks
    const tracks = [
        { id: 1, title: "Null Pointer Exception", artist: "Java & The JVMs", album: "Runtime Errors", duration: "3:42", img: "gradient-1" },
        { id: 2, title: "Infinite Loop", artist: "While(True)", album: "CPU Meltdown", duration: "4:20", img: "gradient-2" },
        { id: 3, title: "Git Push Force", artist: "Master Branch", album: "Merge Conflict", duration: "2:15", img: "gradient-3" },
        { id: 4, title: "CSS is Awesome", artist: "The Overflows", album: "Display: None", duration: "3:10", img: "gradient-4" },
        { id: 5, title: "Database Locked", artist: "SQL Injection", album: "Deadlock", duration: "5:05", img: "gradient-5" },
        { id: 6, title: "404 Not Found", artist: "The Servers", album: "Bad Gateway", duration: "1:55", img: "gradient-6" },
    ];

    // Render Tracks
    if (trackListContainer) {
        trackListContainer.innerHTML = tracks.map((track, index) => `
            <div class="track-row">
                <div class="track-num">${index + 1}</div>
                <div class="track-main">
                    <div class="card-img-placeholder ${track.img}" style="width:40px; height:40px; font-size:12px; border-radius:4px;">♫</div>
                    <div class="track-detail">
                        <span style="color:white; font-weight:500;">${track.title}</span>
                        <span class="track-artist">${track.artist}</span>
                    </div>
                </div>
                <div class="track-album">${track.album}</div>
                <div class="track-duration">${track.duration}</div>
            </div>
        `).join('');
    }

    // Scroll Effect for Header
    if (contentScroll) {
        contentScroll.addEventListener('scroll', () => {
            if (contentScroll.scrollTop > 50) {
                topBar.style.backgroundColor = 'rgba(0,0,0,0.9)';
            } else {
                topBar.style.backgroundColor = 'rgba(0,0,0,0.5)';
            }
        });
    }

    // Play/Pause Simulation
    playPauseBtn.addEventListener('click', togglePlay);

    function togglePlay() {
        isPlaying = !isPlaying;
        updatePlayButton();
        if (isPlaying) {
            startProgress();
        } else {
            stopProgress();
        }
    }

    function updatePlayButton() {
        playPauseBtn.textContent = isPlaying ? '⏸' : '▶';
        // Minor "pop" animation handling if we added class classes
    }

    function startProgress() {
        intervalId = setInterval(() => {
            progress += 0.5;
            if (progress > 100) {
                progress = 0;
                togglePlay(); // Stop at end
            }
            if (progressBar) progressBar.style.width = `${progress}%`;
            updateTimeDisplay();
        }, 500);
    }

    function stopProgress() {
        clearInterval(intervalId);
    }

    function updateTimeDisplay() {
        // Mock time update logic (just proportional for demo)
        const totalSeconds = 222; // 3:42
        const currentSeconds = Math.floor((progress / 100) * totalSeconds);
        const mins = Math.floor(currentSeconds / 60);
        const secs = currentSeconds % 60;
        currTimeEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Add interactivity to track rows
    document.querySelectorAll('.track-row').forEach(row => {
        row.addEventListener('click', () => {
            // Select track visual
            document.querySelectorAll('.track-row').forEach(r => r.style.backgroundColor = 'transparent');
            row.style.backgroundColor = 'rgba(255,255,255,0.1)';
            
            // Update player bar info (mock)
            const title = row.querySelector('.track-detail span:first-child').textContent;
            const artist = row.querySelector('.track-artist').textContent;
            document.querySelector('.track-name').textContent = title;
            document.querySelector('.artist-name').textContent = artist;
            
            // Auto play
            if (!isPlaying) togglePlay();
            progress = 0; // restart
            progressBar.style.width = '0%';
        });
    });

    // Hover effects play button
    document.querySelectorAll('.play-hover-btn, .play-btn-large').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePlay();
        });
    });
});
