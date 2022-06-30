import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDzY77UPCkh9LYcNJNw3HFYnv5roYpKP8A",
  authDomain: "finance-app-cas21.firebaseapp.com",
  projectId: "finance-app-cas21",
  storageBucket: "finance-app-cas21.appspot.com",
  messagingSenderId: "624102838911",
  appId: "1:624102838911:web:bcec26cc1636cde066a54a",
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
