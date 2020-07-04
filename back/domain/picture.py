import json
from typing import Dict, List
import urllib.request
from decouple import config as envs

from back.typ import PictureType as Picture
from back.dal.firebase import fb
from back.domain.utils import utils
from back.exceptions import FetchException


def get_today_picture() -> Picture:
    picture = None
    last_picture = fb.get_last_picture()
    must_query = utils.get_today_date_formatted() != last_picture['date']
    if must_query:
        with urllib.request.urlopen(
                f'https://api.nasa.gov/planetary/apod?api_key={envs("NASA_API_KEY")}'
            ) as response:
            response = json.loads(response.read().decode('utf-8'))
            picture = {
                'title': response.get('title', ''),
                'url': response.get('url', ''),
                'description': response.get('explanation', ''),
                'date': response.get('date', ''),
                'author': response.get('author', response.get('copyright', ''))
            }
            '''if not add_picture(picture):
                # raise FB write error
                pass'''
    else:
        picture = last_picture

    return picture


def add_picture(picture: Picture) -> bool:
    return fb.push_picture(picture)


def get_all_pictures() -> List[Picture]:
    return fb.get_pictures()


def get_similars(picture_title: str) -> List[Picture]:
    similars = []
    max_len = 0
    pictures = get_all_pictures()
    title_split = [word for word in picture_title.split(' ') if len(word) > 3]
    for word in title_split:
        word = word[:-1] if not word[-1].isalpha() else word
        filtered_pictures = filter_pictures_by_word(pictures, word, picture_title)
        if len(filtered_pictures) > max_len:
            max_len = len(filtered_pictures)
            similars = filtered_pictures
    return similars


def filter_pictures_by_word(
    array: List[Picture],
    word: str,
    to_exclude: str
) -> List[Picture]:
    return [picture for picture in array
            if picture['title'] != to_exclude and word.lower() in picture['title'].lower()]
