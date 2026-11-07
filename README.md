# Amotek HMI

Interactive help pages for HMI panels. Open the root page for the menu.

| Path | Project |
|---|---|
| `/` | Menu |
| `/stacker-panel/` | Stacker Panel (Amotek) |
| `/hmi-panel/` | HMI Panel |
| `/bager-panel/` | Bager Panel (Amotek) |

The menu itself is the only installable app (`manifest.json` + `sw.js` in the root): install it once, then pick a panel and enter the password. The panels have no install button and no `manifest.json` of their own; they open inside the installed menu app. Installed apps open in landscape.

The app icon (`images/menu-icon-192.png`, `images/menu-icon-512.png`, `images/menu-apple-touch-icon.png`) shows the logos of all three panels.

Each project is self-contained (own `index.html`, `images/`, `sw.js`), so their code never conflicts.

## Updating the app

After changing any menu file or icon, raise the version in `sw.js` (`PREFIX + "v2"` → `"v3"`) so phones drop the old cache. If the old icon still shows on a phone, uninstall the app and install it again.

## Password

The menu is open; each panel asks for a password when opened on `github.io`. All three panels share one password: `hmi2026` (SHA-256 of `amotek-hmi|` + password, case-sensitive; only the hash is stored in each `index.html`).

Current hash:

```
a36f6602d59ac7924a648d2adc4d016de939717085e995db062db6f6be1119b5
```

Paste it into `SP_HASH` (stacker-panel), `PASS_HASH` (hmi-panel) and `BP_HASH` (bager-panel).

To change the password, run this in the browser console and paste the output into the same three places:

```js
crypto.subtle.digest("SHA-256", new TextEncoder().encode("amotek-hmi|NEWPASSWORD")).then(b=>console.log([...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")))
```
