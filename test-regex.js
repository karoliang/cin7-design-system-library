const fs = require('fs');

const content = fs.readFileSync('storybook/stories/components/actions/ButtonGroup.stories.tsx', 'utf-8');

// Try simpler regex
const simpleRegex = /(docs:\s*\{[^}]+\}\s*)(},?\s*tags:)/s;
const match = content.match(simpleRegex);

if (match) {
  console.log('Match found!');
  console.log('Group 1:', match[1].substring(0, 100));
  console.log('Group 2:', match[2]);
} else {
  console.log('No match');
  // Show what we have around the docs section
  const docsIndex = content.indexOf('docs:');
  console.log('Content around docs:', content.substring(docsIndex, docsIndex + 200));
}
