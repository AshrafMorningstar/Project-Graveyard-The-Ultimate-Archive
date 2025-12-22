/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Room Router
 * Manages navigation between error rooms
 */

class RoomRouter {
    constructor() {
        this.rooms = document.querySelectorAll('.error-room');
        this.buttons = document.querySelectorAll('.room-btn');
        this.currentRoom = '404';
        
        this.init();
    }
    
    init() {
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetRoom = btn.dataset.room;
                this.navigateToRoom(targetRoom);
            });
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            const roomsArray = ['404', '403', '500', 'offline'];
            const currentIndex = roomsArray.indexOf(this.currentRoom);
            
            if (e.key === 'ArrowRight') {
                const nextIndex = (currentIndex + 1) % roomsArray.length;
                this.navigateToRoom(roomsArray[nextIndex]);
            } else if (e.key === 'ArrowLeft') {
                const prevIndex = (currentIndex - 1 + roomsArray.length) % roomsArray.length;
                this.navigateToRoom(roomsArray[prevIndex]);
            }
        });
        
        console.log('🏛️ 404 Museum initialized');
    }
    
    navigateToRoom(roomName) {
        if (roomName === this.currentRoom) return;
        
        // Update rooms
        this.rooms.forEach(room => {
            if (room.dataset.room === roomName) {
                room.classList.add('active');
            } else {
                room.classList.remove('active');
            }
        });
        
        // Update buttons
        this.buttons.forEach(btn => {
            if (btn.dataset.room === roomName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        this.currentRoom = roomName;
        console.log(`🚪 Entered room: ${roomName}`);
    }
}

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new RoomRouter();
    });
} else {
    new RoomRouter();
}
