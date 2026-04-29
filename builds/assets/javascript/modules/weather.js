export class WeatherManager {
    constructor() {
        this.apiKey = "4d8fb5b93d4af21d66a2948710284366";
        this.apiBase = "https://api.openweathermap.org/data/2.5/weather";
        this.pingUrl = "https://www.google.com/gen_204";
    }

    async getWeather(city = "Tehran") { // Default to Tehran per old code usage
        try {
            const response = await fetch(`${this.apiBase}?q=${city}&appid=${this.apiKey}&units=metric`);
            if (!response.ok) throw new Error("Weather fetch failed");
            const data = await response.json();
            return {
                temp: Math.round(data.main.temp),
                condition: data.weather[0].main,
                description: data.weather[0].description,
                iconCode: data.weather[0].icon,
                sys: data.sys
            };
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async getPing() {
        const start = Date.now();
        try {
            await fetch(this.pingUrl, { mode: 'no-cors' });
            return Date.now() - start;
        } catch (error) {
            return null;
        }
    }

    mapIcon(code) {
        // Map OpenWeatherMap icon codes to local SVG files
        // 01d.svg, 01n.svg etc are standard OWM names. 
        // User provided "New Icons" with names like "clear_day.svg".
        // I will need a mapping logic or rename the files.
        // For now, let's assume I will rename them to match OWM codes or return the filename based on condition.

        const mapping = {
            "01d": "clear_day.svg",
            "01n": "bedtime.svg",
            "02d": "partly_cloudy_day.svg",
            "02n": "partly_cloudy_night.svg",
            "03d": "cloud.svg",
            "03n": "cloud.svg",
            "04d": "cloud.svg",
            "04n": "cloud.svg",
            "09d": "rainy_light.svg",
            "09n": "rainy_light.svg",
            "10d": "rainy.svg",
            "10n": "rainy.svg",
            "11d": "thunderstorm.svg",
            "11n": "thunderstorm.svg",
            "13d": "snowing.svg",
            "13n": "snowing.svg",
            "50d": "wind_power.svg", // mist/fog
            "50n": "wind_power.svg"
        };

        return mapping[code] || "clear_day.svg";
    }
}
