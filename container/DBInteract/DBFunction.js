import firebase from 'firebase'
import { Alert } from 'react-native';
export function getData(userKey){
    // refer to the database
    return reference = firebase.database().ref(`/${userKey}`)
}

export function pushData(event,userKey){
    // push the data using the specific key path
    console.log(userKey)
    const newReference = firebase.database().ref(`/${userKey}`).push();
    newReference
    .set(event)
    .then(() => console.log('pushed.'));
}

export function deleteData(url){
    // delete based on the url
    const newReference = firebase.database().ref(url).remove();
}

export function getUserData(){
    // return all user data
    return firebase.database().ref('/user');
}

export function setNewChild(key){
    // set a new directory for new user
    firebase.database().ref().child(`${key}`).set("").then(() => console.log('Add data'));
    const ref = firebase.database().ref().child(`${key}`).push();
    ref.set({
        name:"Example",
        time:"2021-1-1",
        description:"example"
    })
    
}
export function addUser(user){
    // add new user to the list
    const reference = getUserData().push();
    var key = reference.key;
    user.userKey = key
    reference
    .set(user)
    .then(() => console.log("Finsish"));
    setNewChild(key);
}