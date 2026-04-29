import { getRandomQuote } from './modules/quotes.js';
import { StorageManager } from './modules/storage.js';
import { TimeManager } from './modules/time.js';
import { WeatherManager } from './modules/weather.js';
import { NotesManager } from './modules/notes.js';
import { AppsManager } from './modules/apps.js';

class App {
    constructor() {
        this.storage = new StorageManager();
        this.time = new TimeManager((data) => this.updateTime(data));
        this.weather = new WeatherManager();
        this.notes = new NotesManager(this.storage);
        this.apps = new AppsManager(this.storage);
        this.lastGreetingText = '';
    }

    async init() {
        await this.storage.init();

        // Set initial quote
        document.getElementById('quote').textContent = getRandomQuote();

        // Start modules
        this.time.start();
        this.notes.init();
        this.apps.init();

        // Load Background
        await this.loadBackground();

        // Load Weather (non-blocking)
        this.loadWeather();

        // Load Ping (non-blocking)
        this.loadPing();
        this.setupPingRefresh();

        // Smart Search Listener
        document.getElementById('search-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (this.isUrl(query)) {
                    // Navigate directly to the URL
                    const url = query.startsWith('http') ? query : 'https://' + query;
                    window.location.href = url;
                } else {
                    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
                }
            }
        });

        // Listen for focus mode exit to restore greeting
        window.addEventListener('focus-mode-ended', () => {
            this.lastGreetingText = ''; // Force re-animation
            this.time.forceUpdate();    // Immediately re-render
        });

        // Listen for theme change to update default gradient
        window.addEventListener('theme-changed', async () => {
            const savedBg = await this.storage.getBackground();
            if (!savedBg) {
                this.applyDefaultGradient();
            }
        });

        // Left panel toggle (mobile responsive)
        const leftToggle = document.getElementById('left-panel-toggle');
        const leftGroup = document.getElementById('left-group');
        if (leftToggle && leftGroup) {
            leftToggle.addEventListener('click', () => {
                leftGroup.classList.toggle('collapsed');
            });
        }
    }

    updateTime({ timeString, greeting, dateString }) {
        document.getElementById('big-clock').textContent = timeString;
        document.getElementById('date').textContent = `Date: ${dateString}`;

        const userName = localStorage.getItem('username') || 'AStorm';

        // Only if not in focus mode
        if (!document.body.classList.contains('focus-mode')) {
            const fullGreeting = `${greeting}, ${userName}`;
            // Only re-animate if the greeting text actually changed
            if (fullGreeting !== this.lastGreetingText) {
                this.lastGreetingText = fullGreeting;
                this.animateGreeting(fullGreeting);
            }
        }

        document.title = timeString;
    }

    animateGreeting(text) {
        const el = document.getElementById('greeting');
        el.innerHTML = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.className = 'letter';
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.animationDelay = `${i * 0.04}s`;
            el.appendChild(span);
        });
    }

    async loadBackground() {
        try {
            const bgContainer = document.getElementById('background-container');
            const mediaControls = document.getElementById('media-controls');
            const volumeBtn = document.getElementById('volume-toggle');
            const volumeIcon = document.getElementById('volume-icon');
            const visibilityBtn = document.getElementById('visibility-toggle');
            const visibilityIcon = document.getElementById('visibility-icon');
            const savedBg = await this.storage.getBackground();

            if (savedBg) {
                const url = URL.createObjectURL(savedBg.file);
                if (savedBg.type.startsWith('video')) {
                    // Autoplay muted (browsers require muted for autoplay)
                    bgContainer.innerHTML = `<video src="${url}" autoplay loop muted></video>`;
                    const video = bgContainer.querySelector('video');

                    // Show media controls
                    mediaControls.classList.remove('hidden');

                    // Volume toggle (mute/unmute video audio + crossfade with bg music)
                    const bgAudio = document.getElementById('bg-music');
                    volumeBtn.addEventListener('click', () => {
                        video.muted = !video.muted;
                        volumeIcon.src = video.muted
                            ? 'assets/icons/volume_off.svg'
                            : 'assets/icons/volume_up.svg';

                        if (!video.muted) {
                            // Video unmuted → fade out background music (50% → 0%)
                            this.fadeAudio(bgAudio, 0.5, 0, 500, () => {
                                bgAudio.pause();
                            });
                        } else {
                            // Video muted → only resume music if autoplay is ON
                            const autoplay = localStorage.getItem('music_autoplay') !== 'false';
                            if (autoplay && bgAudio.src) {
                                bgAudio.play().catch(() => { });
                                this.fadeAudio(bgAudio, 0, 0.5, 500);
                            }
                        }
                    });

                    // Visibility toggle (hide/show UI to watch video)
                    let uiHidden = false;
                    visibilityBtn.addEventListener('click', () => {
                        uiHidden = !uiHidden;
                        const mainGrid = document.getElementById('main-grid');
                        if (uiHidden) {
                            mainGrid.style.opacity = '0';
                            mainGrid.style.pointerEvents = 'none';
                            visibilityIcon.src = 'assets/icons/visibility_off.svg';
                        } else {
                            mainGrid.style.opacity = '1';
                            mainGrid.style.pointerEvents = 'auto';
                            visibilityIcon.src = 'assets/icons/visibility.svg';
                        }
                    });
                } else {
                    bgContainer.innerHTML = `<img src="${url}">`;
                    mediaControls.classList.add('hidden');
                }
            } else {
                this.applyDefaultGradient();
                mediaControls.classList.add('hidden');
            }
        } catch (e) {
            console.error("Failed to load background", e);
            this.applyDefaultGradient();
        }

        // Load background music from IndexedDB
        try {
            const savedMusic = await this.storage.getMusic();
            if (savedMusic) {
                const musicUrl = URL.createObjectURL(savedMusic.file);
                const audio = document.getElementById('bg-music');
                audio.src = musicUrl;
                audio.volume = 0.5;

                // Only autoplay if setting is enabled (default: true)
                const autoplay = localStorage.getItem('music_autoplay') !== 'false';
                if (autoplay) {
                    audio.play().catch(() => {
                        console.log('Music autoplay blocked by browser, will play on mousemove');
                        const playOnce = () => {
                            audio.play().catch(() => { });
                            document.removeEventListener('mousemove', playOnce);
                        };
                        document.addEventListener('mousemove', playOnce);
                    });
                }
            }
        } catch (e) {
            console.error('Failed to load music:', e);
        }
    }

    async loadWeather() {
        const data = await this.weather.getWeather();
        if (data) {
            document.getElementById('temp').textContent = `Temp: ${data.temp}°C`;
            document.getElementById('weather-text').textContent = `Weather: ${data.condition}`;
            const iconFile = this.weather.mapIcon(data.iconCode);
            document.getElementById('weather-icon').innerHTML = `<img src="assets/icons/${iconFile}">`;

            // Sunset / Sunrise
            if (data.sys && data.sys.sunset) {
                const sunsetTime = new Date(data.sys.sunset * 1000);
                const sunsetStr = `${sunsetTime.getHours().toString().padStart(2, '0')}:${sunsetTime.getMinutes().toString().padStart(2, '0')}`;
                document.getElementById('sunset').textContent = `Sunset: ${sunsetStr}`;
            }
        }
    }

    async loadPing() {
        const ping = await this.weather.getPing();
        document.getElementById('ping').textContent = ping ? `Ping: ${ping}ms` : "Ping: n/a";
    }

    setupPingRefresh() {
        document.getElementById('ping-refresh').addEventListener('click', () => {
            document.getElementById('ping').textContent = 'Ping: ...';
            this.loadPing();
        });
    }

    // Detect if input looks like a URL (e.g. google.com, example.org/path)
    isUrl(str) {
        // Match patterns like: domain.tld, domain.tld/path, sub.domain.tld
        const urlPattern = /^([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/.*)?$/;
        // Also match if it starts with http:// or https://
        if (str.startsWith('http://') || str.startsWith('https://')) return true;
        // Match common TLDs
        return urlPattern.test(str);
    }

    applyDefaultGradient() {
        const bgContainer = document.getElementById('background-container');
        const theme = localStorage.getItem('theme') || 'light';
        // value="dark" = Light label (user swapped), value="light" = Dark label
        if (theme === 'light') {
            // Light theme gradient
            bgContainer.style.background = "linear-gradient(135deg, #a8c0ff, #c2e9fb, #ffecd2)";
        } else {
            // Dark theme gradient
            bgContainer.style.background = "linear-gradient(135deg, #0f0c29, #302b63, #24243e)";
        }
    }

    // Smooth volume fade for audio elements
    fadeAudio(audio, from, to, duration, onComplete) {
        const steps = Math.ceil(duration / 20); // 20ms per step
        const stepValue = (to - from) / steps;
        let current = from;
        let step = 0;
        audio.volume = from;

        const interval = setInterval(() => {
            step++;
            current += stepValue;
            audio.volume = Math.max(0, Math.min(1, current));
            if (step >= steps) {
                clearInterval(interval);
                audio.volume = Math.max(0, Math.min(1, to));
                if (onComplete) onComplete();
            }
        }, 20);
    }
}

const app = new App();
document.addEventListener('DOMContentLoaded', () => app.init());
