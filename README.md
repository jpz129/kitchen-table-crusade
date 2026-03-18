# Kitchen Table Crusade

Kitchen Table Crusade is a lightweight improvised battlefield generator for sci-fi tabletop play.
It creates a complete original mission card using local, deterministic templates and household terrain substitutions.

## Why this exists

Not everyone has dedicated terrain. This prototype helps players quickly set up a playable mission using common objects at home while keeping the experience fun, clear, and printable.

## MVP features

- React + Vite + TypeScript frontend (no backend)
- Input controls for game size, army names, tone, and available household objects
- Deterministic mission generation from typed local data tables
- Original narrative briefing (Serious / Epic / Ridiculous tones)
- SVG top-down battlefield map with:
  - deployment zones
  - objective markers
  - terrain placements
  - coordinate/legend block
- Terrain substitution list mapping tabletop terrain to household items
- Print-friendly mission card via browser print styles
- Automatic save/load of the last generated mission from `localStorage`
- Optional OpenAI narrative enhancement with deterministic fallback

## Tech stack

- React
- Vite
- TypeScript
- CSS
- SVG rendering
- Local JSON/TS data tables

## Project structure

```text
src/
  components/
  data/
  engine/
  types/
  utils/
```

## Setup

```bash
npm install
```

## Optional OpenAI setup

Create a local env file (not committed):

```bash
cp .env.example .env.local
```

Then set:

```bash
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

If the key is not set or the API request fails, the app automatically uses deterministic template narrative generation.

## Run locally

```bash
npm run dev
```

Open the local URL shown in terminal (default Vite URL).

## Build

```bash
npm run build
```

## How to print a mission card

1. Generate a mission.
2. Click `Print-Friendly Mission Card`.
3. In the print dialog, print or save as PDF.

The print stylesheet hides input controls and focuses on the mission content.

## Roadmap (post-MVP)

- Multiple board sizes and layout presets
- Export to dedicated PDF layout
- Additional narrative packs and mission modules
- Optional seed sharing for reproducible missions
- Better mobile polish

## Legal / content note

Kitchen Table Crusade generates original mission text and is not affiliated with, endorsed by, or connected to Games Workshop.
