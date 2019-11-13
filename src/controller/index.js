import * as firebase from 'firebase';

const firebaseConfig = require("./secrets");

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export function insert(data){
  return database.ref(data.link)
    .push(data.data)
}

export function update(data){
  return database.ref(data.link)
  .update(data.data)
}

export function remove(data){
  return database.ref(data.link)
  .remove()
}

export function searchMulti(data){
  return database.ref(data.link)
  .orderByChild(data.child)
  .equalTo(data.search)
}

export function searchAll(data){
  return database.ref(data.link)
  .orderByChild(data.child)
}

export function snapshotToArray(snapshot){
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
  });

  return returnArr;
};
