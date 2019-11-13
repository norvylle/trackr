import * as firebase from 'firebase';
import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
// Firebase
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

// Redux
const LOGIN = 'USER LOGIN';
const LOGOUT = 'USER LOGOUT';

const initialState = {
  user: null
}

export function login(user){
  return {type: LOGIN, user}
}

export function logout(){
  return {type: LOGOUT}
}

function dispatcher(state, action){
  switch(action.type){
    case LOGIN:
      return Object.assign({}, state, {
        user: action.user
      });
    case LOGOUT:
    default:
      return initialState;
  }
}

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({state: dispatcher});

export const reducer = persistReducer(persistConfig, rootReducer)
export let store = createStore(reducer)
export let persistor = persistStore(store)