import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
  apiKey: 'AIzaSyBkqOejg3Je6m75n78ho4S-gdLX3E7VOzw',
	authDomain: 'forwardproject-2bedf.firebaseapp.com',
	projectId: 'forwardproject-2bedf',
	storageBucket: 'forwardproject-2bedf.appspot.com',
	messagingSenderId: '551104926569',
	appId: '1:551104926569:web:52f568ed99c121457223f8'
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
