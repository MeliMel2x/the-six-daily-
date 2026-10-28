# THE SIX DAILY — GTA VI NEWS WEBSITE

Welcome! This is your first public, mobile-friendly news website. It is an **independent fan project**, not an official Rockstar Games website.

## 1. Look at the website on your Mac (easiest)

1. Unzip `The_Six_Daily_Website.zip`.
2. Double-click `index.html` in the unzipped folder. It should open in Safari or Chrome.
3. Click around! The filters, story links, and bookmarks work already.
4. If you see only the Rockstar stories, that's normal. The third-party feed is empty until the first scheduled GitHub deployment.

For the **full PWA experience on your Mac**, open Terminal, change to this folder, and launch a basic local web server:

```
cd ~/Downloads/the-six-daily
python3 -m http.server 8000
```

If your extracted folder has a different name or is elsewhere, type `cd ` (with a space) in Terminal, drag the folder from Finder onto Terminal, then press Return. After that run `python3 -m http.server 8000`.

Then open http://localhost:8000 in a browser. When you're finished, return to Terminal and press **Control+C**.

You do NOT need to turn off Mac security settings or run an unsigned program to preview this website.

## 2. Put the website online for free with GitHub Pages

GitHub Pages hosts this static website, and GitHub Actions refreshes the third-party news feed automatically. The website is free to view. GitHub has usage limits and its services are subject to its terms. The workflow already includes the hourly schedule you requested.

A beginner-friendly publishing method uses **GitHub Desktop**:

1. Create a free account at https://github.com/ if you don't already have one.
2. Download GitHub Desktop at https://desktop.github.com/ and sign into GitHub.
3. Unzip this package. Keep the **entire folder**, including the hidden `.github` subfolder. Never upload only `index.html`.
4. Open GitHub Desktop. Choose **File → Add Local Repository**, select the unzipped folder. If it says this isn't a repository, click **Create a Repository** and create it here.
5. Commit the initial files if GitHub Desktop prompts you to (example commit message: `Launch The Six Daily`).
6. Click **Publish repository**. Name it `the-six-daily` and make it **public** (GitHub Pages on the free plan uses public repositories).
7. On github.com open that repository, choose **Settings → Pages**. Under **Build and deployment**, choose **GitHub Actions** as the Source.
8. Open the **Actions** tab, select **Refresh news and publish website**, and click **Run workflow** to make your first website deployment and news update. The workflow also runs when you push changes and every hour (best-effort, typically at minute 23 UTC).
9. After the workflow succeeds, GitHub Pages shows the live site URL in **Settings → Pages**. The URL typically looks like `https://YOUR-GITHUB-USERNAME.github.io/the-six-daily/`.
10. Open that URL on your iPhone. In Safari choose **Share → Add to Home Screen → Open as Web App → Add** (wording may vary slightly by iOS version).

No Apple developer membership, hosting credit card, or OpenAI API key is required for this first version. **It cannot send push notifications yet**. That requires another phase with a notification backend and opt-in permission.

## 3. How the automatic feed works

Every hour, GitHub Actions runs `scripts/update_news.py` and rebuilds the site. It searches public Google News RSS for recent GTA VI headlines, deduplicates them, and marks titles with obvious rumor terms as **Rumor / Unverified**. Every automatically collected article is **unreviewed** and links to its source.

The selected direct-source Rockstar articles are curated in `app.js`. No program should label a third-party article as an official Rockstar confirmation just because its headline says so.

Google News RSS is not a guaranteed API and can change, throttle, or fail. GitHub scheduled actions are best-effort and sometimes delayed; the website shows the last successful feed refresh. If the update fails, the deployment retains the packaged feed or continues with official curated stories.

## 4. What you can customize

- `index.html` — Website layout and wording.
- `styles.css` — Colors, fonts, spacing, responsive design.
- `app.js` — Filters, bookmarks, cards, curated Rockstar links.
- `assets/` — Original site illustration, visual cards, and app icons.
- `scripts/update_news.py` — The RSS headline collector.
- `.github/workflows/site.yml` — The scheduled refresh and GitHub Pages deployment.

Your browser bookmarks are stored on **that browser/device only** (localStorage); there are no user accounts or shared cloud bookmarks in version one.

## 5. How to fact-check before reporting on a story

1. Read the original Rockstar announcement or article.
2. Check the publisher, headline date, and whether the claim originated with Rockstar.
3. Do not present rumored launch features or leaks as confirmed.
4. For your own editorial articles, independently write your summary and link to primary sources.
5. Check any image/video licensing before posting assets that belong to other publishers or Rockstar.

The Six Daily is not affiliated with Rockstar Games or Take-Two Interactive. GTA and Rockstar names are third-party trademarks used for news commentary and identification.

## 6. Common issues

- **No new headlines?** Check the Actions workflow log. Google News RSS might be unreachable, and the site never fabricates headlines.
- **Buttons work but app won't install from a downloaded folder?** Install it from the published HTTPS GitHub Pages URL, not `file://`.
- **Apple says an app isn't verified?** This ZIP contains website files, not a Mac executable. Just double-click `index.html` instead of running a launcher.
- **The design looks different offline?** Google Fonts load over the internet; system fonts are the fallback.
- **It only shows official stories when opened locally?** Correct. The scheduled feed is generated when the GitHub workflow runs. For a manual refresh on a connected Mac, run `python3 scripts/update_news.py` in the project folder before previewing.

## Planned upgrades (not included yet)

Editable owner dashboard; automatic alerts; opt-in web push subscriptions; writing original summaries; a searchable coverage archive; custom domain and SEO analytics; richer source verification.
