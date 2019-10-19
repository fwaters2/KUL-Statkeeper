import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBbOAD2g56pEgVrQENlpghzEjqgRZdDkDI",
  authDomain: "statkeeper-cb01d.firebaseapp.com",
  databaseURL: "https://statkeeper-cb01d.firebaseio.com",
  projectId: "statkeeper-cb01d",
  storageBucket: "statkeeper-cb01d.appspot.com",
  messagingSenderId: "161644903748",
  appId: "1:161644903748:web:8f4d31e32cf5aefc8aeb11",
  measurementId: "G-M8T225FT8R"
};
  firebase.initializeApp(firebaseConfig);

  export default firebase;

