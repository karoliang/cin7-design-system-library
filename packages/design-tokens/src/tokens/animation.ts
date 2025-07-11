/**
 * Animation tokens for Cin7 DSL
 * Consistent motion design across all layers
 */

export const animationTokens = {
  // Duration scales
  duration: {
    instant: '0ms',
    fast: '100ms',
    base: '200ms',
    slow: '300ms',
    slower: '400ms',
    slowest: '500ms',
  },

  // Easing functions
  easing: {
    // Basic easings
    linear: 'linear',
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',

    // Custom cubic-bezier easings
    accelerate: 'cubic-bezier(0.4, 0, 1, 1)',
    decelerate: 'cubic-bezier(0, 0, 0.2, 1)',
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Expressive easings
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    back: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',

    // Enterprise UI easings
    dataEntry: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    pageTransition: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    modalOpen: 'cubic-bezier(0.33, 1, 0.68, 1)',
    modalClose: 'cubic-bezier(0.32, 0, 0.67, 0)',
  },

  // Keyframe animations
  keyframes: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    slideInUp: {
      from: { transform: 'translateY(100%)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideInDown: {
      from: { transform: 'translateY(-100%)', opacity: 0 },
      to: { transform: 'translateY(0)', opacity: 1 },
    },
    slideInLeft: {
      from: { transform: 'translateX(-100%)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },
    slideInRight: {
      from: { transform: 'translateX(100%)', opacity: 0 },
      to: { transform: 'translateX(0)', opacity: 1 },
    },
    scaleIn: {
      from: { transform: 'scale(0.8)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    scaleOut: {
      from: { transform: 'scale(1)', opacity: 1 },
      to: { transform: 'scale(0.8)', opacity: 0 },
    },
    shimmer: {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
    pulse: {
      '0%': { opacity: 1 },
      '50%': { opacity: 0.5 },
      '100%': { opacity: 1 },
    },
    spin: {
      from: { transform: 'rotate(0deg)' },
      to: { transform: 'rotate(360deg)' },
    },
  },

  // Transition presets
  transitions: {
    // Property-specific transitions
    opacity: 'opacity var(--animation-duration-base) var(--animation-easing-standard)',
    transform: 'transform var(--animation-duration-base) var(--animation-easing-standard)',
    color: 'color var(--animation-duration-fast) var(--animation-easing-standard)',
    background: 'background-color var(--animation-duration-base) var(--animation-easing-standard)',
    border: 'border-color var(--animation-duration-fast) var(--animation-easing-standard)',
    shadow: 'box-shadow var(--animation-duration-slow) var(--animation-easing-standard)',

    // Common combinations
    fade: 'opacity var(--animation-duration-base) var(--animation-easing-standard)',
    move: 'transform var(--animation-duration-base) var(--animation-easing-decelerate)',
    scale: 'transform var(--animation-duration-fast) var(--animation-easing-elastic)',
    all: 'all var(--animation-duration-base) var(--animation-easing-standard)',
  },

  // Motion patterns
  patterns: {
    microInteraction: {
      duration: '100ms',
      easing: 'ease-out',
    },
    contentTransition: {
      duration: '200ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    layoutShift: {
      duration: '300ms',
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    complexTransition: {
      duration: '400ms',
      easing: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
    },
  },
} as const;