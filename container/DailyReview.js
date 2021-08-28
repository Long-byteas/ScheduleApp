import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image,StyleSheet, Text, View, ScrollView,SafeAreaView,Button} from 'react-native';
import Task from './components/Task';
const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

export default function Review() {
  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.taskWrapper}>
      <Text style= {styles.sectionTile}>This is daily review</Text>
      <StatusBar style="auto" />
      <Button title="Click me" onPress={()=> alert("shit")} />
      {/* task go here */}
      <ScrollView style={styles.taskWrapper}>
          <Task text={'task1'}/>
      </ScrollView> 
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
