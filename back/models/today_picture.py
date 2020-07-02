from graphene import ObjectType, String


class TodayPicture(ObjectType):
    url = String()
    title = String()
    description = String()
    author = String()
    date = String()

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
