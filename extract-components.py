#!/usr/bin/env python3
"""
Extract Navigation & Actions component examples from docs codeVariants.ts
"""
import re
import json

# Components to extract with their line numbers
COMPONENTS = {
    'buttonGroup': 9,
    'tabs': 16629,
    'actionList': 24137,
    'navigation': 24611,
    'link': 25307,
    'pagination': 25437,
    'contextualSaveBar': 27587,
    'fullscreenBar': 28683,
    'topBar': 29876,
}

def extract_component_block(file_path, start_line, next_start_line=None):
    """Extract a component's examples block from the file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Start from the export line
    start_idx = start_line - 1

    # Find the end of this component's export
    # We'll look for the closing }; that matches the opening {
    brace_count = 0
    end_idx = start_idx
    started = False

    for i in range(start_idx, len(lines)):
        line = lines[i]

        # Count braces
        for char in line:
            if char == '{':
                brace_count += 1
                started = True
            elif char == '}':
                brace_count -= 1

        # If we've closed all braces and found the semicolon, we're done
        if started and brace_count == 0 and ';' in line:
            end_idx = i + 1
            break

        # Safety check - if we hit the next component, stop
        if next_start_line and i >= next_start_line - 2:
            end_idx = i
            break

    return ''.join(lines[start_idx:end_idx])

def main():
    docs_file = '/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/polaris/polaris.shopify.com/src/utils/codeVariants.ts'

    # Sort components by line number
    sorted_components = sorted(COMPONENTS.items(), key=lambda x: x[1])

    results = {}

    for i, (component_name, start_line) in enumerate(sorted_components):
        # Get the next component's start line for bounds checking
        next_start = sorted_components[i + 1][1] if i + 1 < len(sorted_components) else None

        print(f"Extracting {component_name}Examples (line {start_line})...")
        block = extract_component_block(docs_file, start_line, next_start)
        results[component_name] = block

    # Write results to a JSON file for easy processing
    output_file = '/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/extracted-components.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(results, f, indent=2)

    print(f"\nExtracted {len(results)} components to {output_file}")

    # Print stats
    for component_name, block in results.items():
        # Count variations
        variations = re.findall(r"^\s+['\"]([^'\"]+)['\"]:\s*{", block, re.MULTILINE)
        print(f"  {component_name}: {len(variations)} variations - {', '.join(variations[:5])}")

if __name__ == '__main__':
    main()
