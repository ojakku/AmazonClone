// import firebase from 'firebase';
// import 'firebase/auth';
// import 'firebase/firestore';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCjikqIMMR5bQE-xqZwI5CDjKkK4A3wjZQ",
    authDomain: "challenge-a9fc0.firebaseapp.com",
    projectId: "challenge-a9fc0",
    storageBucket: "challenge-a9fc0.appspot.com",
    messagingSenderId: "246926745066",
    appId: "1:246926745066:web:508d4c5d124125d83b2693",
    measurementId: "G-NVY9XKK65E"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  export { auth, db };