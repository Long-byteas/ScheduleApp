import firebase from 'firebase'

export function getEvent(eventReceived,dateExact){
    var eventList = [];
    const reference = firebase.database().ref('/date').once('value').then(snapshot => {
        //console.log('User data: ', snapshot.val());
        snapshot.val().forEach(doc => {
          if(doc.time.match(dateExact)){
            eventList.push(doc);
          }
        });
        eventReceived(eventList);
      });
    
}