#!/usr/bin/env python3
"""
Bulk add code variants to Storybook stories.

This script adds `parameters: { codeVariants: getCodeVariants(...) }`
to multiple stories in a single .stories.tsx file.

Usage:
    python3 scripts/add-code-variants-bulk.py \
        <file_path> <component_key> <story_names...>

Example:
    python3 scripts/add-code-variants-bulk.py \
        storybook/stories/components/forms/TextField.stories.tsx \
        textfield \
        Default WithValue WithError Required

This will add code variant parameters to the Default, WithValue,
WithError, and Required stories in TextField.stories.tsx, using
the 'textfield' component key.

The script:
- Safely checks if code variants already exist (skips if present)
- Handles complex story structures (render functions, etc.)
- Automatically fixes double commas
- Reports success for each story processed
"""

import re
import sys

def add_code_variants(file_path, component_key, story_names):
    """
    Add codeVariants parameters to specified stories in a file.

    Args:
        file_path: Path to the .stories.tsx file
        component_key: Component key for getCodeVariants (e.g., 'button')
        story_names: List of story names to add code variants to

    Returns:
        Number of stories successfully updated
    """
    with open(file_path, 'r') as f:
        content = f.read()

    params_block = f'''  parameters: {{
    codeVariants: getCodeVariants('{component_key}', 'default'),
  }},
'''

    count = 0
    for story in story_names:
        # Simple replacement: find story closing and add parameters before it
        pattern = f'(export const {story}: Story = {{[\\s\\S]*?)(\\n}};)'

        # Check if already has codeVariants
        match = re.search(pattern, content)
        if match and 'codeVariants' not in match.group(1):
            content = re.sub(pattern, r'\1,' + '\n' + params_block + r'\2', content, count=1)
            count += 1
            print(f"✅ Added to {story}")
        elif match and 'codeVariants' in match.group(1):
            print(f"⏭️  Skipped {story} (already has codeVariants)")
        else:
            print(f"⚠️  Story '{story}' not found or has unexpected format")

    # Fix double commas
    content = re.sub(r'  },,\n', '  },\n', content)

    with open(file_path, 'w') as f:
        f.write(content)

    print(f"\n✅ Total: Added codeVariants to {count} stories")
    return count

def main():
    """Main entry point for the script."""
    if len(sys.argv) < 4:
        print("Usage: python3 add-code-variants-bulk.py <file_path> <component_key> <story_names...>")
        print("\nExample:")
        print("  python3 add-code-variants-bulk.py \\")
        print("    storybook/stories/components/forms/TextField.stories.tsx \\")
        print("    textfield \\")
        print("    Default WithValue WithError Required")
        sys.exit(1)

    file_path = sys.argv[1]
    component_key = sys.argv[2]
    story_names = sys.argv[3:]

    print(f"\n📝 Processing: {file_path}")
    print(f"🔑 Component key: '{component_key}'")
    print(f"📚 Stories: {', '.join(story_names)}\n")

    try:
        stories_updated = add_code_variants(file_path, component_key, story_names)

        if stories_updated > 0:
            print(f"\n✅ Success! Updated {stories_updated} stories")
            print(f"📁 File: {file_path}")
            return 0
        else:
            print("\n⚠️  No stories were updated (they may already have code variants)")
            return 0

    except FileNotFoundError:
        print(f"\n❌ Error: File not found: {file_path}")
        return 1
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return 1

if __name__ == '__main__':
    sys.exit(main())
