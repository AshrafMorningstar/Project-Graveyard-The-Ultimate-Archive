/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * 404 Museum - Room Router
 * Author: Ashraf Morningstar
 * https://github.com/AshrafMorningstar
 * 
 * Handles navigation between error room experiences
 */

class MuseumRouter {
    constructor() {
        this.currentRoom = 'entrance';
        this.rooms = document.querySelectorAll('.room');
        this.init();
    }

    init() {
        // Set up navigation listeners
        this.setupNavigation();
        
        // Show entrance on load
        this.showRoom('entrance');
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            const room = e.state?.room || 'entrance';
            this.showRoom(room, false);
        });
    }

    setupNavigation() {
        // Room links
        const roomLinks = document.querySelectorAll('.room-link');
        roomLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetRoom = e.target.dataset.room;
                this.navigateToRoom(targetRoom);
            });
        });

        // Back buttons
        const backButtons = document.querySelectorAll('.back-btn');
        backButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetRoom = e.target.dataset.room;
                this.navigateToRoom(targetRoom);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.currentRoom !== 'entrance') {
                this.navigateToRoom('entrance');
            }
        });
    }

    navigateToRoom(roomId) {
        this.showRoom(roomId);
        
        // Update browser history
        const url = roomId === 'entrance' ? '/' : `#${roomId}`;
        history.pushState({ room: roomId }, '', url);
    }

    showRoom(roomId, updateHistory = true) {
        // Hide all rooms
        this.rooms.forEach(room => {
            room.classList.remove('active');
        });

        // Show target room
        const targetRoom = document.getElementById(roomId === 'entrance' ? 'entrance' : `room-${roomId}`);
        if (targetRoom) {
            targetRoom.classList.add('active');
            this.currentRoom = roomId;
            
            // Announce to screen readers
            this.announceRoomChange(roomId);
        }
    }

    announceRoomChange(roomId) {
        const announcements = {
            'entrance': 'Returned to museum entrance',
            '404': 'Entered 404 error room - Lost',
            '403': 'Entered 403 error room - Restricted',
            '500': 'Entered 500 error room - System Fatigue',
            'offline': 'Entered offline error room - Isolation',
            'timeout': 'Entered timeout error room - Anticipation'
        };

        const announcement = announcements[roomId] || 'Room changed';
        
        // Create or update live region for screen readers
        let liveRegion = document.getElementById('live-region');
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.id = 'live-region';
            liveRegion.setAttribute('role', 'status');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.style.position = 'absolute';
            liveRegion.style.left = '-10000px';
            liveRegion.style.width = '1px';
            liveRegion.style.height = '1px';
            liveRegion.style.overflow = 'hidden';
            document.body.appendChild(liveRegion);
        }
        
        liveRegion.textContent = announcement;
    }
}

// Initialize router when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MuseumRouter();
    });
} else {
    new MuseumRouter();
}
