import React from 'react';
import {StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './container/Screen/HomeScreen'
import DetailsScreen from './container/Screen/DetailsScreen';
import firebase from 'firebase'
import SignUpScreen from './container/Screen/SignUpScreen'

const logo = {
  uri: 'https://reactnative.dev/img/tiny_logo.png',
  width: 64,
  height: 64
};

const Stack = createNativeStackNavigator();

function connect(){
  // connect to the db at the start
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

export default function App() {
  // Divide the app into 3 main screens, each screens will have smaller screen.
  connect();
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions ={{
        headerStyle:{
          backgroundColor:'transparent'
        },
        headerTintColor:'white',
        headerTransparent:true,
        headerBackVisible:true,
        headerShown:false,
        headerTitle:'',
        headerLeftContainerStyle:{
          paddingLeft:20
        }
      }}
      initialRouteName="Home"
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
