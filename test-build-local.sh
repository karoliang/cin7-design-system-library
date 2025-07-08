#!/bin/bash

# Local build test script to replicate Netlify build process
set -e

echo "Starting local build test..."

# Navigate to repository root
cd "$(dirname "$0")"

# Install dependencies
echo "Installing dependencies..."
pnpm install

# Build polaris-tokens
echo "Building polaris-tokens..."
cd polaris/polaris-tokens
pnpm build

# Build polaris-icons
echo "Building polaris-icons..."
cd ../polaris-icons
pnpm build

# Build polaris-react (this is where the error occurs)
echo "Building polaris-react..."
cd ../polaris-react
pnpm build

# If we get here, continue with the site build
echo "Building polaris.shopify.com..."
cd ../polaris.shopify.com
pnpm gen-colors
pnpm gen-assets
pnpm next-build

echo "Build completed successfully!"