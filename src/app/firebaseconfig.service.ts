import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseconfigService {

  constructor() { }
  firebaseConfiguration(){
    var firebaseConfig = {
      apiKey: "AIzaSyAoBcnU7DX5C2HgLCSHjFwjccReW-g7KOM",
      authDomain: "khaobachao-e60f4.firebaseapp.com",
      databaseURL: "https://khaobachao-e60f4.firebaseio.com",
      projectId: "khaobachao-e60f4",
      storageBucket: "khaobachao-e60f4.appspot.com",
      messagingSenderId: "879857704440",
      appId: "1:879857704440:web:01507090d504d53d2c4a0d",
      measurementId: "G-SFK79MP2MS"
    };
    // Initialize Firebase
    return firebase.initializeApp(firebaseConfig);
  }
}
