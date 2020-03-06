import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAWA7UriVOazG0iHdcsTg5GsJDlNmQQ5pY",
  authDomain: "kul-spring-20.firebaseapp.com",
  databaseURL: "https://kul-spring-20.firebaseio.com",
  projectId: "kul-spring-20",
  storageBucket: "kul-spring-20.appspot.com",
  messagingSenderId: "952478816686",
  appId: "1:952478816686:web:28b2e46c7ad8002608503f",
  measurementId: "G-48TRKQHBFP"
};
const firebase2 = firebase.initializeApp(firebaseConfig, "firebase2");

export default firebase2;
