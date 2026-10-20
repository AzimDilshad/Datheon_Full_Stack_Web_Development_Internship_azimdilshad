# Rohan Menon | Software Automation Engineer Portfolio

A small, fast portfolio site for a test automation internship application. It covers an about and resume section, a tools grid, five featured projects with popups, and a contact form.

Live site: `https://rohanmenondev.vercel.app` 

## What's inside

- Semantic HTML5: header, hero, about, skills, projects, contact, footer
- Mobile-first layout with CSS Grid and Flexbox
- Dark and light theme, follows the system setting and remembers the choice
- Smooth scrolling, active nav highlight, hamburger menu on small screens
- Project popups built on the native `<dialog>` element (Esc closes, focus is handled for you)
- Contact form with inline validation (opens the visitor's mail app on send)
- Respects `prefers-reduced-motion`
- No frameworks, no build step, fonts and logos are self-hosted

## Folder layout

```
index.html
favicon.svg
vercel.json
css/
  style.css        all the styling
  icons.css        generated logo and icon masks
js/
  main.js          theme, menu, modal, form, scroll effects
  projects.js      the project popup content
assets/            fonts, tool logos, icons
resume/            downloadable resume PDF
scripts/
  build-icons.py   rebuilds css/icons.css after you add a logo
```


## Make it yours

All the content here is sample data, so replace it before you apply.

1. **Name, text, dates, jobs, certificates**: edit `index.html`.
2. **Projects**: edit `js/projects.js` for the popup text, repo and demo links. The cards in `index.html` use the same ids.
3. **Photos**: the portrait and project images use placeholder photos from picsum.photos. Drop your own files into `assets/img/` and change the `src` values.
4. **Contact details**: search for `rohan.menon.dev@example.com`, the GitHub and LinkedIn URLs and the phone number. The email also lives at the top of `js/main.js`.
5. **Resume**: replace `resume/Rohan-Menon-Resume.pdf` with your real one (keep the file name or update the link in the hero).
6. **Accent colour**: change `--accent` and `--btn-bg` at the top of `css/style.css`.
7. **New logo**: put an SVG in `assets/tech/`, run `python3 scripts/build-icons.py`, then use `<span class="t t-yourlogo"></span>`.


## form submissions

The form currently opens a pre-filled email. If you want messages delivered to your inbox without the mail app, create a free Formspree form and post to it from the submit handler in `js/main.js` (there is a todo note there).

## Tools used

HTML5, CSS3 (custom properties, Grid, Flexbox), vanilla JavaScript (ES6+), Geist font, Simple Icons and Phosphor icons, Vercel for hosting.
