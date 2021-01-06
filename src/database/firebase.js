import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCydTjHVFxW59MkRVE8uXhdZI5EoP8msKA",
    authDomain: "instagram-clone-46ed1.firebaseapp.com",
    projectId: "instagram-clone-46ed1",
    storageBucket: "instagram-clone-46ed1.appspot.com",
    messagingSenderId: "577172476796",
    appId: "1:577172476796:web:ea0f34efad716d9e3e4af9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db,auth,storage}