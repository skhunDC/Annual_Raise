# Repository Guidelines

The following rules apply to contributions to this repository:

- Use two spaces for indentation in JavaScript (`.gs`) and HTML files.
- Document any new features or significant changes in `README.txt`.
- After modifying files, run `node --version` to verify Node.js is available.

These instructions apply to all files within this repository.

## Design System Addendum
- Preserve the mobile-first layout introduced in `index.html`. Define base
  styles for small screens, then enhance at `min-width: 600px`, `768px`, and
  `1024px` breakpoints unless a new breakpoint is essential.
- Keep interactive surfaces (header, cards, action bar) using the shared
  variables (`--radius-lg`, `--radius-sm`, `--shadow`, and `--max-width`). New
  UI elements should reuse these tokens or extend them thoughtfully.
- Action buttons must remain touch friendly: minimum height 44px, generous
  padding, and hover/active feedback consistent with the current styling.
- Employee rows should continue to support the stacked grid layout on mobile
  and horizontal flex layout on desktop. Add new content with explicit grid
  areas or helper classes so the reflow remains predictable.
