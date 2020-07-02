from datetime import date


def get_today_date_formatted() -> str:
    today = date.today()
    return str(today.strftime('%Y-%m-%d'))

