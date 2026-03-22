const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const monorepoRoot = path.resolve(__dirname, '..');

const config = getDefaultConfig(__dirname);

// Watch the monorepo root so changes to the library are picked up
config.watchFolders = [monorepoRoot];

// Resolve modules from both the example and monorepo root node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(monorepoRoot, 'node_modules'),
];

module.exports = config;
