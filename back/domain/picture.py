import json
from typing import Dict, List
import urllib.request
from decouple import config as envs

from typ import (
    PictureType as Picture,
    ArticleType as Article,
    RocketLaunchType as RocketLaunch
)
from dal.firebase import fb
from domain.utils import utils
from exceptions import FetchException


def get_today_picture() -> Picture:
    return get_picture()


def get_last_picture() -> Picture:
    return fb.get_last_picture()


def get_picture(date: str = utils.get_today_date_formatted()) -> Picture:
    picture = None
    last_picture = fb.get_last_picture()
    must_query = date != last_picture['date']
    if must_query:
        with urllib.request.urlopen(
                f'{envs("NASA_API_URL")}api_key={envs("NASA_API_KEY")}'
                f'&date={date}',
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
    news = []
    today = utils.get_today_date_formatted()
    with urllib.request.urlopen(envs('SF_NEWS_API_URL'), timeout=15) as response:
        response = json.loads(response.read().decode('utf-8'))['docs']
        news.extend(response)

    with urllib.request.urlopen(envs('STSCI_NEWS_API_URL'), timeout=15) as response:
        response = json.loads(response.read().decode('utf-8'))
        today_response = []
        for article in response:
            if article['pub_date'].split('T')[0] == today:
                article['url'] = article['link']
                article['site'] = 'Space Telescope Live feed (STScI)'
                today_response.append(article)
        news.extend(response)

    return news


def get_launches(n: int = 5) -> List[RocketLaunch]:
    ACCEPT_HEADER = (
        'text/html,application/xhtml+xml,'
        'application/xml;q=0.9,image/webp,'
        'image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'
    )
    USER_AGENT_HEADER = (
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) '
        'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
    )
    request = urllib.request.Request(f'{envs("LL_API_URL")}{n}')
    request.add_header('Accept', ACCEPT_HEADER)
    request.add_header('User-Agent', USER_AGENT_HEADER)
    with urllib.request.urlopen(request, timeout=15) as response:
        response = json.loads(response.read().decode('utf-8'))['launches']
        return response


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
