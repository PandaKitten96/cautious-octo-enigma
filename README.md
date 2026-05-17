
# Haikus for Codespaces

This is a quick node project template for demoing Codespaces. It is based on the [Azure node sample](https://github.com/Azure-Samples/nodejs-docs-hello-world). It's great!!!

Point your browser to [Quickstart for GitHub Codespaces](https://docs.github.com/en/codespaces/getting-started/quickstart) for a tour of using Codespaces with this repo.

## Magic Input Generator

Generate randomized coding input from commands that start with `Magic.*`.

```bash
npm run magic -- "Magic.* api tests validation"
```

This reads the keywords after `Magic.*` and prints randomized generated lines using those keywords.

### Install Manager Commands

Magic also supports install-manager generation:

```bash
npm run magic -- "Magic.* pm install express lodash"
npm run magic -- "Magic.* bash install curl jq"
```

- `pm install ...` outputs an `npm install` command.
- `bash install ...` outputs apt-get install commands.

## Google AI Team Experience

The repository includes metadata and examples aligned with Google AI team experience, including Google DeepMind-style research and engineering workflow references.

## Google Labs Integration

Google Labs-oriented repository references are included in `Magic.repositories` so generated and curated prompts can be based on Labs-style experimentation and prototyping themes.
