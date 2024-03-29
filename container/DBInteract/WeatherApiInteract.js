export async function getWeatherJson(latitude,longitude){
    // refer to the database
    try {
      // fetching the data and return json
        var API_KEY = "e3866b4ab042a8d037265f25a226bf19";
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`);
        const json = await response.json();
        return json;
      } catch (error) {
        // fail then print error
        console.error(error);
      }
}