import Firebase from 'firebase';
import {
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_DB_URL,
  FB_PROJ_ID,
  FB_ST_BUCKET,
  FB_MSS_SND_ID
} from 'react-native-dotenv';


export default class FirebaseDB {
  static instance = FirebaseDB.instance == null ? new FirebaseDB() : this.instance;
  config = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    databaseURL: FB_DB_URL,
    projectId: FB_PROJ_ID,
    storageBucket: FB_ST_BUCKET,
    messagingSenderId: FB_MSS_SND_ID
  };
  app = Firebase.initializeApp(this.config);
  db = this.app.database();
  pictures = this.db.ref('pictures');
  pictures_nItems = 0;

  len() {
    this.pictures.on('value', data => { return data.numChildren() });
    return 0;
  }
}
