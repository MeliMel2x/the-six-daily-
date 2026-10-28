# THE SIX DAILY — V1.1 UPGRADE

## What changed
- Click any news headline or **Open story details / Read in The Six** to open an in-app reader instead of leaving the website.
- **Read original article ↗** stays at the bottom-right of the reader on desktop and spans the footer on mobile.
- Close with the X or Escape key to return to the news grid.
- **In-game intel** filter automatically spots gameplay, characters, maps, vehicles, and other game-related topics from headline keywords. This is categorization, not fact-checking.
- The featured trailer story opens in the reader too.

## Important coverage limitation
Our automated Google News feed supplies headline, source, date and URL — NOT licensed full-text articles or verified summaries. For third-party stories the in-app view honestly shows source details and a verification warning, **not** a fabricated article or copied content. Selected Rockstar stories contain our short editorial briefings. To deliver genuinely full in-app reading, The Six Daily would need independently written article coverage, permission to syndicate articles, or an authorized content API. Many publisher websites also block iframe embedding.

## Updating your public site with GitHub Desktop
1. Unzip the V1.1 package on your Mac.
2. In GitHub Desktop, choose **Repository → Show in Finder** for your existing `the-six-daily-` repository.
3. Copy the **contents** of the extracted `the-six-daily-v1.1` folder into the existing repository folder. Replace matching files. **Do not replace the .git folder.** Keep the existing `.github` workflow unchanged or copy the identical workflow included in this package.
4. Return to GitHub Desktop, enter a commit summary like `Add in-app news reader`, click **Commit to main**, then **Push origin**.
5. GitHub Actions will rebuild and deploy automatically. Open the public website and reload.

The GitHub hourly refresh remains in place. No additional API key, framework or third-party dependency is needed.

## Coming later
- Curated editor-written full in-app stories (can be read without going to a publisher), with citations and fact-checking.
- A screenshot or video background using media the site has rights to use and optimized for phone/desktop.
