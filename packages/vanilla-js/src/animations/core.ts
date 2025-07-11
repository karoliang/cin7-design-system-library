/**
 * Core animation utilities
 */

export interface AnimationOptions {
  duration?: number;
  easing?: string;
  delay?: number;
  fill?: FillMode;
}

/**
 * Animate element with keyframes
 */
export function animate(
  element: HTMLElement,
  keyframes: Keyframe[] | PropertyIndexedKeyframes,
  options: number | AnimationOptions = {}
): Animation {
  const defaultOptions: KeyframeAnimationOptions = {
    duration: 300,
    easing: 'ease-out',
    fill: 'forwards',
  };
  
  const animationOptions = typeof options === 'number'
    ? { ...defaultOptions, duration: options }
    : { ...defaultOptions, ...options };
  
  return element.animate(keyframes, animationOptions);
}

/**
 * Wait for animation to complete
 */
export function waitForAnimation(animation: Animation): Promise<void> {
  return new Promise((resolve, reject) => {
    animation.onfinish = () => resolve();
    animation.oncancel = () => reject(new Error('Animation cancelled'));
  });
}

/**
 * Animate multiple elements in sequence
 */
export async function animateSequence(
  animations: Array<{
    element: HTMLElement;
    keyframes: Keyframe[] | PropertyIndexedKeyframes;
    options?: number | AnimationOptions;
  }>
): Promise<void> {
  for (const { element, keyframes, options } of animations) {
    const animation = animate(element, keyframes, options);
    await waitForAnimation(animation);
  }
}

/**
 * Animate multiple elements in parallel
 */
export function animateParallel(
  animations: Array<{
    element: HTMLElement;
    keyframes: Keyframe[] | PropertyIndexedKeyframes;
    options?: number | AnimationOptions;
  }>
): Promise<void[]> {
  const promises = animations.map(({ element, keyframes, options }) => {
    const animation = animate(element, keyframes, options);
    return waitForAnimation(animation);
  });
  
  return Promise.all(promises);
}

/**
 * Common easing functions
 */
export const Easing = {
  linear: 'linear',
  easeIn: 'ease-in',
  easeOut: 'ease-out',
  easeInOut: 'ease-in-out',
  
  // Cubic bezier presets
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  
  // Bounce
  bounceIn: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
  bounceOut: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  
  // Elastic
  elastic: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

/**
 * Request animation frame helper
 */
export function raf(callback: FrameRequestCallback): number {
  return requestAnimationFrame(callback);
}

/**
 * Cancel animation frame
 */
export function cancelRaf(id: number): void {
  cancelAnimationFrame(id);
}

/**
 * Animation loop helper
 */
export function animationLoop(
  callback: (deltaTime: number, totalTime: number) => boolean | void
): () => void {
  let rafId: number;
  let startTime: number;
  let lastTime: number;
  
  const loop = (currentTime: number) => {
    if (!startTime) {
      startTime = currentTime;
      lastTime = currentTime;
    }
    
    const deltaTime = currentTime - lastTime;
    const totalTime = currentTime - startTime;
    lastTime = currentTime;
    
    const shouldContinue = callback(deltaTime, totalTime);
    if (shouldContinue !== false) {
      rafId = raf(loop);
    }
  };
  
  rafId = raf(loop);
  
  return () => cancelRaf(rafId);
}