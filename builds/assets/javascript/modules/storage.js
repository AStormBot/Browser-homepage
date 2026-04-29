export class StorageManager {
    constructor() {
        this.dbName = 'BrowserHomepageDB';
        this.storeName = 'backgrounds';
        this.db = null;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1);

            request.onerror = (event) => {
                console.error("IndexedDB error:", event);
                reject("IndexedDB error");
            };

            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                if (!this.db.objectStoreNames.contains(this.storeName)) {
                    this.db.createObjectStore(this.storeName, { keyPath: 'id' });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve();
            };
        });
    }

    async saveBackground(file) {
        if (!this.db) await this.init();
        // Store File directly — IndexedDB supports Blob/File via structured clone
        // No need for arrayBuffer() conversion which doubles memory for large files
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put({ id: 'current_bg', file: file, type: file.type });

            request.onsuccess = () => resolve();
            request.onerror = (e) => {
                if (e.target.error && e.target.error.name === 'QuotaExceededError') {
                    alert('File too large for browser storage. Try a smaller file.');
                }
                reject(e);
            };
        });
    }

    async getBackground() {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get('current_bg');

            request.onsuccess = (event) => {
                const result = event.target.result;
                if (result && result.file) {
                    resolve(result);
                } else {
                    resolve(null);
                }
            };
            request.onerror = (e) => reject(e);
        });
    }

    // LocalStorage helpers
    setSetting(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getSetting(key, defaultValue) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    }

    async saveMusic(file) {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.put({ id: 'current_music', file: file, type: file.type });

            request.onsuccess = () => resolve();
            request.onerror = (e) => {
                if (e.target.error && e.target.error.name === 'QuotaExceededError') {
                    alert('File too large for browser storage. Try a smaller file.');
                }
                reject(e);
            };
        });
    }

    async getMusic() {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.get('current_music');
            request.onsuccess = (event) => {
                const result = event.target.result;
                resolve(result && result.file ? result : null);
            };
            request.onerror = (e) => reject(e);
        });
    }

    async deleteMusic() {
        if (!this.db) await this.init();
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.storeName], 'readwrite');
            const store = transaction.objectStore(this.storeName);
            const request = store.delete('current_music');
            request.onsuccess = () => resolve();
            request.onerror = (e) => reject(e);
        });
    }
}
