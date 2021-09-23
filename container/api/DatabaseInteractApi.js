import { getData } from '../DBInteract/DBFunction';
import { pushData } from '../DBInteract/DBFunction';
import { deleteData } from '../DBInteract/DBFunction';
import { getUserData } from '../DBInteract/DBFunction';
import { addUser } from '../DBInteract/DBFunction';
export function getEvent(eventReceived,dateExact,userKey){
  console.log("ajsdhjkasdhkashd")
    getData(userKey).on('value',snapshot => {
      if(snapshot != undefined){
        var eventList = [];
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
  pushData(event,userKey);
}

export function writeEvent(){

}

export function deleteEvent(id,userKey){
  console.log("delete");
  const reference = getData(userKey)
  reference.on('value',snapshot => {
    if(snapshot != null){
      // snapshot.child().forEach(eventTest => {
      const value = Object.values(snapshot.val());
      const key = Object.keys(snapshot.val());
      // })
      if(value != null || key !=null){
      value.forEach((doc,index) => {
        doc.id = key[index];
        if(key[index].match(id)){
          var url = "/"+userKey+"/"+id
          console.log(id)
          deleteData(url);
        }
      });
      }
    }
    });
}


export function pushNewKey(username,password){
  console.log("sigup")
  // pass the userName and key  
  addUser({
    username:username,
    password:password
  })
}

export function getEventCalendar(eventReceived,day,userKey){
  getData(userKey).on('value',snapshot => {
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
  getUserData().on('value',snapshot => {
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
  getData(userKey).on('value',snapshot => {
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