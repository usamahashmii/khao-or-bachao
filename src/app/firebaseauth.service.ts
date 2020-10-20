import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public http: HttpClient) {
    console.log('Hello FirebaseauthProvider Provider');
  }

  createNewAccount(email , password) {
    return firebase.auth().createUserWithEmailAndPassword(email,password);
  }
  login(email , password){
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }
  logout(){
    return firebase.auth().signOut();
  }
  // update email and password
  updatePasswordEmail(password , email , showPasswordInput){
    if(showPasswordInput){
      return firebase.auth().currentUser.updatePassword(password).then(data => {
        firebase.auth().currentUser.updateEmail(email);
      });
    }else if(!showPasswordInput){
      return firebase.auth().currentUser.updateEmail(email);
      //
    }
    
  }
  //update profile data
  updateProfileData(userId: string , name: string , email: string , number: string , profileImage: string){
    return firebase.database().ref('userSignData/' + userId).update({
      name: name,
      email: email,
      number: number,
      profileImage: profileImage
    });
  }
  //get user data from firebase
  getProfileData(userId: any){
    return firebase.database().ref('userSignData/' + userId);
  }
  forgotPasswordUser(email){
    return firebase.auth().sendPasswordResetEmail(email);
  }
}
