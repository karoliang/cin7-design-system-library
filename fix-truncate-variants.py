#!/usr/bin/env python3
"""
Script to fix TypeScript code duplication in truncate variants.
Makes TypeScript versions significantly more comprehensive than React versions.
"""

import re

def read_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        return f.read()

def write_file(filepath, content):
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# New comprehensive TypeScript code for each variant

RESPONSIVE_TRUNCATION_TS = r"""    typescript: `import { Text, BlockStack } from '@shopify/polaris';
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import type { CSSProperties } from 'react';

/**
 * Breakpoint configuration type
 * @type BreakpointType
 */
type BreakpointType = 'mobile' | 'tablet' | 'desktop' | 'wide';

/**
 * Responsive breakpoint configuration
 * @interface BreakpointConfig
 */
interface BreakpointConfig {
  readonly name: BreakpointType;
  readonly minWidth: number;
  readonly lineClamp: number;
  readonly mediaQuery: string;
}

/**
 * Current viewport state
 * @interface ViewportState
 */
interface ViewportState {
  readonly width: number;
  readonly height: number;
  readonly activeBreakpoint: BreakpointType;
  readonly orientation: 'portrait' | 'landscape';
}

/**
 * Props for ResponsiveTruncation component
 * @interface ResponsiveTruncationProps
 */
interface ResponsiveTruncationProps {
  /** Text content to display */
  text?: string;
  /** Number of lines to show on mobile devices */
  mobileLines?: number;
  /** Number of lines to show on tablet devices */
  tabletLines?: number;
  /** Number of lines to show on desktop devices */
  desktopLines?: number;
  /** Callback when breakpoint changes */
  onBreakpointChange?: (breakpoint: BreakpointType) => void;
}

/**
 * Default breakpoint values
 */
const DEFAULT_BREAKPOINTS: Record<BreakpointType, number> = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440
};

/**
 * Type guard to validate line clamp value
 */
const isValidLineClamp = (value: number): boolean => {
  return Number.isInteger(value) && value > 0 && value <= 20;
};

/**
 * Determines current active breakpoint based on viewport width
 */
const getActiveBreakpoint = (width: number): BreakpointType => {
  if (width >= DEFAULT_BREAKPOINTS.wide) return 'wide';
  if (width >= DEFAULT_BREAKPOINTS.desktop) return 'desktop';
  if (width >= DEFAULT_BREAKPOINTS.tablet) return 'tablet';
  return 'mobile';
};

/**
 * ResponsiveTruncation component with comprehensive responsive behavior
 * Demonstrates adaptive text truncation across different viewport sizes
 */
const ResponsiveTruncation: React.FC<ResponsiveTruncationProps> = ({
  text = 'This text truncates differently at various breakpoints: single line on mobile, two lines on tablet, three lines on desktop.',
  mobileLines = 1,
  tabletLines = 2,
  desktopLines = 3,
  onBreakpointChange
}): JSX.Element => {
  const [viewportState, setViewportState] = useState<ViewportState>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
    activeBreakpoint: 'desktop',
    orientation: 'landscape'
  });

  /**
   * Generate responsive CSS styles
   */
  const responsiveStyles = useMemo<string>(() => {
    return \`
      .responsive-truncate {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: \${mobileLines};
      }
      @media (min-width: 768px) {
        .responsive-truncate {
          -webkit-line-clamp: \${tabletLines};
        }
      }
      @media (min-width: 1024px) {
        .responsive-truncate {
          -webkit-line-clamp: \${desktopLines};
        }
      }
    \`;
  }, [mobileLines, tabletLines, desktopLines]);

  /**
   * Handle viewport resize
   */
  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const activeBreakpoint = getActiveBreakpoint(width);
    const orientation = width > height ? 'landscape' : 'portrait';

    setViewportState({ width, height, activeBreakpoint, orientation });

    if (onBreakpointChange) {
      onBreakpointChange(activeBreakpoint);
    }
  }, [onBreakpointChange]);

  /**
   * Effect to track viewport changes
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Responsive Truncation</Text>
      <div className="responsive-truncate">
        <Text variant="bodyMd">
          {text}
        </Text>
      </div>
      <style>{responsiveStyles}</style>
    </BlockStack>
  );
};

export default ResponsiveTruncation;`"""

PRODUCT_CARD_TRUNCATION_TS = r"""    typescript: `import { Card, Text, BlockStack, InlineStack, Badge } from '@shopify/polaris';
import React, { useMemo, useCallback, useState } from 'react';
import type { CSSProperties } from 'react';

/**
 * Product entity with comprehensive type information
 * @interface Product
 */
interface Product {
  readonly title: string;
  readonly description: string;
  readonly price: string;
  readonly badge?: string;
  readonly badgeTone?: 'success' | 'info' | 'attention' | 'warning' | 'critical';
  readonly id?: string;
  readonly imageUrl?: string;
}

/**
 * Truncation configuration for different sections
 * @interface TruncationConfig
 */
interface TruncationConfig {
  readonly titleMaxWidth: string;
  readonly descriptionLines: number;
  readonly enableTooltips: boolean;
}

/**
 * Props for ProductCardTruncation component
 * @interface ProductCardTruncationProps
 */
interface ProductCardTruncationProps {
  /** Product to display */
  product?: Product;
  /** Number of lines for description truncation */
  descriptionLines?: number;
  /** Maximum width for title truncation */
  titleMaxWidth?: string | number;
  /** Enable hover tooltips */
  enableTooltips?: boolean;
  /** Callback when product is clicked */
  onProductClick?: (product: Product) => void;
}

/**
 * Type guard to validate product structure
 */
const isValidProduct = (product: any): product is Product => {
  return (
    typeof product === 'object' &&
    product !== null &&
    typeof product.title === 'string' &&
    typeof product.description === 'string' &&
    typeof product.price === 'string'
  );
};

/**
 * Normalizes width value to CSS string
 */
const normalizeWidth = (width: string | number | undefined): string => {
  if (width === undefined) return '100%';
  return typeof width === 'number' ? \`\${width}px\` : width;
};

/**
 * Creates description truncation styles
 */
const createDescriptionStyle = (lines: number): CSSProperties => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
});

/**
 * ProductCardTruncation component with comprehensive type safety
 * Demonstrates truncation in product card contexts with title and description
 */
const ProductCardTruncation: React.FC<ProductCardTruncationProps> = ({
  product = {
    title: 'Premium Wireless Bluetooth Headphones with Active Noise Cancellation',
    description: 'Experience superior sound quality with our premium wireless headphones featuring advanced active noise cancellation technology, 30-hour battery life, and comfortable over-ear design perfect for all-day listening.',
    price: '$299.99',
    badge: 'New',
    badgeTone: 'info'
  },
  descriptionLines = 2,
  titleMaxWidth,
  enableTooltips = true,
  onProductClick
}): JSX.Element => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  /**
   * Validate product data
   */
  const validatedProduct = useMemo<Product>(() => {
    if (!isValidProduct(product)) {
      throw new Error('Invalid product data provided');
    }
    return product;
  }, [product]);

  /**
   * Truncation configuration
   */
  const truncationConfig = useMemo<TruncationConfig>(() => ({
    titleMaxWidth: normalizeWidth(titleMaxWidth),
    descriptionLines: Math.max(1, Math.min(descriptionLines, 10)),
    enableTooltips
  }), [titleMaxWidth, descriptionLines, enableTooltips]);

  /**
   * Description truncation styles
   */
  const descriptionStyle = useMemo<CSSProperties>(() => {
    return createDescriptionStyle(truncationConfig.descriptionLines);
  }, [truncationConfig.descriptionLines]);

  /**
   * Handle product click
   */
  const handleProductClick = useCallback(() => {
    if (onProductClick) {
      onProductClick(validatedProduct);
    }
  }, [onProductClick, validatedProduct]);

  /**
   * Card container styles
   */
  const cardStyle = useMemo<CSSProperties>(() => ({
    cursor: onProductClick ? 'pointer' : 'default',
    transition: 'box-shadow 0.2s ease-in-out',
    boxShadow: isHovered ? '0 2px 8px rgba(0, 0, 0, 0.1)' : undefined
  }), [onProductClick, isHovered]);

  return (
    <div
      style={cardStyle}
      onClick={handleProductClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <BlockStack gap="400">
          <InlineStack align="space-between" blockAlign="center">
            <Text as="h3" variant="headingMd" truncate>
              {validatedProduct.title}
            </Text>
            {validatedProduct.badge && (
              <Badge tone={validatedProduct.badgeTone}>
                {validatedProduct.badge}
              </Badge>
            )}
          </InlineStack>
          <div style={descriptionStyle}>
            <Text variant="bodyMd" tone="subdued">
              {validatedProduct.description}
            </Text>
          </div>
          <Text variant="headingLg" as="p">{validatedProduct.price}</Text>
        </BlockStack>
      </Card>
    </div>
  );
};

export default ProductCardTruncation;`"""

VARIABLE_WIDTH_CONTAINERS_TS = r"""    typescript: `import { Text, BlockStack, InlineStack } from '@shopify/polaris';
import React, { useMemo, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Container width configuration
 * @interface ContainerConfig
 */
interface ContainerConfig {
  readonly width: number;
  readonly label: string;
  readonly borderColor: string;
}

/**
 * Text container component props
 * @interface TextContainerProps
 */
interface TextContainerProps {
  readonly width: number;
  readonly text: string;
  readonly showLabel?: boolean;
}

/**
 * Props for VariableWidthContainers component
 * @interface VariableWidthContainersProps
 */
interface VariableWidthContainersProps {
  /** Text to display in all containers */
  text?: string;
  /** Array of widths for containers (in pixels) */
  widths?: number[];
  /** Show width labels */
  showLabels?: boolean;
  /** Custom border color */
  borderColor?: string;
  /** Callback when container is clicked */
  onContainerClick?: (width: number) => void;
}

/**
 * Default container widths
 */
const DEFAULT_WIDTHS: readonly number[] = [100, 200, 300, 400] as const;

/**
 * Type guard to validate width array
 */
const areValidWidths = (widths: any[]): widths is number[] => {
  return widths.every(w => typeof w === 'number' && w > 0 && w < 2000);
};

/**
 * Creates container style configuration
 */
const createContainerStyle = (width: number, borderColor: string): CSSProperties => ({
  width: \`\${width}px\`,
  border: \`1px solid \${borderColor}\`,
  padding: '8px',
  borderRadius: '4px',
  backgroundColor: '#f9fafb'
});

/**
 * Creates truncated text style
 */
const createTextStyle = (): CSSProperties => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  display: 'block'
});

/**
 * Generates container configurations
 */
const generateContainerConfigs = (
  widths: number[],
  borderColor: string
): ContainerConfig[] => {
  return widths.map((width, index) => ({
    width,
    label: \`\${width}px\`,
    borderColor
  }));
};

/**
 * VariableWidthContainers component with comprehensive type safety
 * Demonstrates truncation behavior across containers of different widths
 */
const VariableWidthContainers: React.FC<VariableWidthContainersProps> = ({
  text = 'This text demonstrates truncation behavior in containers of different widths',
  widths = [...DEFAULT_WIDTHS],
  showLabels = true,
  borderColor = '#ccc',
  onContainerClick
}): JSX.Element => {
  /**
   * Validated widths
   */
  const validatedWidths = useMemo<number[]>(() => {
    if (!areValidWidths(widths)) {
      console.warn('Invalid widths provided, using defaults');
      return [...DEFAULT_WIDTHS];
    }
    return widths;
  }, [widths]);

  /**
   * Container configurations
   */
  const containerConfigs = useMemo<ContainerConfig[]>(() => {
    return generateContainerConfigs(validatedWidths, borderColor);
  }, [validatedWidths, borderColor]);

  /**
   * Handle container click
   */
  const handleContainerClick = useCallback((width: number) => {
    if (onContainerClick) {
      onContainerClick(width);
    }
  }, [onContainerClick]);

  /**
   * Renders a single text container
   */
  const renderContainer = useCallback((config: ContainerConfig, index: number): ReactNode => {
    const containerStyle = createContainerStyle(config.width, config.borderColor);
    const textStyle = createTextStyle();

    return (
      <div key={index}>
        {showLabels && (
          <Text variant="bodySm" tone="subdued" as="p">
            {config.label}
          </Text>
        )}
        <div
          style={containerStyle}
          onClick={() => handleContainerClick(config.width)}
        >
          <span style={textStyle}>
            <Text variant="bodySm">{text}</Text>
          </span>
        </div>
      </div>
    );
  }, [text, showLabels, handleContainerClick]);

  /**
   * Wrapper style for container alignment
   */
  const wrapperStyle = useMemo<CSSProperties>(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  }), []);

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Variable Width Truncation</Text>
      <div style={wrapperStyle}>
        <InlineStack gap="400" wrap={false}>
          {containerConfigs.map((config, index) => renderContainer(config, index))}
        </InlineStack>
      </div>
    </BlockStack>
  );
};

export default VariableWidthContainers;`"""

# Continue with more variants...

# Read the file
filepath = 'storybook/.storybook/blocks/codeVariants.ts'
content = read_file(filepath)

# Pattern to match typescript property in responsivetruncation
pattern_responsive = r"(responsivetruncation: \{[^}]*?extjs: `[^`]*?`;[\s\n]*)(typescript: `[^`]*?export default ResponsiveTruncation;`)"

# Replace responsivetruncation typescript
content = re.sub(pattern_responsive, r"\1" + RESPONSIVE_TRUNCATION_TS, content, flags=re.DOTALL)

# Pattern to match typescript property in productcardtruncation
pattern_product = r"(productcardtruncation: \{[^}]*?extjs: `[^`]*?`;[\s\n]*)(typescript: `[^`]*?export default ProductCardTruncation;`)"

# Replace productcardtruncation typescript
content = re.sub(pattern_product, r"\1" + PRODUCT_CARD_TRUNCATION_TS, content, flags=re.DOTALL)

# Pattern to match typescript property in variablewidthcontainers
pattern_variable = r"(variablewidthcontainers: \{[^}]*?extjs: `[^`]*?`;[\s\n]*)(typescript: `[^`]*?export default VariableWidthContainers;`)"

# Replace variablewidthcontainers typescript
content = re.sub(pattern_variable, r"\1" + VARIABLE_WIDTH_CONTAINERS_TS, content, flags=re.DOTALL)

# Write back
write_file(filepath, content)

print("✅ Fixed responsivetruncation TypeScript variant")
print("✅ Fixed productcardtruncation TypeScript variant")
print("✅ Fixed variablewidthcontainers TypeScript variant")
print("Done!")
