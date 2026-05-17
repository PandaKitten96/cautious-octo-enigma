function parseMagicCommand(commandText) {
  if (typeof commandText !== 'string') {
    throw new TypeError('Magic command must be a string.');
  }

  const trimmed = commandText.trim();
  const match = trimmed.match(/^Magic\.\*\s*(.*)$/i);

  if (!match) {
    throw new Error('Command must start with "Magic.*".');
  }

  const keywordText = match[1].trim();
  if (!keywordText) {
    throw new Error('Provide at least one keyword after "Magic.*".');
  }

  return keywordText
    .split(/[\s,]+/)
    .map((keyword) => keyword.trim())
    .filter(Boolean);
}

function createRandomizedInput(keywords, options = {}) {
  if (!Array.isArray(keywords) || keywords.length === 0) {
    throw new Error('Keywords array must contain at least one keyword.');
  }

  const count = Number.isInteger(options.count) && options.count > 0 ? options.count : 5;
  const randomFn = typeof options.randomFn === 'function' ? options.randomFn : Math.random;

  const actions = ['build', 'draft', 'prototype', 'simulate', 'compose'];
  const styles = ['adaptive', 'dynamic', 'modular', 'scalable', 'creative'];
  const contexts = ['workflow', 'prompt', 'dataset', 'scenario', 'specification'];

  const generated = [];
  for (let index = 0; index < count; index += 1) {
    const keyword = keywords[Math.floor(randomFn() * keywords.length)];
    const action = actions[Math.floor(randomFn() * actions.length)];
    const style = styles[Math.floor(randomFn() * styles.length)];
    const context = contexts[Math.floor(randomFn() * contexts.length)];

    generated.push(`${action} a ${style} ${keyword} ${context}`);
  }

  return generated;
}

function generateFromMagicCommand(commandText, options = {}) {
  const keywords = parseMagicCommand(commandText);
  return createRandomizedInput(keywords, options);
}

module.exports = {
  parseMagicCommand,
  createRandomizedInput,
  generateFromMagicCommand,
};
