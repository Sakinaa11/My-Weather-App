function handleKeyPress(event) {
    if (event.key === "Enter") {
        fetchWeather();
    }
}

async function fetchWeather() {
    const city = document.getElementById('city').value.trim();
    if (!city) return alert('Please enter a city name.');

    const apiKey = "04da1fc566701286837d864813a966fd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById('weatherInfo').innerHTML = '<p>City not found</p>';
            return;
        }

        document.getElementById('location').innerText = data.name;
        document.getElementById('temperature').innerText = `Temperature: ${Math.round(data.main.temp)}°C`;
        document.getElementById('humidity').innerHTML = `Humidity: ${data.main.humidity}% <img src='humidity.png' alt='Humidity' width='20' height='20' style='vertical-align: middle;'/>`;
        document.getElementById('windSpeed').innerHTML = `Wind Speed: ${data.wind.speed} km/h <img src='wind1.png' alt='Wind' width='20' height='20' style='vertical-align: middle;'/>`;

        let iconPath = '';
        switch (data.weather[0].main.toLowerCase()) {
            case 'clear':   iconPath = 'clear.png'; break;
            case 'clouds':  iconPath = 'cloud.png'; break;
            case 'drizzle': iconPath = 'drizzle.png'; break;
            case 'rain':    iconPath = 'rain.png'; break;
            case 'snow':    iconPath = 'snow.png'; break;
            default:        iconPath = 'clear.png';
        }

        const weatherIcon = document.getElementById('weatherIcon');
        const weatherMessage = document.getElementById('weatherMessage');

        if (iconPath) {
            weatherIcon.src = iconPath;
            weatherIcon.style.display = "block";
            weatherMessage.style.display = "none";
        } else {
            weatherIcon.style.display = "none";
            weatherMessage.style.display = "block";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching the weather. Please try again.");
    }
}