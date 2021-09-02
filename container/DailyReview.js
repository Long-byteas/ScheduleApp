import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { Image,StyleSheet, Text, View, ScrollView,SafeAreaView,Button} from 'react-native';
import Task from './components/Task';
import * as data from '../data/dataTest.json'

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
    this.items = [];
    this.load();
  }

  load() {
    //const [items, setItems] = useState([]);
    // load date into items
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

