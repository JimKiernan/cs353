import firebase from 'firebase'

  var config = {
    apiKey: "AIzaSyC0LZPZrs0BRdZoPi0IPsWAi9S8XNxMjNc",
    authDomain: "my-project-1542623734498.firebaseapp.com",
    databaseURL: "https://my-project-1542623734498.firebaseio.com",
    projectId: "my-project-1542623734498",
    storageBucket: "my-project-1542623734498.appspot.com",
    messagingSenderId: "917427983539"
  };
 
firebase.initializeApp(config);
export default firebase;
