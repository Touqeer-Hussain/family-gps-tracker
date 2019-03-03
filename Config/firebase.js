import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAYFp7RwJGijzStqQLVDZWqyuwmDz6ZEVc",
    authDomain: "assign-saylani.firebaseapp.com",
    databaseURL: "https://assign-saylani.firebaseio.com",
    projectId: "assign-saylani",
    storageBucket: "assign-saylani.appspot.com",
    messagingSenderId: "594003652433"
}

if (!firebase.apps.length) firebase.initializeApp(config);

export default firebase;
