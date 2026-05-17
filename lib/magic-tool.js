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

function createInstallManagerInput(keywords) {
  if (!Array.isArray(keywords) || keywords.length < 2) {
    throw new Error('Install manager command requires manager and package names.');
  }

  const manager = String(keywords[0]).toLowerCase();
  const command = String(keywords[1]).toLowerCase();

  if (command !== 'install') {
    throw new Error('Install manager command must use "install" as the second keyword.');
  }

  if (!['pm', 'bash'].includes(manager)) {
    throw new Error('Install manager keyword must be "pm" or "bash".');
  }

  const packages = keywords.slice(2);
  if (packages.length === 0) {
    throw new Error('Provide at least one package name after install manager command.');
  }

  const validNamePattern = /^[a-zA-Z0-9@._/-]+$/;
  const invalidPackage = packages.find((pkg) => !validNamePattern.test(pkg));
  if (invalidPackage) {
    throw new Error(`Invalid package name: "${invalidPackage}".`);
  }

  if (manager === 'pm') {
    return [`npm install ${packages.join(' ')}`];
  }

  return [
    'sudo apt-get update',
    `sudo apt-get install -y ${packages.join(' ')}`,
  ];
}

function generateFromMagicCommand(commandText, options = {}) {
  const keywords = parseMagicCommand(commandText);

  if (keywords.length >= 2) {
    const manager = String(keywords[0]).toLowerCase();
    const action = String(keywords[1]).toLowerCase();
    if (action === 'install' && (manager === 'pm' || manager === 'bash')) {
      return createInstallManagerInput(keywords);
    }
  }

  return createRandomizedInput(keywords, options);
}

module.exports = {
  parseMagicCommand,
  createRandomizedInput,
  createInstallManagerInput,
  generateFromMagicCommand,
};
