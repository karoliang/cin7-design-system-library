#!/bin/bash
set -e  # Exit on any error
set -x  # Print commands as they execute

echo "=================================================="
echo "Starting Cin7 DSL Netlify Build"
echo "Node version: $(node --version)"
echo "NPM version: $(npm --version)"
echo "PNPM version: $(pnpm --version)"
echo "Working directory: $(pwd)"
echo "=================================================="

# Navigate to repository root
cd ../..
echo "✓ Navigated to repository root: $(pwd)"

# Install dependencies
echo "=================================================="
echo "Step 1: Installing dependencies..."
echo "=================================================="
pnpm install
echo "✓ Dependencies installed"

# Build @cin7/core
echo "=================================================="
echo "Step 2: Building @cin7/core..."
echo "=================================================="
cd packages/core
pnpm build
echo "✓ @cin7/core built successfully"

# Build @cin7/design-tokens
echo "=================================================="
echo "Step 3: Building @cin7/design-tokens..."
echo "=================================================="
cd ../design-tokens
pnpm build
echo "✓ @cin7/design-tokens built successfully"

# Build @shopify/polaris-tokens
echo "=================================================="
echo "Step 4: Building @shopify/polaris-tokens..."
echo "=================================================="
cd ../../polaris/polaris-tokens
pnpm build
echo "✓ @shopify/polaris-tokens built successfully"

# Build @shopify/polaris-icons
echo "=================================================="
echo "Step 5: Building @shopify/polaris-icons..."
echo "=================================================="
cd ../polaris-icons
pnpm build
echo "✓ @shopify/polaris-icons built successfully"

# Build @shopify/polaris (polaris-react)
echo "=================================================="
echo "Step 6: Building @shopify/polaris (polaris-react)..."
echo "=================================================="
cd ../polaris-react
pnpm build
echo "✓ @shopify/polaris built successfully"

# Build @cin7/ag-charts-adapter
echo "=================================================="
echo "Step 7: Building @cin7/ag-charts-adapter..."
echo "=================================================="
cd ../../packages/ag-charts-adapter
pnpm build
echo "✓ @cin7/ag-charts-adapter built successfully"

# Build Storybook
echo "=================================================="
echo "Step 8: Building Storybook..."
echo "=================================================="
cd ../../storybook
pnpm build
echo "✓ Storybook built successfully"

# Copy Storybook to docs site
echo "=================================================="
echo "Step 9: Copying Storybook to documentation site..."
echo "=================================================="
cd ../polaris/polaris.shopify.com
mkdir -p public/storybook
cp -r ../../storybook/storybook-static/* public/storybook/
echo "✓ Storybook copied to public/storybook/"

# Validate Storybook build synchronization
echo "=================================================="
echo "Step 9.5: Validating Storybook build synchronization..."
echo "=================================================="
if [ ! -f "public/storybook/iframe.html" ]; then
  echo "❌ CRITICAL: Storybook iframe.html missing!"
  exit 1
fi

# Check for iframe JavaScript file with proper hash
IFRAME_JS_FILE=$(find public/storybook/assets -name "iframe-*.js" | head -1)
if [ -z "$IFRAME_JS_FILE" ]; then
  echo "❌ CRITICAL: Storybook iframe JavaScript bundle missing!"
  exit 1
fi

echo "✅ Found iframe JavaScript: $(basename $IFRAME_JS_FILE)"

# Verify iframe.html references the correct JavaScript file
if grep -q "$(basename $IFRAME_JS_FILE)" public/storybook/iframe.html; then
  echo "✅ iframe.html references correct JavaScript bundle"
else
  echo "❌ CRITICAL: iframe.html does not reference $(basename $IFRAME_JS_FILE)!"
  exit 1
fi

echo "✅ Storybook build validation passed"

# Generate colors
echo "=================================================="
echo "Step 10: Generating colors..."
echo "=================================================="
pnpm gen-colors
echo "✓ Colors generated"

# Generate assets
echo "=================================================="
echo "Step 11: Generating assets..."
echo "=================================================="
pnpm gen-assets
echo "✓ Assets generated"

# Build Next.js site
echo "=================================================="
echo "Step 12: Building Next.js documentation site..."
echo "=================================================="
pnpm next-build
echo "✓ Next.js site built successfully"

echo "=================================================="
echo "✅ Build completed successfully!"
echo "=================================================="
