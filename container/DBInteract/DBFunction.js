import firebase from 'firebase'

export function getData(userKey,functionReceived){
    const reference = firebase.database().ref(`/${userKey}`).on('value',snapshot => {
        console.log(snapshot)
        functionReceived(snapshot.val())
    })
}