#!/bin/bash

# Cin7 DSL Full Build Test
# This script tests the entire build process including all packages

set -e

echo "🔧 Cin7 DSL Full Build Test"
echo "=========================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "packages" ]; then
    echo -e "${RED}❌ Error: Must run from project root${NC}"
    exit 1
fi

echo -e "${BLUE}📦 Installing dependencies...${NC}"
pnpm install --no-frozen-lockfile || true

echo -e "\n${BLUE}🏗️  Building packages...${NC}"

# Build each package in dependency order
packages=(
    "core"
    "design-tokens"
    "vanilla-js"
    "typescript-sdk"
    "polaris-adapter"
    "extjs-adapters"
    "cli"
)

for package in "${packages[@]}"; do
    echo -e "\n${YELLOW}Building @cin7/${package}...${NC}"
    if [ -d "packages/${package}" ]; then
        cd "packages/${package}"
        if [ -f "package.json" ]; then
            # Install local dependencies if needed
            pnpm install --no-frozen-lockfile || true
            
            # Run build
            pnpm build || {
                echo -e "${RED}❌ Build failed for @cin7/${package}${NC}"
                cd ../..
                continue
            }
            echo -e "${GREEN}✅ Successfully built @cin7/${package}${NC}"
        else
            echo -e "${RED}❌ No package.json found for @cin7/${package}${NC}"
        fi
        cd ../..
    else
        echo -e "${RED}❌ Package directory not found: packages/${package}${NC}"
    fi
done

echo -e "\n${BLUE}🎮 Building playground app...${NC}"
if [ -d "apps/playground" ]; then
    cd apps/playground
    pnpm install --no-frozen-lockfile || true
    pnpm build || echo -e "${YELLOW}⚠️  Playground build failed (non-critical)${NC}"
    cd ../..
else
    echo -e "${YELLOW}⚠️  Playground app not found${NC}"
fi

echo -e "\n${BLUE}📚 Building documentation site...${NC}"
if [ -d "polaris/polaris.shopify.com" ]; then
    cd polaris
    pnpm install || true
    cd polaris.shopify.com
    pnpm build || echo -e "${YELLOW}⚠️  Documentation build failed (non-critical)${NC}"
    cd ../..
else
    echo -e "${YELLOW}⚠️  Documentation site not found${NC}"
fi

echo -e "\n${GREEN}✨ Build test complete!${NC}"
echo -e "\n${BLUE}📋 Summary:${NC}"
echo "- Core packages: Check individual results above"
echo "- Playground app: Check result above"
echo "- Documentation: Check result above"

# Check if any dist folders were created
echo -e "\n${BLUE}📁 Build outputs:${NC}"
for package in "${packages[@]}"; do
    if [ -d "packages/${package}/dist" ]; then
        echo -e "${GREEN}✓${NC} packages/${package}/dist"
    else
        echo -e "${RED}✗${NC} packages/${package}/dist (missing)"
    fi
done

echo -e "\n${BLUE}🚀 Next steps:${NC}"
echo "1. Review any build errors above"
echo "2. Fix any missing dependencies"
echo "3. Re-enable Netlify auto-deployment"
echo "4. Push to GitHub for release"