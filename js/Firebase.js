import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import {REACT_APIKEY_ENV,
        REACT_AUTHDOMAIN_ENV,
        REACT_PROJECTID_ENV,
        REACT_STORAGEBUCKET_ENV,
        REACT_MESSAGINGID_ENV,
        REACT_APPID_ENV} from 'react-native-dotenv';


const firebaseConfig = {
  apiKey: "REACT_APIKEY_ENV",
  authDomain: "REACT_AUTHDOMAIN_ENV",
  projectId: "REACT_PROJECTID_ENV",
  storageBucket: "REACT_STORAGEBUCKET_ENV",
  messagingSenderId: "REACT_MESSAGINGID_ENV",
  appId: "REACT_APPID_ENV",
};

export default class Finance_Firebase {
  static db;
  static auth;
  static fieldVal;
  static firestore;
  static storage;

  static init() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    Finance_Firebase.db = firebase.firestore();
    Finance_Firebase.auth = firebase.auth();
    Finance_Firebase.fieldVal = firebase.firestore.FieldValue;
    Finance_Firebase.firestore = firebase.firestore;
    Finance_Firebase.storage = firebase.storage();
  }
}
