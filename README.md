# Goalkeeper website

The marketing site for Goalkeeper, the voice assistant for people with full days: say what you need, and it sets it up in the apps you already use, so all that's left is one tap.

It's a plain static site: one HTML page, one CSS file and one JS file, no build step and no dependencies.

## Run it locally

Any static server works. From this folder:

```sh
python3 -m http.server 8000
# or: npx serve .
```

Then open http://localhost:8000. Opening `index.html` straight from disk also works.

## Deploy

Push the folder as it is to GitHub Pages, Netlify, Vercel or Cloudflare Pages. There's nothing to build. `.nojekyll` keeps GitHub Pages from touching the files.

## What's where

| Path | What it is |
| --- | --- |
| `index.html` | The page shell: the sign-up section and the footer; the other sections are drawn by `site.js` |
| `assets/css/site.css` | Every style on the page, light and dark |
| `assets/js/site.js` | Everything that moves: the welcome animation, the mic, each section |
| `assets/brands/` | App icons, from the Goalkeeper app's `drawable-nodpi/brand_*.png` |
| `assets/og.jpg` | The link preview (2400×1260) |
| `favicon.svg` | The listening oval, on its own |

The previous design is kept on the `Old-Design` branch.

## The page, top to bottom

- **Welcome.** The wordmark rises letter by letter, its "o" turns into the mic and listens, then the whole thing flies into the nav. It plays once per browser session, never with reduced motion, and a click, key or scroll skips it (`intro()`).
- **Hero.** "Say it and it's ready." The mic in the headline plays the moments in `TB`.
- **The mic.** Once you scroll, the mic leaves the headline and docks at the bottom. Each section can borrow it: they register in `SCROLLS` (what to do on scroll), `POS` (where the mic should be) and `CLICKS` (what a tap means).
- **Neha's Tuesday.** `DAY` holds the eight moments. The mic is the playhead on the day's timeline.
- **The widget.** The widget as designed in the app, in four sizes. On the smaller sizes the mic turns into the widget's main button.
- **It keeps track.** Three things said; the answer is written back as one sentence with the live bits set inline (`LS`, `LCH`).
- **Your apps.** The apps it hands off to float round the edges; the one it opens comes to the middle with what's ready and the one tap left (`AS`, `AT`).
- **Your turn.** Sign-up and what stays on the phone. The mic lands in the headline.
- **Footer.** The time, said the way the app would. The mic comes down into the wordmark, the letters make room, and it becomes the "o", listening.

## Things to know

- **Type and emoji.** Geist for everything. No serif anywhere. Emoji are set in Google's Noto Color Emoji, so the page looks the same on every phone.
- **Light and dark.** It follows the system until someone taps the moon or sun in the nav; that choice is remembered.
- **Sign-up form.** The form posts the email to the URL in `data-endpoint` on the `.sg` form in `index.html`, as the field `email`, with `Accept: application/json`. Formspree, a Google Apps Script web app or your own endpoint all work. Until one is set, submitting says the list opens soon, and nothing is sent anywhere.
- **Reduced motion.** With reduced motion on, everything settles into its finished state and the welcome doesn't play.
- **Link preview.** The `og:` and `twitter:` tags in `index.html` point to `https://goalkeeper-dun.vercel.app/`. Previews need the full address, so if the site moves to another domain, change those URLs.
