import { getWeatherJson } from "../DBInteract/WeatherApiInteract";
export function getWeatherNow(latitude,longitude,eventReceived){
    // data current
    var json = getWeatherJson(latitude,longitude).then(data => {
            console.log(data.current)
            eventReceived(data.current);
    });
   
}