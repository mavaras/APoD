import os
from typing import List
from decouple import config as envs
import pyrebase

from exceptions import WriteFBException
from typ import PictureType as Picture


class Firebase:
    def __init__(self):
        config = {
            'apiKey': envs('FB_API_KEY'),
            'serverKey': envs('FB_SERVER_KEY'),
            'authDomain': envs('FB_AUTH_DOMAIN'),
            'databaseURL': envs('FB_DB_URL'),
            'storageBucket': envs('FB_ST_BUCKET'),
            'messagingSenderId': envs('FB_MSS_SND_ID'),
            'projectId': envs('FB_PROJ_ID'),
            'credential': {
                'private_key': envs('FB_CREDENTIALS_PK'),
                'client_email': envs('FB_CREDENTIALS_EMAIL'),
            },
        }
        firebase = pyrebase.initialize_app(config)

        self.db = firebase.database()


    def get_pictures(self) -> List[Picture]:
        all_pictures = self.db.child('pictures').get().val()
        pictures_list = [all_pictures[e] for e in list(all_pictures.keys())]
        return pictures_list


    def get_last_picture(self) -> Picture:
        return self.get_pictures()[-1]
    

    def push_picture(self, picture: Picture) -> bool:
        res = False
        try:
            self.db.child('pictures').push(picture)
            res = True
        except:
            raise WriteFBException()
        return res


    def picture_exists(self, picture: Picture) -> bool:
        return picture in self.get_pictures()
    

    def picture_date_exists(self, date: str) -> bool:
        return date == self.get_last_picture()['date']


fb = Firebase()
