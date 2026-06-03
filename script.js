const cityInput = document.getElementById('City');
const searchButn = document.getElementById('search');
const resultDiv = document.getElementById('result');

searchButn.addEventListener('click', async() => {
    const city = cityInput.value.trim();
    if (!city) return;

    resultDiv.textContent = 'Loading...';

    try {
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            resultDiv.textContent = 'City not found.';
            return;
        }

        const { latitude, longitude, name } = geoData.results[0];

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();

        const temp = weatherData.current_weather.temperature;
        resultDiv.textContent = `${name}: ${temp}°C`;

    }catch (error) {
        resultDiv.textContent = 'This shouldnt happened';
        console.error(error);
    }
});
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchButn.click();
    });