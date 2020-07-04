import json
from typing import Dict, List

from decouple import config as envs
from graphene import Field, List, ObjectType, Schema, String
import urllib.request

from dal.firebase import fb
from domain import picture as picture_domain
from exceptions import FetchException
from models.today_picture import TodayPicture


class PicturesQuery(ObjectType):
    today_picture = Field(TodayPicture)
    last_picture = Field(TodayPicture)
    all_pictures = List(TodayPicture)
    picture_similars = List(TodayPicture, picture_title=String(required=True))

    def resolve_today_picture(self, info):
        try:
            response = picture_domain.get_today_picture()
            picture_title = response.get('title', '')
            similars = picture_domain.get_similars(picture_title)
            return TodayPicture(
                title=picture_title,
                url=response.get('url', ''),
                explanation=response.get('explanation', ''),
                date=response.get('date', ''),
                author=response.get('author', response.get('copyright', '')),
                similars=similars,
            )
        except:
            raise FetchException()


    def resolve_last_picture(self, info):
        last_picture = fb.get_last_picture()
        picture_title = last_picture.get('title', '')
        similars = picture_domain.get_similars(picture_title)
        return TodayPicture(
            title=last_picture.get('title', ''),
            url=last_picture.get('url', ''),
            explanation=last_picture.get('explanation', ''),
            date=last_picture.get('date', ''),
            author=last_picture.get('author', ''),
            similars=similars,
        )


    def resolve_all_pictures(self, info):
        all_pictures = fb.get_pictures()
        for picture in all_pictures:
            yield TodayPicture(
                title=picture.get('title', ''),
                url=picture.get('url', ''),
                explanation=picture.get('explanation', ''),
                date=picture.get('date', ''),
                author=picture.get('author', ''),
            )


    def resolve_picture_similars(self, info, picture_title: str):
        similars = picture_domain.get_similars(picture_title)
        for picture in similars:
            yield TodayPicture(
                title=picture.get('title', ''),
                url=picture.get('url', ''),
                description=picture.get('explanation', ''),
                date=picture.get('date', ''),
                author=picture.get('author', ''),
            )


SCHEMA = Schema(query=PicturesQuery, types=[])
