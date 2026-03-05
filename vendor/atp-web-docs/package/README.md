# @atpco/atp-web-docs

This package ships the MDX and Storybook stories from `@atpco/atp-web` so tooling (including AI tools) can ingest documentation without running Storybook.

Contents:
- `docs/` contains copied `.mdx` and `.stories.*` files from `libs/atp-web/src/lib`.
- `index.json` and `index.md` provide a generated index of those files.

Build it with:
- `nx run atp-web-docs:build`
