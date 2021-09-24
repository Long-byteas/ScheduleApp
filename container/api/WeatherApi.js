import { getWeatherJson } from "../DBInteract/WeatherApiInteract";
export function getWeatherNow(latitude,longitude,eventReceived){
    // get the required data from the json
    var json = getWeatherJson(latitude,longitude).then(data => {
            console.log(data.current)
            eventReceived(data.current);
    });
   
}