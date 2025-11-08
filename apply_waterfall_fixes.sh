#!/bin/bash
# Apply all 4 waterfall chart TypeScript fixes

python3 << 'EOFPYTHON'
import sys

file_path = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts"

# Read file
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

print(f"File size: {len(content)} bytes")
print("This script will show the locations but NOT apply changes")
print("Use the chart-variants-typescript-fixes.md file for manual application")

# Find locations
locs = []
locs.append(("WaterfallChart default", content.find("export const waterfallChartExamples")))
locs.append(("WaterfallChart profitloss", content.find("profitloss: {", locs[0][1])))
locs.append(("WaterfallChart cashflow", content.find("cashflow: {", locs[0][1])))
locs.append(("WaterfallChart productcomparison", content.find("productcomparison: {", locs[0][1])))

for name, pos in locs:
    print(f"{name}: position {pos}")

print("\nAll comprehensive TypeScript fixes are available in:")
print("  chart-variants-typescript-fixes.md")
EOFPYTHON
