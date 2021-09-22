import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image,StyleSheet, Text, View, ScrollView,SafeAreaView,Button, FlatList} from 'react-native';
import Task from './components/Task';
//import * as data from '../data/dataTest.json';
import firebase from 'firebase'
import { getEvent } from './api/DatabaseInteractApi';
import { getWeatherNow } from './api/WeatherApi';
import * as Location from 'expo-location';
import { Dialog } from 'react-native-simple-dialogs';
const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};


const timeToString = (date) => {
  return date.toISOString().split('T')[0];
};


class DailyReview extends React.Component{
  constructor(props) {
    super(props);
    this.date = new Date();
    this.dateExact = timeToString(this.date);
    this.items=[];
    this.connect();
    this.userKey = props.userKey;
  }

  state = {
    eventList : [],
    geoLocation: {},
    geoError:null,
    dialogVisible:false,
    weather: "",
    temp:0,
    humidity:0,
    cloudsRate:0,
    icon:""
  };

  connect(){
    const firebaseConfig = {
      apiKey: "AIzaSyArQ934vak4WKrGkb53spR9i_k2CMsT4sE",
      authDomain: "mobiledev-aa1ec.firebaseapp.com",
      databaseURL: "https://mobiledev-aa1ec-default-rtdb.asia-southeast1.firebasedatabase.app",
      projectId: "mobiledev-aa1ec",
      storageBucket: "mobiledev-aa1ec.appspot.com",
      messagingSenderId: "608672896457",
      appId: "1:608672896457:web:260f053007dda17c178418",
      measurementId: "G-4NPZJD2M6Y"
    };
    if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    } else {
      firebase.app();
    }
  }

  load() {
    //const [items, setItems] = useState([]);
    // load date into items
    var numItem = this.state.eventList.length;
    //var current = year + '-' + month + '-' + date;
    for( let i=0;i<numItem;i++){
      if(!this.state.eventList[i].time.match(this.dateExact)){
        // console.log("whattttttt");
        // this.state.eventList.slice(i,i);
        // this.setState({eventList:this.state.eventList})
        // this.items.push({
        //   name : this.state.eventList[i].name,
        //   height: Math.max(50, Math.floor(Math.random() * 150)),
        //   timeOfthis: this.state.eventList[i].time,
        //   eventOnThis:  this.state.eventList[i].description
        // });
      }
    }
  };



  displayEvent(){
    if(this.items != null){
      var what = this.items.map((stuff,index) => {
        return (<Task key={index} text ={stuff.eventOnThis} />);
      })
      return what;
    }
  }

  OnEventReceived = (eventList) =>{
    this.setState(prevState => ({
      eventList:prevState.eventList =eventList
    }));
  }
  componentDidMount() {
    this.OnEventReceived = this.OnEventReceived.bind(this);
    getEvent(this.OnEventReceived,this.dateExact,this.userKey)
  }


  componentDidUpdate() {
    //console.log(this.state.eventList.length);
  }

  componentWillUnmount(){
    getEvent(this.OnEventReceived,this.dateExact,this.userKey)
  }
  async showWeather(){
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        getWeatherNow("40.7128", "-74.0060")
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      getWeatherNow(location.coords.latitude, location.coords.longitude,this.setWeather);
  }

  setWeather = (cloudRate,humidity,temp,weather) =>{
    this.setState({
      cloudsRate:cloudRate,
      humidity:humidity,
      temp:temp,
      weather:weather,
    })
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.taskWrapper}>
      <Button
          title="Show weather"
          onPress={() => {
            this.showWeather()
            this.setState({
              dialogVisible:true
            })
          }
          }
        />
      <Dialog 
        visible={this.state.dialogVisible} 
        title= " Today Weather "
        onTouchOutside={() => this.setState({
          dialogVisible:false
        })} >
          <View>
            <Text> {this.state.weather} tmp is {this.state.temp}  </Text>
            <Text> {this.state.cloudsRate} </Text>
            <Text> {this.state.humidity} </Text>
          </View>
        </Dialog>
        <Text style= {styles.sectionTile}> {this.dateExact}'s Task </Text>
        <StatusBar style="auto" />
        <FlatList
          data={this.state.eventList}
          renderItem={({item,index}) => {
            return (<Task key={index} text ={item.name} desc={item.description} time={item.time} id={item.id} userKey={this.userKey}/>);
          }
          }
          keyExtractor={item => item.id}
          />
      </View>
      </SafeAreaView>
    );
  }
}

export default DailyReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
 
  },
  backGround:{
    backgroundColor: 'orange',
  },
  taskWrapper:{
      paddingTop :20,
      paddingHorizontal:20,
  },
  sectionTile:{
    fontSize:24,
    fontWeight:'bold',
    alignItems: 'center',
  },
  items:{
    marginTop:20,
    
  },
});

