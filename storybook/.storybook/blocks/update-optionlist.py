#!/usr/bin/env python3
"""
Script to update the optionListExamples in codeVariants.ts with comprehensive variants for all 14 story variations.
"""

import os
import sys

# Path to the main file
MAIN_FILE = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/codeVariants.ts"

# Path to the temporary files with the new content
PART1_FILE = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/optionlist-variants-temp.ts"
PART2_FILE = "/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/.storybook/blocks/optionlist-variants-part2-temp.txt"

def main():
    print("Reading main file...")
    with open(MAIN_FILE, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Find start and end lines
    start_line = None
    end_line = None

    for i, line in enumerate(lines):
        if line.strip() == "// OptionList Component Examples":
            start_line = i
        elif start_line is not None and line.strip().startswith("// FooterHelp Component Examples"):
            end_line = i
            break

    if start_line is None or end_line is None:
        print(f"Error: Could not find section boundaries. start={start_line}, end={end_line}")
        sys.exit(1)

    print(f"Found section from line {start_line+1} to {end_line}")

    # Read the new content from temp files
    print("Reading new content...")
    with open(PART1_FILE, 'r', encoding='utf-8') as f:
        part1_content = f.read()

    with open(PART2_FILE, 'r', encoding='utf-8') as f:
        part2_content = f.read()

    # Combine the content (part1 already has the opening, part2 has the additional variants)
    # We need to insert part2 content before the closing }; of part1
    # Find the last }; in part1
    last_brace_pos = part1_content.rfind('};')
    if last_brace_pos == -1:
        print("Error: Could not find closing brace in part1")
        sys.exit(1)

    # Insert part2 before the closing brace (with proper indentation)
    new_content = part1_content[:last_brace_pos] + ",\n" + part2_content + "\n" + part1_content[last_brace_pos:]

    # Create the replacement content
    replacement_lines = new_content.split('\n')
    replacement_lines = [line + '\n' for line in replacement_lines]

    # Add blank line after
    replacement_lines.append('\n')

    # Build the new file content
    new_lines = lines[:start_line] + replacement_lines + lines[end_line:]

    # Write back
    print("Writing updated file...")
    with open(MAIN_FILE, 'w', encoding='utf-8') as f:
        f.writelines(new_lines)

    print(f"✓ Successfully updated {MAIN_FILE}")
    print(f"  Replaced {end_line - start_line} lines with {len(replacement_lines)} lines")

if __name__ == "__main__":
    main()
