window.addEventListener('DOMContentLoaded', function() {
    const universityLogos = {
        "https://eclass.uoa.gr/": "https://www.uoa.gr/fileadmin/templates/img/logo_el.png",
        "https://eclass.auth.gr/": "https://www.auth.gr/sites/default/files/logo_0.png",
        "https://eclass.upatras.gr/": "https://www.upatras.gr/sites/all/themes/upatras/logo.png",
        "https://eclass.aegean.gr/": "https://www.aegean.gr/sites/all/themes/aegean/logo.png",
        "https://eclass.duth.gr/": "https://www.duth.gr/sites/all/themes/duth/logo.png",
        "https://eclass.ionio.gr/": "https://ionio.gr/images/ionio-logo.png",
        "https://ecourse.uoi.gr/": "https://www.uoi.gr/wp-content/themes/uoi/images/logo.png",
        "https://eclass.uth.gr/": "https://www.uth.gr/sites/default/files/uth_logo_gr.png",
        "https://eclass.hua.gr/": "https://www.hua.gr/images/logo.png",
        "https://openeclass.panteion.gr/": "https://www.panteion.gr/images/logo.png",
        "https://eclass.ntua.gr/": "https://www.ntua.gr/images/ntua_logo.png",
        "https://eclass.ihu.gr/": "https://www.ihu.gr/wp-content/uploads/2019/03/logo-ihu.png",
        "https://eclass.uop.gr/": "https://www.uop.gr/sites/default/files/logo.png",
        "https://eclass.uowm.gr/": "https://www.uowm.gr/wp-content/themes/uowm/images/logo.png",
        "https://eclass.uniwa.gr/": "https://www.uniwa.gr/wp-content/uploads/2019/03/logo-uniwa.png",
        "https://eclass.eap.gr/": "https://www.eap.gr/images/logo.png",
        "https://eclass.aueb.gr/": "https://www.aueb.gr/sites/all/themes/aueb/logo.png",
        "https://eclass.unipi.gr/": "https://www.unipi.gr/unipi/images/unipi_logo.png",
        "https://opencourses.uoc.gr/": "https://www.uoc.gr/sites/default/files/logo.png",
        "https://eclass.tuc.gr/": "https://www.tuc.gr/fileadmin/templates/site/images/logo.png",
        "https://eclass.hmu.gr/": "https://www.hmu.gr/sites/default/files/logo-hmu.png",
        "https://eclass.asfa.gr/": "https://www.asfa.gr/sites/default/files/asfa_logo.png"
    };

    const universityCodes = {
        "https://eclass.uoa.gr/": "uoa",
        "https://eclass.auth.gr/": "auth",
        "https://eclass.upatras.gr/": "upatras",
        "https://eclass.aegean.gr/": "aegean",
        "https://eclass.duth.gr/": "duth",
        "https://eclass.ionio.gr/": "ionio",
        "https://ecourse.uoi.gr/": "uoi",
        "https://eclass.uth.gr/": "uth",
        "https://eclass.hua.gr/": "hua",
        "https://openeclass.panteion.gr/": "panteion",
        "https://eclass.ntua.gr/": "ntua",
        "https://eclass.ihu.gr/": "ihu",
        "https://eclass.uop.gr/": "uop",
        "https://eclass.uowm.gr/": "uowm",
        "https://eclass.uniwa.gr/": "uniwa",
        "https://eclass.eap.gr/": "eap",
        "https://eclass.aueb.gr/": "aueb",
        "https://eclass.unipi.gr/": "unipi",
        "https://opencourses.uoc.gr/": "uoc",
        "https://eclass.tuc.gr/": "tuc",
        "https://eclass.hmu.gr/": "hmu",
        "https://eclass.asfa.gr/": "asfa"
    };

    const form = document.querySelector('form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const universitySelect = document.getElementById('university');
        const universityUrl = universitySelect.value;
        let filename = (universityCodes[universityUrl] || universitySelect.options[universitySelect.selectedIndex].text
            .replace(/[()]/g, '')
            .replace(/Πανεπιστήμιο\s+/, '')
            .replace(/[^a-zA-Zα-ωΑ-Ω0-9]+/g, '_')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '')
            .toLowerCase()) + '.py';

        const webhook = document.getElementById('webhook').value;

        // Collect all courses
        const rssInputs = form.querySelectorAll('input[name="rss[]"]');
        const courseInputs = form.querySelectorAll('input[name="course[]"]');
        let rssFeeds = [];
        for (let i = 0; i < rssInputs.length; i++) {
            if (rssInputs[i].value && courseInputs[i].value) {
                rssFeeds.push({name: courseInputs[i].value, url: rssInputs[i].value});
            }
        }

        // Build RSS_FEEDS dict
        let feedsStr = rssFeeds.map(f => `    "${f.name}": "${f.url}"`).join(',\n');

        // Get logo URL for the selected university
        const logoUrl = universityLogos[universityUrl] || "";

        // Template for the Python file
        const pyContent = `import feedparser
import requests
import time
import hashlib
import datetime
import email.utils

RSS_FEEDS = {
${feedsStr}
}

WEBHOOK_URL = "${webhook}"

HASHES_FILE = "posted_hashes.txt"

def load_hashes():
    try:
        with open(HASHES_FILE, "r") as f:
            return set(line.strip() for line in f if line.strip())
    except FileNotFoundError:
        return set()

def save_hash(entry_hash):
    with open(HASHES_FILE, "a") as f:
        f.write(entry_hash + "\\n")

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
            "url": "${logoUrl}"
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
`;

        // Create and trigger download
        const blob = new Blob([pyContent], {type: 'text/x-python'});
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
});