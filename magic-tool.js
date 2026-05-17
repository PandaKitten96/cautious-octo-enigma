#!/usr/bin/env node

const { generateFromMagicCommand } = require('./lib/magic-tool');

const commandText = process.argv.slice(2).join(' ').trim();

if (!commandText) {
  console.error('Usage: node magic-tool.js "Magic.* keyword1 keyword2 ..."');
  process.exit(1);
}

try {
  const generated = generateFromMagicCommand(commandText);
  console.log(generated.join('\n'));
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
