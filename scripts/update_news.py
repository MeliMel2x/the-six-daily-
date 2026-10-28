#!/usr/bin/env python3
"""The Six Daily: collect recent GTA VI headlines without an API key.

This is a headline *discovery* process. It does NOT verify article contents or
assign official-source status. The website labels these as unreviewed coverage.
"""
import hashlib
import json
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'data' / 'news.json'
QUERIES = ['"Grand Theft Auto VI" when:14d', '"GTA 6" when:14d']
RSS_ROOT = 'https://news.google.com/rss/search'
MAX_ITEMS = 42
RUMOR_TERMS = re.compile(r'\b(?:rumor|rumour|leak(?:ed|s)?|alleged(?:ly)?|unconfirmed|speculat(?:ion|ive|es)|supposedly|claims?)\b', re.I)
TOPIC_TERMS = re.compile(r'\b(?:gta\s*(?:6|vi)|grand\s+theft\s+auto\s*(?:6|vi))\b', re.I)


def feed_url(query):
    return RSS_ROOT + '?' + urllib.parse.urlencode({'q': query, 'hl': 'en-US', 'gl': 'US', 'ceid': 'US:en'})


def fetch_feed(query):
    req = urllib.request.Request(feed_url(query), headers={'User-Agent':'Mozilla/5.0 (compatible; TheSixDaily/1.0; independent fan news indexer)'})
    with urllib.request.urlopen(req, timeout=22) as response:
        return response.read(2_500_000)


def clean_title(title, publisher):
    title = re.sub(r'\s+', ' ', title or '').strip()
    if publisher and title.lower().endswith((' - '+publisher).lower()):
        title = title[:-(len(publisher)+3)].strip()
    return title[:220]


def parse_feed(payload, now=None):
    now = now or datetime.now(timezone.utc)
    earliest = now - timedelta(days=36)
    root = ET.fromstring(payload)
    items = []
    for node in root.findall('.//channel/item'):
        source_node = node.find('source')
        publisher = ''.join(source_node.itertext()).strip()[:85] if source_node is not None else 'Publisher not provided'
        title = clean_title(node.findtext('title', ''), publisher)
        link = (node.findtext('link') or '').strip()
        if not title or not TOPIC_TERMS.search(title):
            continue
        parsed = urllib.parse.urlparse(link)
        if parsed.scheme != 'https' or parsed.hostname not in ('news.google.com', 'www.google.com'):
            continue
        try:
            date = parsedate_to_datetime(node.findtext('pubDate', ''))
            if date.tzinfo is None:
                date = date.replace(tzinfo=timezone.utc)
            date = date.astimezone(timezone.utc)
        except (TypeError, ValueError, IndexError):
            continue
        if date < earliest or date > now + timedelta(days=1):
            continue
        normalized = re.sub(r'\W+', '', title.casefold())
        identity = hashlib.sha256(normalized.encode('utf8')).hexdigest()[:16]
        items.append({
            'id': 'feed-' + identity,
            'title': title,
            'source': publisher,
            'date': date.isoformat().replace('+00:00', 'Z'),
            'url': link,
            'type': 'rumor' if RUMOR_TERMS.search(title) else 'coverage',
            'reviewed': False,
            'art': 'radio' if any(word in title.lower() for word in ('soundtrack','music','radio')) else 'sunset',
        })
    return items


def merge(items):
    unique = {}
    for item in sorted(items, key=lambda x:x['date'], reverse=True):
        if item['id'] not in unique:
            unique[item['id']] = item
    return list(unique.values())[:MAX_ITEMS]


def update():
    collected = []
    for query in QUERIES:
        try:
            raw = fetch_feed(query)
            found = parse_feed(raw)
            print(f'Query {query!r}: {len(found)} relevant items', flush=True)
            collected.extend(found)
        except Exception as exc:
            print(f'WARNING: Could not fetch {query!r}: {exc}',file=sys.stderr)
    all_items = merge(collected)
    if not all_items:
        print('No new results. Keeping existing news.json; not replacing valid news with an empty feed.', file=sys.stderr)
        return False
    payload = {
        'updated_at': datetime.now(timezone.utc).isoformat().replace('+00:00', 'Z'),
        'source': 'Google News RSS · publisher headlines are automatically collected, not fact-checked',
        'items': all_items,
    }
    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n', encoding='utf8')
    print(f'Updated {DEST} with {len(all_items)} source-linked headlines.',flush=True)
    return True


if __name__ == '__main__':
    update()
