# Burmont Cleaning Co. website

Static one-page website for Burmont Cleaning Co.

## Files

- `index.html` — one-page site content
- `styles.css` — brand styling and responsive layout
- `script.js` — mobile menu and email estimate form
- `assets/` — logo, favicon, and website images
- `robots.txt`, `sitemap.xml`, `_headers` — launch/SEO/Cloudflare support files

## Deploy through GitHub + Cloudflare Pages

Cloudflare Pages will deploy once these files are pushed to the connected GitHub repo.

Local terminal method:

```bash
git clone https://github.com/Anodcal78/burmont-website.git
cd burmont-website
# Copy the contents of this package into the repo folder, replacing README.md if prompted.
git add .
git commit -m "Build Burmont Cleaning one-page website"
git push origin main
```

GitHub website method:

1. Open the `Anodcal78/burmont-website` repo.
2. Choose **Add file** → **Upload files**.
3. Drag in all files and folders from this package.
4. Commit directly to the `main` branch.
5. Wait for Cloudflare Pages to deploy.

## Contact details in the site

- Phone: `(610) 202-1978`
- Email: `hello@burmontcleaningco.com`
- Domain: `burmontcleaningco.com`


## Quote form

The estimate form submits through Formspree endpoint `https://formspree.io/f/xqevndor` and sends quote requests to `hello@burmontcleaningco.com`.


## Formspree cache fix

This update adds cache-busting query strings to `styles.css` and `script.js` so browsers stop using the old mailto form script.


Update: Header logo uses an inline no-line version so the brass divider does not cross the Cleaning Co. text.


## Update

Removed divider lines from the header and footer logo presentations so the wordmark stays clean in the navy areas.


Update: removes the small rogue brass line at the top-left of the header/logo area and bumps the stylesheet cache version.


Update v2: removed all “Background Checked” language and changed the trust item to “Fully Insured.”


Update: added image cache-busting query strings so browsers and Cloudflare pull the new high-resolution image files.
