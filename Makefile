install:
	npm install

start:
	npx babel-node dist/bin/gendiff.js

build:
	rm -rf dist
	npm run build

publish:
	npm publish --dry-run

lint:
	npx eslint .

test:
	npm test

test-coverage:
	npm test -- --coverage

test-watch:
	npm test -- --watch

install-gendiff:
	npm install
	npm publish --dry-run
	npm link