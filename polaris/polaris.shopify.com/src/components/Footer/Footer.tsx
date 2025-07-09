import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.scss';

export function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Container}>
        <div className={styles.Content}>
          <div className={styles.Section}>
            <h3>Resources</h3>
            <ul>
              <li><Link href="/getting-started">Getting Started</Link></li>
              <li><Link href="/foundations">Foundations</Link></li>
              <li><Link href="/components">Components</Link></li>
              <li><Link href="/tokens/color">Design Tokens</Link></li>
            </ul>
          </div>
          
          <div className={styles.Section}>
            <h3>Community</h3>
            <ul>
              <li><Link href="/contributing">Contributing</Link></li>
              <li><a href="https://github.com/karoliang/cin7dsl">GitHub</a></li>
              <li><Link href="/api">API Reference</Link></li>
            </ul>
          </div>
          
          <div className={styles.Section}>
            <h3>Support</h3>
            <ul>
              <li><a href="mailto:karo.liang@cin7.com">Contact Us</a></li>
              <li><a href="mailto:karo.liang@cin7.com?subject=Cin7%20DSL%20Feedback">Give Feedback</a></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.Bottom}>
          <p>&copy; 2025 Cin7 DSL. Built with Shopify Polaris.</p>
        </div>
      </div>
    </footer>
  );
}