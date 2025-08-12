# QuickNotes

A fast, minimal notes app built with **React** and **Vite**. Create, edit, and delete quick notes right in your browser. Notes are saved locally so they persist between sessions.

**Live demo:** [https://HaimFC.github.io/QuickNotes-React-Project/](https://HaimFC.github.io/QuickNotes-React-Project/)

---

## Features

* Add, edit, and delete notes
* Auto‑persist to browser storage (no backend required)
* Instant search/filter (client-side)
* Clean, responsive UI

> If any feature here is inaccurate, tweak this list to match the current code.

---

## Tech stack

* **React** + **Vite**
* **JavaScript**, **CSS**, **HTML**
* Deployment via **GitHub Pages**

---

## Getting started

### Prerequisites

* Node.js (LTS recommended)

### Install & run

```bash
# 1) Install deps
npm install

# 2) Start dev server
npm run dev

# 3) Build for production
npm run build

# 4) Preview the production build locally
npm run preview
```

---

## Project structure

> Actual files may vary; update as needed.

```
QuickNotes-React-Project/
├─ public/               # Static assets
├─ src/                  # App source
│  ├─ components/        # Reusable UI components
│  ├─ hooks/             # Custom hooks (if any)
│  ├─ styles/            # Global / component styles
│  ├─ App.jsx            # Root component
│  └─ main.jsx           # App bootstrap
├─ index.html            # Vite entry HTML
├─ package.json          # Scripts & dependencies
├─ vite.config.js        # Vite configuration
└─ README.md
```

---

## Scripts

These are typical Vite scripts (adjust if yours differ):

* `npm run dev` – start local dev server
* `npm run build` – build to `/dist`
* `npm run preview` – preview the production build
* `npm run deploy` – deploy to GitHub Pages (see below)

---

## Deploying to GitHub Pages

This project is configured to deploy to GitHub Pages using the `gh-pages` package.

1. Ensure `homepage` in `package.json` is set to:

   ```json
   "homepage": "https://HaimFC.github.io/QuickNotes-React-Project/"
   ```
2. Ensure these scripts exist in `package.json`:

   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```
3. Deploy:

   ```bash
   npm run deploy
   ```

> After the first deploy, GitHub will serve the app at the URL above. If you see only the README, make sure the repo’s **Settings → Pages** is set to the **gh-pages** branch.

---

## Configuration

* **Base path**: Vite often needs a base path when hosted in a subfolder. If needed, set `base` in `vite.config.js` to `"/QuickNotes-React-Project/"`.
* **Storage**: Notes are stored in the browser (Local Storage). Clearing site data will remove them.

---

## Roadmap / Ideas

* Pin/favorite notes
* Tags & tag filter
* Import/export notes (JSON)
* Dark mode toggle

---

## Contributing

Issues and pull requests are welcome. For small fixes, open a PR. For larger changes, please start with an issue describing the proposal.

---

## License

MIT (or update to your preferred license)

---

## Credits

Built by **Haim Cohen**. ❤

