# dh

Static/edge assets for my personal website, [dallinhuff.com](https://www.dallinhuff.com/).

This repo is split into the following sub-projects:

| Project          | URL                                 | Description                                       |
| :--------------- | :---------------------------------- | :------------------------------------------------ |
| [`site`](./site) | <https://www.dallinhuff.com>        | Main blog/portolio site                           |
| [`sh`](./sh)     | <https://sh.dallinhuff.com>         | `curl`-able, terminal-friendly version of my site |
| [`wkd`](./wkd)   | <https://openpgpkey.dallinhuff.com> | OpenPGP Web Key Directory (WKD)                   |


## Prerequisites

- NPM (<https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>)
- Rust Toolchain (<https://rust-lang.org/tools/install/>)
    - I recommend [using a package manager][rustup-pkgman] over the default `curl | sh` install method, but you do you :shrug:
- Just (<https://just.systems/man/en/installation.html>)

[rustup-pkgman]: https://rust-lang.github.io/rustup/installation/other.html#using-a-package-manager


## Commands

Run `just --list` to see repo-wide commands for building/linting/testing/etc. Otherwise, refer to sub-project READMEs.


## License

The source code in this repository is licensed under the MIT License.

All website content — including text, images, graphics, and blog posts —
unless stated otherwise is © 2026 Dallin Huff. All rights reserved.
