from graphene import Field, List, ObjectType, String


class Article(ObjectType):
    url = String()
    title = String()
    image = String()
    site = String()
    date = String()
    tags = List(String)
    categories = List(String)

    def resolve_url(self, info):
        return self.url

    def resolve_image(self, info):
        return self.image

    def resolve_title(self, info):
        return self.title

    def resolve_site(self, info):
        return self.site

    def resolve_date(self, info):
        return self.date

    def resolve_tags(self, info):
        return self.tags

    def resolve_categories(self, info):
        return self.categories
