# Recipes Project

## On every session start
At the beginning of every conversation, run `git pull origin main` to download the latest version of `Recipe Dashboard.html` from GitHub, then let the user know if there were any updates.

## File structure — Recipe Dashboard.html
Recipe data lives in **two places** inside `Recipe Dashboard.html`. Both must be updated whenever a recipe is added or changed:

1. **`default-data` JSON** (`<script type="application/json" id="default-data">`, near the top of the file) — this is what the app loads on every page open, pulling directly from GitHub. This is the source of truth for what users see.

2. **`SEEDS` migrations array** (the `const SEEDS = [...]` block) — one-shot migrations that patch localStorage. New recipes should be added here too for consistency, but the `default-data` JSON is what actually controls what is displayed.
