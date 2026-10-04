# Raw uploads

Drop original images here, named after the slot they fill, then run
`npm run assets`. Any common image format works (png, jpg, webp, avif, tiff).
Files in this folder are not committed; only the optimised output in
`public/assets/` is.

| File name (any extension) | Where it shows                     | Suggested shape |
| ------------------------- | ---------------------------------- | --------------- |
| `portrait`                | Hero background (shown greyscale)  | 1:1             |
| `acm-microsite`           | CRM is Dead campaign: microsite    | 16:10           |
| `acm-activation`          | CRM is Dead campaign: on-ground    | 4:3             |
| `ok-campaign`             | OK launch: campaign creative       | 4:5             |
| `ok-reel`                 | OK launch: video poster            | 9:16            |
| `ads-creatives`           | Paid acquisition: ad creatives     | 16:10           |
| `organic-growth-chart`    | AI content engine: traffic chart   | 16:9            |
| `social-posts`            | Social: top LinkedIn posts         | 4:3             |
| `social-reel`             | Social: video poster               | 9:16            |
| `agi-now-cover`           | AGI Now book cover                 | 2:3             |

Export at least 1600px wide where you can (portrait/cover: 1000px). Bigger
is fine; the script never upscales and caps output at 1600px.
