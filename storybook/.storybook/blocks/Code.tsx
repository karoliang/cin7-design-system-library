import { Tab } from '@headlessui/react';
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeTab {
  title: string;
  code: string;
  language?: string;
}

interface CodeProps {
  code: CodeTab | CodeTab[];
}

export function Code({ code }: CodeProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = Array.isArray(code) ? code : [code];
  const currentCode = tabs[selectedIndex];

  return (
    <div style={{
      margin: '20px 0',
      border: '1px solid var(--color-gray-200, #e5e7eb)',
      borderRadius: 'var(--border-radius-lg, 8px)',
      overflow: 'hidden',
      backgroundColor: '#fff'
    }}>
      {tabs.length > 1 ? (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--color-gray-200, #e5e7eb)',
            backgroundColor: 'var(--color-gray-50, #f9fafb)',
            padding: '8px 16px'
          }}>
            <Tab.List style={{ display: 'flex', gap: '4px' }}>
              {tabs.map(({ title }) => (
                <Tab
                  key={title}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    borderRadius: 'var(--border-radius-base, 4px)',
                    fontFamily: 'var(--font-family-sans)',
                    fontSize: 'var(--font-size-sm, 14px)',
                    fontWeight: selectedIndex === tabs.findIndex(t => t.title === title) ? '600' : '400',
                    color: selectedIndex === tabs.findIndex(t => t.title === title)
                      ? 'var(--color-primary-600, #005a9a)'
                      : 'var(--color-gray-600, #4b5563)',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedIndex !== tabs.findIndex(t => t.title === title)) {
                      (e.target as HTMLElement).style.backgroundColor = 'var(--color-gray-100, #f3f4f6)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.backgroundColor = 'transparent';
                  }}
                >
                  {title}
                </Tab>
              ))}
            </Tab.List>
            <button
              type="button"
              onClick={() => handleCopy(currentCode.code)}
              style={{
                padding: '6px 12px',
                border: '1px solid var(--color-gray-300, #d1d5db)',
                borderRadius: 'var(--border-radius-base, 4px)',
                background: '#fff',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm, 14px)',
                fontFamily: 'var(--font-family-sans)',
                color: 'var(--color-gray-700, #374151)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--color-gray-50, #f9fafb)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#fff';
              }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          <Tab.Panels>
            {tabs.map(({ title, code, language }) => (
              <Tab.Panel key={title}>
                <HighlightedCode code={code} language={language} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--color-gray-200, #e5e7eb)',
            backgroundColor: 'var(--color-gray-50, #f9fafb)',
            padding: '8px 16px'
          }}>
            <div style={{
              fontFamily: 'var(--font-family-sans)',
              fontSize: 'var(--font-size-sm, 14px)',
              fontWeight: '600',
              color: 'var(--color-gray-700, #374151)'
            }}>
              {currentCode.title}
            </div>
            <button
              type="button"
              onClick={() => handleCopy(currentCode.code)}
              style={{
                padding: '6px 12px',
                border: '1px solid var(--color-gray-300, #d1d5db)',
                borderRadius: 'var(--border-radius-base, 4px)',
                background: '#fff',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm, 14px)',
                fontFamily: 'var(--font-family-sans)',
                color: 'var(--color-gray-700, #374151)'
              }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
          <HighlightedCode code={currentCode.code} language={currentCode.language} />
        </>
      )}
    </div>
  );
}

function HighlightedCode({ code, language }: { code: string; language?: string }) {
  const lang = language || detectLanguage(code);

  return (
    <SyntaxHighlighter
      language={lang}
      style={tomorrow}
      customStyle={{
        margin: 0,
        borderRadius: 0,
        fontSize: '14px',
        lineHeight: '1.5'
      }}
      wrapLongLines
    >
      {code.trim()}
    </SyntaxHighlighter>
  );
}

function detectLanguage(code: string): string {
  if (code.includes('import React') || code.includes('</')) return 'jsx';
  if (code.includes('Ext.create') || code.includes('Ext.define')) return 'javascript';
  if (code.includes('interface') || code.includes(': string')) return 'typescript';
  if (code.includes('<!-- HTML')) return 'markup';
  return 'javascript';
}
