import React from 'react';
import Firebase from 'firebase';


export default class FirebaseDB {
  static instance = FirebaseDB.instance == null ? new FirebaseDB() : this.instance;
  config = {
    apiKey: 'AIzaSyCjTCy1xQYSp-tmO52Wzvk_4RWsMYLXbXg',
    authDomain: 'apod-17931.firebaseapp.com',
    databaseURL: 'https://apod-17931.firebaseio.com',
    projectId: 'apod-17931',
    storageBucket: 'apod-17931.appspot.com',
    messagingSenderId: '174151444435'
  };
  app = Firebase.initializeApp(this.config);
  db = this.app.database();
  pictures = this.db.ref('pictures');
  pictures_nItems = 0;

  async getPictures() {
    const snapshot = await firebase.firestore().collection('pictures').get();
    return snapshot.docs.map(doc => doc.data());
  }

  len() {
    this.pictures.on("value", data => { return data.numChildren() });
    return 0;
  }
}
