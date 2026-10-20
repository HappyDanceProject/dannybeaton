# dannybeaton.com

Danny Beaton's author site: three pages (Home, Books, About) built as plain HTML, CSS and a little JavaScript, with no build step. It's hosted on Cloudflare Pages.

```
index.html        Home
books.html        Books       (served at /books)
about.html        About + contact form   (served at /about)
404.html          Page not found
assets/css/site.css
assets/js/site.js
assets/fonts/     Self-hosted fonts (Bricolage Grotesque, Newsreader)
assets/img/       Photos (.webp)
_redirects        Old .com.au page addresses -> new pages
_headers          Security and caching headers
```

## Deploy (Cloudflare Pages)

1. In Cloudflare: **Workers & Pages → Create → Pages → Connect to Git**, then pick this repo.
2. Build settings: **Framework preset: None**, **Build command:** leave empty, **Build output directory:** `/`.
3. Add the custom domain `dannybeaton.com` (and `www.dannybeaton.com`) under the project's **Custom domains**.
4. To send the old domain to the new one, add `dannybeaton.com.au` to Cloudflare. Then create a **Redirect Rule** sending every request on `dannybeaton.com.au` and `www.dannybeaton.com.au` to `https://dannybeaton.com${path}` (301, keep the path). `_redirects` then maps the old page names (`/about-me.html`, `/getintouch.html` and so on) to the new pages.

To preview locally, run `npx wrangler pages dev .` in this folder. That handles `/books` and `/about` the way Cloudflare does.

## Things to fill in

Search the HTML for `Replace` and `placeholder` to find them all.

| What | Where | How |
| --- | --- | --- |
| Contact form | `about.html`, `action="https://formspree.io/f/YOUR_FORM_ID"` | Create a free form at formspree.io, set it to send to contact@dannybeaton.com, and swap in your form ID. Until then the form says it isn't connected and shows your email instead. |
| Newsletter | `index.html`, `<form class="signup" ... action="">` | In MailerLite or Kit, create an embedded form and copy its form `action` URL into `action=""`. Rename the email input's `name` to match: MailerLite uses `fields[email]`, Kit uses `email_address`. Until then the button says sign-ups open soon and subscribes nobody. |
| "Currently" strip | `index.html`, `<dl class="currently">` | Edit the three values whenever they change. |
| Book covers | `index.html` and `books.html`, each `<div class="cover">` | Add `<img src="/assets/img/cover-ashes.webp" alt="">` inside the cover div and delete the `draft` / `t` / `a` spans. Use 2:3 portrait images. |
| Second About photo | `about.html`, second `chunk-img` | Replace the placeholder div with an `<img>`. A different kind of photo (desk, books, out and about) works best next to the headshot. |
| Photos | `assets/img/` | Export as `.webp`, around 1000px and 2000px wide for the hero, 600px and 1200px for portraits. |

## Notes

- Fonts are licensed under the SIL Open Font License and are self-hosted, so nothing loads from Google.
- The site is dark-only by design.
- Animation: your name rises in on load, page titles and the Shelf fade in as they scroll into view, and pages cross-fade. Everything switches off for visitors who've asked their device for reduced motion.
