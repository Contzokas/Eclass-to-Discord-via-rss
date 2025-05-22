import os
import feedparser
import requests
import time
import hashlib
import datetime
import email.utils

# Your RSS feed(s) here
RSS_FEEDS = {
    "Course Name": "https://your-eclass-url/rss.php?c=COURSE_CODE&uid=USER_ID&token=YOUR_TOKEN"
}

# Discord webhook URL
WEBHOOK_URL = "https://discord.com/api/webhooks/your_webhook_url"

HASHES_FILE = "posted_hashes.txt"

def load_hashes():
    if not os.path.exists(HASHES_FILE):
        return set()
    with open(HASHES_FILE, "r") as f:
        return set(line.strip() for line in f if line.strip())

def save_hash(entry_hash):
    with open(HASHES_FILE, "a") as f:
        f.write(entry_hash + "\n")

posted_hashes = load_hashes()

def make_hash(entry):
    return hashlib.sha256((entry.link + entry.published).encode('utf-8')).hexdigest()

def fetch_and_post():
    for course, feed_url in RSS_FEEDS.items():
        feed = feedparser.parse(feed_url)
        for entry in feed.entries:
            entry_hash = make_hash(entry)
            if entry_hash not in posted_hashes:
                posted_hashes.add(entry_hash)
                save_hash(entry_hash)
                post_to_discord(course, entry)

def post_to_discord(course, entry):
    published_tuple = email.utils.parsedate(entry.published)
    if published_tuple:
        published_dt = datetime.datetime(*published_tuple[:6])
        readable_time = published_dt.strftime("%Y-%m-%d %H:%M")
    else:
        readable_time = entry.published

    embed = {
        "title": entry.title,
        "url": entry.link,
        "description": strip_html(entry.description),
        "color": 0x3498db,
        "footer": {
            "text": f"{course} • {readable_time}"
        },
        "thumbnail": {
            "url": "https://upload.wikimedia.org/wikipedia/commons/6/6b/Discord_Logo_full.svg"  # Updated thumbnail URL
        }
    }
    data = {
        "username": "eClass Bot",
        "embeds": [embed]
    }

    response = requests.post(WEBHOOK_URL, json=data)
    if response.status_code != 204:
        print("❌ Error posting to Discord:", response.text)
    else:
        print(f"✅ Posted: {entry.title}")

def strip_html(html):
    import re
    clean = re.compile('<.*?>')
    return re.sub(clean, '', html)

if __name__ == "__main__":
    print("📡 eClass RSS Discord bot running...")
    while True:
        fetch_and_post()
        time.sleep(300)