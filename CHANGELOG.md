# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
