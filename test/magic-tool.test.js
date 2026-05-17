const test = require('node:test');
const assert = require('node:assert/strict');

const {
  parseMagicCommand,
  createRandomizedInput,
  generateFromMagicCommand,
} = require('../lib/magic-tool');

test('parseMagicCommand extracts keywords after Magic.*', () => {
  const keywords = parseMagicCommand('Magic.* alpha beta,gamma');
  assert.deepEqual(keywords, ['alpha', 'beta', 'gamma']);
});

test('parseMagicCommand throws when prefix is missing', () => {
  assert.throws(
    () => parseMagicCommand('magic alpha beta'),
    /Command must start with "Magic\.\*"./,
  );
});

test('createRandomizedInput returns requested number of lines', () => {
  const lines = createRandomizedInput(['alpha', 'beta'], { count: 3, randomFn: () => 0 });
  assert.equal(lines.length, 3);
  assert.deepEqual(lines, [
    'build a adaptive alpha workflow',
    'build a adaptive alpha workflow',
    'build a adaptive alpha workflow',
  ]);
});

test('generateFromMagicCommand creates default randomized output', () => {
  const generated = generateFromMagicCommand('Magic.* zebra yak', { randomFn: () => 0.99 });
  assert.equal(generated.length, 5);
  generated.forEach((line) => {
    assert.match(line, /^compose a creative (zebra|yak) specification$/);
  });
});
