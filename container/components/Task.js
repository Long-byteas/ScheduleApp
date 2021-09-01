import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image,StyleSheet, Text, View, ScrollView,SafeAreaView,Button, TouchableOpacity} from 'react-native';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

export default function Task(props) {
  return (
    <View style={styles.items}>
        <View style={styles.itemLeft}>
            <TouchableOpacity style={styles.square}></TouchableOpacity>
            <Text style={styles.itemText}> this is {props.text} </Text>
        </View>
        <View style={styles.circular}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  items:{
    backgroundColor:'white',
    padding:15,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:20,

  },
  itemLeft:{
    flexDirection:'row',
    alignItems:'center',
    // wraptonextline
    flexWrap:'wrap', 
  },
  square:{
    width:24,
    height:24,
    backgroundColor:'blue',
    opacity:0.4,
    borderRadius:5,
    marginRight:15,
  },
  circular:{
    width:12,
    height:12,
    backgroundColor:'white',
    opacity:0.4,
    borderWidth:2,
    borderRadius:5,
    borderColor:'blue',

  },
  itemText:{
    maxWidth:'80%',
  },
});
