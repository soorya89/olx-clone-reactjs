import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCPCtJd1DoVmdwNtxQ1R1TuJ3T88H-dPkw",
    authDomain: "olx-app-ef816.firebaseapp.com",
    projectId: "olx-app-ef816",
    storageBucket: "olx-app-ef816.appspot.com",
    messagingSenderId: "771623185633",
    appId: "1:771623185633:web:525b509183f387e5529ba0",
    measurementId: "G-JKV73QPFYY"
  };

// Initialize Firebase app
export default firebase.initializeApp(firebaseConfig);


