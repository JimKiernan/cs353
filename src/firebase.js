import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyDYUbXkoxFFnrnvlVnhYhnceM95R1df6S4",
    authDomain: "cs353-d8f0c.firebaseapp.com",
    databaseURL: "https://cs353-d8f0c.firebaseio.com",
    projectId: "cs353-d8f0c",
    storageBucket: "cs353-d8f0c.appspot.com",
    messagingSenderId: "230540988017"
  };
 
firebase.initializeApp(config);
export default firebase;
