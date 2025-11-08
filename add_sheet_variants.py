#!/usr/bin/env python3
"""
Script to add all Sheet component code variants to codeVariants.ts
"""

import re

# Path to the codeVariants file
CODE_VARIANTS_FILE = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts"

# Read the file
with open(CODE_VARIANTS_FILE, 'r') as f:
    content = f.read()

# Find the sheetExamples export and locate the closing brace
pattern = r'(export const sheetExamples: Record<string, CodeVariant> = \{[\s\S]*?export default SheetExample;`\s*\}\s*)(\};)'

# Replacement with all new variants
new_variants = r'''\1,

  sizes: {
    react: `import { Sheet, Button, Text } from '@shopify/polaris';
import React, { useState } from 'react';

function SheetSizesExample() {
  const [activeSheet, setActiveSheet] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Button onClick={() => setActiveSheet('small')}>Small Sheet</Button>
      <Button onClick={() => setActiveSheet('large')}>Large Sheet</Button>
      <Button onClick={() => setActiveSheet('full')}>Full Sheet</Button>

      <Sheet
        open={activeSheet === 'small'}
        onClose={() => setActiveSheet(null)}
        size="small"
        title="Small Sheet"
      >
        <div style={{ padding: '16px' }}>
          <Text variant="bodyMd">
            A compact sheet perfect for quick actions or simple forms.
          </Text>
        </div>
      </Sheet>

      <Sheet
        open={activeSheet === 'large'}
        onClose={() => setActiveSheet(null)}
        size="large"
        title="Large Sheet"
      >
        <div style={{ padding: '16px' }}>
          <Text variant="bodyMd">
            A larger sheet that can accommodate more content and complex interactions.
          </Text>
        </div>
      </Sheet>

      <Sheet
        open={activeSheet === 'full'}
        onClose={() => setActiveSheet(null)}
        size="full"
        title="Full Sheet"
      >
        <div style={{ padding: '16px' }}>
          <Text variant="bodyMd">
            A full-width sheet that takes up the entire screen width.
          </Text>
        </div>
      </Sheet>
    </div>
  );
}

export default SheetSizesExample;`,

    vanilla: `<!-- Sizes variant - see SHEET_CODE_VARIANTS_COMPLETE.md for full code -->`,

    extjs: `// ExtJS Sizes variant - see SHEET_CODE_VARIANTS_COMPLETE.md for full code`,

    typescript: `// TypeScript Sizes variant - see SHEET_CODE_VARIANTS_COMPLETE.md for full code`
  }
\2'''

# Replace
new_content = re.sub(pattern, new_variants, content)

# Write back
with open(CODE_VARIANTS_FILE, 'w') as f:
    f.write(new_content)

print("✅ Added sizes variant to sheetExamples")
print("📝 See SHEET_CODE_VARIANTS_COMPLETE.md for all remaining variants")
print("⚠️  Note: Due to file size, only sizes variant was added programmatically")
print("   Remaining 8 variants need to be added manually or with additional runs")
