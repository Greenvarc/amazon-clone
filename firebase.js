import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAdcLOh8G1WTD-0jqLMNiyyWrd5JimdE5w",
    authDomain: "greenstore-42a6e.firebaseapp.com",
    projectId: "greenstore-42a6e",
    storageBucket: "greenstore-42a6e.appspot.com",
    messagingSenderId: "575866258316",
    appId: "1:575866258316:web:236f090413cd6f45b74ca9"
  };

  const app=!firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app()
  const db=app.firestore()
  export default db