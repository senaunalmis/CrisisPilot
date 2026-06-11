import feedparser

BBC_RSS = "https://feeds.bbci.co.uk/news/world/rss.xml"

def get_latest_news():

    feed = feedparser.parse(BBC_RSS)

    if not feed.entries:
        return None

    latest = feed.entries[0]

    return {
        "title": latest.title,
        "summary": latest.summary
    }