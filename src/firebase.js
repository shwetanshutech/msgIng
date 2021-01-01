import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyDEcNbAYPbIhvCH1E6mviIK62kg8wTahEs",
  authDomain: "msg-ing.firebaseapp.com",
  databaseURL: "https://msg-ing.firebaseio.com",
  projectId: "msg-ing",
  storageBucket: "msg-ing.appspot.com",
  messagingSenderId: "973258131715",
  appId: "1:973258131715:web:72048f1f1d4e4c34a2c136",
};
const firebaseApp = firebase.intializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default { auth, provider };
