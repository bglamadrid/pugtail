<div align="center">
  <div>
    <a href="https://pugjs.org">
      <img src="https://cdn.rawgit.com/pugjs/pug-logo/eec436cee8fd9d1726d7839cbe99d1f694692c0c/SVG/pug-final-logo-_-colour-128.svg"
      height="135">
    </a>
    <a href="https://tailwindcss.com">
      <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.79614a5f61617ba49a0891494521226b.svg"
      height="110">
    </a>
  </div>

  **PUGTAIL**

  An opinionated project template for designing, developing, deploying and iterating static websites quickly.

  Write markup that is easy to read and convey as HTML/CSS, without needing to learn a whole new framework.

  [![latest](https://img.shields.io/github/v/tag/bglamadrid/pugtail?label=latest)](https://github.com/bglamadrid/pugtail/tags)
</div>

# Features

- A great developer experience thanks to the following toolchain:
  - [Webpack](https://webpack.js.org) as a resource bundler (and [`webpack-dev-server`](https://github.com/webpack/webpack-dev-server) to spin a dev environment in seconds).
  - [Pug](https://pugjs.org) as a templating engine (and [`pug-plugin`](https://github.com/webdiscus/pug-plugin) to integrate it into Webpack with little fuss).
  - [PostCSS](https://postcss.org) along with its [Preset Env plugin pack](https://github.com/csstools/postcss-plugins/tree/main/plugin-packs/postcss-preset-env) (and a [browserslist](https://github.com/browserslist/browserslist) query in the `package.json` file) to help optimize & polyfill styles.
  - [TailwindCSS](https://tailwindcss.com) as the design framework.
  - [TypeScript](https://www.typescriptlang.org) as a means to write _better_ client-side JavaScript.
- Some hand-picked libraries
  - [Splide](https://splidejs.com) to create accessible carousels (and alike UI elements) with ease and flexibility.
  - [Animate.css](https://animate.style) to have a defined set of CSS keyframes (animations) to work with.
  - [RxJS](https://rxjs.dev) to add readable, async client-side functionality.
- A clear, concise project structure starting with the `/src/` folder
  - At its root, there's the core data JSON files, these can be read by both the client and server.
    - `environment.json` contains vital information for deploying the site and interacting with others
    - `site.json` contains hints about the desired website structure and its textual information
    - `business.json` contains information about the website's business itself, such as name and legal paraphernalia
  - In the `web/` folder reside all files that should be included
    - The `lib/` directory has snippets for predefined common functionality that can be given parameters to work with
      - `scrolling_animations.ts` to trigger animations when scrolling down to elements specified by query selectors.
      - `splides.ts` to create carousels using the `Splide` library
    - The `scripts/` directory has some simple pre-estructured functionality that can only be reused as-is
      - `mobile_nav.ts` does minor changes to the DOM in order to provide a responsive navigation menu with a toggle button, akin to most frameworks and CMS.
      - `contact.ts` to submit a contact form with AJAX through RxJS. It reads variables from the `environment.json` file.
  - In the `mixins` directory you can find predefined building blocks for the Pug markup
    - Header & footer
    - Contact form (without the script mentioned above)
    - Google Maps iFrame Embed
    - Metatags
    - Icons from awesome free libraries, served through jsDelivr CDN
      - [FontAwesome Free](https://fontawesome.com)
      - [SimpleIcons.org](https://simpleicons.org)
  - The `includes` directory has only one subtemplate
    - `googlefonts.pug` links all the fonts used site-wide, as served by the public Google Fonts CDN


# Requirements

- Node.JS 12 or higher


# Getting started

To create a new project:
1. Clone the repo, or produce a new repo from the GitHub template.
2. In your terminal, run `npm run dev` to initiate the `webpack-dev-server` on port 8000.
3. Browse to `localhost:8000`. You should see the base template as outlined in the `src/views/index.pug` file.
4. That's all. Start building or hacking right away!

You also have these other commands available:
- `npm run build` will build the production-ready static site on `/dist` directory
- `npm run watch` will build the site automatically whenever a change is made (but will not embed a webserver)

Remember to review the documentation of each library and tool that is used as listed in [Features](#Features).


## Adding static files (images, videos, etc)

Add the files you wish to include to the `/src/web/assets` directory. Note that these will NOT be versioned; this is to help reduce the size of your repo.

Use the `require("~Assets/[...]")` syntax to include any files within your `.pug` templates (this syntax is supported thanks to the `pug-plugin`).

If you need to support additional image file extensions for other static files, edit the module rules in the `webpack.config.base.js` file.


## Adding or changing typographic fonts

If you want to choose and utilize other fonts than the default ones, you can follow these two steps:
- Indicate which ones you'll load at the `/src/includes/googlefonts.pug` subtemplate, in the `families` array.
- Declare these font families in the `tailwind.config.js` file, in the `theme.fontFamily` object.
In the future I might be able to provide a mechanism for a single source of truth regarding typography. But for now, you have to keep both files in mind.


## Building in production mode

The project as-is has a contact script that depends on a `/src/environment.prod.json` file. You must supply one to run a production build, otherwise the process will throw an error.

**But if you don't need to include a contact form**, you can either:
- Comment or remove the `NormalModuleReplacementPlugin` bits in the `webpack.config.*.js` file.
- Rewrite the `/src/scripts/contact.ts` file, or remove it along with any references to it.


# Contributing

Pugtail is an early-stage project template. If you have any suggestions, ideas, or find any bugs while using it, please do not hesitate to create an issue, and hopefully stick around to answer any questions.

PRs are also totally welcome.


# License

This software is licensed under MIT. See `LICENSE.md`.

It uses third-party software that may be filed under MIT or other open-source licenses. Please read and respect each license when you use this template.
