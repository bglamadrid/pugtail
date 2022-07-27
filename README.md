# What is this

An opinionated project template to design and develop static websites without resorting to use an entire framework for the job.


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
- A few code snippets to include common design feats:
  - `/src/lib/scrolling_animations.ts` provides a TS type and an RxJS function to easily include animations triggered when scrolling down to elements targetted by query selectors.
  - `/src/lib/splides.ts` boilerplate with a function to invoke `Splide`s in your page with very little code.
  - `/src/scripts/contact.ts` is a simple script to provide interaction with a contact form. It depends on  an environment file to provide some variables, read section `A note about building in production mode` below.
  - All of these are included in the packaged `index.pug.example` file
- A few Pug mixins/subtemplates to separate/reuse very common pieces of code:
  - Header & footer
  - Contact form
  - Google Maps iFrame Embed
  - Icons served from public-facing, NPM-based CDNs
    - [FontAwesome Free](https://fontawesome.com)
    - [SimpleIcons.org](https://simpleicons.org)



# Requirements

- Node.JS 12 or higher


# Getting started

1. Clone the repo, or produce a new repo from the GitHub template.
2. Rename `index.pug.example` to `index.pug` to start working.

You have three available commands from the ground-up:
- `npm run build` will build the production-ready static site on `/dist` directory
- `npm run dev` will initiate the `webpack-dev-server` on port 80
- `npm run watch` will build the site automatically whenever a change is made (but will not embed a webserver)

And you can fine-tune the `package.json` scripts to your heart's contempt.

For everything else, the documentation of each tool in the chain should suffice (take a look at each page linked above).


## Adding images (and/or other assets)

To include images in your page, create a `/src/images` directory and fill it with your assets. These will not be versioned; this is by design, to help reduce the size of your repo.

But of course, you can change this setup, e.g. if you want/need to use a different folder, or more than one:
- Add/edit/remove file patterns in the `/.gitignore`
- Add/edit/remove file path aliases in `webpack.config.js`

Remember to `require()` all local assets referenced within your `.pug` templates, else they won't be loaded (this syntax is established by the `pug-plugin`).

You may also need to support additional image file extensions, if the ones provided in `webpack.config.js` don't suffice.


## A note about building in production mode

You _must_ supply an `/src/environment.prod.ts` file to run a production build, otherwise the process will throw an error. This is due to a dependency from the contact form script.

The script uses a POST call to an external, protected API (whose implementation is left completely up to you, by the way). Access to that API is secured/unversioned through the aforementioned environment file, to prevent leaking secrets into the codebase.

tl;dr if you don't need to include a contact form, or you have your own implementation, you can either:
- Comment or remove the `NormalModuleReplacementPlugin` bits in the `webpack.config.js` file.
- Rewrite the `/src/scripts/contact.ts` file to whatever you need
- Remove the `/src/scripts/contact.ts` file altogether along any references to it


# License

This software is licensed under MIT. See `LICENSE.md`.

It uses third-party software that be filed under MIT or other open-source licenses.
