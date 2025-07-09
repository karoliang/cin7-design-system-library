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

        <div className={styles.TechStack}>
          <h2>Powered by Modern Technologies</h2>
          <div className={styles.Technologies}>
            <div className={styles.Technology}>
              <h3>ExtJS</h3>
              <p>
                Enterprise-grade form controls and data grids with advanced features
                like filtering, sorting, and inline editing
              </p>
            </div>
            <div className={styles.Technology}>
              <h3>Vanilla JavaScript</h3>
              <p>
                Lightweight UI interactions and general functionality without
                framework overhead
              </p>
            </div>
            <div className={styles.Technology}>
              <h3>TypeScript</h3>
              <p>
                Type-safe business logic with enhanced developer experience
                and code maintainability
              </p>
            </div>
          </div>
        </div>

        <div className={styles.Features}>
          <h2>Why Choose Cin7 DSL?</h2>
          <div className={styles.FeatureList}>
            <div className={styles.Feature}>
              <h3>🚀 Enterprise Ready</h3>
              <p>
                Built for complex business applications with advanced data grids,
                form validation, and state management
              </p>
            </div>
            <div className={styles.Feature}>
              <h3>🎨 Beautiful by Default</h3>
              <p>
                Leverages Shopify Polaris design principles for consistent,
                accessible, and modern interfaces
              </p>
            </div>
            <div className={styles.Feature}>
              <h3>🔧 Developer Friendly</h3>
              <p>
                TypeScript support, comprehensive documentation, and live
                playground for rapid development
              </p>
            </div>
            <div className={styles.Feature}>
              <h3>📊 Data-Driven</h3>
              <p>
                ExtJS grids with built-in sorting, filtering, pagination,
                and export capabilities
              </p>
            </div>
          </div>
        </div>

        <div className={styles.EntryPoints}>
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