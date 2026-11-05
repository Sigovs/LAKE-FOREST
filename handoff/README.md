# Lake Forest Motor Sports — developer handoff (v3)

The approved v3 front end of the Lake Forest Motor Sports website (by Mancuso): six static pages, the design system
they are built from, and the notes needed to take them to production.

| | |
|---|---|
| Live site | https://sigovs.github.io/LAKE-FOREST/handoff/site/index.html |
| Design system | https://sigovs.github.io/LAKE-FOREST/handoff/design-system/ |
| This folder on GitHub | https://github.com/Sigovs/LAKE-FOREST/tree/main/handoff |

## What is in here

```
handoff/
├── README.md                 ← you are here
├── site/                     the website, ready to serve as-is
│   ├── index.html            Homepage
│   ├── family.html           The family
│   ├── history.html          History
│   ├── gt.html               The GT
│   ├── rpm.html              RPM Club
│   ├── contact.html          Contact
│   ├── css/
│   │   ├── styles.css        the one stylesheet for every page (tokens at the top)
│   │   └── history.css       the history page's chapter layout
│   ├── js/                   one script per job — see docs/DEVELOPMENT.md
│   └── assets/
│       ├── brand/            crest, crest mark, the GT mark
│       ├── img/              photographs and stills
│       └── video/            the hero film and the Le Mans clip
├── design-system/
│   ├── index.html            living reference: colour, type, space, brand, every component
│   ├── tokens.css            the design tokens as CSS custom properties
│   ├── tokens.json           the same tokens, W3C Design Tokens format
│   └── README.md             how the system works and the rules
└── docs/
    ├── DEVELOPMENT.md        files, libraries, behaviour to keep, how to change things
    ├── ASSETS.md             every image and video: size, where it is used, origin and credit
    └── TODO.md               what is still to wire up before launch
```

## Run it locally

The pages are plain HTML, CSS and JavaScript: no build step, no framework, no package install.
Serve `site/` over HTTP; opening the files straight from disk breaks the videos and the scroll effects.

```
cd handoff/site
python3 -m http.server 8000
# open http://localhost:8000/
```

## Read next

1. `docs/TODO.md`: the three things to finish before launch (the contact form first).
2. `design-system/README.md`: the tokens and the rules.
3. `docs/DEVELOPMENT.md`: how the code is organised and what must not break.

## How this folder is produced

The working files live at the repository root under their prototype names (`index_v3.html`, `styles-v3.css` …).
This folder is generated from them. Do not edit it by hand: change the source and run

```
python3 tools/build-handoff.py && python3 tools/build-design-system.py
```
