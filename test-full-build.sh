#!/bin/bash

# Comprehensive build test script that mimics Netlify's environment
set -e

echo "========================================="
echo "Full Build Test - Mimicking Netlify Build"
echo "========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Navigate to repository root
cd "$(dirname "$0")"

echo -e "${YELLOW}Step 1: Install root dependencies${NC}"
pnpm install

echo -e "${YELLOW}Step 2: Build polaris-tokens${NC}"
cd polaris/polaris-tokens
pnpm build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ polaris-tokens built successfully${NC}"
else
    echo -e "${RED}✗ polaris-tokens build failed${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 3: Build polaris-icons${NC}"
cd ../polaris-icons
pnpm build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ polaris-icons built successfully${NC}"
else
    echo -e "${RED}✗ polaris-icons build failed${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 4: Build polaris-react${NC}"
cd ../polaris-react
pnpm build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ polaris-react built successfully${NC}"
else
    echo -e "${RED}✗ polaris-react build failed${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 5: Generate assets for documentation site${NC}"
cd ../polaris.shopify.com
pnpm gen-colors
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Colors generated successfully${NC}"
else
    echo -e "${RED}✗ Color generation failed${NC}"
    exit 1
fi

pnpm gen-assets
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Assets generated successfully${NC}"
else
    echo -e "${RED}✗ Asset generation failed${NC}"
    exit 1
fi

echo -e "${YELLOW}Step 6: Build Next.js site${NC}"
pnpm next-build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Next.js build completed successfully${NC}"
else
    echo -e "${RED}✗ Next.js build failed${NC}"
    exit 1
fi

echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}✓ All builds completed successfully!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "The site should now be deployable to Netlify."