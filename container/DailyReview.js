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

export default function Review() {
  const [items, setItems] = useState([]);


  function load() {
    var numItem = data.date.length;
    var date = new Date();
    var  dateExact = timeToString(date);
    console.log(dateExact);
    //var current = year + '-' + month + '-' + date;
    for( let i=0;i<numItem;i++){
      if(data.date[i].time.match(dateExact)){
        setItems([...items,{
          name : data.date[i].name,
          height: Math.max(50, Math.floor(Math.random() * 150)),
          timeOfthis: data.date[i].time,
          eventOnThis:  data.date[i].description
        }]);
      }
    }
  };

  function load2(){
    var what = items.map((stuff,index) => {
      console.log(index);
      return (<Task key={index} text ={stuff.eventOnThis} />);
    })
    return what;
  }
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.taskWrapper}>
      <Text style= {styles.sectionTile}>This is daily review</Text>
      <StatusBar style="auto" />
      <Button title="Click me" onPress={() => load()} />
      {/* task go here */}
      <View style={styles.taskWrapper}>
        {
          load2()
        }
      </View> 
    </View>
    </SafeAreaView>
  );
}

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
