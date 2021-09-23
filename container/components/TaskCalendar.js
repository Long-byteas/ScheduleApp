import { Image,StyleSheet, Text, View, Button, TouchableOpacity,CheckBox} from 'react-native';
import React,{useState,useEffect} from 'react';
import { Dialog } from 'react-native-simple-dialogs';
import { deleteEvent } from '../api/DatabaseInteractApi';
import {Card} from 'react-native-paper';
const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

export default function Task({item},{userKey}) {
  const [dialogVisible, setDialog] = useState(false);
  return (
    <View>
      <Dialog 
        visible={dialogVisible} 
        title={item.name}
        onTouchOutside={() => setDialog(false)} >
        <View>
          <Text> {item.timeOfthis} </Text>
          <Text> {item.eventOnThis} </Text>
          <Button
          title="Delete"
          onPress={() => {
            setDialog(false)
            deleteEvent(item.id,userKey)
          }
          }
        />
        </View>
      </Dialog>
      <TouchableOpacity style={{marginRight: 10, marginTop: 17}} onPress={() => {
        setDialog(true)
        }}>
        <Card>
          <Card.Content>
            <View
              style={styles.event}>
              <Text>{item.name}</Text>
              <Text>{item.timeOfthis}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
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