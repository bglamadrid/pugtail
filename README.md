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
- A simple project structure
  - Scripts to include common design feats
    - `/src/lib/scrolling_animations.ts` provides a TS type and an RxJS function to easily include animations triggered when scrolling down to elements targetted by query selectors.
    - `/src/lib/splides.ts` exports a typed function to invoke `Splide`s in your page with very little code.
    - `/src/scripts/contact.ts` is a simple script to provide submission of a contact form. It depends on an environment file to provide some variables, read section `Building in production mode` below.
    - `/src/scripts/mobile_nav.ts` does minor DOM changes in order to provide a responsive navigation menu with a toggle button, akin to most frameworks and CMS.
    - All of these are included in the packaged `index.pug.example` file
  - Pug mixin functions used as building blocks
    - Header & footer
    - Contact form
    - Google Maps iFrame Embed
    - Metatags
    - Icons from awesome free libraries, served through jsDelivr CDN
      - [FontAwesome Free](https://fontawesome.com)
      - [SimpleIcons.org](https://simpleicons.org)
  - Pug subtemplates (that can be `include`d)
    - Fonts served by public Google Fonts CDN


# Requirements

- Node.JS 12 or higher


# Getting started

To create a new project:
1. Clone the repo, or produce a new repo from the GitHub template.
2. Rename `index.example.pug` to `index.pug` to start working.

You have three available commands from the ground-up:
- `npm run build` will build the production-ready static site on `/dist` directory
- `npm run dev` will initiate the `webpack-dev-server` on port 8000
- `npm run watch` will build the site automatically whenever a change is made (but will not embed a webserver)

And you can fine-tune the `package.json` scripts to your heart's contempt.

For everything else, the documentation of each tool in the chain should suffice. There are links to everything this template depends on, do take a look.


## Adding images (and other assets)

To include images in your page, create a `/src/images` directory and add them there. These will not be versioned; this is by design, to help reduce the size of your repo.

But of course, you can change this setup, e.g. if you want/need to use a different folder, or more than one. You just must pay attention to the:
- Filepath patterns in the `/.gitignore` file.
- Path aliases in the `webpack.config.js` file.

Remember to `require()` all local assets referenced within your `.pug` templates, otherwise they won't be loaded (this syntax is established by the `pug-plugin`).

You may also need to support additional image file extensions, if the ones provided in `webpack.config.js` don't suffice.


## Adding or changing typographic fonts

If you want to choose and utilize other fonts than the default ones, you can follow these two steps:
- Indicate which ones you'll load at the `/src/includes/googlefonts.pug` subtemplate, in the `families` array.
- Declare these font families in the `tailwind.config.js` file, in the `theme.fontFamily` object.
In the future I might be able to provide a mechanism for a single source of truth regarding typography. But for now, you have to keep both files in mind.


## Building in production mode

You _must_ supply an `/src/environment.prod.ts` file to run a production build, otherwise the process will throw an error. This is due to a dependency from the contact form script.

The contact script uses a POST call to an external, protected API for sending mails (whose implementation is left completely up to you, by the way). And as you'd expect, access to that API is meant to be secured. Which is why environment files are unversioned; to prevent leaking related secrets into the codebase.

**But if you don't need to include a contact form**, you can either:
- Comment or remove the `NormalModuleReplacementPlugin` bits in the `webpack.config.js` file.
- Rewrite the `/src/scripts/contact.ts` file, or remove it along with any references to it.


# Contributing

Pugtail is an early-stage project template. If you have any suggestions, ideas, or find any bugs while using it, please do not hesitate to create an issue, and hopefully stick around to answer any questions.

PRs are also totally welcome.


# License

This software is licensed under MIT. See `LICENSE.md`.

It uses third-party software that may be filed under MIT or other open-source licenses. Please read and respect each license when you use this template.
