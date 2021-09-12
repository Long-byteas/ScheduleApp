import firebase from 'firebase'

export function getEvent(eventReceived,dateExact){
    const reference = firebase.database().ref('/date').on('value',snapshot => {
        var eventList = [];
        snapshot.val().forEach(doc => {
          if(doc.time.match(dateExact)){
            eventList.push(doc);
          }
        });
        eventReceived(eventList);
        console.log("push");
      });
}

// export function updateEvent(event){
//   //const reference = firebase.database().ref('/users').push();
// }