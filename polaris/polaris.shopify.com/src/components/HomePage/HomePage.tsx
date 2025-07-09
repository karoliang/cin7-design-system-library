import Link from 'next/link';
import PageMeta from '../PageMeta';
import styles from './HomePage.module.scss';
import Page from '../Page';

interface Props {}

function HomePage({}: Props) {
  return (
    <Page>
      <div className={styles.HomePage}>
        <PageMeta description="Cin7 Design System Language - Combining Shopify Polaris with ExtJS for enterprise applications." />

        <div className={styles.Hero}>
          <div className={styles.Text}>
            <h1>
              <span>Build.</span> <span>Contribute.</span> <span>Evolve.</span>
            </h1>
            <p>
              Cin7 DSL combines the elegance of Shopify Polaris with the power of ExtJS,
              creating a comprehensive design system for modern enterprise applications.
            </p>
          </div>
        </div>

        <div className={styles.EntryPoints}>
          <Link href="/getting-started/extjs" className={styles.EntryPoint}>
            <h3>ExtJS</h3>
            <p>
              Enterprise-grade form controls and data grids with advanced features
              like filtering, sorting, and inline editing
            </p>
          </Link>

          <Link href="/getting-started/development#vanilla-javascript" className={styles.EntryPoint}>
            <h3>Vanilla JavaScript</h3>
            <p>
              Lightweight UI interactions and general functionality without
              framework overhead
            </p>
          </Link>

          <Link href="/getting-started/development#typescript" className={styles.EntryPoint}>
            <h3>TypeScript</h3>
            <p>
              Type-safe business logic with enhanced developer experience
              and code maintainability
            </p>
          </Link>

          <Link href="/foundations" className={styles.EntryPoint}>
            <h3>Shopify Polaris</h3>
            <p>
              Modern design system providing beautiful, accessible UI components
              for consistent user experiences
            </p>
          </Link>

          <Link href="/foundations" className={styles.EntryPoint}>
            <h3>Foundations</h3>
            <p>
              Fundamental design guidance for creating quality user experiences
            </p>
          </Link>

          <Link href="/components" className={styles.EntryPoint}>
            <h3>Components</h3>
            <p>
              Polaris components enhanced with ExtJS grids and forms for
              enterprise functionality
            </p>
          </Link>

          <Link href="/tokens/color" className={styles.EntryPoint}>
            <h3>Tokens</h3>
            <p>
              Coded names that represent design decisions for color, spacing,
              typography, and more
            </p>
          </Link>

          <Link href="/icons" className={styles.EntryPoint}>
            <h3>Icons</h3>
            <p>
              Over 400 carefully designed icons focused on business and
              enterprise applications
            </p>
          </Link>

          <Link href="/getting-started/examples" className={styles.EntryPoint}>
            <h3>Examples</h3>
            <p>
              Interactive examples showcasing ExtJS integration with Polaris
              components
            </p>
          </Link>

          <Link href="/playground" className={styles.EntryPoint}>
            <h3>Playground</h3>
            <p>
              Live code editor to experiment with Cin7 DSL components in
              real-time
            </p>
          </Link>
        </div>
      </div>
    </Page>
  );
}

export default HomePage;