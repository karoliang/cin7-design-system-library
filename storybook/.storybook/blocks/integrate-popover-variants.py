#!/usr/bin/env python3
"""
Script to integrate Popover code variants into codeVariants.ts
This script safely adds all popover variants after the default variant.
"""

import re
import sys

def read_file(filepath):
    """Read file content"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    """Write content to file"""
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

def integrate_variants():
    """Main integration function"""

    # File paths
    main_file = 'codeVariants.ts'
    variants_part1 = 'popover-variants-addition.ts'
    variants_part2 = 'popover-variants-addition-part2.ts'

    print("Reading files...")

    # Read all files
    try:
        main_content = read_file(main_file)
        variants1_content = read_file(variants_part1)
        variants2_content = read_file(variants_part2)
    except FileNotFoundError as e:
        print(f"Error: {e}")
        return False

    # Extract variants from the addition files (skip the comment headers)
    # Part 1: starts after the comment block
    variants1_start = variants1_content.find('buttonActivator:')
    if variants1_start == -1:
        print("Error: Could not find buttonActivator in part 1")
        return False
    part1_variants = variants1_content[variants1_start:]

    # Part 2: starts after the comment block
    variants2_start = variants2_content.find('interactiveExamples:')
    if variants2_start == -1:
        print("Error: Could not find interactiveExamples in part 2")
        return False
    part2_variants = variants2_content[variants2_start:]

    # Find the location to insert (after the default variant in popoverExamples)
    # Look for the pattern: export default PopoverExample;`\n  }\n};
    pattern = r"(export default PopoverExample;`\n  }\n)(};)\n\n(// Tooltip Component Examples)"

    match = re.search(pattern, main_content)
    if not match:
        print("Error: Could not find the insertion point in codeVariants.ts")
        print("Looking for pattern after default popover variant...")
        return False

    # Construct the new content
    new_variants = f",\n\n  {part1_variants.rstrip()}\n\n  {part2_variants.rstrip()}\n"

    # Insert the new variants
    new_content = (
        main_content[:match.start(2)] +  # Everything before the closing }
        new_variants +  # New variants
        match.group(2) +  # The closing };
        "\n\n" +
        match.group(3)  # The Tooltip comment and rest of file
        + main_content[match.end(3):]
    )

    # Backup the original file
    backup_file = main_file + '.backup'
    print(f"Creating backup: {backup_file}")
    write_file(backup_file, main_content)

    # Write the new content
    print(f"Writing updated content to {main_file}")
    write_file(main_file, new_content)

    print("\n✅ Successfully integrated popover variants!")
    print(f"\nAdded variants:")
    print("  - buttonActivator")
    print("  - textLinkActivator")
    print("  - positions")
    print("  - withActionList")
    print("  - withSections")
    print("  - withForm")
    print("  - dismissible")
    print("  - customWidth")
    print("  - interactiveExamples")
    print("  - accessibility")
    print(f"\nBackup saved to: {backup_file}")
    print("\nNext steps:")
    print("1. Update Popover.stories.tsx with the new variant names")
    print("2. Test in Storybook: cd storybook && pnpm dev")
    print("3. If successful, delete the backup and temporary files")

    return True

if __name__ == '__main__':
    success = integrate_variants()
    sys.exit(0 if success else 1)
