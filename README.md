# Goalkeeper website

The marketing site for Goalkeeper, the Android app that turns one sentence into done things and keeps your day on your home screen.

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
| `index.html` | The page: hero, what you can say, the widget, time back, your apps, trust, invite form |
| `assets/css/site.css` | Page layout and sections |
| `assets/css/kit.css` | The phone frame, the Android home screen and every widget size (4×1, 2×2, 4×2, 4×4) |
| `assets/js/kit.js` | A small runtime that runs the design canvas's screens live inside the phones, plus the widget and home screen |
| `assets/js/boards.js` | The app screens themselves (cart, spending, goals, clash, trip prep and more), exported from the Goalkeeper design canvas |
| `assets/js/site.js` | The page's own motion: the hero, phones that tap through each flow on their own, the widget board, the time-back race and slider, the apps section |
| `assets/brands/` | App icons, from the Goalkeeper app's `drawable-nodpi/brand_*.png` |

## Things to know

- **Invite form.** The form posts the email to the URL in `data-endpoint` on `<form id="jf">` in `index.html`. It sends the email as the form field `email`, with `Accept: application/json`. Formspree, a Google Apps Script web app or your own endpoint all work. Until you set one, submitting says the list opens soon, and nothing is sent anywhere.
- **Updating the app screens.** `boards.js` is `window.GKB = { Name: "<the .dc.html source>" }`. To change a screen, re-export that board from the design canvas and replace its entry.
- **Autoplay.** Each phone taps through its flow on its own. The step list is `flow` on each entry in `S` in `site.js`, and each step names a button by the text it starts with. When someone touches a phone, its autoplay pauses until they press "Play again".
- **Time-back numbers.** The slider counts about 3 minutes saved per thing, and the page says so in its small print. `LADDER` in `site.js` holds the "you could have…" lines, keyed by hours.
- **Reduced motion.** With reduced motion on, every animation settles into its finished state.
- **App names and icons** belong to their owners. The footer says so.
