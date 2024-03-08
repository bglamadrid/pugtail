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
- An intuitive, easy-to-follow project structure.
  - `/src` - The sources root folder. Before delving into directories, there are some JSON files storing core data. These files can be read/loaded into the compilation process as well as being fully or partially included in the output files.
    - `environment.json` - Contains vital information for deploying the website and interacting with APIs.
    - `site.json` - Holds hints about the content and structure of the website, as well as some commonly used text.
    - `business.json` - Contains information about the authors and their business, such as contact information.
    - `web/` - As you may guess, holds all files that will be processed to create the website itself.
      - `lib/` - Has parameterized client-side code snippets for functionality that is common of many other websites in the internet.
        - `scrolling_animations.ts` - Can trigger animations when scrolling down to elements specified from query selectors.
        - `splides.ts` - Can create accesible carousels using the `Splide` library.
      - `scripts/` - Holds some simple functionality that can only be reused as-is.
        - `mobile_nav.ts` - Does minor changes to the DOM in order to provide a responsive navigation menu with a toggle button, akin to most frameworks and CMS.
        - `contact.ts` - Enables submission of a contact form using AJAX. All of it is implemented with RxJS. It also reads variables from the `environment.json` file, so it alone makes is mandatory to include at least part of that file in the output.
      - `views/` - Where all the Pug templates and page-specific scripts go.
        - `index/` comes by default, with `index.pug` and two page scripts for this view only.
    - `includes/` - Contains subtemplate to be used as-is. There's only one in this template though.
      - `googlefonts.pug` - Links all the fonts used site-wide, as served by the public Google Fonts CDN.
    - `mixins/` - Has parameterized Pug building blocks. It is divided by categories.
      - `header.pug` & `footer.pug` - These used to be in the `includes` directory, but now, instead, they require all the core data (from the JSON files).
      - `contact-form.pug` - This
      - Google Maps iFrame Embed - Requires the place ID.
      - Website metatags - For better SEO, includes tags for Facebook, Twitter and Google.
      - Icons from free libraries, served through jsDelivr CDN. This mixin supports two sources:
        - [FontAwesome Free](https://fontawesome.com)
        - [SimpleIcons.org](https://simpleicons.org)


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

To do this:

1. Indicate which ones you'll load at the `/src/includes/googlefonts.pug` subtemplate in the `families` array.
2. Declare these same font families in the `tailwind.config.js` file, in the `theme.fontFamily` object.

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
