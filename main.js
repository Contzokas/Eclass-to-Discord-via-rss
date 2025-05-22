window.addEventListener('DOMContentLoaded', function() {
    const universitySelect = document.getElementById('university');
    const detailsDiv = document.getElementById('details-fields');
    const form = document.querySelector('form');
    const coursesList = document.getElementById('courses-list');
    const addCourseBtn = document.getElementById('add-course');

    // Map university URLs to logo URLs (from university_logos.txt)
    const universityLogos = {
        "https://eclass.uth.gr/": "https://eclass.uth.gr/courses/theme_data/24/UTH-logo-text-greek.png",
        "https://eclass.uoa.gr/": "https://www.uoa.gr/fileadmin/user_upload/uoa_logo_gr.svg",
        "https://eclass.auth.gr/": "https://www.auth.gr/sites/default/files/logo_0.png",
        "https://eclass.upatras.gr/": "https://www.upatras.gr/sites/all/themes/upatras/logo.png",
        "https://eclass.aegean.gr/": "https://www.aegean.gr/sites/all/themes/aegean/logo.png",
        "https://eclass.duth.gr/": "https://www.duth.gr/sites/all/themes/duth/logo.png",
        "https://eclass.ionio.gr/": "https://ionio.gr/images/ionio-logo.png",
        "https://eclass.uoi.gr/": "https://www.uoi.gr/wp-content/themes/uoi/images/logo.png",
        "https://eclass.teiath.gr/": "https://www.uniwa.gr/wp-content/uploads/2019/03/logo-uniwa.png",
        "https://eclass.teiwest.gr/": "https://www.teiwest.gr/wp-content/themes/teiwest/images/logo.png",
        "https://eclass.teilar.gr/": "https://www.teilar.gr/images/logo.png",
        "https://eclass.teiep.gr/": "https://www.teiep.gr/images/logo.png",
        "https://eclass.teicrete.gr/": "https://www.teicrete.gr/sites/default/files/logo.png",
        "https://eclass.teikal.gr/": "https://www.teikal.gr/images/logo.png",
        "https://eclass.teithe.gr/": "https://www.teithe.gr/images/logo.png",
        "https://eclass.teiser.gr/": "https://www.teiser.gr/images/logo.png",
        "https://eclass.teikoz.gr/": "https://www.teiwm.gr/images/logo.png",
        "https://eclass.hua.gr/": "https://www.hua.gr/images/logo.png",
        "https://eclass.panteion.gr/": "https://www.panteion.gr/images/logo.png",
        "https://eclass.ntua.gr/": "https://www.ntua.gr/images/ntua_logo.png",
        "https://eclass.ihu.gr/": "https://www.ihu.gr/wp-content/uploads/2019/03/logo-ihu.png",
        "https://eclass.upatras.gr/": "https://www.uop.gr/sites/default/files/logo.png",
        "https://eclass.uowm.gr/": "https://www.uowm.gr/wp-content/themes/uowm/images/logo.png",
        "https://eclass.uniwa.gr/": "https://www.uniwa.gr/wp-content/uploads/2019/03/logo-uniwa.png",
        "https://eclass.eap.gr/": "https://www.eap.gr/images/logo.png",
        "https://eclass.aueb.gr/": "https://www.aueb.gr/sites/all/themes/aueb/logo.png",
        "https://eclass.pirate.edu.gr/": "https://www.unipi.gr/unipi/images/unipi_logo.png"
    };

    function toggleDetails() {
        if (universitySelect.value === "") {
            detailsDiv.style.display = "none";
        } else {
            detailsDiv.style.display = "block";
        }
    }

    universitySelect.addEventListener('change', toggleDetails);
    toggleDetails();

    let courseCount = 1;
    addCourseBtn.addEventListener('click', function() {
        courseCount++;
        const div = document.createElement('div');
        div.className = 'course-entry';
        div.innerHTML = `
            <label for="rss-${courseCount}">eClass RSS Feed URL</label>
            <input type="url" id="rss-${courseCount}" name="rss[]" placeholder="https://eclass.gr/modules/announcements/rss.php?..." required>
            <label for="course-${courseCount}">Course Name</label>
            <input type="text" id="course-${courseCount}" name="course[]" placeholder="Course Name" required>
            <button type="button" class="remove-course" style="margin-bottom:1rem;">Αφαίρεση</button>
        `;
        coursesList.appendChild(div);

        div.querySelector('.remove-course').onclick = function() {
            div.remove();
        };
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const universityUrl = universitySelect.value;
        const universityName = universitySelect.options[universitySelect.selectedIndex].text;

        // Use the university name as the filename (remove special chars, spaces, etc.)
        let filename = universityName
            .replace(/[()]/g, '') // remove parentheses
            .replace(/Πανεπιστήμιο\s+/, '') // remove "Πανεπιστήμιο "
            .replace(/[^a-zA-Zα-ωΑ-Ω0-9]+/g, '_') // replace non-alphanum with _
            .replace(/_+/g, '_') // collapse underscores
            .replace(/^_|_$/g, '') // trim underscores
            .toLowerCase() + '.py';

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