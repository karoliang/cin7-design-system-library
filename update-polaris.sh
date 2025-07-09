#!/bin/bash

# Script to update Polaris from upstream and apply patches

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=========================================${NC}"
echo -e "${BLUE}Polaris Update Process${NC}"
echo -e "${BLUE}=========================================${NC}"

# Check if we have uncommitted changes
if ! git diff-index --quiet HEAD --; then
    echo -e "${RED}✗ You have uncommitted changes. Please commit or stash them first.${NC}"
    exit 1
fi

# Navigate to polaris directory
cd "$(dirname "$0")/polaris"

# Set up upstream if needed
if ! git remote | grep -q "upstream"; then
    echo -e "${YELLOW}Setting up upstream remote...${NC}"
    git remote add upstream https://github.com/Shopify/polaris.git
fi

# Fetch latest
echo -e "${YELLOW}Fetching latest from upstream...${NC}"
git fetch upstream main

# Create update branch
UPDATE_BRANCH="update-polaris-$(date +%Y%m%d-%H%M%S)"
echo -e "${YELLOW}Creating update branch: $UPDATE_BRANCH${NC}"
git checkout -b $UPDATE_BRANCH

# Merge upstream
echo -e "${YELLOW}Merging upstream changes...${NC}"
if git merge upstream/main -m "Merge upstream Polaris updates"; then
    echo -e "${GREEN}✓ Merge successful${NC}"
else
    echo -e "${RED}✗ Merge conflicts detected${NC}"
    echo -e "${YELLOW}Please resolve conflicts manually, then run:${NC}"
    echo -e "${BLUE}git add -A && git commit${NC}"
    echo -e "${BLUE}Then continue with applying patches${NC}"
    exit 1
fi

# Apply patches
echo -e "${YELLOW}Applying custom patches...${NC}"
cd ..

for patch in patches/*.patch; do
    if [ -f "$patch" ]; then
        echo -e "${BLUE}Applying $(basename $patch)...${NC}"
        if git apply --check "$patch" 2>/dev/null; then
            git apply "$patch"
            echo -e "${GREEN}✓ Applied successfully${NC}"
        else
            echo -e "${YELLOW}⚠ Patch may already be applied or needs updating${NC}"
        fi
    fi
done

# Run tests
echo -e "${YELLOW}Running build tests...${NC}"
if ./test-full-build.sh; then
    echo -e "${GREEN}✓ All tests passed${NC}"
    
    echo -e "\n${BLUE}=========================================${NC}"
    echo -e "${GREEN}Update complete!${NC}"
    echo -e "${BLUE}=========================================${NC}"
    echo -e "\nNext steps:"
    echo -e "1. Review changes: ${BLUE}git diff main${NC}"
    echo -e "2. Commit patches: ${BLUE}git add -A && git commit -m 'Apply patches after update'${NC}"
    echo -e "3. Push branch: ${BLUE}git push origin $UPDATE_BRANCH${NC}"
    echo -e "4. Create PR or merge to main"
else
    echo -e "${RED}✗ Tests failed${NC}"
    echo -e "${YELLOW}Please fix any issues before proceeding${NC}"
    exit 1
fi