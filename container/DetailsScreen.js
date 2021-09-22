import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import Review from './DailyReview';
import Calendar from './Calendar';
import Add from './AddEvent';


export default function DetailsScreen({ route, navigation }) {
    /* 2. Get the param */
    const { userKey } = route.params;
    console.log(userKey)
    console.log("shittt")
    return (
      <PagerView style={styles.container} initialPage={0}>
      <View key="1">
        <Review userKey = {userKey}/>
      </View>
      <View key="2">
        <Calendar userKey ={userKey}/>
      </View>
      <View key="3" >
        <Add userKey = {userKey}/>
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