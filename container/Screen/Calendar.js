import {Agenda} from 'react-native-calendars';
import React, {useState} from 'react';
import {View,StyleSheet} from 'react-native';
//import * as data from '../data/dataTest.json'
import firebase from 'firebase'
import { getEventCalendar } from '../api/DatabaseInteractApi';
import Task from '../components/TaskCalendar';
const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};


export default function CalendarView(props) {
  const [items, setItems] = useState({});
  const loadItems = (day) => {
    // create and add each day into items (which is each day)
    //  every day we load a item
    getEventCalendar(getData,day,props.userKey);
  };

  function getData(day,data){
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        // we find the time inside the array then create a new object for it to
        // push into the calendar
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]||true) {
          items[strTime] = [];
          var numItem = data.length;
          for( let i=0;i<numItem;i++){
              if(data[i].time.match(strTime)){
                items[strTime].push({
                  name : data[i].name,
                  height: Math.max(50, Math.floor(Math.random() * 150)),
                  timeOfthis: data[i].time,
                  eventOnThis:  data[i].description,
                  id: data[i].id
                });
              }
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      //updating items to the list 
      setItems(newItems);
    }, 1000);
  }

  const renderItem = (item) => {
    // with each of the task we make a new task then add into the calendar
    //console.log(data.date[1].name);
    return (
      <View>
        <Task item={item} userKey={props.userKey}/>
      </View>
    );
    
  };
  
  const renderEmptyDate = () => {
    // deals with emptyday
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
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
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

