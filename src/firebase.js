import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyDiFAkyhzUYWGKMk0-zEjDW1vC8KnUb8aE",
    authDomain: "the-ultimate-todo.firebaseapp.com",
    databaseURL: "https://the-ultimate-todo.firebaseio.com",
    projectId: "the-ultimate-todo",
    storageBucket: "the-ultimate-todo.appspot.com",
    messagingSenderId: "643253585913",
    appId: "1:643253585913:web:afb1d6de02c041da69df28"
  };

  firebase.initializeApp(firebaseConfig);
  
  const db = firebase.firestore();

  export default db;