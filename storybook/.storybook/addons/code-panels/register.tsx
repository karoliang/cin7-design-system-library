import React from 'react';
import { addons, types } from '@storybook/manager-api';
import { CodePanel } from './Panel';

const ADDON_ID = 'cin7/code-panels';

// Panel IDs and configurations
const panels = [
  {
    id: `${ADDON_ID}/react`,
    title: 'React',
    language: 'react' as const,
  },
  {
    id: `${ADDON_ID}/vanilla`,
    title: 'Vanilla JS',
    language: 'vanilla' as const,
  },
  {
    id: `${ADDON_ID}/extjs`,
    title: 'ExtJS',
    language: 'extjs' as const,
  },
  {
    id: `${ADDON_ID}/typescript`,
    title: 'TypeScript',
    language: 'typescript' as const,
  },
];

// Register the addon
addons.register(ADDON_ID, () => {
  // Register each panel
  panels.forEach(({ id, title, language }) => {
    addons.add(id, {
      type: types.PANEL,
      title,
      match: ({ viewMode }) => viewMode === 'story',
      render: ({ active }) => (
        <CodePanel active={!!active} language={language} />
      ),
    });
  });
});
