# Emanuele Di Bella — personal website

A static, Italian-language portfolio for https://emanueledibella.com, published with GitHub Pages.

## Local preview

From the repository root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open http://127.0.0.1:4173. No build step or package installation is required.

## Homepage

- `index.html`: introduction, featured projects, full project list, about, social links.
- `assets/css/style.css`: responsive layout, local fonts, reduced-motion support.
- `assets/js/js.js`: three-project carousel with arrows, tabs, keyboard and swipe navigation; category filters.
- `assets/CREDITS.md`: image, logo and font sources and licenses.

The carousel has no autoplay. Without JavaScript, all featured projects and all archive entries remain visible and links continue working. Fonts, imagery, scripts and styles are served locally; the homepage makes no third-party asset requests.

The existing `CNAME`, `coronavirus-trend/` and `ipertano/` are retained. Coronavirus Trend links to its source repository because its PHP demo cannot run on GitHub Pages.

LAMP Server Docker remains in the archive without a link because its original public repository returns HTTP 404 (checked 28 October 2026).
