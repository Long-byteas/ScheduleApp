import { StatusBar } from 'expo-status-bar';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import React, {useState,useEffect} from 'react';
import {View, TouchableOpacity,Text,StyleSheet} from 'react-native';
import {Card, Avatar} from 'react-native-paper';
//import * as data from '../data/dataTest.json'
import firebase from 'firebase'

const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};


export default function CalendarView() {
  const [items, setItems] = useState({});
  // const [loading, setLoading] = useState(loading ? true : false);
  // useEffect(() => {
  //   connect();
  //   console.log("done");
  // }, [loading])
  
  // useEffect(()=>{
  //   const getData = async () => {
  //       // const resp = await fetch('https://mobiledev-aa1ec-default-rtdb.asia-southeast1.firebasedatabase.app/');
  //       // const data = await resp.json();
  //       // console.log(data);
  //       const customData = require('../data/dataTest.json');
  //       setItems(data);
  //   }
  //   getData();
  // },[]);

  const loadItems = (day) => {
    // create and add each day into items (which is each day)
    //  every day we load a item
    connect();
    const reference = firebase.database().ref('/date').once('value').then(snapshot => {
      //console.log('User data: ', snapshot.val());
      data = snapshot.val();
      // console.log(this.data);
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time);
          if (!items[strTime]) {
            // items[strTime] = [];
            // // number of item that would be in the event
            
            // const numItems = Math.floor(Math.random() * 3);
            // // where to push item in 
            // for (let j = 0; j < numItems; j++) {
            //   // add event here
            //   items[strTime].push({
            //     name: 'Item for ' + strTime + ' #' + j,
            //     height: Math.max(50, Math.floor(Math.random() * 150)),
            //     timeOfthis: strTime,
            //     eventOnThis: 'This is an event in that day',
            //   });
            // }
            items[strTime] = [];
            var numItem = data.length;
            for( let i=0;i<numItem;i++){
                //var name = data.date[i];
                if(data[i].time.match(strTime)){
                  items[strTime].push({
                    name : data[i].name,
                    height: Math.max(50, Math.floor(Math.random() * 150)),
                    timeOfthis: data[i].time,
                    eventOnThis:  data[i].description
                  });
                }
            }
          }
        }
        const newItems = {};
        Object.keys(items).forEach((key) => {
          newItems[key] = items[key];
        });
        setItems(newItems);
      }, 1000);
    });
  };

function connect(){
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
  const renderItem = (item) => {
    //console.log(data.date[1].name);
    return (
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}} onPress={() => alert(item.timeOfthis)}>
        <Card>
          <Card.Content>
            <View
              style={styles.event}>
              <Text>{item.eventOnThis}</Text>
              <Avatar.Text label="I" />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };
  
  const renderEmptyDate = () => {
    return (
      <View style={{flex: 1}}>
      </View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    backGround:{
      backgroundColor: 'orange',
    },
    event:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }
    ,
  })

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />
    </View>
  );
};

