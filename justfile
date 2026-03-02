site := "npm run --prefix=site"

_default:
	just --list

# Build all crates & the site
build:
	cargo build --release
	{{site}} build

# Check (or fix) formatting for whole project
[arg('write', short='w', long='write', value='true')]
fmt write='false':
	cargo +nightly fmt {{ if write == 'true' {''} else {'--check'} }}
	{{site}} biome format -- {{ if write == 'true' {'--write'} else {''} }}

# Run unit tests for all crates & the site
test:
	cargo test --release
	{{site}} test

# Run linting/static analysis on all crates & the site
lint:
	cargo clippy -- -D warnings
	{{site}} biome check
