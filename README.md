# Aakash Hathi — personal portfolio

A dependency-free, responsive portfolio for GitHub Pages.

Live URL: https://ah20-dev.github.io/my_webpage/aakashhathi_webpage/

## Hosting

GitHub Pages publishes the `docs` directory on `main`. The repository root URL redirects to `aakashhathi_webpage/`. There is no build step, custom domain, backend, analytics, or API key.

## Editing

- `docs/aakashhathi_webpage/index.html`: About me, projects, career, and education.
- `docs/aakashhathi_webpage/style.css`: responsive layout and visual styling.
- `docs/aakashhathi_webpage/script.js`: scroll progress and active timeline navigation.

Project dates use public repository creation dates, not inferred launch dates. ToolScout appears separately as current work because a start date was not supplied. Career dates and achievements come from the supplied resume. Mechanical project links can be added to the final timeline entry when available.

Do not add contact details or the original resume PDF; the portfolio intentionally omits location, phone, and email. External links open in a new tab. All content remains available with JavaScript disabled, and smooth scrolling respects reduced-motion preferences.

Preview locally: `python3 -m http.server 8765 --directory docs`, then visit `/aakashhathi_webpage/`.
