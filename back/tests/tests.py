# mixture of function tests (will be splitted)
from domain.picture import get_similars


def test_get_similars():
    mock_picture_title = 'some star some planet red'
    assert len(get_similars(mock_picture_title)) == 11  # shitty not scalable
