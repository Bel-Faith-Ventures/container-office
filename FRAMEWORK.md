# FRAMEWORK.md — Container Office design package (as-built)

**What this app is.** A contractor-ready design package for the Bel Fence 40 ft high-cube shipping-container office at 34208 Mayer Rd, Hempstead, TX — an interactive 3D walkthrough plus fully dimensioned 2D drawings and a priced, cost-seg-tagged bill of materials, all published as static HTML/SVG (GitHub Pages) with an offline build. It is the family-repo, project-specific record of *how this was actually built*; the de-identified, reusable version is `PHYSICAL-BUILD-DESIGN-PACKAGE-FRAMEWORK.md` in the Ophanim library (`Bel-Faith-Ventures/ophanim-ai`).

This is a specialization of the Ophanim engine (`OPHANIM-MULTIAGENT-FRAMEWORK.md`). Read the general framework first for the transferable method; this file records the instance.

---

## The one idea that makes it work: a single coordinate table
`_dims.mjs` holds one row per element — shell, partitions, every fixture — in feet, against a stated axis map (**X = length 0→39, Y = height 0→8.33, Z = width 0→7.25; origin at the front/solid corner**). A pure `ftin()` formatter converts a modelled coordinate to feet-inches-sixteenths **once**, and everything reads from it:

- the **3D walkthrough** (`Container-Office-3D-Walkthrough.html`, Rev G) places three.js boxes at those coordinates;
- the **dimensioned floor plan** (`Container-Office-Floor-Plan.html`) is an SVG generated at 1 ft = 20 px (`px = 60 + 20*X`, `py = 80 + 20*Z`) from the same numbers;
- the **zone schedule** and **pricing sheet** read the same fixture list.

Change a number in `_dims.mjs` → the plan, the 3D, and the schedule all move together. When Matthew asked for "a floor plan matching the 3D," it was **generated from the model coordinates, not hand-drawn**, so the two agree by construction. This is the SHARED-KPI single-source-of-truth discipline applied to geometry — a dimension shown in two independently-computed places will eventually disagree, and in a build that is a field error.

---

## The layout it documents (Rev G)
Four zones down the 40 ft, glass on one long side, solid wall opposite:
1. **Meeting (13'-0")** — 10' conference table, seats 9, 75" TV on the end wall, sliding glass entry, bi-part barn door to the studio, mini-split #1.
2. **Open Studio (13'-0")** — 2 glass-wall desks + bench/storage base on the solid wall, two fold-down FULL beds (54"×75", 4'-6" deep, clear the desks; ceiling-lift option), mini-split #2.
3. **Kitchen (8'-6")** — galley on the solid wall: fridge, cooktop + hood, sink, base + upper cabinets, shared wet wall with the bath.
4. **Full bath (4'-6")** — 36×36 corner shower, toilet, vanity, barn door.

All doors are barn/sliding (no swing arc). Usable interior ≈ 39'-0" × 7'-3" × 8'-4" clear after 2–3" closed-cell spray foam.

---

## Files (in `2 - System (do not touch)` for the deployed set; working copies at repo root of the local folder)
| File | Role |
|---|---|
| `_dims.mjs` | **Source of truth** — coordinate table + `ftin()` formatter. Run `node _dims.mjs` to print the full dimension list + zone clear lengths. |
| `Container-Office-3D-Walkthrough.html` | Interactive three.js walkthrough (Rev G): walk/orbit, roof-off, tuck-chairs, lower-beds, bed options. Library vendored in `_libcache/`. |
| `Container-Office-3D-OFFLINE.html` | Self-contained offline build (`_build-offline.mjs` inlines the vendored three.js). |
| `Container-Office-Floor-Plan.html` | Fully dimensioned SVG plan derived from `_dims.mjs`; zone/fixture schedule + read-the-plan key. |
| `Container-Office-Pricing.html` | Priced BOM by trade + cost-seg rollup (5/15/39-yr) + year-1 write-off scenarios. Budget, not a bid. |
| `Container-Office-Dimensioned-Spec.html` | Orthographic dimensioned spec (published at `/spec`). |
| `CONTAINER-BRIEF.md` | The work brief + open decisions + tax notes. |

Superseded/removed on 2026-09-07 (data folded forward first): Build-Timeline, Contractor-RFQ, BOM-CostSeg (its pricing → `Container-Office-Pricing.html`), Construction-Set. The older Rev B 2D plan `Container-Office-Layout-FullBath.html` (16'/10'/8'/5'-3" zones) is **superseded** by the Rev G plan (13'/13'/8'-6"/4'-6").

---

## Rules learned on this build
- **Size fixtures to the usable-after-finish clear box (≈7'-3" W), not the bare shell (~7'-8.5").** A few inches of foam is the difference between a cabinet fitting and not.
- **Every drawing sheet is stamped *NOT FOR CONSTRUCTION — verify field dimensions*.** These are design-intent, not sealed drawings.
- **The pricing sheet makes no tax determination.** Depreciation-class tags + the "business office, not a dwelling" character posture are inputs Tabitha (EA) confirms via `TAX-STRATEGY-ENGINE-FRAMEWORK`. The residential-character risk (beds + kitchen + bath) is the live filing-risk flag — document daily business use.
- **Don't spend or order anything without Matthew's go-ahead.** The BOM is self-source market figures; get local quotes on foam/electrical/plumbing/septic.
- **Placed-in-service by 12/31/2026** for the 100% bonus year-1 write-off.

---

## Deploy
Static site via GitHub Pages (`.github/workflows/deploy.yml`); repo layout follows the BFV standard (`1 - Your Files (start here)` + `2 - System (do not touch)`). `1 - Your Files (start here)/index.html` is the landing page; the dimensioned spec publishes at `/spec`.
