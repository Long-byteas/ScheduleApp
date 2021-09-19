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

export function deleteEvent(id){
  firebase.database().ref('/date/'+id).set(null);
  console.log(id)
}

export function getEventCalendar(eventReceived,day){
  const reference = firebase.database().ref('/date').on('value',snapshot => {
      var data = Object.values(snapshot.val());
      const key = Object.keys(snapshot.val());
      //console.log(key);
      data.forEach((stuff,index)=>{
        stuff.id = key[index];
      })
      eventReceived(day,data);
  });
}

export function validUser(username,password,accept,decline){
  const reference = firebase.database().ref('/user').on('value',snapshot => {
    var eventList = [];
    // snapshot.child().forEach(eventTest => {
    const value = Object.values(snapshot.val());
    const key = Object.keys(snapshot.val());
    // })
    var isRight = false;
    value.forEach((doc,index) => {
      if(doc.username.match(username)){
        if(doc.password.match(password)){
          accept();
          isRight=true;
          console.log("asjdaskhd");
          return;
        } else {
          decline();
        }
      }
    });
    
  });
}
