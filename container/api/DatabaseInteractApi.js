import firebase from 'firebase'

export function getEvent(eventReceived,dateExact){
    const reference = firebase.database().ref('/date').on('value',snapshot => {
        var eventList = [];

        console.log(typeof(snapshot.val()));
        console.log(Object.values(snapshot.val()));

        // snapshot.child().forEach(eventTest => {
        const value = Object.values(snapshot.val());
        // })
        value.forEach(doc => {
          console.log(doc);
          if(doc.time.match(dateExact)){
            console.log("push")
            eventList.push(doc);
          }
        });
        eventReceived(eventList);
      });
}

export function updateEvent(event){
  const newReference = firebase.database().ref('/date').push();
  newReference
  .set(event)
  .then(() => console.log('pushed.'));
}

export function writeEvent(){

}
 export function deleteEvent(id){

 }