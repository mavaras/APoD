from graphene import (
    Field, List, JSONString, ObjectType, String,
)


class RocketLaunch(ObjectType):
    name = String()
    date = String()
    location = String()
    typeName = String()
    description = String()
    image = String()
    videoUrls = List(String)
    infoUrls = List(String)
    wikiUrl = String()
    latitude = String()
    longitude = String()

    def resolve_name(self, info):
        return self.name

    def resolve_location(self, info):
        return self.location
    
    def resolve_image(self, info):
        return self.image

    def resolve_typeName(self, info):
        return self.typeName

    def resolve_description(self, info):
        return self.description

    def resolve_videoUrls(self, info):
        return self.videoUrls

    def resolve_infoUrls(self, info):
        return self.infoUrls

    def resolve_wikiUrl(self, info):
        return self.wikiUrl

    def resolve_date(self, info):
        return self.date

    def resolve_latitude(self, info):
        return self.latitude
    
    def resolve_longitude(self, info):
        return self.longitude

    def resolve_missions(self, info):
        return self.missions
