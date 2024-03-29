import React from 'react';
import { StyleSheet, View} from 'react-native';
import PagerView from 'react-native-pager-view';
import Review from './DailyReview';
import Calendar from './Calendar';
import Add from './AddEvent';


export default function DetailsScreen({ route, navigation }) {
    /* 2. Get the param */
    const { userKey } = route.params;
    // details screen will have 3 screen, scrolling to the right
    // they are attached to others.
    return (
      <PagerView style={styles.container} initialPage={0}>
      <View key="1">
        <Review userKey = {userKey} navigation = {navigation}/>
      </View>
      <View key="2">
        <Calendar userKey ={userKey}/>
      </View>
      <View key="3" >
        <Add userKey = {userKey}/>
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