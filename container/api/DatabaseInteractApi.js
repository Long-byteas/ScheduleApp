import firebase from 'firebase'

export function getEvent(eventReceived,dateExact,userKey){
    console.log(userKey)
    console.log("asdhaskjdh")
    const reference = firebase.database().ref(`/${userKey}`).on('value',snapshot => {
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

export function updateEvent(event,userKey){
  const newReference = firebase.database().ref(`/${userKey}`).push();
  newReference
  .set(event)
  .then(() => console.log('pushed.'));
}

export function writeEvent(){

}

export function deleteEvent(id,userKey){
  firebase.database().ref(`/${userKey}`+id).set(null);
  console.log(id)
}

export function pushNewKey(key){
  console.log("push")
  const newReference = firebase.database().ref().child(`${key}`).set("new");
}

export function getEventCalendar(eventReceived,day,userKey){
  const reference = firebase.database().ref(`/${userKey}`).on('value',snapshot => {
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
          console.log(doc.userKey);
          accept(doc.userKey);
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
