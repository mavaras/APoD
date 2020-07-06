class FetchException(Exception):
    def __init__(self, extra_msg: str = ''):
        msg = (
            f'Some error occurred while fetching to NASA apod API. '
            f'{extra_msg}'
        )
        super().__init__(msg)

class WriteFBException(Exception):
    def __init__(self):
        super().__init__('Some error occurred pushing an object to Firebase')
