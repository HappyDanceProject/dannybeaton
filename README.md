# dannybeaton.com

Danny Beaton's author site: three pages (Home, Books, About) built as plain HTML, CSS and a little JavaScript, with no build step. It’s hosted on Cloudflare (Workers static assets).

```
public/               Everything in here is the website
  index.html          Home
  books.html          Books       (served at /books)
  about.html          About + contact form   (served at /about)
  404.html            Page not found
  assets/css/site.css
  assets/js/site.js
  assets/fonts/       Self-hosted fonts (Bricolage Grotesque, Schibsted Grotesk)
  assets/img/         Photos (.webp)
  _redirects          Old .com.au page addresses -> new pages
  _headers            Security and caching headers
wrangler.jsonc        Cloudflare deploy settings
```

## Deploy (Cloudflare Workers)

1. In Cloudflare: **Workers & Pages → Create → Import a repository**, then pick this repo.
2. Leave **Build command** empty, keep **Deploy command** as `npx wrangler deploy`. `wrangler.jsonc` tells it to publish the `public/` folder.
3. In the Worker's **Settings → Domains & Routes**, add the custom domains `dannybeaton.com` and `www.dannybeaton.com`.
4. To send the old domain to the new one, add `dannybeaton.com.au` to Cloudflare. Then create a **Redirect Rule** sending every request on `dannybeaton.com.au` and `www.dannybeaton.com.au` to `https://dannybeaton.com${path}` (301, keep the path). `public/_redirects` then maps the old page names (`/about-me.html`, `/getintouch.html` and so on) to the new pages.

To preview locally, run `npx wrangler dev` in this folder.

## Things to fill in

Search the HTML for `Replace` and `placeholder` to find them all.

| What | Where | How |
| --- | --- | --- |
| Contact form | `public/about.html`, `action="https://formspree.io/f/YOUR_FORM_ID"` | Create a free form at formspree.io, set it to send to contact@dannybeaton.com, and swap in your form ID. Until then the form says it isn't switched on yet. Your email address isn't shown anywhere on the site. |
| Newsletter | `public/index.html`, `<form class="signup" ... action="">` | In MailerLite or Kit, create an embedded form and copy its form `action` URL into `action=""`. Rename the email input's `name` to match: MailerLite uses `fields[email]`, Kit uses `email_address`. Until then the button says sign-ups open soon and subscribes nobody. |
| Book covers | `public/index.html` and `public/books.html`, each `<div class="cover">` | Add `<img src="/assets/img/cover-ashes.webp" alt="">` inside the cover div and delete the `draft` / `t` / `a` spans. Use 2:3 portrait images. |
| Photos | `public/assets/img/` | Export as `.webp`, around 1000px and 2000px wide for the hero, 600px and 1200px for portraits. |

## Notes

- Italics are only for titles of books, games and films in running text: wrap them in `<cite>`. Headings and subheadings are never italic.

- Fonts are licensed under the SIL Open Font License and are self-hosted, so nothing loads from Google.
- The site is dark-only by design.
- Animation: your name rises letter by letter and the photo pushes in on load; the Worldbuilder statement holds on screen while each line rises (phones get a simpler version); Shelf covers deal in like cards; Books covers slide in from their own side; pages cross-fade. Everything switches off for visitors who've asked their device for reduced motion.
