#!/usr/bin/env python3
"""
Automated script to add codeVariants parameters to Storybook stories.

This script:
1. Scans .stories.tsx files for stories missing codeVariants
2. Adds parameters: { codeVariants: getCodeVariants(...) }
3. Maps component names to their lowercase variant keys
4. Skips files with meta-level codeVariants (already inherited)
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
    'Card': 'card',
    'Checkbox': 'checkbox',
    'ChoiceList': 'choicelist',
    'Collapsible': 'collapsible',
    'DataTable': 'datatable',
    'DatePicker': 'datepicker',
    'DescriptionList': 'descriptionlist',
    'Divider': 'divider',
    'DropZone': 'dropzone',
    'EmptyState': 'emptystate',
    'Filters': 'filters',
    'FooterHelp': 'footerhelp',
    'FormLayout': 'formlayout',
    'Image': 'image',
    'IndexTable': 'indextable',
    'InlineError': 'inlineerror',
    'KeyboardKey': 'keyboardkey',
    'Layout': 'layout',
    'Link': 'link',
    'List': 'list',
    'MediaCard': 'mediacard',
    'Modal': 'modal',
    'OptionList': 'optionlist',
    'Page': 'page',
    'PageActions': 'pageactions',
    'Pagination': 'pagination',
    'Popover': 'popover',
    'ProgressBar': 'progressbar',
    'RadioButton': 'radiobutton',
    'RangeSlider': 'rangeslider',
    'ResourceItem': 'resourceitem',
    'ResourceList': 'resourcelist',
    'ScrollableContainer': 'scrollablecontainer',
    'Select': 'select',
    'SettingToggle': 'settingtoggle',
    'SkeletonBodyText': 'skeletonbodytext',
    'SkeletonDisplayText': 'skeletondisplaytext',
    'SkeletonPage': 'skeletonpage',
    'Spinner': 'spinner',
    'Stack': 'stack',
    'Tag': 'tag',
    'Text': 'text',
    'TextField': 'textfield',
    'Thumbnail': 'thumbnail',
    'Toast': 'toast',
    'Tooltip': 'tooltip',
    'VideoThumbnail': 'videothumbnail',
}

def extract_component_name(file_path):
    """Extract component name from file path."""
    filename = os.path.basename(file_path)
    # Remove .stories.tsx
    return filename.replace('.stories.tsx', '')

def has_meta_level_codevariants(content):
    """Check if the file has codeVariants at meta level."""
    # Look for codeVariants in the meta object
    meta_pattern = r'const meta\s*=\s*\{[^}]*parameters:\s*\{[^}]*codeVariants:'
    return bool(re.search(meta_pattern, content, re.DOTALL))

def find_stories_needing_variants(content):
    """Find stories that need codeVariants added."""
    stories = []

    # Find all story exports
    story_pattern = r'export const (\w+): Story = \{([^}]*(?:\{[^}]*\}[^}]*)*)\};'

    for match in re.finditer(story_pattern, content, re.DOTALL):
        story_name = match.group(1)
        story_content = match.group(2)

        # Skip if already has codeVariants
        if 'codeVariants' in story_content:
            continue

        # Skip if story has args (not render function)
        if re.search(r'^\s*args:', story_content, re.MULTILINE):
            continue

        # Only process stories with render function
        if 'render:' in story_content:
            stories.append({
                'name': story_name,
                'full_match': match.group(0),
                'start': match.start(),
                'end': match.end()
            })

    return stories

def add_codevariants_to_story(story_export, component_key, variant='default'):
    """Add codeVariants parameter to a story export."""
    # Find the closing brace
    lines = story_export.split('\n')

    # Find the last line with };
    for i in range(len(lines) - 1, -1, -1):
        if re.match(r'^\};$', lines[i].strip()):
            # Insert parameters before the closing brace
            indent = '  '
            new_lines = lines[:i]
            new_lines.append(f'{indent}parameters: {{')
            new_lines.append(f'{indent}  codeVariants: getCodeVariants(\'{component_key}\', \'{variant}\'),')
            new_lines.append(f'{indent}}},')
            new_lines.extend(lines[i:])
            return '\n'.join(new_lines)

    return story_export

def process_file(file_path, dry_run=True):
    """Process a single story file."""
    print(f"\n{'='*80}")
    print(f"Processing: {file_path}")
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

    # Find stories needing variants
    stories = find_stories_needing_variants(content)

    if not stories:
        print("  ✅ No stories need codeVariants added")
        return False

    print(f"  📝 Found {len(stories)} stories needing codeVariants:")
    for story in stories:
        print(f"     - {story['name']}")

    if dry_run:
        print("  🔍 DRY RUN - No changes made")
        return True

    # Process stories in reverse order (to preserve positions)
    modified_content = content
    offset = 0

    for story in reversed(stories):
        original = story['full_match']
        modified = add_codevariants_to_story(original, component_key)

        start = story['start'] + offset
        end = story['end'] + offset

        modified_content = modified_content[:start] + modified + modified_content[end:]
        offset += len(modified) - len(original)

    # Write the modified content
    with open(file_path, 'w') as f:
        f.write(modified_content)

    print(f"  ✅ Updated {len(stories)} stories")
    return True

def main():
    """Main function."""
    dry_run = '--dry-run' in sys.argv or '-n' in sys.argv

    # Base directory for stories
    base_dir = Path('/Users/karo/Library/Mobile Documents/com~apple~CloudDocs/Github/cin7-design-system-library/storybook/stories')

    # High priority files from MISSING_CODE_VARIANTS.md
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
        'components/layout/AlphaStack.stories.tsx',
        'components/layout/Box.stories.tsx',
        'components/utilities/KeyboardKey.stories.tsx',
        'components/media/Avatar.stories.tsx',
        'components/media/Image.stories.tsx',
        'components/media/Thumbnail.stories.tsx',
        'components/media/VideoThumbnail.stories.tsx',
        'components/utilities/DropZone.stories.tsx',
        'components/utilities/Scrollable.stories.tsx',
        'components/utilities/Tag.stories.tsx',
    ]

    print("=" * 80)
    print("STORYBOOK CODE VARIANTS AUTOMATION SCRIPT")
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
