#!/bin/bash
set -e  # Exit on any error

echo "=================================================="
echo "🚀 Optimized Cin7 DSL Netlify Build (v2.0)"
echo "Node version: $(node --version)"
echo "PNPM version: $(pnpm --version)"
echo "Working directory: $(pwd)"
echo "Build started: $(date)"
echo "=================================================="

# Navigate to repository root
cd ../..
echo "✓ Navigated to repository root: $(pwd)"

# Enable pnpm aggressive caching
export PNPM_STORE_DIR="/opt/buildhome/.pnpm-store"
export PNPM_CACHE_DIR="/opt/buildhome/.pnpm-cache"

# Step 1: Install dependencies with caching
echo "=================================================="
echo "Step 1: Installing dependencies with cache optimization..."
echo "=================================================="
# Use pnpm's built-in caching and only install if lockfile changed
if [ ! -d "node_modules" ] || [ "package.json" -nt "node_modules/.lastinstall" ]; then
  echo "📦 Installing dependencies (cache miss)..."
  pnpm install --frozen-lockfile --prefer-offline

  # Mark successful install
  touch node_modules/.lastinstall
  echo "✓ Dependencies installed and cached"
else
  echo "✓ Dependencies already cached, skipping install"
fi

# Step 2: Build packages in parallel where possible
echo "=================================================="
echo "Step 2: Building packages in parallel..."
echo "=================================================="

# Build core packages first (these have no internal dependencies)
echo "🔨 Building core packages..."

# Function to build with caching
build_with_cache() {
  local pkg_path="$1"
  local pkg_name="$2"
  local cache_marker="$pkg_path/.lastbuild"

  echo "Building $pkg_name..."

  # Check if we need to rebuild
  if [ ! -f "$cache_marker" ] || [ "$pkg_path/package.json" -nt "$cache_marker" ] || [ "$pkg_path/src" -nt "$cache_marker" ]; then
    cd "$pkg_path"
    pnpm build
    touch "$cache_marker"
    echo "✓ $pkg_name built and cached"
    cd ../..
  else
    echo "✓ $pkg_name already cached, skipping build"
  fi
}

# Build core packages
build_with_cache "packages/core" "@cin7/core" &
build_with_cache "packages/design-tokens" "@cin7/design-tokens" &
wait

# Build Polaris packages (these depend on core)
echo "🎨 Building Polaris packages..."
build_with_cache "polaris/polaris-tokens" "@shopify/polaris-tokens" &
build_with_cache "polaris/polaris-icons" "@shopify/polaris-icons" &
wait

# Build @shopify/polaris (largest package)
build_with_cache "polaris/polaris-react" "@shopify/polaris"

# Build adapter packages
echo "🔧 Building adapter packages..."
build_with_cache "packages/highcharts-adapter" "@cin7/highcharts-adapter"

# Step 3: Optimized Storybook build
echo "=================================================="
echo "Step 3: Building Storybook with optimization..."
echo "=================================================="
cd storybook

# Check if Storybook needs rebuild
STORYBOOK_CACHE="storybook-static/.lastbuild"
if [ ! -f "$STORYBOOK_CACHE" ] || \
   [ "../../storybook/stories" -nt "$STORYBOOK_CACHE" ] || \
   [ "../../storybook/.storybook" -nt "$STORYBOOK_CACHE" ] || \
   [ "../../packages" -nt "$STORYBOOK_CACHE" ]; then

  echo "📚 Storybook rebuild needed..."

  # Use Storybook's built-in optimization
  STORYBOOK_DISABLE_TELEMETRY=1 pnpm build

  # Mark successful build
  touch "$STORYBOOK_CACHE"
  echo "✓ Storybook built and cached"
else
  echo "✓ Storybook already cached, skipping build"
fi

cd ..

# Step 4: Copy Storybook to docs site (only if changed)
echo "=================================================="
echo "Step 4: Syncing Storybook to documentation site..."
echo "=================================================="
cd polaris/polaris.shopify.com

# Check if we need to copy Storybook
STORYBOOK_SOURCE="../../storybook/storybook-static"
STORYBOOK_TARGET="public/storybook"
NEED_COPY=false

if [ ! -d "$STORYBOOK_TARGET" ] || [ "$STORYBOOK_SOURCE" -nt "$STORYBOOK_TARGET" ]; then
  NEED_COPY=true
fi

if [ "$NEED_COPY" = true ]; then
  echo "📋 Copying Storybook to documentation site..."

  # Use rsync for efficient copying (only copy changed files)
  mkdir -p "$STORYBOOK_TARGET"
  rsync -av --delete "$STORYBOOK_SOURCE/" "$STORYBOOK_TARGET/"

  # Update copy timestamp
  touch "$STORYBOOK_TARGET/.lastsync"
  echo "✓ Storybook synced efficiently"
else
  echo "✓ Storybook already synced, skipping copy"
fi

# Step 5: Validate Storybook build (quick check)
echo "=================================================="
echo "Step 5: Quick Storybook validation..."
echo "=================================================="
if [ ! -f "public/storybook/iframe.html" ]; then
  echo "❌ CRITICAL: Storybook iframe.html missing!"
  exit 1
fi

# Quick validation of key files
IFRAME_JS_COUNT=$(find public/storybook/assets -name "iframe-*.js" | wc -l)
if [ "$IFRAME_JS_COUNT" -eq 0 ]; then
  echo "❌ CRITICAL: Storybook iframe JavaScript bundle missing!"
  exit 1
fi

echo "✅ Storybook validation passed ($IFRAME_JS_COUNT iframe bundles found)"

# Step 6: Generate assets (only if needed)
echo "=================================================="
echo "Step 6: Generating documentation assets..."
echo "=================================================="

# Check if colors/assets need regeneration
COLORS_CACHE=".lastcolors"
ASSETS_CACHE=".lastassets"

if [ ! -f "$COLORS_CACHE" ] || [ "tokens/imports.json" -nt "$COLORS_CACHE" ]; then
  echo "🎨 Generating colors..."
  pnpm gen-colors
  touch "$COLORS_CACHE"
  echo "✓ Colors generated"
else
  echo "✓ Colors already cached"
fi

if [ ! -f "$ASSETS_CACHE" ] || [ "styles/tokens.css" -nt "$ASSETS_CACHE" ]; then
  echo "🖼️ Generating assets..."
  pnpm gen-assets
  touch "$ASSETS_CACHE"
  echo "✓ Assets generated"
else
  echo "✓ Assets already cached"
fi

# Step 7: Optimized Next.js build
echo "=================================================="
echo "Step 7: Building Next.js site with optimization..."
echo "=================================================="

# Check if Next.js needs rebuild
NEXT_CACHE=".next/BUILD_ID"
NEED_NEXT_BUILD=false

if [ ! -f "$NEXT_CACHE" ] || \
   [ "app" -nt "$NEXT_CACHE" ] || \
   [ "pages" -nt "$NEXT_CACHE" ] || \
   [ "public/storybook" -nt "$NEXT_CACHE" ] || \
   [ ".next" -nt "$NEXT_CACHE" ]; then
  NEED_NEXT_BUILD=true
fi

if [ "$NEED_NEXT_BUILD" = true ]; then
  echo "⚡ Next.js rebuild needed..."

  # Use Next.js optimization flags
  NODE_OPTIONS="--max-old-space-size=4096" \
  NEXT_TELEMETRY_DISABLED=1 \
  pnpm next-build

  echo "✓ Next.js site built and optimized"
else
  echo "✓ Next.js site already cached, skipping build"
fi

echo "=================================================="
echo "🎉 Optimized build completed successfully!"
echo "Build completed: $(date)"
echo "Total build time optimized with intelligent caching"
echo "=================================================="

# Optional: Show cache statistics
echo "📊 Cache Statistics:"
echo "Dependencies: $(du -sh node_modules 2>/dev/null || echo "N/A")"
echo "Storybook: $(du -sh storybook/storybook-static 2>/dev/null || echo "N/A")"
echo "Next.js: $(du -sh .next 2>/dev/null || echo "N/A")"