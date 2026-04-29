# Modular Chrome New Tab

React + TypeScript + Vite + MV3 extension implementing Widget → Core → Renderer.

## Architecture
- **Widget** (`src/widgets/**`): metadata + sizing + permission contracts.
- **Core** (`src/core/**`): persisted state, data adapters, fetch logic.
- **Renderer** (`src/renderer/**`): responsive grid, drag/resize interactions, lazy widget loading.

## Widgets
System: clock/date/timer/stopwatch  
Data: weather/ping/quotes  
Utility: notes/search  
Media: music player (media session)  
Productivity: shortcuts/cps  
Extras: habit tracker, focus timer, breathing mini-widget.

## Run
```bash
npm install
npm run dev
```

## Build + Load
```bash
npm run build
```
Then Chrome → Extensions → Developer mode → Load unpacked → select this repo root (or `builds` if packaging built assets).
