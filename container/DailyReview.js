import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { Image,StyleSheet, Text, View, ScrollView,SafeAreaView,Button, FlatList} from 'react-native';
import Task from './components/Task';
//import * as data from '../data/dataTest.json';
import firebaseConfig from '../Config';
import firebase from 'firebase'
import { getEvent } from './api/DatabaseInteractApi';

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
    
  }

  state = {
    eventList : []
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
      console.log("asdhaskdhkas");
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
    getEvent(this.OnEventReceived,this.dateExact)
  }

  componentDidUpdate() {
    console.log(this.state.eventList.length);
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
      <View style={styles.taskWrapper}>
        <Text style= {styles.sectionTile}>Today is {this.dateExact}</Text>
        <StatusBar style="auto" />
        {/* task go here */}
        {/* <ScrollView style={styles.taskWrapper} data={this.state.eventList}>
          {
            this.displayEvent()
          }
        </ScrollView> */}
        <FlatList
          data={this.state.eventList}
          renderItem={({item,index}) => {
            return (<Task key={index} text ={item.name} />);
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

