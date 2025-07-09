import {ClipboardIcon} from '@shopify/polaris-icons';
import {Tab} from '@headlessui/react';
import {useState} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {forwardRef} from 'react';

import {Box, type WithAsProp} from '../Box';
import {useCopyToClipboard} from '../../utils/hooks';
import Icon from '../Icon';
import styles from './Code.module.scss';
import Tooltip from '../Tooltip';
import { trackCodeCopy } from '../../utils/analytics';

interface Props {
  code:
    | {
        title: string;
        code: string;
        className?: string;
      }
    | {
        title: string;
        code: string;
        className?: string;
      }[];
}

function Code({code}: Props) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className={styles.Code}>
      {Array.isArray(code) ? (
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <div className={styles.TopBar}>
            <Tab.List className={styles.Tabs}>
              {code.map(({title}) => (
                <Tab key={title} className={styles.Tab}>
                  {title}
                </Tab>
              ))}
            </Tab.List>
            {code[selectedIndex] && (
              <CopyButton code={code[selectedIndex].code} />
            )}
          </div>

          <Tab.Panels>
            {code.map(({title, code, className}) => (
              <Tab.Panel key={title}>
                <HighlightedCode code={code} className={className} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      ) : (
        <>
          <div className={styles.TopBar}>
            <div className={styles.Tabs}>
              <div className={styles.Tab}>{code.title}</div>
            </div>
            <CopyButton code={code.code} />
          </div>
          <HighlightedCode code={code.code} className={code.className} />
        </>
      )}
    </div>
  );
}

function HighlightedCode({
  code,
  className,
}: {
  code: string;
  className?: string;
}) {
  const match = /language-(\w+)/.exec(className || '');
  const lang = match ? match[1] : 'javascript';
  return (
    <SyntaxHighlighter
      // eslint-disable-next-line react/no-children-prop
      children={String(code).replace(/\n$/, '')}
      language={lang}
      codeTagProps={{className: styles.ActualCode}}
      useInlineStyles={false}
      wrapLongLines
    />
  );
}

export function CopyButton({code, codeType = 'snippet'}: {code: string; codeType?: string}) {
  const [copy, didJustCopy] = useCopyToClipboard(code);

  const handleCopy = () => {
    copy();
    // Track code copy event
    const language = detectLanguage(code);
    trackCodeCopy(codeType, undefined, language);
  };

  return (
    <div className={styles.CopyButtonWrapper}>
      <Tooltip
        ariaLabel="Copy to clipboard"
        renderContent={() => <p>{didJustCopy ? 'Copied' : 'Copy'}</p>}
      >
        <button
          type="button"
          className={styles.CopyButton}
          onClick={handleCopy}
          aria-label="Copy to clipboard"
        >
          <Icon source={ClipboardIcon} width={16} height={16} />
        </button>
      </Tooltip>
    </div>
  );
}

// Simple language detection based on code patterns
function detectLanguage(code: string): string {
  if (code.includes('import React') || code.includes('jsx')) return 'jsx';
  if (code.includes('import') || code.includes('export')) return 'javascript';
  if (code.includes('interface') || code.includes(': string')) return 'typescript';
  if (code.includes('<?php')) return 'php';
  if (code.includes('def ') || code.includes('import ')) return 'python';
  if (code.includes('.css') || code.includes('{') && code.includes('}')) return 'css';
  return 'unknown';
}

export interface InlineCodeProps {}

export const InlineCode = forwardRef(
  ({as = 'span', className, ...props}, forwardedRef) => (
    <Box
      {...props}
      as={as}
      className={[styles.InlineCode, className]}
      ref={forwardedRef}
    />
  ),
) as WithAsProp<InlineCodeProps, typeof Box, 'span'>;

InlineCode.displayName = 'InlineCode';

export default Code;
