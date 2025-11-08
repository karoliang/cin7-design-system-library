import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';
import { Card, Text, InlineStack, BlockStack, Button } from '@shopify/polaris';

const meta = {
  title: 'Cin7 DSL/Business Patterns/Vanilla JS/Animations',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Animation utilities from @cin7/vanilla-js. Simple, performant animations for common UI transitions without heavy animation libraries.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Fade Effects Story
const FadeEffectsDemo = () => {
  const boxRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  const fadeIn = () => {
    if (boxRef.current) {
      boxRef.current.style.transition = 'opacity 0.3s ease-in-out';
      boxRef.current.style.opacity = '1';
      boxRef.current.style.display = 'block';
      setIsVisible(true);
    }
  };

  const fadeOut = () => {
    if (boxRef.current) {
      boxRef.current.style.transition = 'opacity 0.3s ease-in-out';
      boxRef.current.style.opacity = '0';
      setTimeout(() => {
        if (boxRef.current) {
          boxRef.current.style.display = 'none';
        }
      }, 300);
      setIsVisible(false);
    }
  };

  const fadeToggle = () => {
    if (isVisible) {
      fadeOut();
    } else {
      fadeIn();
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Fade Effects</Text>
        <Text as="p" tone="subdued">
          Smooth fade in, fade out, and fade toggle animations
        </Text>

        <div
          ref={boxRef}
          style={{
            padding: '40px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '8px',
            textAlign: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            opacity: 1,
            transition: 'opacity 0.3s ease-in-out'
          }}
        >
          Watch me fade!
        </div>

        <InlineStack gap="200">
          <Button onClick={fadeIn}>Fade In</Button>
          <Button onClick={fadeOut}>Fade Out</Button>
          <Button onClick={fadeToggle}>Fade Toggle</Button>
        </InlineStack>

        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, fadeIn, fadeOut, fadeToggle } from '@cin7/vanilla-js';

const box = $('.fade-box');

// Fade in (duration in ms, default 400)
fadeIn(box, 300);

// Fade out
fadeOut(box, 300);

// Toggle fade state
fadeToggle(box, 300);

// With callback
fadeOut(box, 300, () => {
  console.log('Fade out complete!');
});

// Manual implementation
function fadeIn(element, duration = 400) {
  element.style.transition = \`opacity \${duration}ms ease-in-out\`;
  element.style.display = 'block';
  element.style.opacity = '0';

  // Trigger reflow
  element.offsetHeight;

  element.style.opacity = '1';
}

function fadeOut(element, duration = 400) {
  element.style.transition = \`opacity \${duration}ms ease-in-out\`;
  element.style.opacity = '0';

  setTimeout(() => {
    element.style.display = 'none';
  }, duration);
}

// Chain animations
fadeOut(box1, 300, () => {
  fadeIn(box2, 300);
});`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const FadeEffects: Story = {
  render: () => <FadeEffectsDemo />,
};

// Slide Effects Story
const SlideEffectsDemo = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const slideDown = () => {
    if (panelRef.current) {
      const element = panelRef.current;
      element.style.display = 'block';
      element.style.height = '0';
      element.style.overflow = 'hidden';
      element.style.transition = 'height 0.3s ease-in-out';

      // Get the actual height
      const height = element.scrollHeight;

      // Trigger reflow
      element.offsetHeight;

      element.style.height = height + 'px';

      setTimeout(() => {
        element.style.height = 'auto';
      }, 300);

      setIsExpanded(true);
    }
  };

  const slideUp = () => {
    if (panelRef.current) {
      const element = panelRef.current;
      element.style.height = element.scrollHeight + 'px';
      element.style.overflow = 'hidden';
      element.style.transition = 'height 0.3s ease-in-out';

      // Trigger reflow
      element.offsetHeight;

      element.style.height = '0';

      setTimeout(() => {
        element.style.display = 'none';
      }, 300);

      setIsExpanded(false);
    }
  };

  const slideToggle = () => {
    if (isExpanded) {
      slideUp();
    } else {
      slideDown();
    }
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Slide Effects</Text>
        <Text as="p" tone="subdued">
          Smooth slide down and slide up animations for collapsible content
        </Text>

        <div style={{ border: '2px solid #e1e3e5', borderRadius: '8px', overflow: 'hidden' }}>
          <div
            onClick={slideToggle}
            style={{
              padding: '16px',
              background: '#f6f6f7',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Text as="span" variant="headingSm">Click to expand/collapse</Text>
            <span style={{ fontSize: '20px' }}>{isExpanded ? '▲' : '▼'}</span>
          </div>
          <div
            ref={panelRef}
            style={{
              display: 'none',
              background: 'white',
              padding: '16px'
            }}
          >
            <BlockStack gap="200">
              <Text as="p">This content slides down when expanded and slides up when collapsed.</Text>
              <Text as="p">The animation is smooth and performant, using CSS transitions.</Text>
              <Text as="p">Perfect for accordions, dropdowns, and collapsible panels.</Text>
            </BlockStack>
          </div>
        </div>

        <InlineStack gap="200">
          <Button onClick={slideDown}>Slide Down</Button>
          <Button onClick={slideUp}>Slide Up</Button>
          <Button onClick={slideToggle}>Slide Toggle</Button>
        </InlineStack>

        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, slideDown, slideUp, slideToggle } from '@cin7/vanilla-js';

const panel = $('.collapsible-panel');

// Slide down (duration in ms, default 400)
slideDown(panel, 300);

// Slide up
slideUp(panel, 300);

// Toggle slide state
slideToggle(panel, 300);

// With callback
slideDown(panel, 300, () => {
  console.log('Panel expanded!');
});

// Manual implementation
function slideDown(element, duration = 400) {
  element.style.display = 'block';
  element.style.height = '0';
  element.style.overflow = 'hidden';
  element.style.transition = \`height \${duration}ms ease-in-out\`;

  const height = element.scrollHeight;
  element.offsetHeight; // Trigger reflow

  element.style.height = height + 'px';

  setTimeout(() => {
    element.style.height = 'auto';
  }, duration);
}

function slideUp(element, duration = 400) {
  element.style.height = element.scrollHeight + 'px';
  element.style.overflow = 'hidden';
  element.style.transition = \`height \${duration}ms ease-in-out\`;

  element.offsetHeight; // Trigger reflow
  element.style.height = '0';

  setTimeout(() => {
    element.style.display = 'none';
  }, duration);
}

// Common use cases
// Accordion
$('.accordion-header').addEventListener('click', (e) => {
  const panel = e.target.nextElementSibling;
  slideToggle(panel);
});

// Dropdown menu
$('.dropdown-trigger').addEventListener('click', () => {
  slideToggle($('.dropdown-menu'));
});`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const SlideEffects: Story = {
  render: () => <SlideEffectsDemo />,
};

// Custom Animations Story
const CustomAnimationsDemo = () => {
  const box1Ref = useRef<HTMLDivElement>(null);
  const box2Ref = useRef<HTMLDivElement>(null);
  const box3Ref = useRef<HTMLDivElement>(null);

  const animateScale = () => {
    if (box1Ref.current) {
      box1Ref.current.style.transition = 'transform 0.5s ease-in-out';
      box1Ref.current.style.transform = 'scale(1.5)';
      setTimeout(() => {
        if (box1Ref.current) {
          box1Ref.current.style.transform = 'scale(1)';
        }
      }, 500);
    }
  };

  const animateRotate = () => {
    if (box2Ref.current) {
      box2Ref.current.style.transition = 'transform 0.5s ease-in-out';
      const currentRotation = box2Ref.current.dataset.rotation || '0';
      const newRotation = parseInt(currentRotation) + 360;
      box2Ref.current.style.transform = `rotate(${newRotation}deg)`;
      box2Ref.current.dataset.rotation = newRotation.toString();
    }
  };

  const animateMove = () => {
    if (box3Ref.current) {
      const isRight = box3Ref.current.dataset.position === 'right';
      box3Ref.current.style.transition = 'transform 0.5s ease-in-out';
      box3Ref.current.style.transform = isRight ? 'translateX(0)' : 'translateX(200px)';
      box3Ref.current.dataset.position = isRight ? 'left' : 'right';
    }
  };

  const animateAll = () => {
    animateScale();
    setTimeout(() => animateRotate(), 200);
    setTimeout(() => animateMove(), 400);
  };

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h2" variant="headingMd">Custom Animations</Text>
        <Text as="p" tone="subdued">
          Animate any CSS property for custom effects
        </Text>

        <div style={{ padding: '20px', background: '#f6f6f7', borderRadius: '8px', minHeight: '200px' }}>
          <BlockStack gap="400">
            <div
              ref={box1Ref}
              style={{
                width: '80px',
                height: '80px',
                background: '#008060',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                transition: 'transform 0.5s ease-in-out'
              }}
            >
              Scale
            </div>

            <div
              ref={box2Ref}
              style={{
                width: '80px',
                height: '80px',
                background: '#005ea3',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                transition: 'transform 0.5s ease-in-out'
              }}
              data-rotation="0"
            >
              Rotate
            </div>

            <div
              ref={box3Ref}
              style={{
                width: '80px',
                height: '80px',
                background: '#bf0711',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
                transition: 'transform 0.5s ease-in-out'
              }}
              data-position="left"
            >
              Move
            </div>
          </BlockStack>
        </div>

        <InlineStack gap="200" wrap>
          <Button onClick={animateScale}>Scale</Button>
          <Button onClick={animateRotate}>Rotate</Button>
          <Button onClick={animateMove}>Move</Button>
          <Button onClick={animateAll}>Animate All</Button>
        </InlineStack>

        <details>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Code</summary>
          <pre style={{ background: '#f6f6f7', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
            <code>{`import { $, animate } from '@cin7/vanilla-js';

const box = $('.animated-box');

// Animate any CSS property
animate(box, {
  property: 'transform',
  from: 'scale(1)',
  to: 'scale(1.5)',
  duration: 500,
  easing: 'ease-in-out'
});

// Scale animation
function animateScale(element) {
  element.style.transition = 'transform 0.5s ease-in-out';
  element.style.transform = 'scale(1.5)';

  setTimeout(() => {
    element.style.transform = 'scale(1)';
  }, 500);
}

// Rotate animation
function animateRotate(element) {
  const currentRotation = parseInt(element.dataset.rotation || '0');
  const newRotation = currentRotation + 360;

  element.style.transition = 'transform 0.5s ease-in-out';
  element.style.transform = \`rotate(\${newRotation}deg)\`;
  element.dataset.rotation = newRotation;
}

// Translate/Move animation
function animateMove(element, x, y) {
  element.style.transition = 'transform 0.5s ease-in-out';
  element.style.transform = \`translate(\${x}px, \${y}px)\`;
}

// Combine multiple transforms
element.style.transform = 'scale(1.2) rotate(45deg) translateX(50px)';

// Animate opacity
element.style.transition = 'opacity 0.3s ease-in-out';
element.style.opacity = '0.5';

// Animate background color
element.style.transition = 'background-color 0.3s ease-in-out';
element.style.backgroundColor = '#008060';

// Chain animations
animate(box, { property: 'transform', to: 'scale(1.5)', duration: 300 })
  .then(() => animate(box, { property: 'opacity', to: '0', duration: 300 }));

// Custom easing functions
element.style.transition = 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';

// Performance tip: Use transform and opacity for best performance
// Avoid animating: width, height, top, left, margin, padding`}</code>
          </pre>
        </details>
      </BlockStack>
    </Card>
  );
};

export const CustomAnimations: Story = {
  render: () => <CustomAnimationsDemo />,
};
