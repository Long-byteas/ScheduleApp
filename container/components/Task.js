import {StyleSheet, Text, View, Button, TouchableOpacity,CheckBox} from 'react-native';
import React,{useState} from 'react';
import { Dialog } from 'react-native-simple-dialogs';
import { deleteEvent } from '../api/DatabaseInteractApi';
const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

export default function Task(props) {
  // this is a task using to click on
  const [isDone, setSelection] = useState(false);
  const [dialogVisible, setDialog] = useState(false);
  return (
    <TouchableOpacity style={styles.items} onPress={() => {
      setDialog(true)
      }}>
      <Dialog 
        visible={dialogVisible} 
        title={props.text}
        onTouchOutside={() => setDialog(false)} >
        <View>
          <Text style={styles.itemText}> Description : {props.desc} </Text>
          <Button
          title="Delete"
          onPress={() => {
            setDialog(false)
            deleteEvent(props.id,props.userKey)
          }
          }
        />
        </View>
      </Dialog>
        <View style={styles.itemLeft}>
          <CheckBox
          value={isDone}
          onValueChange={setSelection}
          style={styles.checkbox}
          />
          <Text style={styles.itemText}> {props.desc} {'\n'} Is Done: {isDone ? "👍" : "👎"} </Text>
        </View>
        <View style={styles.circular}></View>
    </TouchableOpacity>
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
  checkbox: {
    alignSelf: "center",
  },
});
