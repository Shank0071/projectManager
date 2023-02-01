import { initializeApp } from "firebase/app";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getStorage} from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyAFck18x5WUvAytXEQhCcddLhqIqdvjfSM",
    authDomain: "friendlyeats-903c2.firebaseapp.com",
    projectId: "friendlyeats-903c2",
    storageBucket: "friendlyeats-903c2.appspot.com",
    messagingSenderId: "878014848831",
    appId: "1:878014848831:web:d062e5a4132a572c847d8a",
    measurementId: "G-HM2NEC30N3"
  };

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Auth object
const auth = getAuth(app)


// setting storage
const storage = getStorage(app);



export {app, db, auth, storage}