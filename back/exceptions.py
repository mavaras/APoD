class FetchException(Exception):
    def __init__(self):
        super().__init__('Some error occurred while fetching to NASA apod API')

class WriteFBException(Exception):
    def __init__(self):
        super().__init__('Some error occurred pushing an object to Firebase')
