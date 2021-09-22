import firebase from 'firebase'

export function getEvent(eventReceived,dateExact,userKey){
    const reference = firebase.database().ref(`/${userKey}`).on('value',snapshot => {
      if(snapshot != null){
        var eventList = [];
        console.log(snapshot.val())
        console.log("whatttt");
        // snapshot.child().forEach(eventTest => {
        const value = Object.values(snapshot.val());
        const key = Object.keys(snapshot.val());
        // })
        if(value != null || key !=null){
        value.forEach((doc,index) => {
          doc.id = key[index];
          if(doc.time.match(dateExact)){
            //console.log("push")
            eventList.push(doc);
          }
        });
        }
        eventReceived(eventList);
      }
      });
}

export function updateEvent(event,userKey){
  console.log(userKey)
  const newReference = firebase.database().ref(`/${userKey}`).push();
  newReference
  .set(event)
  .then(() => console.log('pushed.'));
}

export function writeEvent(){

}

export function deleteEvent(id,userKey){
  const reference = firebase.database().ref(`/${userKey}`)
  reference.on('value',snapshot => {
    if(snapshot != null){
      var eventList = [];

      // snapshot.child().forEach(eventTest => {
      const value = Object.values(snapshot.val());
      const key = Object.keys(snapshot.val());
      // })
      if(value != null || key !=null){
      value.forEach((doc,index) => {
        doc.id = key[index];
        if(key[index].match(id)){
          console.log("ajsdjashdausdhashdo")
          var url = "/"+id
          reference.child(url).remove();
        }
      });
      }
    }
    });
}

export function pushNewKey(username,password){
  console.log("sigup")
  const reference = firebase.database().ref('/user').push();
  var key = reference.key;
  reference
  .set({
    username:username,
    password:password,
    userKey: key,
  })
  .then(() => console.log('Data updated.'));
  const newReference = firebase.database().ref().child(`${key}`).set("").then(() => console.log('Add data'));;
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
          accept(doc.userKey);
          console.log(doc.userKey)
          isRight=true;
          return;
        } else {
          decline();
        }
      }
    });
    
  });
}

export function getEventDaily(eventReceived,userKey){
  const reference = firebase.database().ref(`/${userKey}`).on('value',snapshot => {
      var eventList = [];
      var data = Object.values(snapshot.val());
      const key = Object.keys(snapshot.val());
      //console.log(key);
      data.forEach((stuff,index)=>{
        stuff.id = key[index];
        eventList.push(stuff)
      })
      console.log(eventList);
      eventReceived(eventList);
  });
}