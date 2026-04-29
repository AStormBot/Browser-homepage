export class TimeManager {
    constructor(updateCallback) {
        this.updateCallback = updateCallback;
    }

    start() {
        this.update();
        setInterval(() => this.update(), 1000);
    }

    update() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        const timeString = `${this.pad(hours)}:${this.pad(minutes)}`;

        let greeting = "Hello";
        if (hours >= 5 && hours < 12) greeting = "Good Morning";
        else if (hours >= 12 && hours < 17) greeting = "Good Afternoon"; // aligning with "noon" request, though usually afternoon
        else if (hours >= 17 && hours < 21) greeting = "Good Evening";
        else if (hours >= 21 || hours < 0) greeting = "Good Night";

        if (hours >= 0 && hours < 5) greeting = "Good Midnight"; // "Midnigth" logic

        // Logic for sunset/sunrise could be calculated here or fetched.
        // For now, simpler approximation or placeholder unless API is mandated for this too.
        // User prompt mentioned "Sunset / Sunrise", let's estimate based on fixed 6am/6pm for now
        // or refine with weather API later if coordinates are available. 
        // Prompt says: "Sunset: 12:30" (example). 

        this.updateCallback({
            timeString,
            greeting,
            dateString: now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
            hours // for sunset/sunrise logic logic if needed
        });
    }

    pad(num) {
        return num.toString().padStart(2, '0');
    }

    forceUpdate() {
        this.update();
    }
}
