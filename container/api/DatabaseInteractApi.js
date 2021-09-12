import firebase from 'firebase'

export function getEvent(eventReceived,dateExact){
    const reference = firebase.database().ref('/date').on('value',snapshot => {
        var eventList = [];
        console.log(snapshot.key);
        snapshot.child().forEach(eventTest => {
          console.log(eventTest)
          console.log("asdasd")
        })
        snapshot.val().forEach(doc => {
          if(doc.time.match(dateExact)){
            eventList.push(doc);
          }
        });
        eventReceived(eventList);
        console.log("push");
      });
}

export function updateEvent(event){
  const reference = firebase.database().ref('/date').push();
  newReference
  .set(event)
  .then(() => console.log('pushed.'));
}