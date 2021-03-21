import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBR1dr2YUGBT8hwkf_dml73TORoxALVFBE",
    authDomain: "planner-7f328.firebaseapp.com",
    projectId: "planner-7f328",
    storageBucket: "planner-7f328.appspot.com",
    messagingSenderId: "41340373032",
    appId: "1:41340373032:web:4b20409e9fdc6b9a724d1d"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const db = firebaseApp.firestore();