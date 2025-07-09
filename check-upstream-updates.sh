#!/bin/bash

# Script to check for updates from upstream Shopify Polaris repository

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}Checking for Polaris Updates${NC}"
echo -e "${BLUE}=========================================${NC}"

# Navigate to polaris directory
cd "$(dirname "$0")/polaris"

# Check if upstream remote exists
if ! git remote | grep -q "upstream"; then
    echo -e "${YELLOW}Setting up upstream remote...${NC}"
    git remote add upstream https://github.com/Shopify/polaris.git
    echo -e "${GREEN}✓ Upstream remote added${NC}"
fi

# Fetch latest from upstream
echo -e "${YELLOW}Fetching latest from upstream...${NC}"
git fetch upstream main --tags

# Get current commit
CURRENT_COMMIT=$(git rev-parse HEAD)
echo -e "${BLUE}Current commit: ${CURRENT_COMMIT:0:7}${NC}"

# Get latest upstream commit
UPSTREAM_COMMIT=$(git rev-parse upstream/main)
echo -e "${BLUE}Latest upstream: ${UPSTREAM_COMMIT:0:7}${NC}"

# Check if we're behind
if [ "$CURRENT_COMMIT" = "$UPSTREAM_COMMIT" ]; then
    echo -e "${GREEN}✓ Already up to date with upstream${NC}"
else
    echo -e "${YELLOW}⚠ Updates available from upstream${NC}"
    
    # Show commit difference
    echo -e "\n${BLUE}Commits behind upstream:${NC}"
    BEHIND_COUNT=$(git rev-list --count HEAD..upstream/main)
    echo -e "${YELLOW}$BEHIND_COUNT commits behind${NC}"
    
    # Show recent upstream commits
    echo -e "\n${BLUE}Recent upstream commits:${NC}"
    git log --oneline -10 upstream/main
    
    # Check for new releases
    echo -e "\n${BLUE}Latest releases:${NC}"
    git tag -l --sort=-version:refname | head -5
fi

echo -e "\n${BLUE}=========================================${NC}"
echo -e "${BLUE}Options:${NC}"
echo -e "1. To view detailed changes: git log HEAD..upstream/main"
echo -e "2. To create update branch: git checkout -b update-polaris-\$(date +%Y%m%d)"
echo -e "3. To merge updates: git merge upstream/main"
echo -e "${BLUE}=========================================${NC}"