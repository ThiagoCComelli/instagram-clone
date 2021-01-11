import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCEAr2DYxklStMIfAUzOth91Mw-ZYnoixo",
    authDomain: "instagramclonetc.firebaseapp.com",
    projectId: "instagramclonetc",
    storageBucket: "instagramclonetc.appspot.com",
    messagingSenderId: "845940121545",
    appId: "1:845940121545:web:77969e1de62895744a1218"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
const db = firebaseApp.firestore()
const auth = firebase.auth()

export {db,auth,storage}
