import Firebase from 'firebase';
import {
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_DB_URL,
  FB_MSS_SND_ID,
  FB_PROJ_ID,
  FB_ST_BUCKET,
} from 'react-native-dotenv';


export default class FirebaseDB {
  static instance: any = FirebaseDB.instance == null ? new FirebaseDB() : this.instance;

  config = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    databaseURL: FB_DB_URL,
    projectId: FB_PROJ_ID,
    storageBucket: FB_ST_BUCKET,
    messagingSenderId: FB_MSS_SND_ID,
  };

  app = Firebase.initializeApp(this.config);

  db = this.app.database();

  pictures = this.db.ref('pictures');

  picturesList = [];

  constructor() {
    this.pictures
      .once('value', (data: any) => {
        this.picturesList = data.val();
        this.picturesList = Object.values(this.picturesList);
        this.picturesList = this.picturesList.filter((picture: {[string: string]: string})
        : {[string: string]: string} | undefined => {
          if (!['youtube', 'vimeo'].some((aux) => picture.url.split(/[/.]/).includes(aux))) {
            return picture;
          }
        });
      });
  }

  len() {
    this.pictures.on('value', (data) => { return data.numChildren(); });
    return 0;
  }

  /*udpate(title: string) {
    this.pictures
      .orderByChild('title')
      .equalTo(title)
      .once('value')
      .then((snapshot: any) => {
        const pictureObject: Object = snapshot.val();
        const pictureKey: string = Object.keys(pictureObject)[0];
        const isFavourite: boolean = Object.values(pictureObject)[0].favourite | false;
        DB.db.ref(`pictures/${pictureKey}`)
          .update({ favourite: !isFavourite })
          .catch((error: string) => log(error));
      });
  }*/
}
