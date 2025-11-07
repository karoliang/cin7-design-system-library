#!/usr/bin/env python3
"""
Automated script to add codeVariants parameters to Storybook stories (v2).

Improved version using brace counting instead of regex for better handling
of nested structures.
"""

import os
import re
import sys
from pathlib import Path

# Component name to variant key mapping
COMPONENT_MAP = {
    'Avatar': 'avatar',
    'Badge': 'badge',
    'Banner': 'banner',
    'Button': 'button',
    'ButtonGroup': 'buttongroup',
    'CalloutCard': 'calloutcard',
    'Card': 'card',
    'Checkbox': 'checkbox',
    'ChoiceList': 'choicelist',
    'DatePicker': 'datepicker',
    'DropZone': 'dropzone',
    'Image': 'image',
    'KeyboardKey': 'keyboardkey',
    'List': 'list',
    'MediaCard': 'mediacard',
    'ResourceItem': 'resourceitem',
    'Tag': 'tag',
    'Thumbnail': 'thumbnail',
    'Tooltip': 'tooltip',
    'VideoThumbnail': 'videothumbnail',
}

def extract_component_name(file_path):
    """Extract component name from file path."""
    filename = os.path.basename(file_path)
    return filename.replace('.stories.tsx', '')

def has_meta_level_codevariants(content):
    """Check if the file has codeVariants at meta level."""
    meta_pattern = r'const meta\s*=\s*\{'
    meta_match = re.search(meta_pattern, content)
    if not meta_match:
        return False

    # Check within the meta object for codeVariants
    start = meta_match.end()
    brace_count = 1
    i = start

    while i < len(content) and brace_count > 0:
        if content[i] == '{':
            brace_count += 1
        elif content[i] == '}':
            brace_count -= 1
        i += 1

    meta_content = content[meta_match.start():i]
    return 'codeVariants' in meta_content

def find_story_blocks(content):
    """Find all story export blocks using brace counting."""
    stories = []

    # Find all story exports
    pattern = r'export const (\w+): Story = \{'

    for match in re.finditer(pattern, content):
        story_name = match.group(1)
        start_pos = match.start()
        brace_start = match.end() - 1  # Position of opening brace

        # Count braces to find the matching closing brace
        brace_count = 1
        i = brace_start + 1

        while i < len(content) and brace_count > 0:
            # Skip string literals to avoid counting braces in strings
            if content[i] in ['"', "'"]:
                quote = content[i]
                i += 1
                while i < len(content) and content[i] != quote:
                    if content[i] == '\\':
                        i += 2
                    else:
                        i += 1
                i += 1
                continue

            # Skip template literals
            if content[i] == '`':
                i += 1
                while i < len(content) and content[i] != '`':
                    if content[i] == '\\':
                        i += 2
                    else:
                        i += 1
                i += 1
                continue

            if content[i] == '{':
                brace_count += 1
            elif content[i] == '}':
                brace_count -= 1

            i += 1

        if brace_count == 0:
            end_pos = i  # Position after closing brace
            story_block = content[start_pos:end_pos]

            stories.append({
                'name': story_name,
                'start': start_pos,
                'end': end_pos,
                'block': story_block
            })

    return stories

def add_codevariants_to_story(story_block, component_key, variant='default'):
    """Add codeVariants parameter to a story block."""
    lines = story_block.split('\n')

    # Find the line with the final closing brace and semicolon
    for i in range(len(lines) - 1, -1, -1):
        stripped = lines[i].strip()
        if stripped == '};':
            # Check if the previous line already has parameters
            prev_line = lines[i-1].strip() if i > 0 else ''

            # Insert parameters object before the closing brace
            indent = '  '
            new_lines = lines[:i]

            # Check if there's already a parameters object by looking backwards
            has_params = False
            for j in range(i-1, -1, -1):
                if 'parameters:' in lines[j]:
                    has_params = True
                    break
                if lines[j].strip() and not lines[j].strip().endswith(','):
                    break

            if has_params:
                # Don't add - parameters already exist
                return story_block

            # Add comma to previous line if needed
            if new_lines and new_lines[-1].strip() and not new_lines[-1].rstrip().endswith(','):
                new_lines[-1] = new_lines[-1].rstrip() + ','

            new_lines.append(f'{indent}parameters: {{')
            new_lines.append(f'{indent}  codeVariants: getCodeVariants(\'{component_key}\', \'{variant}\'),')
            new_lines.append(f'{indent}}},')
            new_lines.extend(lines[i:])

            return '\n'.join(new_lines)

    return story_block

def process_file(file_path, dry_run=True):
    """Process a single story file."""
    print(f"\n{'='*80}")
    print(f"Processing: {os.path.basename(file_path)}")
    print(f"{'='*80}")

    with open(file_path, 'r') as f:
        content = f.read()

    # Check if getCodeVariants is imported
    if 'getCodeVariants' not in content:
        print("  ⚠️  Skipping: getCodeVariants not imported")
        return False

    # Check for meta-level codeVariants
    if has_meta_level_codevariants(content):
        print("  ℹ️  Skipping: Has meta-level codeVariants (stories inherit automatically)")
        return False

    # Extract component name
    component_name = extract_component_name(file_path)
    component_key = COMPONENT_MAP.get(component_name, component_name.lower())

    print(f"  Component: {component_name} → variant key: '{component_key}'")

    # Find all story blocks
    stories = find_story_blocks(content)

    # Filter stories that need codeVariants
    stories_needing_variants = []
    for story in stories:
        # Skip if already has codeVariants
        if 'codeVariants' in story['block']:
            continue

        # Only process stories with render function
        if 'render:' not in story['block']:
            continue

        stories_needing_variants.append(story)

    if not stories_needing_variants:
        print("  ✅ No stories need codeVariants added")
        return False

    print(f"  📝 Found {len(stories_needing_variants)} stories needing codeVariants:")
    for story in stories_needing_variants:
        print(f"     - {story['name']}")

    if dry_run:
        print("  🔍 DRY RUN - No changes made")
        return True

    # Process stories in reverse order to preserve positions
    modified_content = content

    for story in reversed(stories_needing_variants):
        original_block = story['block']
        modified_block = add_codevariants_to_story(original_block, component_key)

        modified_content = modified_content.replace(original_block, modified_block, 1)

    # Write the modified content
    with open(file_path, 'w') as f:
        f.write(modified_content)

    print(f"  ✅ Updated {len(stories_needing_variants)} stories")
    return True

def main():
    """Main function."""
    dry_run = '--dry-run' in sys.argv or '-n' in sys.argv

    # Base directory for stories
    base_dir = Path('/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/stories')

    # High priority files
    high_priority_files = [
        'components/media/MediaCard.stories.tsx',
        'components/forms/OptionList.stories.tsx',
        'components/data-display/List.stories.tsx',
        'components/feedback/Tooltip.stories.tsx',
        'components/forms/ChoiceList.stories.tsx',
        'components/utilities/Filters.stories.tsx',
        'components/actions/ButtonGroup.stories.tsx',
        'components/data-display/ResourceItem.stories.tsx',
        'components/feedback/CalloutCard.stories.tsx',
        'components/forms/DatePicker.stories.tsx',
        'components/utilities/KeyboardKey.stories.tsx',
        'components/media/Avatar.stories.tsx',
        'components/media/Image.stories.tsx',
        'components/media/Thumbnail.stories.tsx',
        'components/media/VideoThumbnail.stories.tsx',
        'components/utilities/DropZone.stories.tsx',
        'components/utilities/Tag.stories.tsx',
    ]

    print("=" * 80)
    print("STORYBOOK CODE VARIANTS AUTOMATION SCRIPT V2")
    print("=" * 80)
    print(f"Mode: {'DRY RUN (no changes)' if dry_run else 'LIVE (will modify files)'}")
    print(f"Processing {len(high_priority_files)} high-priority files")
    print()

    if not dry_run:
        response = input("⚠️  This will modify files. Continue? (yes/no): ")
        if response.lower() != 'yes':
            print("Aborted.")
            return

    modified_count = 0
    skipped_count = 0

    for relative_path in high_priority_files:
        file_path = base_dir / relative_path

        if not file_path.exists():
            print(f"\n❌ File not found: {relative_path}")
            continue

        if process_file(file_path, dry_run):
            modified_count += 1
        else:
            skipped_count += 1

    print("\n" + "=" * 80)
    print("SUMMARY")
    print("=" * 80)
    print(f"Files processed: {len(high_priority_files)}")
    print(f"Files modified: {modified_count}")
    print(f"Files skipped: {skipped_count}")

    if dry_run:
        print("\n💡 Run without --dry-run to apply changes")
    else:
        print("\n✅ Changes applied successfully!")

if __name__ == '__main__':
    main()
