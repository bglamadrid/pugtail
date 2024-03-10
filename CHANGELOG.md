# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.2.0] - 2024-03-10

### Changed
- `data.json` has been split into three files, for better separation of concerns (and possibly authorities)
  - `business.json`
  - `environment.json`
  - `site.json`
- Renamed `index.example.pug` to `index.pug`, to avoid users of this project having to do this step themselves
- Reestructured files intended to go as part of the static website output
  - Moved subdirectories within root `src/`
    - `src/scripts/` -> `src/web/scripts`
    - `src/lib/` -> `src/web/lib`
    - `src/views/` -> `src/web/views`
  - Group view-specific files into their own directory within `src/web/views`
    - `/src/web/views/index.pug` -> `/src/web/views/index/index.pug`
    - `/src/web/scripts/index/splides.ts` -> `/src/web/views/index/splides.ts`
    - `/src/web/scritps/index/scrolling_animations.pug` -> `/src/web/views/index/scrolling_animations.ts`
- Default web port set to 8000 instead of 80

## [v1.1.2] - 2022-09-27

### Fixed
- `data.json` is, once again, loaded within Pug templates; thus allowing Webpack to watch for changes in it.

## [v1.1.1] - 2022-09-21

### Added
- Simple & responsive header navigation menu
  - Its contents are sourced from the `data.json` file

### Changed
- Update `pug-plugin` dependency (two major versions up)
  - Also update webpack configuration file to fix-up breaking changes
- Simplify webpack configuration by declaring a base file
- Extension of environment file to `.js` to make it compatible with both server-side webpack configuration as well as client-side JavaScript
- Update template and `data.json` labels to english


## [v1.0.1] - 2022-08-09

### Changed
- Link to homepage (in header) set through environment file


## [v1.0.0] - 2022-07-27

Initial release.
