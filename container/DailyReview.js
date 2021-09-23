import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image,StyleSheet, Text, View, ScrollView,SafeAreaView,Button, FlatList,TouchableOpacity} from 'react-native';
import Task from './components/Task';
//import * as data from '../data/dataTest.json';
import firebase from 'firebase'
import { getEvent } from './api/DatabaseInteractApi';
import { getWeatherNow } from './api/WeatherApi';
import * as Location from 'expo-location';
import { Dialog } from 'react-native-simple-dialogs';
import Weather from './components/Weather'

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
    this.navigation = props.navigation;
  }

  state = {
    eventList : [],
    geoLocation: {},
    geoError:null,
    dialogVisible:false,
    data:{}
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

  setWeather = (data) =>{
    console.log(data)
    this.setState({
      data:data
    })
  }
  
  render() {
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.taskWrapper}>
      
      <Dialog 
        visible={this.state.dialogVisible} 
        title= " Today Weather "
        contentStyle={{height: 300, width: 300, paddingBottom: 105}}
        onTouchOutside={() => this.setState({
          dialogVisible:false
        })} >
          <View>
            <Weather weatherData={this.state.data}/>
          </View>
      </Dialog>
      <View style={styles.containerSmall}>
        
        <StatusBar style="auto" />
        <TouchableOpacity onPress={() => {
          this.navigation.navigate('Home')
      }}>
        <View style={styles.addWrapper}>
          <Image
          style={{width:30,height:30}}
          source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtviYsXrEUlCSAw5buhbycBi98gIyMi0EwYcRRwd_Uwp8N1jzg9clbZNjC5B3Vjnsozk4&usqp=CAU'}}
          />
        </View>
      </TouchableOpacity>
      <Text style= {styles.sectionTile}> {this.dateExact}'s Task </Text>
      <TouchableOpacity onPress={() => {
        this.showWeather()
        this.setState({
          dialogVisible:true
        })
      }}>
        <View style={styles.removeButton}>
          <Image
          style={{width:30,height:30}}
          source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAAD6+vo9PT05OTmtra3Z2dnc3NywsLDa2trf39+rq6vs7OwGBgbW1tZmZmagoKBhYWFHR0caGhrm5uYjIyP19fVaWlp5eXnBwcGXl5cyMjKenp6BgYG2trZNTU0QEBDwEbGsAAACw0lEQVR4nO3di1LbQAyFYa9JG0gMJLRcQsvl/Z+SgdAOEK/GNpuR9+j/nkAaS5acxNmmAQAAAAAAAAAAAAAAENAuT+83u847jOPZ/ElvtivvSI6jW6T//noHcwzL9NGDdzjlXaTPTr0DKu1n+qr1Dqms5UGCaeMdU1FnhwmmK++gSvrag29+CY3FnhJ99ds7rmIyCepkeHgX3bu+8Y6skFyC6dY7skJyJZrSo3doZeQTvPYOrYzeMbF34R1bEX2D/p3GWpovUZEEs3dRlQSNHvzhHVsRRonKJyhfohoJGjcZ+RLVSFB+0MuPCeMKaiQoPyZY1WonPybke1C+RFnVaseqVjv5EpUfE/KrGmOidvI9KD8mIj/RayQoPybke1C+ROXHhHwPsqrVTr4H5cdE5FVNo0Tlx4R8DzImasfvZGonX6LGoF837cxMSdDowXS1mJuny83YFzqMEp2ru1GvdFSYYErPI17H7c69o51m+Otjt96hTjT4zZydd6ST7QZmuPUOdLLtsARb7zi/Ydhk7LzD/IZh9xpr2M/dsBes9K+hfh/q30sDzEP9nabWvfR8xN8arLyDneJ51CNihY9P454PzY+h0tPJ3Ex4xjevosbnNGYvanyY2DRn+Tvq2ju2QuQ/Eg5RqEaKMoWq34vy3+KH6EVz9GswhoZKivLf5ocYGixwCgIMjQC9GHtoaPz8JEQvBhj9AYYGvajAeOpXSTH2U79KLzI0FDA0FCz1h0aAXgwwNAL0YuwFjkKtBgucAhY4BcbXNiopyr/vzQKnIcACx9BQEOAqGkND47ynAGd2Wb0ocu6ascCpnJ0X4PzDfKHKnGEZ4BzSTKEqnSXbfxWlzgPu7UWtM537rqLYudyHvaiymH7wuVAfvMM5hu5Etwn/WS/2+V2O+GOcyrSrx/v1TmoQAgAAAAAAAAAAAAAA2F4ARUUtQNbm5HYAAAAASUVORK5CYII='}}
          />
        </View>
      </TouchableOpacity>
      </View>
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
    
  },weather:{
    height:500,
    width:500
  },addWrapper:{
    left:280,
    width:60,
    height:60,
    backgroundColor:'white',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',

  },removeButton:{
    right:280,
    width:60,
    height:60,
    backgroundColor:'white',
    borderRadius:60,
    justifyContent:'center',
    alignItems:'center',

  },containerSmall :{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
});

