import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { Image,StyleSheet, Text, View, ScrollView,SafeAreaView,Button} from 'react-native';
import Task from './components/Task';
import * as data from '../data/dataTest.json';
import firebaseConfig from '../Config';
import firebase from 'firebase'

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
    this.connect();
    this.date = new Date();
    this.dateExact = timeToString(this.date);
    this.items = [];
  }
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
    firebase.initializeApp(firebaseConfig);
    const reference = firebase.database().ref('/date').once('value')
  .then(snapshot => {
    console.log('User data: ', snapshot.val());
    this.data = snapshot.val();
    console.log(this.data);
  });
    this.load();
  }

  load() {
    //const [items, setItems] = useState([]);
    // load date into items
    console.log(this.data.date);
    var numItem = data.date.length;
    console.log(this.dateExact);
    //var current = year + '-' + month + '-' + date;
    for( let i=0;i<numItem;i++){
      if(data.date[i].time.match(this.dateExact)){
        this.items.push({
          name : data.date[i].name,
          height: Math.max(50, Math.floor(Math.random() * 150)),
          timeOfthis: data.date[i].time,
          eventOnThis:  data.date[i].description
        });
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

  render() {
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style= {styles.sectionTile}>Today is {this.dateExact}</Text>
        <StatusBar style="auto" />
        {/* task go here */}
        <ScrollView style={styles.taskWrapper}>
          {
            this.displayEvent()
          }
        </ScrollView>
        <View>
          
        </View> 
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

