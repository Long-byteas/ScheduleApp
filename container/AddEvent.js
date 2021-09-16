import { StatusBar } from 'expo-status-bar';
import { Image,StyleSheet, Text, View, ScrollView,SafeAreaView,Button,TextInput,Alert} from 'react-native';
import React, {useState,useEffect} from 'react';
import { updateEvent } from './api/DatabaseInteractApi';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

export default function Add() {
  const [text, setText] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [description, setDescription] = useState('');

  function submit(){
    if(!day.trim()||!month.trim()||!year.trim()){
      Alert.alert('please fill in the missing blank');
    } else {
      var time = year +"-"+ month +"-"+ day;
      updateEvent({
        time:time,
        name:text,
        description:description,
      })
    }

  };
  function clear(){
    setDay('');
    setMonth('');
    setText('');
    setYear('');
    setDescription('');
  }
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.taskWrapper}>
      <Text style= {styles.sectionTile}> Event Add </Text>
      <StatusBar style="auto" />
      <Text> Event Name </Text>
      <TextInput
        style={styles.textBox}
        placeholder="Your awesome event name"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text> Event Time </Text>
      <View style={[{flexDirection:'row', alignItems:'center'}]}>
      <TextInput
        maxLength = {2}
        keyboardType = 'numeric'
        style={styles.numBox}
        placeholder="17"
        onChangeText={day => {
          if(parseInt(day,10)>30){
            day="30";
          }
          setDay(day)
        }
        }
        defaultValue={day}
      />
      <Text>-</Text>
      <TextInput
        maxLength = {2}
        keyboardType = 'numeric'
        style={styles.numBox}
        placeholder="11"
        onChangeText={month => {
          if(parseInt(month,10)>12){
            month="12";
          }
          setMonth(month)}
        }
        defaultValue={month}
      />
      <Text>-</Text>
      <TextInput
        maxLength = {4}
        keyboardType = 'numeric'
        style={styles.yearBox}
        placeholder="2000"
        onChangeText={year => setYear(year)}
        defaultValue={year}
      />
      </View>
      <Text> Your Description : </Text>
      <TextInput
        style={styles.inputContainer}
        multiline
        placeholder="Your description"
        onChangeText={description => setDescription(description)}
        defaultValue={description}
      />
      <View style={styles.fixToText}>
        <Button
          title="Clear"
          onPress={() => 
            clear()

          }
        />
        <Button
          title="Submit"
          onPress={() => 
            submit()
          }
        />

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
    
  },textBox:{
    backgroundColor: 'white',
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },text:{
    fontSize:16,
    fontWeight:'bold',
  },numBox:{
    backgroundColor: 'white',
    height: 40,
    width: 40,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },yearBox:{
    backgroundColor: 'white',
    height: 40,
    width: 80,
    margin: 10,
    borderWidth: 1,
    padding: 10,
  },fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },inputContainer: {
    marginTop:0,
    flexDirection: "row",
    alignSelf: "center",
    width: "96%",
    marginLeft: 2,
    marginRight: 2,
    marginBottom: 10,
    minHeight: 50, //... For dynamic height
    borderRadius: 50,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "gray",
    paddingLeft: 10, //... With respect to the min height, so that it doesn't cut
    paddingTop: 10, //... With respect to the min height, so that it doesn't cut
    paddingBottom: 10 //... With respect to the min height, so that it doesn't cut
},
});
