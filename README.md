# AeroBin

We make trash talk.

Marketing site and operations dashboard for AeroBin, a clip-on sensor that
reports fill level and contamination on bins a campus already owns.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## Routes

| Path | What it is |
|---|---|
| `/` | Marketing site |
| `/dashboard` | Operations dashboard |
| `/overview` | Earlier product landing page |

## Deploying

Configured for Vercel (`vercel.json`) and Netlify (`netlify.toml`). Both
build with `npm run build`, publish `dist`, and rewrite all paths to
`index.html` so client side routes resolve.

The map needs outbound access to `tile.openstreetmap.org` for basemap
tiles.
