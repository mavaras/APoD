from datetime import date, datetime


def get_today_date_formatted() -> str:
    today = date.today()
    return format_date(today)


def format_date(date: datetime) -> str:
    return str(date.strftime('%Y-%m-%d'))
