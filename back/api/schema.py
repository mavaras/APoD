import json
from typing import Dict, List

from decouple import config as envs
from graphene import (
    Boolean,
    Field,
    List,
    ObjectType,
    Schema,
    String,
)
import urllib.request

from dal.firebase import fb
from domain import picture as picture_domain
from exceptions import FetchException
from models.article import Article
from models.rocket_launch import RocketLaunch
from models.today_picture import TodayPicture
from typ import PictureType as Picture


class PicturesQuery(ObjectType):
    today_picture = Field(TodayPicture)
    last_picture = Field(TodayPicture)
    picture_by_date = Field(TodayPicture, date=String(required=True))
    all_pictures = List(TodayPicture)
    picture_similars = List(TodayPicture, picture_title=String(required=True))
    add_picture = Field(Boolean,
        title=String(required=True),
        url=String(required=True),
        date=String(required=True),
        explanation=String(required=True),
        author=String(required=True),
    )
    news = List(Article)
    launches = List(RocketLaunch)

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
        except Exception as e:
            raise FetchException(e)


    def resolve_last_picture(self, info):
        last_picture = picture_domain.get_last_picture()
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


    def resolve_picture_by_date(self, info, date: str):
        picture = picture_domain.get_picture(date)
        picture_title = picture.get('title', '')
        similars = picture_domain.get_similars(picture_title)
        return TodayPicture(
            title=picture.get('title', ''),
            url=picture.get('url', ''),
            explanation=picture.get('explanation', ''),
            date=picture.get('date', ''),
            author=picture.get('author', ''),
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


    def resolve_add_picture(self, info, **picture: Picture):
        return picture_domain.add_picture(picture)


    def resolve_news(self, info):
        news = picture_domain.get_news()
        for article in news:
            yield Article(
                title=article.get('title', ''),
                url=article.get('url', ''),
                image=article.get('featured_image', ''),
                site=article.get('news_site_long', ''),
                date=article.get('published_date', ''),
                tags=article.get('tags', ''),
                categories=article.get('categories', ''),
            )
    
    def resolve_launches(self, info):
        launches = picture_domain.get_launches()
        for launch in launches:
            yield RocketLaunch(
                name=launch.get('name', ''),
                date=launch.get('windowstart', ''),
                location=launch.get('location', ''),
                videoUrls=launch.get('vidURLs', ''),
                infoUrls=launch.get('infoURLs', ''),
                wikiUrl=launch.get('wikiURL', ''),
                latitude=launch.get('latitude', ''),
                longitude=launch.get('longitude', ''),
                missions=launch.get('missions', []),
            )


SCHEMA = Schema(query=PicturesQuery, types=[])
