import firebase from 'firebase'

export function getEvent(eventReceived,dateExact){
    const reference = firebase.database().ref('/date').on('value',snapshot => {
        var eventList = [];
        // snapshot.child().forEach(eventTest => {
        const value = Object.values(snapshot.val());
        const key = Object.keys(snapshot.val());
        // })
        value.forEach((doc,index) => {
          doc.id = key[index];
          if(doc.time.match(dateExact)){
            //console.log("push")
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

export function deleteEvent(event){
  //await database().ref('/users/'+event.id).remove();

}

export function getEventCalendar(eventReceived,day){
  const reference = firebase.database().ref('/date').on('value',snapshot => {
      data = Object.values(snapshot.val());
      const key = Object.keys(snapshot.val());
      //console.log(key);
      data.forEach((stuff,index)=>{
        stuff.id = key[index];
      })
      console.log((data));
      eventReceived(day,data);
  });
}