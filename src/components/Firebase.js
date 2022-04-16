import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC2U9RYnANp1WezpVeKANrV_AJaIopX4N4",
  authDomain: "disnety-9bd61.firebaseapp.com",
  projectId: "disnety-9bd61",
  storageBucket: "disnety-9bd61.appspot.com",
  messagingSenderId: "363161079933",
  appId: "1:363161079933:web:de20c4b960c8b64f6b6114",
  measurementId: "G-GH4RCX5YEQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage()

export { auth, provider, storage }
export default db;