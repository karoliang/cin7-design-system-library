#!/bin/bash

# Test build script to simulate Netlify environment
set -e

echo "=== Testing Netlify build locally ==="
echo "Starting from: $(pwd)"

# Save current directory
ORIGINAL_DIR=$(pwd)

# Navigate to polaris.shopify.com (simulating Netlify's base setting)
cd polaris/polaris.shopify.com

echo "=== Current directory: $(pwd) ==="

# Execute the build command from netlify.toml
echo "=== Installing dependencies ==="
cd ../.. && pnpm install

echo "=== Building @shopify/polaris-tokens ==="
# First, let's check what packages exist
echo "Available packages:"
pnpm list --depth=0

# Try to build polaris-tokens specifically
cd polaris/polaris-tokens
if [ -f "package.json" ]; then
    echo "Building polaris-tokens..."
    pnpm build || echo "polaris-tokens build failed"
fi

# Go back to polaris.shopify.com
cd ../polaris.shopify.com

echo "=== Running gen-colors ==="
pnpm gen-colors

echo "=== Running gen-assets ==="
pnpm gen-assets

echo "=== Running next-build ==="
pnpm next-build

# Return to original directory
cd "$ORIGINAL_DIR"

echo "=== Build test complete ==="