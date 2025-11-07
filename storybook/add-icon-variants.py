#!/usr/bin/env python3
"""
Script to add Icon component code variants to codeVariants.ts
This script inserts icon examples between avatarExamples and mediacardExamples
and adds icon mapping to the examples object.
"""

import re

# Path to the file
FILE_PATH = '.storybook/blocks/codeVariants.ts'

# Icon examples content (split into smaller chunks for readability due to size of code)
ICON_EXAMPLES_HEADER = """
// Icon Component Examples
export const iconExamples: Record<string, CodeVariant> = {
"""

# Read the current file
print("Reading codeVariants.ts...")
with open(FILE_PATH, 'r') as f:
    content = f.read()

# Check if icon examples already exist
if 'export const iconExamples' in content:
    print("Icon examples already exist in the file. Skipping...")
    exit(0)

# Find the insertion point (after avatarExamples closes, before mediacardExamples)
# Look for the pattern: }`\n  }\n};\n\n// MediaCard Component Examples
pattern = r'(`\n  }\n};\n\n)(// MediaCard Component Examples\nexport const mediacardExamples)'
match = re.search(pattern, content)

if not match:
    print("ERROR: Could not find insertion point in file")
    print("Looking for pattern between avatarExamples and mediacardExamples")
    # Try to show what's around line 15179
    lines = content.split('\n')
    if len(lines) > 15179:
        print("\nLines around 15179:")
        for i in range(max(0, 15175), min(len(lines), 15185)):
            print(f"{i+1}: {lines[i][:80]}")
    exit(1)

print(f"Found insertion point at position {match.start()}")

# Create icon examples content (abbreviated due to size - we'll use Edit tool after)
icon_content = ICON_EXAMPLES_HEADER + """  default: {
    react: `import { Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import React from 'react';

function IconExample() {
  return <Icon source={SearchIcon} accessibilityLabel="Search" />;
}

export default IconExample;`,

    vanilla: `<!-- HTML Structure -->
<svg class="polaris-icon" viewBox="0 0 20 20" focusable="false" aria-label="Search">
  <path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm9.707 4.293l-4.82-4.82A5.968 5.968 0 0 0 14 8 6 6 0 0 0 2 8a6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414z"></path>
</svg>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createIcon } from '@cin7/vanilla-js';

const icon = createIcon({
  name: 'search',
  accessibilityLabel: 'Search',
  size: 20
});

document.getElementById('icon-container').appendChild(icon);
</script>`,

    extjs: `// ExtJS Icon using icon fonts or iconCls
Ext.create('Ext.Component', {
  cls: 'polaris-icon',
  html: '<svg viewBox="0 0 20 20" focusable="false" aria-label="Search">' +
        '<path d="M8 12a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm9.707 4.293l-4.82-4.82A5.968 5.968 0 0 0 14 8 6 6 0 0 0 2 8a6 6 0 0 0 6 6 5.968 5.968 0 0 0 3.473-1.113l4.82 4.82a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414z"></path>' +
        '</svg>',
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisIcon } from '@cin7/extjs-adapters';

const icon = Ext.create('PolarisIcon', {
  iconName: 'search',
  accessibilityLabel: 'Search'
});`,

    typescript: `import { Icon } from '@shopify/polaris';
import { SearchIcon } from '@shopify/polaris-icons';
import React from 'react';

interface IconExampleProps {
  source: React.ComponentType;
  accessibilityLabel?: string;
  tone?: 'base' | 'subdued' | 'critical' | 'warning' | 'success' | 'info' | 'primary';
}

function IconExample({
  source,
  accessibilityLabel,
  tone = 'base'
}: IconExampleProps): JSX.Element {
  return (
    <Icon
      source={source}
      tone={tone}
      accessibilityLabel={accessibilityLabel}
    />
  );
}

export default IconExample;`
  }
};

"""

# Insert the icon examples
new_content = content[:match.start() + len(match.group(1))] + icon_content + match.group(2) + content[match.end():]

# Now find where to add the icon mapping in the examples object
# Look for the pattern in getCodeVariants function
mapping_pattern = r'(avatar: avatarExamples,\n)'
mapping_match = re.search(mapping_pattern, new_content)

if mapping_match:
    print(f"Found mapping insertion point at position {mapping_match.start()}")
    # Insert icon mapping after avatar mapping
    new_content = (new_content[:mapping_match.end()] +
                   "    icon: iconExamples,\n" +
                   new_content[mapping_match.end():])
    print("Added icon mapping to examples object")
else:
    print("WARNING: Could not find mapping insertion point. Manual addition may be needed.")

# Write the updated content
print("Writing updated file...")
with open(FILE_PATH, 'w') as f:
    f.write(new_content)

print("✓ Successfully added default icon example")
print("NOTE: Only the 'default' variant was added. You need to add the remaining 7 variants:")
print("  - tones")
print("  - commonIcons")
print("  - withText")
print("  - inButtons")
print("  - contactIcons")
print("  - interactiveIcons")
print("  - accessibilityExample")
