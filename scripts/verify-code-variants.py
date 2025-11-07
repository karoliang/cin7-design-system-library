#!/usr/bin/env python3
"""
Verification script for Storybook code variants coverage.

This script scans all .stories.tsx files and verifies that every story
has code variants (either at meta-level or story-level).

Usage:
    python3 scripts/verify-code-variants.py

The script will output:
- Total coverage statistics
- List of files with missing code variants
- Detailed coverage report saved to JSON

Run this after adding new stories or components to ensure code examples
are provided for all variants (React, ExtJS, Vanilla JS, TypeScript).
"""

import os
import re
import json
from pathlib import Path

def extract_stories_from_file(file_path):
    """Extract all story names and their code variant status from a file."""
    with open(file_path, 'r') as f:
        content = f.read()

    # Check if file has meta-level code variants
    meta_section = content.split('export default meta')[0] if 'export default meta' in content else ''
    meta_has_variants = 'codeVariants: getCodeVariants(' in meta_section

    # Find all story exports
    story_pattern = r'export const (\w+): Story'
    stories = re.findall(story_pattern, content)

    # For each story, check if it has code variants
    story_details = []
    for i, story in enumerate(stories):
        # Find the position of this story export
        story_pos = content.find(f'export const {story}: Story')

        # Find the position of the next story (or end of file)
        if i + 1 < len(stories):
            next_story_pos = content.find(f'export const {stories[i+1]}: Story')
        else:
            next_story_pos = len(content)

        # Extract just this story's section
        story_section = content[story_pos:next_story_pos]

        # Check if getCodeVariants appears anywhere in this story's section
        has_story_level_variants = 'getCodeVariants(' in story_section

        story_details.append({
            'name': story,
            'has_variants': meta_has_variants or has_story_level_variants,
            'level': 'meta' if meta_has_variants and not has_story_level_variants else ('story' if has_story_level_variants else 'none')
        })

    return story_details, meta_has_variants

def scan_storybook_directory(base_path):
    """Scan all .stories.tsx files and collect statistics."""
    stories_dir = os.path.join(base_path, 'storybook/stories/components')

    all_files = []
    for root, dirs, files in os.walk(stories_dir):
        for file in files:
            if file.endswith('.stories.tsx'):
                all_files.append(os.path.join(root, file))

    total_stories = 0
    stories_with_variants = 0
    stories_without_variants = []
    files_summary = []

    for file_path in sorted(all_files):
        rel_path = os.path.relpath(file_path, base_path)
        story_details, meta_has_variants = extract_stories_from_file(file_path)

        file_total = len(story_details)
        file_with_variants = sum(1 for s in story_details if s['has_variants'])
        file_without_variants = [s['name'] for s in story_details if not s['has_variants']]

        total_stories += file_total
        stories_with_variants += file_with_variants

        if file_without_variants:
            stories_without_variants.append({
                'file': rel_path,
                'stories': file_without_variants
            })

        files_summary.append({
            'file': rel_path,
            'total': file_total,
            'with_variants': file_with_variants,
            'without_variants': len(file_without_variants),
            'meta_level': meta_has_variants,
            'coverage': f"{(file_with_variants/file_total*100):.1f}%" if file_total > 0 else "0%"
        })

    return {
        'total_files': len(all_files),
        'total_stories': total_stories,
        'stories_with_variants': stories_with_variants,
        'stories_without_variants': total_stories - stories_with_variants,
        'missing_details': stories_without_variants,
        'files_summary': files_summary,
    }

def main():
    # Get base path relative to this script
    script_dir = os.path.dirname(os.path.abspath(__file__))
    base_path = os.path.dirname(script_dir)

    print("🔍 Verifying Storybook code variant coverage...\n")

    # Scan all stories
    results = scan_storybook_directory(base_path)

    # Print summary
    print("=" * 80)
    print("📊 VERIFICATION SUMMARY")
    print("=" * 80)
    print(f"Total files scanned:        {results['total_files']}")
    print(f"Total stories found:        {results['total_stories']}")
    print(f"Stories WITH variants:      {results['stories_with_variants']} ({results['stories_with_variants']/results['total_stories']*100:.1f}%)")
    print(f"Stories WITHOUT variants:   {results['stories_without_variants']} ({results['stories_without_variants']/results['total_stories']*100:.1f}%)")
    print("=" * 80)

    # Print missing stories details
    if results['missing_details']:
        print(f"\n❌ MISSING CODE VARIANTS ({len(results['missing_details'])} files):")
        print("-" * 80)
        for item in results['missing_details']:
            print(f"\n📄 {item['file']} ({len(item['stories'])} stories)")
            for story in item['stories']:
                print(f"   - {story}")

        # Show incomplete files sorted by severity
        print("\n\n📁 INCOMPLETE FILES (sorted by most missing):")
        print("-" * 100)
        print(f"{'File':<60} {'Total':<8} {'✓':<8} {'✗':<8} {'Coverage':<12} {'Meta':<6}")
        print("-" * 100)

        incomplete_files = [f for f in results['files_summary'] if f['without_variants'] > 0]
        incomplete_files.sort(key=lambda x: x['without_variants'], reverse=True)

        for file in incomplete_files:
            file_name = file['file'].split('/')[-1]
            meta_indicator = '✓' if file['meta_level'] else ' '
            print(f"⚠️  {file_name:<56} {file['total']:<8} {file['with_variants']:<8} {file['without_variants']:<8} {file['coverage']:<12} {meta_indicator:<6}")
    else:
        print("\n✅ ✅ ✅  ALL STORIES HAVE CODE VARIANTS!  ✅ ✅ ✅")

    # Save detailed results to JSON
    output_file = os.path.join(base_path, 'code-variants-report.json')
    with open(output_file, 'w') as f:
        json.dump(results, f, indent=2)
    print(f"\n💾 Detailed report saved to: {output_file}")

    # Final verdict
    print("\n" + "=" * 80)
    if results['stories_without_variants'] == 0:
        print("✅ VERIFICATION PASSED - 100% COVERAGE")
        return 0
    else:
        print(f"❌ VERIFICATION FAILED - {results['stories_without_variants']} stories missing code variants")
        print(f"   Current coverage: {results['stories_with_variants']}/{results['total_stories']} ({results['stories_with_variants']/results['total_stories']*100:.1f}%)")
        return 1
    print("=" * 80)

if __name__ == '__main__':
    exit(main())
