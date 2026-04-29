import { getRandomQuote } from "./quotes.js";


export class AppsManager {
	constructor(storageManager) {
		this.storage = storageManager;
		this.shortcuts = JSON.parse(localStorage.getItem("shortcuts")) || [
			{ name: "Google", url: "https://google.com" },
			{ name: "YouTube", url: "https://youtube.com" },
			{ name: "Gmail", url: "https://gmail.com" }
		];
		this.focusMode = false;
		this.stopwatchOnly = false;
		this.stopwatchInterval = null;
		this.focusStartTime = 0;
		this.audio = document.getElementById("bg-music");
		this.currentMiniWindow = null; // 'stopwatch' | 'settings' | null
	}

	init() {
		this.renderShortcuts();
		this.setupEventListeners();
		this.applySettings();
	}

	renderShortcuts() {
		for (let i = 0; i < 3; i++) {
			const btn = document.getElementById(`app-${ i + 1 }`);
			if (this.shortcuts[i]) {
				btn.innerHTML = `<img src="https://www.google.com/s2/favicons?sz=64&domain_url=${ this.shortcuts[i].url }" width="24" height="24" alt="${ this.shortcuts[i].name }">`;
				btn.title = this.shortcuts[i].name;
				btn.dataset.label = this.shortcuts[i].name;
				btn.onclick = () => window.location.href = this.shortcuts[i].url;
				btn.oncontextmenu = (e) => {
					e.preventDefault();
					this.openShortcutModal(i);
				};
			}
			else {
				btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`;
				btn.title = "Add Shortcut";
				btn.dataset.label = "+";
				btn.onclick = () => this.openShortcutModal(i);
			}
		}
	}

	applySettings() {
		const theme = localStorage.getItem("theme") || "light";
		if (theme === "light") {
			// Light theme visuals
			document.body.style.setProperty("--text-color", "#1a1a1a");
			document.body.style.setProperty("--glass-bg", "rgba(0, 0, 0, 0.12)");
			document.body.style.setProperty("--glass-border", "1px solid rgba(0,0,0,0.3)");
			document.body.style.setProperty("--glass-shadow-inner", "inset 2px 4px 4px rgba(0, 0, 0, 0.1), inset -2px -4px 4px rgba(0, 0, 0, 0.1)");
			// Weather icon invert for dark icons on light bg
			const weatherIcon = document.querySelector("#weather-icon img");
			if (weatherIcon) {
				weatherIcon.style.filter = "invert(1)";
			}
		}
		else {
			// Dark theme visuals (default)
			document.body.style.removeProperty("--text-color");
			document.body.style.removeProperty("--glass-bg");
			document.body.style.removeProperty("--glass-border");
			document.body.style.removeProperty("--glass-shadow-inner");
			const weatherIcon = document.querySelector("#weather-icon img");
			if (weatherIcon) {
				weatherIcon.style.filter = "";
			}
		}

		// Notify app to update default gradient if no custom bg
		window.dispatchEvent(new CustomEvent("theme-changed"));
	}

	// ============ MINI-WINDOW SYSTEM ============
	openMiniWindow(name) {
		const appsGroup = document.getElementById("apps-group");
		// Close any existing mini-window first
		this.closeMiniWindow();

		this.currentMiniWindow = name;
		appsGroup.classList.add("mini-window-active");

		const miniEl = document.getElementById(`mini-${ name }`);
		if (miniEl) {
			miniEl.style.display = "flex";
		}

		// If opening settings, populate fields
		if (name === "settings") {
			document.getElementById("setting-name").value = localStorage.getItem("username") || "";
			const theme = localStorage.getItem("theme") || "light";
			const themeBtn = document.getElementById("setting-theme-btn");
			themeBtn.textContent = theme === "light" ? "Light" : "Dark";
			themeBtn.dataset.theme = theme;
		}
	}

	closeMiniWindow() {
		const appsGroup = document.getElementById("apps-group");
		appsGroup.classList.remove("mini-window-active");

		// Hide all mini-window contents
		document.querySelectorAll(".mini-window-content")
		        .forEach(el => {
			        el.style.display = "none";
		        });

		// Stop stopwatch if running
		if (this.currentMiniWindow === "stopwatch") {
			this.stopStopwatch();
			if (this.focusMode) {
				this.stopFocusMode();
			}
			this.stopwatchOnly = false;
		}

		this.currentMiniWindow = null;
	}

	// ============ STOPWATCH ============
	startStopwatch() {
		this.focusStartTime = Date.now();
		this.stopwatchInterval = setInterval(() => {
			const elapsed = Date.now() - this.focusStartTime;
			const h = Math.floor(elapsed / 3600000);
			const m = Math.floor(( elapsed % 3600000 ) / 60000);
			const s = Math.floor(( elapsed % 60000 ) / 1000);
			const pad = (n) => n.toString()
			                    .padStart(2, "0");
			document.getElementById("stopwatch-display").textContent = `${ pad(h) }:${ pad(m) }:${ pad(s) }`;
		}, 1000);
	}

	stopStopwatch() {
		clearInterval(this.stopwatchInterval);
		this.stopwatchInterval = null;
		document.getElementById("stopwatch-display").textContent = "00:00:00";
	}

	// Stopwatch-only (no focus mode, no greeting change, no music)
	toggleStopwatchOnly() {
		if (this.stopwatchOnly) {
			this.closeMiniWindow();
		}
		else {
			this.stopwatchOnly = true;
			this.openMiniWindow("stopwatch");
			document.getElementById("focus-quote-mini").textContent = "";
			this.startStopwatch();
		}
	}

	// ============ FOCUS MODE ============
	toggleFocusMode() {
		if (this.focusMode) {
			this.closeMiniWindow(); // This will call stopFocusMode
		}
		else {
			this.startFocusMode();
		}
	}

	startFocusMode() {
		this.focusMode = true;
		document.body.classList.add("focus-mode");

		const greeting = document.getElementById("greeting");
		const focusName = localStorage.getItem("username") || "AStorm";
		const focusQuote = getRandomQuote();

		// Animate greeting with focus text
		greeting.innerHTML = "";
		[ ...`Focus, ${ focusName }` ].forEach((char, i) => {
			const span = document.createElement("span");
			span.className = "letter";
			span.textContent = char === " " ? "\u00A0" : char;
			span.style.animationDelay = `${ i * 0.04 }s`;
			greeting.appendChild(span);
		});

		// Open stopwatch mini-window with quote
		this.openMiniWindow("stopwatch");
		document.getElementById("focus-quote-mini").textContent = focusQuote;
		this.startStopwatch();

		// Play music
		if (this.audio && this.audio.src) {
			this.audio.play()
			    .catch(e => console.log("Audio play blocked:", e));
		}
	}

	stopFocusMode() {
		this.focusMode = false;
		document.body.classList.remove("focus-mode");

		if (this.audio) {
			this.audio.pause();
		}

		// Force greeting restore — dispatch event so app.javascript re-renders it
		window.dispatchEvent(new CustomEvent("focus-mode-ended"));
	}

	// ============ EVENT LISTENERS ============
	setupEventListeners() {
		const modalOverlay = document.getElementById("modal-overlay");
		const shortcutModal = document.getElementById("shortcut-modal");

		// Close shortcut modal buttons
		document.querySelectorAll(".close-btn")
		        .forEach(btn => {
			        btn.addEventListener("click", () => {
				        modalOverlay.classList.add("hidden");
				        shortcutModal.classList.add("hidden");
			        });
		        });

		modalOverlay.addEventListener("click", (e) => {
			if (e.target === modalOverlay) {
				modalOverlay.classList.add("hidden");
				shortcutModal.classList.add("hidden");
			}
		});

		// Save shortcut
		document.getElementById("save-shortcut-btn")
		        .addEventListener("click", () => {
			        const index = shortcutModal.dataset.index;
			        const name = document.getElementById("shortcut-name").value;
			        let url = document.getElementById("shortcut-url").value;
			        if (!url.startsWith("http")) {
				        url = "https://" + url;
			        }

			        if (name && url) {
				        this.shortcuts[index] = { name, url };
				        localStorage.setItem("shortcuts", JSON.stringify(this.shortcuts));
				        this.renderShortcuts();
				        modalOverlay.classList.add("hidden");
				        shortcutModal.classList.add("hidden");
			        }
		        });

		// Timer Button → Focus Mode (full: greeting change + music + stopwatch)
		document.getElementById("btn-timer")
		        .addEventListener("click", () => {
			        this.toggleFocusMode();
		        });

		// Bookmarks Button → Stopwatch only (no focus mode)
		document.getElementById("btn-bookmarks")
		        .addEventListener("click", () => {
			        this.toggleStopwatchOnly();
		        });

		// Settings Button → Mini-window
		document.getElementById("btn-settings")
		        .addEventListener("click", () => {
			        this.openMiniWindow("settings");
		        });

		// Close mini-window buttons
		document.querySelectorAll(".close-mini")
		        .forEach(btn => {
			        btn.addEventListener("click", () => {
				        this.closeMiniWindow();
			        });
		        });

		// Settings field listeners
		document.getElementById("setting-name")
		        .addEventListener("input", (e) => {
			        localStorage.setItem("username", e.target.value);
		        });

		// Autoplay toggle
		const autoplayCheckbox = document.getElementById("setting-autoplay");
		autoplayCheckbox.checked = localStorage.getItem("music_autoplay") !== "false";
		autoplayCheckbox.addEventListener("change", (e) => {
			localStorage.setItem("music_autoplay", e.target.checked);
			const audio = document.getElementById("bg-music");
			if (e.target.checked && audio.src) {
				// Autoplay turned ON → play music
				audio.volume = 0.5;
				audio.play()
				     .catch(() => {
				     });
			}
			else if (!e.target.checked && audio.src) {
				// Autoplay turned OFF → pause music
				audio.pause();
			}
		});

		// Custom file upload buttons → trigger hidden file inputs
		document.getElementById("bg-upload-btn")
		        .addEventListener("click", () => {
			        document.getElementById("setting-bg-upload")
			                .click();
		        });
		document.getElementById("music-upload-btn")
		        .addEventListener("click", () => {
			        document.getElementById("setting-music-upload")
			                .click();
		        });

		document.getElementById("setting-music-upload")
		        .addEventListener("change", async (e) => {
			        const file = e.target.files[0];
			        if (file) {
				        console.log("Saving music:", file.name, file.type, file.size);
				        try {
					        await this.storage.saveMusic(file);
					        console.log("Music saved, reloading...");
					        setTimeout(() => location.reload(), 200);
				        }
				        catch (err) {
					        console.error("Failed to save music:", err);
				        }
			        }
		        });

		document.getElementById("setting-theme-btn")
		        .addEventListener("click", () => {
			        const btn = document.getElementById("setting-theme-btn");
			        const current = btn.dataset.theme || "light";
			        const newTheme = current === "dark" ? "light" : "dark";
			        btn.dataset.theme = newTheme;
			        btn.textContent = newTheme === "light" ? "Light" : "Dark";
			        localStorage.setItem("theme", newTheme);
			        this.applySettings();
		        });

		document.getElementById("setting-bg-upload")
		        .addEventListener("change", async (e) => {
			        const file = e.target.files[0];
			        if (file) {
				        console.log("Saving background:", file.name, file.type, file.size);
				        try {
					        await this.storage.saveBackground(file);
					        console.log("Background saved, reloading...");
					        setTimeout(() => location.reload(), 200);
				        }
				        catch (err) {
					        console.error("Failed to save background:", err);
				        }
			        }
		        });

		document.getElementById("reset-bg-btn")
		        .addEventListener("click", async () => {
			        try {
				        const transaction = this.storage.db.transaction([ this.storage.storeName ], "readwrite");
				        const store = transaction.objectStore(this.storage.storeName);
				        store.delete("current_bg");
				        transaction.oncomplete = () => location.reload();
			        }
			        catch (e) {
				        location.reload();
			        }
		        });

		document.getElementById("reset-music-btn")
		        .addEventListener("click", async () => {
			        try {
				        await this.storage.deleteMusic();
				        location.reload();
			        }
			        catch (e) {
				        location.reload();
			        }
		        });
	}

	openShortcutModal(index) {
		const modalOverlay = document.getElementById("modal-overlay");
		const shortcutModal = document.getElementById("shortcut-modal");
		shortcutModal.dataset.index = index;
		document.getElementById("shortcut-name").value = this.shortcuts[index] ? this.shortcuts[index].name : "";
		document.getElementById("shortcut-url").value = this.shortcuts[index] ? this.shortcuts[index].url : "";
		modalOverlay.classList.remove("hidden");
		shortcutModal.classList.remove('hidden');
	}
}
