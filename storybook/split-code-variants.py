#!/usr/bin/env python3
import re
import os
from pathlib import Path

# Read the large file
with open('.storybook/blocks/codeVariants.ts', 'r') as f:
    content = f.read()

# Categories for grouping components
categories = {
    'actions': ['button', 'buttonGroup', 'actionMenu', 'bulkActions', 'pageActions', 'link'],
    'forms': ['textField', 'select', 'checkbox', 'radioButton', 'checkboxGroup', 'optionList',
              'autocomplete', 'choiceList', 'colorPicker', 'combobox', 'datePicker', 'formLayout',
              'labelled', 'inlineError', 'rangeSlider', 'form', 'formPanel'],
    'navigation': ['navigation', 'tabs', 'breadcrumbs', 'topbar', 'pagination', 'fullscreenbar',
                   'contextualsavebar', 'frame'],
    'feedback': ['banner', 'toast', 'modal', 'sheet', 'popover', 'tooltip', 'calloutcard',
                 'emptystate', 'loading', 'progressbar', 'spinner', 'skeletonPage'],
    'dataDisplay': ['dataTable', 'descriptionList', 'exceptionList', 'indexTable', 'list',
                    'resourceItem', 'resourceList', 'badge', 'tag', 'avatar', 'icon', 'image'],
    'media': ['mediacard', 'thumbnail', 'videothumbnail'],
    'layout': ['alphastack', 'bleed', 'box', 'grid', 'inlinestack', 'verticalstack',
               'blockstack', 'layout', 'page', 'divider', 'textContainer', 'collapsible'],
    'charts': ['lineChart', 'barChart', 'pieChart', 'areaChart', 'scatterChart', 'waterfallChart'],
    'utilities': ['coreUtilities', 'dropzone', 'keyboardkey', 'text', 'truncate', 'scrollable',
                  'filters', 'indexFilters', 'appProvider', 'footerHelp', 'keypressListener',
                  'backdrop'],
    'patterns': ['ecommerceComponents', 'useCase', 'repository', 'domainModels', 'valueObjects',
                 'serviceLayer', 'eventBus'],
    'integration': ['basicComponents', 'productDashboard', 'orderProcessing', 'inventoryManagement',
                    'customerPortal', 'analyticsDashboard'],
    'theming': ['themeplayground', 'themedocumentation']
}

# Create reverse mapping
component_to_category = {}
for category, components in categories.items():
    for comp in components:
        component_to_category[comp.lower()] = category

# Find all exports
export_pattern = re.compile(r'^export const (\w+)Examples: Record<string, CodeVariant> = {', re.MULTILINE)
matches = list(export_pattern.finditer(content))

# Create output directory
output_dir = Path('.storybook/blocks/codeVariants')
output_dir.mkdir(exist_ok=True)

# Store exports for each category
category_exports = {cat: [] for cat in categories}
category_contents = {cat: [] for cat in categories}

# Add the import statement for each file
for cat in categories:
    category_contents[cat].append("import type { CodeVariant } from './types';\n\n")

# Process each export
for i, match in enumerate(matches):
    export_name = match.group(1)
    start = match.start()

    # Find the end of this export (start of next export or near end of file)
    if i < len(matches) - 1:
        end = matches[i + 1].start()
    else:
        # For the last export, find where the function starts
        func_pattern = re.search(r'\n\nexport function getCodeExample', content[start:])
        if func_pattern:
            end = start + func_pattern.start()
        else:
            end = len(content)

    export_content = content[start:end]

    # Determine category
    category = component_to_category.get(export_name.lower(), 'utilities')

    # Add to category
    category_contents[category].append(export_content)
    category_exports[category].append(f"{export_name}Examples")

# Write category files
for category, exports in category_exports.items():
    if exports:
        filename = output_dir / f"{category}.ts"
        with open(filename, 'w') as f:
            f.write(category_contents[category][0])  # Import statement
            f.write('\n'.join(category_contents[category][1:]))  # Exports
        print(f"Created {filename} with {len(exports)} exports")

# Create the getCodeExample function in a separate file
get_code_example_content = """import type { CodeVariant } from './types';

// Import all category modules
import * as actions from './actions';
import * as forms from './forms';
import * as navigation from './navigation';
import * as feedback from './feedback';
import * as dataDisplay from './dataDisplay';
import * as media from './media';
import * as layout from './layout';
import * as charts from './charts';
import * as utilities from './utilities';
import * as patterns from './patterns';
import * as integration from './integration';
import * as theming from './theming';

// Combine all examples
const allExamples = {
  ...actions,
  ...forms,
  ...navigation,
  ...feedback,
  ...dataDisplay,
  ...media,
  ...layout,
  ...charts,
  ...utilities,
  ...patterns,
  ...integration,
  ...theming,
};

export function getCodeExample(componentName: string, exampleName: string): CodeVariant | null {
  const examples: Record<string, Record<string, CodeVariant>> = {
"""

# Build the examples mapping
for category, exports in category_exports.items():
    if exports:
        for export_name in exports:
            component_name = export_name.replace('Examples', '')
            get_code_example_content += f"    {component_name.lower()}: allExamples.{export_name},\n"

get_code_example_content += """  };

  const componentExamples = examples[componentName.toLowerCase()];
  if (!componentExamples) {
    console.warn(`No code examples found for component: ${componentName}`);
    return null;
  }

  const example = componentExamples[exampleName];
  if (!example) {
    console.warn(`No example "${exampleName}" found for component: ${componentName}`);
    return null;
  }

  return example;
}
"""

# Write the getCodeExample function
with open(output_dir / 'getCodeExample.ts', 'w') as f:
    f.write(get_code_example_content)
print(f"Created getCodeExample.ts")

# Create the index file that re-exports everything
index_content = """// Re-export types
export type { CodeVariant } from './types';

// Re-export all component examples
export * from './actions';
export * from './forms';
export * from './navigation';
export * from './feedback';
export * from './dataDisplay';
export * from './media';
export * from './layout';
export * from './charts';
export * from './utilities';
export * from './patterns';
export * from './integration';
export * from './theming';

// Re-export the getCodeExample function
export { getCodeExample } from './getCodeExample';
"""

with open(output_dir / 'index.ts', 'w') as f:
    f.write(index_content)
print("Created index.ts")

print("\nAll files created successfully!")
print(f"Original file: {len(content)} characters")
print(f"Split into {len([e for e in category_exports.values() if e])} category files")