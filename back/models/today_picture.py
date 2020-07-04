from graphene import Field, List, ObjectType, String


class TodayPicture(ObjectType):
    url = String()
    title = String()
    description = String()
    author = String()
    date = String()
    similars = List(String)

    def resolve_url(self, info):
        return self.url
    
    def resolve_title(self, info):
        return self.title
    
    def resolve_description(self, info):
        return self.description

    def resolve_author(self, info):
        return self.author

    def resolve_date(self, info):
        return self.date

    def resolve_similars(self, info):
        return self.similars
