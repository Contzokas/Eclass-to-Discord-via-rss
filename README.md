# Eclass-to-Discord-via-rss

[🇬🇷 Ελληνικά](#ελληνικά) | [🇺🇸 English](#english)

---

## Overview

**Eclass-to-Discord-via-rss** is a tool that helps you automatically send announcements from Greek university eClass platforms directly to your Discord server using RSS feeds and Discord webhooks.

You can generate a custom Python script for your university and courses using the included web interface. The script will monitor your eClass RSS feeds and post new announcements to your Discord channel.

---

## Features

- Supports all major Greek universities with eClass platforms
- Multiple course support
- Easy-to-use web interface for script generation
- No backend required for script generation (runs in your browser)
- Custom Discord webhook integration

---

## How to Use

1. **Open `index.html` in your browser.**
2. **Select your university** from the dropdown list.
3. **Add your course RSS feed URLs and course names.**
4. **Enter your Discord webhook URL.**
5. **Click "Submit"** to download your custom Python script.
6. **Run the generated Python script** on your computer/server:
   ```bash
   pip install feedparser requests
   python <your_script>.py
   ```

---

## Requirements

- Python 3.7+
- `feedparser` and `requests` Python packages

Install requirements with:
```bash
pip install feedparser requests
```

---

## How it Works

- The generated Python script checks your eClass RSS feeds every 5 minutes.
- When a new announcement is found, it posts it to your Discord channel using the webhook you provided.
- Already posted announcements are tracked to avoid duplicates.

---

## Supported Universities

- Πανεπιστήμιο Θεσσαλίας (UTH)
- ΕΚΠΑ (UoA)
- Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης (AUTH)
- Πανεπιστήμιο Πατρών (UPatras)
- Πανεπιστήμιο Αιγαίου (Aegean)
- Δημοκρίτειο Πανεπιστήμιο Θράκης (DUTH)
- Ιόνιο Πανεπιστήμιο (Ionio)
- Πανεπιστήμιο Ιωαννίνων (UOI)
- ΤΕΙ Αθήνας (TEIATH)
- ΤΕΙ Δυτικής Ελλάδας (TEIWest)
- ΤΕΙ Θεσσαλίας (TEILar)
- ΤΕΙ Ηπείρου (TEIEP)
- ΤΕΙ Κρήτης (TEICrete)
- ΤΕΙ Καλαμάτας (TEIKal)
- ΤΕΙ Θεσσαλονίκης (TEIThess)
- ΤΕΙ Σερρών (TEISer)
- ΤΕΙ Δυτικής Μακεδονίας (TEIKoz)
- Χαροκόπειο Πανεπιστήμιο (HUA)
- Πάντειο Πανεπιστήμιο (Panteion)
- ΕΜΠ (NTUA)
- Διεθνές Πανεπιστήμιο Ελλάδος (IHU)
- Πανεπιστήμιο Πελοποννήσου (UOP)
- Πανεπιστήμιο Δυτικής Μακεδονίας (UOWM)
- Πανεπιστήμιο Δυτικής Αττικής (UNIWA)
- Ελληνικό Ανοικτό Πανεπιστήμιο (EAP)
- Οικονομικό Πανεπιστήμιο Αθηνών (AUEB)
- Πανεπιστήμιο Πειραιά (UNIPI)

---

## License

MIT License

---

## Credits

- [feedparser](https://github.com/kurtmckee/feedparser)
- [requests](https://github.com/psf/requests)
- Greek university eClass platforms

---

---

## 🇬🇷 Ελληνικά

### Επισκόπηση

Το **Eclass-to-Discord-via-rss** είναι ένα εργαλείο που σας βοηθά να στέλνετε αυτόματα ανακοινώσεις από τα eClass των ελληνικών πανεπιστημίων απευθείας στο Discord server σας, χρησιμοποιώντας RSS feeds και Discord webhooks.

Μπορείτε να δημιουργήσετε ένα προσαρμοσμένο Python script για το πανεπιστήμιό σας και τα μαθήματά σας μέσω της ενσωματωμένης web διεπαφής. Το script παρακολουθεί τα RSS feeds του eClass και δημοσιεύει νέες ανακοινώσεις στο Discord κανάλι σας.

---

### Χαρακτηριστικά

- Υποστήριξη όλων των μεγάλων ελληνικών πανεπιστημίων με eClass
- Υποστήριξη πολλαπλών μαθημάτων
- Εύχρηστη web διεπαφή για δημιουργία script
- Δεν απαιτείται backend (τρέχει εξ ολοκλήρου στον browser)
- Ενσωμάτωση με custom Discord webhook

---

### Οδηγίες Χρήσης

1. **Ανοίξτε το `index.html` στον browser σας.**
2. **Επιλέξτε το πανεπιστήμιό σας** από τη λίστα.
3. **Προσθέστε τα RSS feed URLs και τα ονόματα των μαθημάτων σας.**
4. **Εισάγετε το Discord webhook URL σας.**
5. **Πατήστε "Submit"** για να κατεβάσετε το προσαρμοσμένο Python script.
6. **Τρέξτε το script** στον υπολογιστή ή server σας:
   ```bash
   pip install feedparser requests
   python <το_αρχείο_σας>.py
   ```

---

### Απαιτήσεις

- Python 3.7+
- Πακέτα Python: `feedparser` και `requests`

Εγκατάσταση απαιτήσεων:
```bash
pip install feedparser requests
```

---

### Πώς λειτουργεί

- Το script ελέγχει τα RSS feeds του eClass κάθε 5 λεπτά.
- Όταν βρεθεί νέα ανακοίνωση, δημοσιεύεται στο Discord κανάλι σας μέσω του webhook.
- Οι ήδη δημοσιευμένες ανακοινώσεις παρακολουθούνται για αποφυγή διπλοτύπων.

---

### Υποστηριζόμενα Πανεπιστήμια

- Πανεπιστήμιο Θεσσαλίας (UTH)
- ΕΚΠΑ (UoA)
- Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης (AUTH)
- Πανεπιστήμιο Πατρών (UPatras)
- Πανεπιστήμιο Αιγαίου (Aegean)
- Δημοκρίτειο Πανεπιστήμιο Θράκης (DUTH)
- Ιόνιο Πανεπιστήμιο (Ionio)
- Πανεπιστήμιο Ιωαννίνων (UOI)
- ΤΕΙ Αθήνας (TEIATH)
- ΤΕΙ Δυτικής Ελλάδας (TEIWest)
- ΤΕΙ Θεσσαλίας (TEILar)
- ΤΕΙ Ηπείρου (TEIEP)
- ΤΕΙ Κρήτης (TEICrete)
- ΤΕΙ Καλαμάτας (TEIKal)
- ΤΕΙ Θεσσαλονίκης (TEIThess)
- ΤΕΙ Σερρών (TEISer)
- ΤΕΙ Δυτικής Μακεδονίας (TEIKoz)
- Χαροκόπειο Πανεπιστήμιο (HUA)
- Πάντειο Πανεπιστήμιο (Panteion)
- ΕΜΠ (NTUA)
- Διεθνές Πανεπιστήμιο Ελλάδος (IHU)
- Πανεπιστήμιο Πελοποννήσου (UOP)
- Πανεπιστήμιο Δυτικής Μακεδονίας (UOWM)
- Πανεπιστήμιο Δυτικής Αττικής (UNIWA)
- Ελληνικό Ανοικτό Πανεπιστήμιο (EAP)
- Οικονομικό Πανεπιστήμιο Αθηνών (AUEB)
- Πανεπιστήμιο Πειραιά (UNIPI)

---

### Άδεια

MIT License

---

### Credits

- [feedparser](https://github.com/kurtmckee/feedparser)
- [requests](https://github.com/psf/requests)
- Ελληνικές πλατφόρμες eClass

---

## <a name="english"></a>