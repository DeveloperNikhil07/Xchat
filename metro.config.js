// metro.config.js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Firebase v10+ + Expo compatibility fix
config.resolver.unstable_enablePackageExports = false;

module.exports = config;