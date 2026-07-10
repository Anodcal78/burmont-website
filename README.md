# Burmont Cleaning Co. website — SEO-ready release

This package keeps the existing design and Cloudflare Pages setup while improving the homepage's search relevance and technical metadata.

## Changes in this release

- Reworked the page title, meta description, Open Graph, and X/Twitter metadata.
- Added explicit indexing and large-image preview instructions.
- Improved LocalBusiness/website structured data, service catalog, service areas, logo, and Facebook entity link.
- Changed the main heading to clearly identify the service and service area.
- Converted the hero from a CSS-only background into a crawlable image with descriptive alt text and high loading priority.
- Improved service image alt text and service-link wording.
- Replaced placeholder social links with the Burmont Facebook page.
- Added an accurate `lastmod` date to the sitemap.
- Preserved the mobile dropdown fix (`overflow: visible` on the sticky header).

## Deploy

Upload the contents of this folder to the repository root, replacing the current files. Commit the changes to the branch Cloudflare Pages deploys from (normally `main`). Cloudflare should deploy automatically.

After the Cloudflare deployment succeeds:

1. Open `https://burmontcleaningco.com/` in a private browser window and confirm the page looks correct.
2. In Google Search Console, inspect `https://burmontcleaningco.com/`.
3. Run **Test Live URL**.
4. Request indexing one time after the updated page is live.

Do not repeatedly request indexing; one request after deployment is sufficient.
