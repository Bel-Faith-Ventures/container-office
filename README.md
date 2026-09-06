# Bel Fence — 40 ft Container Office · 3D Walkthrough

Interactive 3D walkthrough of the Bel Fence 40 ft container office design.
Works on **phone and desktop** in any modern browser — no install, no login.

## 👉 Live link

**https://bel-faith-ventures.github.io/container-office/**

Open it, tap/click to look around, and use the on-screen controls to walk through.
On a computer you can also use WASD + mouse; on a phone, drag to look and use the
touch controls.

## How it's hosted

- The viewer is a single self-contained HTML file (three.js is inlined — it needs
  **no internet connection to any CDN** once loaded), served free via **GitHub Pages**.
- The link is **permanent** and does **not** require anyone's PC to be on.

## Repo layout

- `1 - Your Files (start here)/index.html` — the 3D viewer that GitHub Pages publishes.
- `2 - System (do not touch)/` — the source walkthrough + the build script and three.js
  cache used to produce the offline viewer.
- `.github/workflows/deploy.yml` — publishes the viewer to GitHub Pages on every push
  to `main`.
