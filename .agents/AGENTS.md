# Workspace Rules - Divideo Project

## Custom Rules
- **NEVER AUTOMATICALLY TRIGGER VOICE SYNTHESIS**: Do not run `run_synthesis.js`, `generate_voices.js`, `time_synthesis.js`, or hit the `/api/synthesize-all` endpoint autonomously. Voice generation must only be triggered manually by the user or when explicitly asked.

## 9:16 Mobile Layout & Spacing Rules for Simulation Plugins
To ensure future video simulations display perfectly on mobile, use the following layout, width, and margin specs:
1. **Mockups & Containers Width**:
   - Main central cards/containers: `width: 650px - 700px`.
   - Grid boards/inspectors/tables: `width: 800px - 820px`.
   - Map and Settings app mockups: `width: 750px - 820px`.
   - Phone mockups: `width: 480px`, `height: 840px`.
2. **Mockups & Containers Height**:
   - Limit the heights of mockups (Map, Settings) to a maximum of **750px - 800px** to avoid colliding with the subtitle box at the bottom.
3. **Vertical Shifting & Spacing (Preventing Subtitle Overlaps)**:
   - Always shift the header title up: `.sim-scene-header { margin-top: -50px !important; }`.
   - Shift the keywords panel up: `.keywords-panel { top: 110px !important; }` (use `top: 80px !important;` if there are 3 keywords).
   - Shift the main simulation canvas body up: `.sim-canvas-body { margin-top: 35px !important; }` (or `80px !important;`).
   - Use `overflow: visible;` on zoom containers to prevent floating items (e.g. category tags, hand cursors, orbit circles) from being clipped.
   - Use `align-items: flex-start;` on the zoom container and set `margin-top: 140px;` on the inner mockups/cards. This ensures they start exactly `220px` from the top of the slide, leaving plenty of vertical room at the bottom for subtitles (`bottom: 300px`).
   - Any floating polaroid photos should be positioned using `top` instead of `bottom` (e.g. `top: 520px;`) so their slide animations end safely above the subtitle box.
4. **Legibility & Typography**:
   - Scale text size up to **24px - 32px** inside cards and detail rows so they are easily legible on mobile screens without zooming.

