import React, { useState } from 'react';
import { useParameter } from '@storybook/manager-api';
import { AddonPanel } from '@storybook/components';
import { styled } from '@storybook/theming';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeContainer = styled.div({
  position: 'relative',
  height: '100%',
  overflow: 'auto',
  fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace",
  fontSize: '13px',
});

const CopyButton = styled.button({
  position: 'absolute',
  top: '12px',
  right: '12px',
  padding: '6px 12px',
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
  fontWeight: '500',
  zIndex: 10,
  transition: 'all 0.2s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
});

const EmptyState = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: '40px',
  textAlign: 'center',
  color: '#666',
  fontSize: '14px',
  fontFamily: 'system-ui, -apple-system, sans-serif',
});

interface CodePanelProps {
  active: boolean;
  language: 'react' | 'vanilla' | 'extjs' | 'typescript';
}

export const CodePanel: React.FC<CodePanelProps> = ({ active, language }) => {
  const [copied, setCopied] = useState(false);

  // Get code variants from story parameters
  const codeVariants = useParameter('codeVariants', null);

  if (!active) {
    return null;
  }

  const code = codeVariants?.[language];

  if (!code) {
    return (
      <AddonPanel active={active}>
        <EmptyState>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
              No {language} code example available
            </div>
            <div style={{ fontSize: '13px', color: '#999' }}>
              Add code examples to your story parameters:<br />
              <code style={{
                background: '#f5f5f5',
                padding: '2px 6px',
                borderRadius: '3px',
                fontSize: '12px',
                marginTop: '8px',
                display: 'inline-block'
              }}>
                parameters: {'{'} codeVariants: {'{'} {language}: '...' {'}'} {'}'}
              </code>
            </div>
          </div>
        </EmptyState>
      </AddonPanel>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Map language to syntax highlighter language
  const languageMap = {
    react: 'jsx',
    vanilla: 'javascript',
    extjs: 'javascript',
    typescript: 'typescript',
  };

  return (
    <AddonPanel active={active}>
      <CodeContainer>
        <CopyButton onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy'}
        </CopyButton>
        <SyntaxHighlighter
          language={languageMap[language]}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '16px',
            height: '100%',
            background: '#1e1e1e',
            fontSize: '13px',
            lineHeight: '1.6',
          }}
          showLineNumbers
        >
          {code}
        </SyntaxHighlighter>
      </CodeContainer>
    </AddonPanel>
  );
};
