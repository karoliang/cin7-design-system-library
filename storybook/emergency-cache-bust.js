// Emergency cache busting script
// Force complete bundle invalidation with unique timestamp

const fs = require('fs');
const path = require('path');

// Create unique cache-busting identifier
const CACHE_BUST_ID = `NUCLEAR-${Date.now()}-${Math.random().toString(36).substring(7)}`;

// Update package.json to force bundle rebuild
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add cache-busting version
packageJson.version = `0.1.0-${CACHE_BUST_ID}`;
packageJson.cacheBust = CACHE_BUST_ID;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log(`💥 NUCLEAR CACHE BUST ID: ${CACHE_BUST_ID}`);
console.log('🔥 All bundles will be invalidated');