
export function getWeatherNow(latitude,longitude,eventReceived){
    // var latitude = -41.276825;
    // var longitude = 174.777969;
    var API_KEY = "e3866b4ab042a8d037265f25a226bf19";
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {
        console.log(data.current)
        var data1 = data.current;
        var cloudRate = data1.clouds;
        console.log(cloudRate)
        var humidity = data1.humidity;
        var temp = data1.temp;
        var weather ="";
        eventReceived(cloudRate,humidity,temp,weather)
        
    })
}