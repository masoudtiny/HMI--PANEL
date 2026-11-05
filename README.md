# Amotek HMI

Interactive help pages for HMI panels. Open the root page for the menu.

| Path | Project |
|---|---|
| `/` | Menu |
| `/stacker-panel/` | Stacker Panel (Amotek ST8B-2S) |
| `/hmi-panel/` | HMI Panel |
| `/bager-panel/` | Bager Panel (Amotek) |

Each project is self-contained (own `index.html`, `images/`, `manifest.json`, `sw.js`), so their code never conflicts.

## Password

The menu is open; each panel asks for a password when opened on `github.io`. All three panels share one password (SHA-256 of `amotek-hmi|` + lowercase password; only the hash is stored in each `index.html`).

To change it, run this in the browser console and paste the output into `SP_HASH` (stacker-panel), `PASS_HASH` (hmi-panel) and `BP_HASH` (bager-panel):

```js
crypto.subtle.digest("SHA-256", new TextEncoder().encode("amotek-hmi|NEWPASSWORD")).then(b=>console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")))
```
