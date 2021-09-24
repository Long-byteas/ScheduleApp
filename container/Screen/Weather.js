import React from 'react';
import {View, Image, Text, StyleSheet} from 'react-native'


const WeatherScroll = ({weatherData}) => {
    // weather data will be the raw data
    return (
        <View style={styles.scrollView}>
            <CurrentTempEl data={weatherData}/>
        </View>
    )
}

const CurrentTempEl = ({data}) => {
    console.log(data);
    if(data && data.weather){
        // split the data out to display them
        const img = {uri: 'http://openweathermap.org/img/wn/'+ data.weather[0].icon +'@4x.png'}
        return(
            <View style={styles.currentTempContainer}>
                <Image source={img} style={styles.image} />
                <View  style={styles.otherContainer}>
                    <Text  style={styles.temp}>Day - {data.temp}&#176;C</Text>
                    <Text  style={styles.temp}>Feels Like - {data.feels_like}&#176;C</Text>
                    <Text  style={styles.temp}>{data.weather[0].description}</Text>
                    <Text  style={styles.temp}> Humidity - {data.humidity}</Text>
                </View>
            </View>
        )
    }else{
        return( 
            <View>

            </View>

        )
        
    }
   
}

const styles = StyleSheet.create({
    scrollView: {
        flex:0.4,
        backgroundColor: 'white',
        padding:0
    },
    image: {
        width: 60,
        height: 60
    },
    currentTempContainer: {
        flexDirection: 'row',
        height:200,
        width:250,
        backgroundColor: '#00000033',
        justifyContent:"center",
        alignItems:'center',
        borderRadius: 10,
        borderColor:'#eee',
        borderWidth:1,
        padding: 0
    },
    day: {
        fontSize: 20,
        color:"white",
        backgroundColor: "#3c3c44",
        padding: 10,
        textAlign:"center",
        borderRadius: 50,
        fontWeight: "200",
        marginBottom: 15
    },
    temp: {
        fontSize: 16,
        color:"blue",
        fontWeight:"100",
        textAlign:"center"
    },
    otherContainer: {
        paddingRight: 40
    }
})

export default WeatherScroll