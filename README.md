# Goalkeeper website

The marketing site for Goalkeeper, the Android app you just talk to: it sorts your day, gets things ready, and keeps what's next on your home screen.

It's a plain static site: one HTML page, a few CSS and JS files, no build step and no dependencies.

## Run it locally

Any static server works. From this folder:

```sh
python3 -m http.server 8000
# or: npx serve .
```

Then open http://localhost:8000. Opening `index.html` straight from disk also works.

## Deploy

Push the folder as it is to GitHub Pages, Netlify, Vercel or Cloudflare Pages. There's nothing to build. `.nojekyll` keeps GitHub Pages from touching the files.

For GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root.

## What's where

| Path | What it is |
| --- | --- |
| `index.html` | The page: hero, small things, the widget, more than a list, your apps, trust, invite form |
| `assets/css/site.css` | Every style on the page, including the phone and the widget |
| `assets/js/site.js` | Everything that moves: the hero conversation, the widget through the day, the cards, the invite form |
| `assets/brands/` | App icons, from the Goalkeeper app's `drawable-nodpi/brand_*.png` |

## Things to know

- **Type and emoji.** Geist for everything, Geist Mono for small labels. No serif anywhere. Every emoji is set in Google's Noto Color Emoji (loaded from Google Fonts), so the page looks the same on every phone. `emo()` in `site.js` wraps any emoji in `<span class="e">` for that.
- **The hero.** `EX` in `site.js` holds the four examples: what's said, the cards it becomes (emoji, title, detail, colour, action) and the reply. They play in turn; tapping a chip pins one.
- **The widget.** `TIMES` holds the five moments of the day (8:00 AM to 11:00 PM) and what each widget size shows then. `ITEMS` is the day's list. It plays through the day on its own until someone touches it. "Close the day" moves it to night.
- **Invite form.** The form posts the email to the URL in `data-endpoint` on `<form id="jf">` in `index.html`. It sends the email as the form field `email`, with `Accept: application/json`. Formspree, a Google Apps Script web app or your own endpoint all work. Until you set one, submitting says the list opens soon, and nothing is sent anywhere.
- **Reduced motion.** With reduced motion on, everything settles into its finished state.
- **Link preview.** `assets/og.jpg` (2400×1260) is the image people see when the link is shared. The `og:` and `twitter:` tags in `index.html` point to it at `https://goalkeeper-dun.vercel.app/`. Previews need the full address, so if the site moves to another domain, change those URLs.
- **App names and icons** belong to their owners. The footer says so, and credits Noto Color Emoji (SIL Open Font License).
