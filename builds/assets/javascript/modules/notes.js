export class NotesManager {
    constructor(storageManager) {
        this.storage = storageManager;
        this.noteInput = document.getElementById('note-input');
        this.debounceTimer = null;
    }

    init() {
        const savedNote = localStorage.getItem('user_notes');
        if (savedNote) {
            this.noteInput.value = savedNote;
        }

        this.noteInput.addEventListener('input', () => {
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
                localStorage.setItem('user_notes', this.noteInput.value);
            }, 500);
        });
    }
}
