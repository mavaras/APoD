import json
from typing import Dict, List
import urllib.request
from decouple import config as envs

from typ import (
    PictureType as Picture,
    ArticleType as Article
)
from dal.firebase import fb
from domain.utils import utils
from exceptions import FetchException


def get_today_picture() -> Picture:
    picture = None
    last_picture = fb.get_last_picture()
    must_query = utils.get_today_date_formatted() != last_picture['date']
    if must_query:
        with urllib.request.urlopen(
                f'{envs("NASA_API_URL")}api_key={envs("NASA_API_KEY")}',
                timeout=10
            ) as response:
            response = json.loads(response.read().decode('utf-8'))
            if response.get('title', '') == 'Default Image':
                raise Exception('Error: NASA returned a default image')
            picture = {
                'title': response.get('title', ''),
                'url': response.get('url', ''),
                'explanation': response.get('explanation', ''),
                'date': response.get('date', ''),
                'author': response.get('author', response.get('copyright', ''))
            }
            if not add_picture(picture):
                raise Exception('Error: error while writing to database')
    else:
        picture = last_picture

    return picture


def get_news() -> List[Article]:
    with urllib.request.urlopen(envs('NEWS_API_URL'), timeout=15) as response:
        return json.loads(response.read().decode('utf-8'))['docs']


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
