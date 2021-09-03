import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image,StyleSheet, Text, View, ScrollView,SafeAreaView,Button} from 'react-native';
import PagerView from 'react-native-pager-view';
import Review from './container/DailyReview';
import Calendar from './container/Calendar';
import Add from './container/AddEvent';
//import TestDb from './container/testDB';

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

export default function App() {
  return (
    <PagerView style={styles.container} initialPage={0}>
    <View key="1">
      <Review/>
    </View>
    <View key="2">
      <Calendar/>
    </View>
    <View key="3">
      <Add/>
    </View>
    <View key="4">
      
    </View>
  </PagerView>
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
});
