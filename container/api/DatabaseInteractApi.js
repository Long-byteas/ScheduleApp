import { getData } from '../DBInteract/DBFunction';
import { pushData } from '../DBInteract/DBFunction';
import { deleteData } from '../DBInteract/DBFunction';
import { getUserData } from '../DBInteract/DBFunction';
import { addUser } from '../DBInteract/DBFunction';
import md5 from 'md5'

export function getEvent(eventReceived,dateExact,userKey){
    getData(userKey).on('value',snapshot => {
      if(snapshot != undefined){
        var eventList = [];
        // getting  event and id array
        const value = Object.values(snapshot.val());
        const key = Object.keys(snapshot.val());
        if(value != null || key !=null){
        value.forEach((doc,index) => {
          doc.id = key[index];
          // check if the event is happens today
          if(doc.time.match(dateExact)){
            // return  it to the list
            eventList.push(doc);
          }
        });
        }
        // call back to return the list
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
  const reference = getData(userKey)
  reference.on('value',snapshot => {
    if(snapshot != null){
      // get an array of existing object
      const value = Object.values(snapshot.val());
      const key = Object.keys(snapshot.val());
      if(value != null || key !=null){
      value.forEach((doc,index) => {
        doc.id = key[index];
        // looping through, if the item key match then delete it
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
  // pass the userName and key  
  // hashing password
  addUser({
    username:username,
    password:md5(password)
  })
}

export function getEventCalendar(eventReceived,day,userKey){
  getData(userKey).on('value',snapshot => {
    //getting all the event of a user
      var data = Object.values(snapshot.val());
      const key = Object.keys(snapshot.val());
      data.forEach((stuff,index)=>{
        stuff.id = key[index];
      })
      eventReceived(day,data);
  });
}

export function validUser(username,password,accept,decline){
  // Check validity of a user
  getUserData().on('value',snapshot => {
    // get the list
    const value = Object.values(snapshot.val());
    const key = Object.keys(snapshot.val());
    value.forEach((doc,index) => {
      // check if a username match with the db user name
      if(doc.username.match(username)){
        // if match then hash the input password to check 
        if(doc.password.match(md5(password))){
          // if true then accept the signin and let through
          accept(doc.userKey);
          return;
        } else {
          // decline if wrong password
          decline();
        }
      }
    });
    
  });
}

export function getEventDaily(eventReceived,userKey){
  getData(userKey).on('value',snapshot => {
    // this get the event inside of the day as well.
      var eventList = [];
      var data = Object.values(snapshot.val());
      const key = Object.keys(snapshot.val());
      data.forEach((stuff,index)=>{
        stuff.id = key[index];
        eventList.push(stuff)
      })
      console.log(eventList);
      eventReceived(eventList);
  });
}