#!/bin/bash
# 🚨 EMERGENCY PRODUCTION BUILD - FRAME BREADCRUMBS TEMPLATE LITERAL FIX
# Deploy Date: 2025-11-10T11:30:00Z
# Purpose: Force production to serve new bundles with all fixes

set -e

echo "🚨 EMERGENCY PRODUCTION BUILD STARTING 🚨"
echo "Purpose: Frame Breadcrumbs Template Literal Production Fix"
echo "Deploy ID: EMERGENCY-PRODUCTION-1754822400000-FRAME-BREADCRUMBS-TEMPLATE-FIX"

# 1. Clean all caches and build artifacts
echo "🧹 Cleaning all caches and build artifacts..."
rm -rf node_modules/.cache
rm -rf storybook/storybook-static
rm -rf storybook/.storybook/output
rm -rf polaris/polaris.shopify.com/.next
rm -rf polaris/polaris.shopify.com/out
rm -rf .next

# 2. Clean npm cache
npm cache clean --force

# 3. Install dependencies fresh
echo "📦 Installing fresh dependencies..."
if [ -f "pnpm-lock.yaml" ]; then
  pnpm install --frozen-lockfile --prefer-offline
else
  echo "🔄 Generating fresh pnpm-lock.yaml..."
  pnpm install
fi

# 4. Build Storybook with cache breaking
echo "📚 Building Storybook with emergency cache breaking..."
cd storybook
pnpm build
echo "✅ Storybook build completed"

# 5. Build documentation site
echo "📖 Building documentation site..."
cd ../polaris/polaris.shopify.com
pnpm build
echo "✅ Documentation build completed"

# 6. Verify build output
echo "🔍 Verifying build output..."
if [ -d "../storybook/storybook-static" ]; then
  echo "✅ Storybook build artifacts found"
  ls -la ../storybook/storybook-static/assets/ | head -10
else
  echo "❌ Storybook build artifacts missing"
  exit 1
fi

if [ -d ".next" ]; then
  echo "✅ Documentation build artifacts found"
else
  echo "❌ Documentation build artifacts missing"
  exit 1
fi

# 7. Copy Storybook to docs site
echo "📋 Copying Storybook to documentation site..."
rm -rf public/storybook
mkdir -p public/storybook
cp -r ../../storybook/storybook-static/* public/storybook/
echo "✅ Storybook copied to documentation site"

# 8. Create deployment marker
echo "🏷️ Creating deployment marker..."
echo "EMERGENCY-PRODUCTION-1754822400000-FRAME-BREADCRUMBS-TEMPLATE-FIX" > public/storybook/deployment-marker.txt
echo "Build Date: $(date)" >> public/storybook/deployment-marker.txt
echo "Purpose: Frame Breadcrumbs Template Literal Production Fix" >> public/storybook/deployment-marker.txt

echo "🚀 EMERGENCY PRODUCTION BUILD COMPLETED 🚀"
echo "Deployment ID: EMERGENCY-PRODUCTION-1754822400000-FRAME-BREADCRUMBS-TEMPLATE-FIX"
echo "Ready for Netlify deployment with maximum cache breaking"