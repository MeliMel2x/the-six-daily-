import sys
import unittest
from pathlib import Path
from datetime import datetime, timezone
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from update_news import parse_feed, merge, clean_title, feed_url

FIXTURE = '''<?xml version="1.0"?><rss><channel>
<item><title>GTA 6 new trailer - Local News</title><link>https://news.google.com/rss/articles/abc</link><source url="https://local.example">Local News</source><pubDate>Wed, 28 Oct 2026 08:00:00 GMT</pubDate></item>
<item><title>GTA 6 leak allegedly reveals a secret - Video Blog</title><link>https://news.google.com/rss/articles/def</link><source>Video Blog</source><pubDate>Wed, 28 Oct 2026 09:00:00 GMT</pubDate></item>
<item><title>GTA Online bonus this weekend - Local News</title><link>https://news.google.com/rss/articles/hij</link><source>Local News</source><pubDate>Wed, 28 Oct 2026 10:00:00 GMT</pubDate></item>
<item><title>GTA 6 other source</title><link>javascript:alert(1)</link><source>Bad</source><pubDate>Wed, 28 Oct 2026 11:00:00 GMT</pubDate></item>
</channel></rss>'''
class NewsTests(unittest.TestCase):
    def test_parse_and_label(self):
        found=parse_feed(FIXTURE, now=datetime(2026,10,28,12,tzinfo=timezone.utc))
        self.assertEqual(len(found),2)
        self.assertEqual(found[0]['title'],'GTA 6 new trailer')
        self.assertEqual(found[0]['type'],'coverage')
        self.assertEqual(found[1]['type'],'rumor')
        self.assertFalse(found[0]['reviewed'])
    def test_merge(self):
        found=parse_feed(FIXTURE, now=datetime(2026,10,28,12,tzinfo=timezone.utc))
        self.assertEqual(len(merge(found+found)),2)
        self.assertEqual(merge(found)[0]['type'],'rumor')
    def test_url(self):
        self.assertTrue(feed_url('"GTA 6"').startswith('https://news.google.com/rss/search?q='))
    def test_tidy(self):
        self.assertEqual(clean_title(' GTA VI release - Example ','Example'),'GTA VI release')
if __name__ == '__main__':unittest.main()
