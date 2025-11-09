import type { CodeVariant } from './types';

export const backdropExamples: Record<string, CodeVariant> = {
  default: {
    react: `import {Backdrop} from '@shopify/polaris';
import {useState} from 'react';

function BackdropExample() {
  const [active, setActive] = useState(true);

  return (
    <>
      <Backdrop onClick={() => setActive(false)} />
      {active && <div>Content behind backdrop</div>}
    </>
  );
}

export default BackdropExample;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-backdrop" id="backdrop"></div>
<div class="content">Content behind backdrop</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const backdrop = $('#backdrop');
const content = $('.content');

on(backdrop, 'click', () => {
  backdrop.style.display = 'none';
  content.style.display = 'none';
});
</script>`,
    extjs: `// ExtJS Backdrop using mask
Ext.getBody().mask('', 'polaris-backdrop');

// Remove backdrop on click
Ext.getBody().on('click', function() {
  Ext.getBody().unmask();
});`,
    typescript: `import {Backdrop} from '@shopify/polaris';
import {useState, useCallback, useEffect} from 'react';

// Backdrop visibility states
enum BackdropState {
  Visible = 'visible',
  Hidden = 'hidden',
  Animating = 'animating'
}

// Click handler type for backdrop interactions
type BackdropClickHandler = (event?: React.MouseEvent) => void;

// Backdrop configuration interface
interface BackdropConfig {
  initialState?: BackdropState;
  closeOnClick?: boolean;
  preventBodyScroll?: boolean;
  animationDuration?: number;
}

// Main backdrop component props
interface BackdropExampleProps {
  initialActive?: boolean;
  config?: BackdropConfig;
  onBackdropClick?: BackdropClickHandler;
  onStateChange?: (state: BackdropState) => void;
}

// Backdrop state management
interface BackdropStateManager {
  current: BackdropState;
  previous: BackdropState | null;
  transitionTime: number;
}

function BackdropExample({
  initialActive = true,
  config = {
    closeOnClick: true,
    preventBodyScroll: true,
    animationDuration: 200
  },
  onBackdropClick,
  onStateChange
}: BackdropExampleProps): JSX.Element {
  const [active, setActive] = useState<boolean>(initialActive);
  const [stateManager, setStateManager] = useState<BackdropStateManager>({
    current: initialActive ? BackdropState.Visible : BackdropState.Hidden,
    previous: null,
    transitionTime: Date.now()
  });

  // Update state manager when visibility changes
  useEffect(() => {
    const newState = active ? BackdropState.Visible : BackdropState.Hidden;
    setStateManager(prev => ({
      current: newState,
      previous: prev.current,
      transitionTime: Date.now()
    }));
    onStateChange?.(newState);
  }, [active, onStateChange]);

  // Handle body scroll lock
  useEffect(() => {
    if (config.preventBodyScroll && active) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [active, config.preventBodyScroll]);

  const handleBackdropClick = useCallback<BackdropClickHandler>((event) => {
    if (config.closeOnClick) {
      setStateManager(prev => ({
        current: BackdropState.Animating,
        previous: prev.current,
        transitionTime: Date.now()
      }));

      setTimeout(() => {
        setActive(false);
      }, config.animationDuration || 0);
    }
    onBackdropClick?.(event);
  }, [config.closeOnClick, config.animationDuration, onBackdropClick]);

  return (
    <>
      {active && <Backdrop onClick={handleBackdropClick} />}
      {active && <div>Content behind backdrop</div>}
    </>
  );
}

export default BackdropExample;`
  },

  'with-onclick': {
    react: `import {Backdrop, Button, Modal} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function BackdropWithClickHandler() {
  const [showBackdrop, setShowBackdrop] = useState(false);

  const handleBackdropClick = useCallback(() => {
    console.log('Backdrop clicked');
    setShowBackdrop(false);
  }, []);

  return (
    <>
      <Button onClick={() => setShowBackdrop(true)}>Show Backdrop</Button>
      {showBackdrop && <Backdrop onClick={handleBackdropClick} />}
    </>
  );
}

export default BackdropWithClickHandler;`,
    vanilla: `<!-- HTML Structure -->
<button id="show-backdrop">Show Backdrop</button>
<div class="polaris-backdrop" id="backdrop" style="display: none;"></div>

<script>
import { $, on } from '@cin7/vanilla-js';

const button = $('#show-backdrop');
const backdrop = $('#backdrop');

on(button, 'click', () => {
  backdrop.style.display = 'block';
});

on(backdrop, 'click', () => {
  console.log('Backdrop clicked');
  backdrop.style.display = 'none';
});
</script>`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Show Backdrop',
  handler: function() {
    Ext.getBody().mask('', 'polaris-backdrop');

    Ext.getBody().on('click', function handler() {
      console.log('Backdrop clicked');
      Ext.getBody().unmask();
      Ext.getBody().un('click', handler);
    }, null, {single: true});
  },
  renderTo: Ext.getBody()
});`,
    typescript: `import {Backdrop, Button} from '@shopify/polaris';
import {useState, useCallback, useRef, useEffect} from 'react';

// Click event tracking
interface ClickEvent {
  timestamp: number;
  target: EventTarget | null;
  propagated: boolean;
}

// Click handler with event metadata
type ClickHandlerWithMetadata = (
  event: React.MouseEvent,
  metadata: ClickEvent
) => void;

// Click tracking configuration
interface ClickTrackingConfig {
  logClicks?: boolean;
  preventPropagation?: boolean;
  trackClickHistory?: boolean;
  maxHistorySize?: number;
}

// Main component props
interface BackdropClickHandlerProps {
  config?: ClickTrackingConfig;
  onBackdropClick?: ClickHandlerWithMetadata;
  onBackdropShow?: () => void;
  onBackdropHide?: () => void;
}

// Click history entry
interface ClickHistoryEntry {
  id: string;
  event: ClickEvent;
  action: 'show' | 'hide' | 'click';
}

function BackdropWithClickHandler({
  config = {
    logClicks: true,
    preventPropagation: false,
    trackClickHistory: true,
    maxHistorySize: 10
  },
  onBackdropClick,
  onBackdropShow,
  onBackdropHide
}: BackdropClickHandlerProps): JSX.Element {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(false);
  const [clickHistory, setClickHistory] = useState<ClickHistoryEntry[]>([]);
  const clickCountRef = useRef<number>(0);

  // Track click history
  const addToHistory = useCallback((
    event: ClickEvent,
    action: 'show' | 'hide' | 'click'
  ) => {
    if (config.trackClickHistory) {
      setClickHistory(prev => {
        const entry: ClickHistoryEntry = {
          id: \`click-\${Date.now()}-\${clickCountRef.current++}\`,
          event,
          action
        };
        const newHistory = [entry, ...prev];
        return newHistory.slice(0, config.maxHistorySize || 10);
      });
    }
  }, [config.trackClickHistory, config.maxHistorySize]);

  // Show backdrop handler
  const handleShowBackdrop = useCallback(() => {
    setShowBackdrop(true);
    const event: ClickEvent = {
      timestamp: Date.now(),
      target: null,
      propagated: false
    };
    addToHistory(event, 'show');
    onBackdropShow?.();
  }, [addToHistory, onBackdropShow]);

  // Backdrop click handler
  const handleBackdropClick = useCallback((e: React.MouseEvent) => {
    const clickEvent: ClickEvent = {
      timestamp: Date.now(),
      target: e.target,
      propagated: !config.preventPropagation
    };

    if (config.preventPropagation) {
      e.stopPropagation();
    }

    if (config.logClicks) {
      console.log('Backdrop clicked at:', new Date(clickEvent.timestamp).toISOString());
    }

    addToHistory(clickEvent, 'click');
    setShowBackdrop(false);
    onBackdropClick?.(e, clickEvent);
    onBackdropHide?.();
  }, [config, addToHistory, onBackdropClick, onBackdropHide]);

  return (
    <>
      <Button onClick={handleShowBackdrop}>Show Backdrop</Button>
      {showBackdrop && <Backdrop onClick={handleBackdropClick} />}
    </>
  );
}

export default BackdropWithClickHandler;`
  },

  transparent: {
    react: `import {Backdrop} from '@shopify/polaris';
import {useState} from 'react';

function TransparentBackdrop() {
  const [active, setActive] = useState(true);

  return (
    <>
      <Backdrop
        transparent
        onClick={() => setActive(false)}
      />
      <div>Content visible through transparent backdrop</div>
    </>
  );
}

export default TransparentBackdrop;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-backdrop polaris-backdrop--transparent" id="backdrop"></div>
<div class="content">Content visible through transparent backdrop</div>

<style>
.polaris-backdrop--transparent {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>

<script>
import { $, on } from '@cin7/vanilla-js';

const backdrop = $('#backdrop');
on(backdrop, 'click', () => {
  backdrop.style.display = 'none';
});
</script>`,
    extjs: `// ExtJS transparent backdrop
Ext.getBody().mask('', 'polaris-backdrop-transparent');

// Custom CSS for transparency
Ext.util.CSS.createStyleSheet(
  '.polaris-backdrop-transparent { background-color: rgba(0, 0, 0, 0.2) !important; }',
  'backdrop-transparency'
);

Ext.getBody().on('click', function() {
  Ext.getBody().unmask();
});`,
    typescript: `import {Backdrop} from '@shopify/polaris';
import {useState, useCallback, useMemo, CSSProperties} from 'react';

// Opacity levels type
type OpacityLevel = number;

// Transparency configuration
interface TransparencyConfig {
  minOpacity: OpacityLevel;
  maxOpacity: OpacityLevel;
  defaultOpacity: OpacityLevel;
  animateTransparency?: boolean;
  transitionDuration?: number;
}

// Animation states for transparent backdrops
enum TransparencyState {
  Solid = 'solid',
  Transparent = 'transparent',
  Transitioning = 'transitioning'
}

// Style overrides for transparency
interface TransparentBackdropStyles {
  backdrop?: CSSProperties;
  content?: CSSProperties;
  container?: CSSProperties;
}

// Main component props
interface TransparentBackdropProps {
  config?: TransparencyConfig;
  styles?: TransparentBackdropStyles;
  onDismiss?: () => void;
  onOpacityChange?: (opacity: OpacityLevel) => void;
  onTransparencyStateChange?: (state: TransparencyState) => void;
}

// Transparency state manager
interface TransparencyStateManager {
  currentState: TransparencyState;
  currentOpacity: OpacityLevel;
  targetOpacity: OpacityLevel;
  isAnimating: boolean;
}

function TransparentBackdrop({
  config = {
    minOpacity: 0,
    maxOpacity: 1,
    defaultOpacity: 0.2,
    animateTransparency: true,
    transitionDuration: 300
  },
  styles = {},
  onDismiss,
  onOpacityChange,
  onTransparencyStateChange
}: TransparentBackdropProps): JSX.Element {
  const [active, setActive] = useState<boolean>(true);
  const [transparencyState, setTransparencyState] = useState<TransparencyStateManager>({
    currentState: TransparencyState.Transparent,
    currentOpacity: config.defaultOpacity,
    targetOpacity: config.defaultOpacity,
    isAnimating: false
  });

  // Calculate backdrop opacity
  const backdropOpacity = useMemo<OpacityLevel>(() => {
    return Math.min(
      Math.max(transparencyState.currentOpacity, config.minOpacity),
      config.maxOpacity
    );
  }, [transparencyState.currentOpacity, config.minOpacity, config.maxOpacity]);

  // Handle backdrop dismissal with animation
  const handleBackdropClick = useCallback(() => {
    if (config.animateTransparency) {
      setTransparencyState(prev => ({
        ...prev,
        currentState: TransparencyState.Transitioning,
        targetOpacity: 0,
        isAnimating: true
      }));
      onTransparencyStateChange?.(TransparencyState.Transitioning);

      setTimeout(() => {
        setActive(false);
        onDismiss?.();
      }, config.transitionDuration || 300);
    } else {
      setActive(false);
      onDismiss?.();
    }
  }, [config.animateTransparency, config.transitionDuration, onDismiss, onTransparencyStateChange]);

  // Compute dynamic styles
  const computedBackdropStyle = useMemo<CSSProperties>(() => ({
    opacity: backdropOpacity,
    transition: config.animateTransparency
      ? \`opacity \${config.transitionDuration}ms ease-in-out\`
      : 'none',
    ...styles.backdrop
  }), [backdropOpacity, config.animateTransparency, config.transitionDuration, styles.backdrop]);

  const computedContentStyle = useMemo<CSSProperties>(() => ({
    opacity: active ? 1 : 0,
    transition: \`opacity \${config.transitionDuration}ms ease-in-out\`,
    ...styles.content
  }), [active, config.transitionDuration, styles.content]);

  return (
    <div style={styles.container}>
      {active && (
        <Backdrop
          transparent
          onClick={handleBackdropClick}
        />
      )}
      <div style={computedContentStyle}>
        Content visible through transparent backdrop (opacity: {backdropOpacity.toFixed(2)})
      </div>
    </div>
  );
}

export default TransparentBackdrop;`
  },

  'below-navigation': {
    react: `import {Backdrop, TopBar, Frame} from '@shopify/polaris';
import {useState} from 'react';

function BackdropBelowNavigation() {
  const [showBackdrop, setShowBackdrop] = useState(true);

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      userMenu={<div>User Menu</div>}
    />
  );

  return (
    <Frame topBar={topBarMarkup}>
      {showBackdrop && (
        <Backdrop
          belowNavigation
          onClick={() => setShowBackdrop(false)}
        />
      )}
      <div>Main content area</div>
    </Frame>
  );
}

export default BackdropBelowNavigation;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-frame">
  <div class="polaris-top-bar" style="z-index: 100;">
    <div class="polaris-top-bar__navigation">Navigation</div>
  </div>
  <div class="polaris-backdrop polaris-backdrop--below-navigation"
       id="backdrop"
       style="z-index: 50;"></div>
  <div class="polaris-frame__content">Main content area</div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const backdrop = $('#backdrop');
on(backdrop, 'click', () => {
  backdrop.style.display = 'none';
});
</script>`,
    extjs: `// ExtJS backdrop with custom z-index
const viewport = Ext.create('Ext.container.Viewport', {
  layout: 'border',
  items: [{
    region: 'north',
    xtype: 'toolbar',
    height: 50,
    items: [{text: 'Navigation'}]
  }, {
    region: 'center',
    html: 'Main content area'
  }]
});

// Add backdrop below navigation
Ext.getBody().mask('', 'polaris-backdrop-below-nav');
Ext.query('.x-mask')[0].style.zIndex = '50';

Ext.getBody().on('click', function() {
  Ext.getBody().unmask();
});`,
    typescript: `import {Backdrop, TopBar, Frame} from '@shopify/polaris';
import {useState, useCallback, useMemo} from 'react';

// Z-index layers for stacking contexts
enum ZIndexLayer {
  Backdrop = 100,
  Navigation = 200,
  Modal = 300,
  Tooltip = 400,
  Overlay = 500
}

// Z-index management
interface ZIndexManager {
  current: ZIndexLayer;
  layers: Map<string, ZIndexLayer>;
  getNextLayer: () => ZIndexLayer;
}

// Navigation configuration
interface NavigationConfig {
  showToggle?: boolean;
  zIndex?: ZIndexLayer;
  fixed?: boolean;
  transparent?: boolean;
}

// Backdrop positioning relative to navigation
interface BackdropPositioning {
  belowNavigation: boolean;
  zIndex: ZIndexLayer;
  respectNavigationHeight?: boolean;
  offset?: number;
}

// Main component props
interface BackdropBelowNavigationProps {
  navigationConfig?: NavigationConfig;
  backdropPositioning?: BackdropPositioning;
  navigationContent?: React.ReactNode;
  onBackdropClick?: () => void;
  onNavigationInteraction?: (action: string) => void;
}

// Stacking context manager
interface StackingContext {
  navigationLayer: ZIndexLayer;
  backdropLayer: ZIndexLayer;
  contentLayer: ZIndexLayer;
}

function BackdropBelowNavigation({
  navigationConfig = {
    showToggle: true,
    zIndex: ZIndexLayer.Navigation,
    fixed: true,
    transparent: false
  },
  backdropPositioning = {
    belowNavigation: true,
    zIndex: ZIndexLayer.Backdrop,
    respectNavigationHeight: true,
    offset: 0
  },
  navigationContent,
  onBackdropClick,
  onNavigationInteraction
}: BackdropBelowNavigationProps): JSX.Element {
  const [showBackdrop, setShowBackdrop] = useState<boolean>(true);

  // Calculate stacking context
  const stackingContext = useMemo<StackingContext>(() => ({
    navigationLayer: navigationConfig.zIndex || ZIndexLayer.Navigation,
    backdropLayer: backdropPositioning.belowNavigation
      ? ZIndexLayer.Backdrop
      : ZIndexLayer.Modal,
    contentLayer: 1
  }), [navigationConfig.zIndex, backdropPositioning.belowNavigation]);

  // Handle backdrop click with z-index awareness
  const handleBackdropClick = useCallback(() => {
    // Ensure backdrop is still below navigation
    if (stackingContext.backdropLayer < stackingContext.navigationLayer) {
      setShowBackdrop(false);
      onBackdropClick?.();
    }
  }, [stackingContext.backdropLayer, stackingContext.navigationLayer, onBackdropClick]);

  // Handle navigation interactions
  const handleNavigationToggle = useCallback(() => {
    onNavigationInteraction?.('toggle');
  }, [onNavigationInteraction]);

  // Computed navigation styles
  const navigationStyles = useMemo(() => ({
    zIndex: stackingContext.navigationLayer,
    position: navigationConfig.fixed ? 'fixed' as const : 'relative' as const,
    opacity: navigationConfig.transparent ? 0.9 : 1
  }), [stackingContext.navigationLayer, navigationConfig.fixed, navigationConfig.transparent]);

  const topBarMarkup = (
    <TopBar
      showNavigationToggle={navigationConfig.showToggle}
      onNavigationToggle={handleNavigationToggle}
      userMenu={navigationContent || <div>User Menu</div>}
    />
  );

  return (
    <Frame topBar={topBarMarkup}>
      {showBackdrop && (
        <Backdrop
          belowNavigation={backdropPositioning.belowNavigation}
          onClick={handleBackdropClick}
        />
      )}
      <div style={{zIndex: stackingContext.contentLayer}}>
        Main content area (Navigation z-index: {stackingContext.navigationLayer}, Backdrop z-index: {stackingContext.backdropLayer})
      </div>
    </Frame>
  );
}

export default BackdropBelowNavigation;`
  },

  'with-loading': {
    react: `import {Backdrop, Spinner} from '@shopify/polaris';
import {useState, useEffect} from 'react';

function BackdropWithLoadingSpinner() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && (
        <>
          <Backdrop />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000
          }}>
            <Spinner size="large" />
          </div>
        </>
      )}
      <div>Content loads after 3 seconds</div>
    </>
  );
}

export default BackdropWithLoadingSpinner;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-backdrop" id="backdrop"></div>
<div class="loading-spinner" id="spinner">
  <div class="polaris-spinner polaris-spinner--large"></div>
</div>
<div class="content">Content loads after 3 seconds</div>

<style>
.loading-spinner {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}
</style>

<script>
import { $, fadeOut } from '@cin7/vanilla-js';

const backdrop = $('#backdrop');
const spinner = $('#spinner');

setTimeout(() => {
  fadeOut(backdrop);
  fadeOut(spinner);
}, 3000);
</script>`,
    extjs: `// ExtJS loading mask with spinner
Ext.getBody().mask('Loading...', 'polaris-backdrop-loading');

// Remove after 3 seconds
setTimeout(function() {
  Ext.getBody().unmask();
}, 3000);`,
    typescript: `import {Backdrop, Spinner} from '@shopify/polaris';
import {useState, useEffect, useCallback, useRef} from 'react';

// Loading states for spinner backdrop
enum LoadingState {
  Idle = 'idle',
  Loading = 'loading',
  Complete = 'complete',
  Error = 'error',
  Cancelled = 'cancelled'
}

// Spinner configuration
interface SpinnerConfig {
  size?: 'small' | 'large';
  color?: 'teal' | 'inkLightest';
  accessibilityLabel?: string;
}

// Loading progress tracking
interface LoadingProgress {
  state: LoadingState;
  startTime: number;
  endTime: number | null;
  duration: number;
  percentage: number;
}

// Loading callbacks
interface LoadingCallbacks {
  onStart?: () => void;
  onProgress?: (progress: LoadingProgress) => void;
  onComplete?: () => void;
  onError?: (error: Error) => void;
  onCancel?: () => void;
}

// Main component props
interface BackdropWithLoadingSpinnerProps {
  loadingTime?: number;
  spinnerConfig?: SpinnerConfig;
  callbacks?: LoadingCallbacks;
  allowCancel?: boolean;
  showProgress?: boolean;
}

// Loading state manager
interface LoadingStateManager {
  currentState: LoadingState;
  progress: LoadingProgress;
  timerId: NodeJS.Timeout | null;
}

function BackdropWithLoadingSpinner({
  loadingTime = 3000,
  spinnerConfig = {
    size: 'large',
    color: 'teal',
    accessibilityLabel: 'Loading content'
  },
  callbacks = {},
  allowCancel = false,
  showProgress = false
}: BackdropWithLoadingSpinnerProps): JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingState, setLoadingState] = useState<LoadingStateManager>({
    currentState: LoadingState.Loading,
    progress: {
      state: LoadingState.Loading,
      startTime: Date.now(),
      endTime: null,
      duration: 0,
      percentage: 0
    },
    timerId: null
  });

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Update loading progress
  const updateProgress = useCallback(() => {
    setLoadingState(prev => {
      const elapsed = Date.now() - prev.progress.startTime;
      const percentage = Math.min((elapsed / loadingTime) * 100, 100);

      const updatedProgress: LoadingProgress = {
        ...prev.progress,
        duration: elapsed,
        percentage
      };

      callbacks.onProgress?.(updatedProgress);

      return {
        ...prev,
        progress: updatedProgress
      };
    });
  }, [loadingTime, callbacks]);

  // Initialize loading
  useEffect(() => {
    callbacks.onStart?.();

    // Track progress if enabled
    if (showProgress) {
      progressIntervalRef.current = setInterval(updateProgress, 100);
    }

    // Set completion timer
    const timer = setTimeout(() => {
      setLoadingState(prev => ({
        ...prev,
        currentState: LoadingState.Complete,
        progress: {
          ...prev.progress,
          state: LoadingState.Complete,
          endTime: Date.now(),
          percentage: 100
        }
      }));

      setLoading(false);
      callbacks.onComplete?.();
    }, loadingTime);

    return () => {
      clearTimeout(timer);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [loadingTime, showProgress, updateProgress, callbacks]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    if (allowCancel) {
      setLoadingState(prev => ({
        ...prev,
        currentState: LoadingState.Cancelled,
        progress: {
          ...prev.progress,
          state: LoadingState.Cancelled,
          endTime: Date.now()
        }
      }));

      setLoading(false);
      callbacks.onCancel?.();
    }
  }, [allowCancel, callbacks]);

  return (
    <>
      {loading && (
        <>
          <Backdrop onClick={allowCancel ? handleCancel : undefined} />
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            textAlign: 'center'
          }}>
            <Spinner
              size={spinnerConfig.size}
              accessibilityLabel={spinnerConfig.accessibilityLabel}
            />
            {showProgress && (
              <div style={{marginTop: '16px', color: '#fff'}}>
                Loading: {loadingState.progress.percentage.toFixed(0)}%
              </div>
            )}
            {allowCancel && (
              <div style={{marginTop: '8px'}}>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            )}
          </div>
        </>
      )}
      <div>
        Content loads after {loadingTime / 1000} seconds
        {loadingState.currentState === LoadingState.Complete && ' - Loaded!'}
        {loadingState.currentState === LoadingState.Cancelled && ' - Cancelled'}
      </div>
    </>
  );
}

export default BackdropWithLoadingSpinner;`
  },

  'modal-integration': {
    react: `import {Backdrop, Modal, Button, TextContainer} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function BackdropModalIntegration() {
  const [modalActive, setModalActive] = useState(false);

  const handleModalChange = useCallback(
    () => setModalActive(!modalActive),
    [modalActive]
  );

  return (
    <>
      <Button onClick={handleModalChange}>Open Modal</Button>
      <Modal
        open={modalActive}
        onClose={handleModalChange}
        title="Modal with Backdrop"
      >
        <Modal.Section>
          <TextContainer>
            <p>This modal uses a backdrop automatically.</p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
}

export default BackdropModalIntegration;`,
    vanilla: `<!-- HTML Structure -->
<button id="open-modal">Open Modal</button>

<div class="polaris-backdrop" id="backdrop" style="display: none;"></div>
<div class="polaris-modal" id="modal" style="display: none;">
  <div class="polaris-modal__header">
    <h2>Modal with Backdrop</h2>
    <button id="close-modal">×</button>
  </div>
  <div class="polaris-modal__content">
    <p>This modal uses a backdrop automatically.</p>
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const openBtn = $('#open-modal');
const closeBtn = $('#close-modal');
const backdrop = $('#backdrop');
const modal = $('#modal');

function showModal() {
  backdrop.style.display = 'block';
  modal.style.display = 'block';
}

function hideModal() {
  backdrop.style.display = 'none';
  modal.style.display = 'none';
}

on(openBtn, 'click', showModal);
on(closeBtn, 'click', hideModal);
on(backdrop, 'click', hideModal);
</script>`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Open Modal',
  handler: function() {
    Ext.create('Ext.window.Window', {
      title: 'Modal with Backdrop',
      modal: true,
      width: 400,
      height: 200,
      layout: 'fit',
      items: [{
        xtype: 'container',
        html: '<p>This modal uses a backdrop automatically.</p>'
      }]
    }).show();
  },
  renderTo: Ext.getBody()
});`,
    typescript: `import {Backdrop, Modal, Button, TextContainer} from '@shopify/polaris';
import {useState, useCallback, useRef, useEffect} from 'react';

// Modal states
enum ModalState {
  Closed = 'closed',
  Opening = 'opening',
  Open = 'open',
  Closing = 'closing'
}

// Portal configuration for modals
interface PortalConfig {
  containerId?: string;
  createContainer?: boolean;
  zIndex?: number;
}

// Modal backdrop integration settings
interface ModalBackdropIntegration {
  autoBackdrop?: boolean;
  backdropClickToClose?: boolean;
  lockBodyScroll?: boolean;
  animateBackdrop?: boolean;
}

// Modal state tracker
interface ModalStateTracker {
  current: ModalState;
  previous: ModalState | null;
  openedAt: number | null;
  closedAt: number | null;
  duration: number;
}

// Main component props
interface BackdropModalIntegrationProps {
  modalTitle?: string;
  modalContent?: React.ReactNode;
  portalConfig?: PortalConfig;
  backdropIntegration?: ModalBackdropIntegration;
  onModalOpen?: () => void;
  onModalClose?: () => void;
  onBackdropClick?: () => void;
  onStateChange?: (state: ModalState) => void;
}

function BackdropModalIntegration({
  modalTitle = 'Modal with Backdrop',
  modalContent,
  portalConfig = {
    containerId: 'modal-portal',
    createContainer: true,
    zIndex: 1000
  },
  backdropIntegration = {
    autoBackdrop: true,
    backdropClickToClose: true,
    lockBodyScroll: true,
    animateBackdrop: true
  },
  onModalOpen,
  onModalClose,
  onBackdropClick,
  onStateChange
}: BackdropModalIntegrationProps): JSX.Element {
  const [modalActive, setModalActive] = useState<boolean>(false);
  const [stateTracker, setStateTracker] = useState<ModalStateTracker>({
    current: ModalState.Closed,
    previous: null,
    openedAt: null,
    closedAt: null,
    duration: 0
  });

  const portalRef = useRef<HTMLDivElement | null>(null);

  // Create portal container if needed
  useEffect(() => {
    if (portalConfig.createContainer && portalConfig.containerId) {
      const existing = document.getElementById(portalConfig.containerId);
      if (!existing) {
        const container = document.createElement('div');
        container.id = portalConfig.containerId;
        container.style.zIndex = portalConfig.zIndex?.toString() || '1000';
        document.body.appendChild(container);
        portalRef.current = container;

        return () => {
          document.body.removeChild(container);
        };
      } else {
        portalRef.current = existing as HTMLDivElement;
      }
    }
  }, [portalConfig]);

  // Handle modal state transitions
  const transitionToState = useCallback((newState: ModalState) => {
    setStateTracker(prev => {
      const now = Date.now();
      const duration = prev.openedAt ? now - prev.openedAt : 0;

      return {
        current: newState,
        previous: prev.current,
        openedAt: newState === ModalState.Open ? now : prev.openedAt,
        closedAt: newState === ModalState.Closed ? now : prev.closedAt,
        duration: newState === ModalState.Closed ? duration : prev.duration
      };
    });
    onStateChange?.(newState);
  }, [onStateChange]);

  // Handle modal opening
  const handleModalOpen = useCallback(() => {
    transitionToState(ModalState.Opening);

    setTimeout(() => {
      setModalActive(true);
      transitionToState(ModalState.Open);
      onModalOpen?.();
    }, backdropIntegration.animateBackdrop ? 150 : 0);
  }, [transitionToState, onModalOpen, backdropIntegration.animateBackdrop]);

  // Handle modal closing
  const handleModalClose = useCallback(() => {
    transitionToState(ModalState.Closing);

    setTimeout(() => {
      setModalActive(false);
      transitionToState(ModalState.Closed);
      onModalClose?.();
    }, backdropIntegration.animateBackdrop ? 150 : 0);
  }, [transitionToState, onModalClose, backdropIntegration.animateBackdrop]);

  // Handle backdrop click
  const handleBackdropInteraction = useCallback(() => {
    onBackdropClick?.();
    if (backdropIntegration.backdropClickToClose) {
      handleModalClose();
    }
  }, [onBackdropClick, backdropIntegration.backdropClickToClose, handleModalClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (backdropIntegration.lockBodyScroll && modalActive) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [modalActive, backdropIntegration.lockBodyScroll]);

  return (
    <>
      <Button onClick={handleModalOpen}>Open Modal</Button>
      <Modal
        open={modalActive}
        onClose={handleModalClose}
        title={modalTitle}
      >
        <Modal.Section>
          <TextContainer>
            {modalContent || (
              <p>
                This modal uses a backdrop automatically.
                State: {stateTracker.current}
                {stateTracker.duration > 0 && \` (was open for \${stateTracker.duration}ms)\`}
              </p>
            )}
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
}

export default BackdropModalIntegration;`
  },

  'multi-layer': {
    react: `import {Backdrop, Modal, Button} from '@shopify/polaris';
import {useState, useCallback} from 'react';

function MultiLayerBackdrops() {
  const [firstModal, setFirstModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);

  return (
    <>
      <Button onClick={() => setFirstModal(true)}>Open First Modal</Button>

      <Modal
        open={firstModal}
        onClose={() => setFirstModal(false)}
        title="First Modal"
      >
        <Modal.Section>
          <Button onClick={() => setSecondModal(true)}>Open Second Modal</Button>
        </Modal.Section>
      </Modal>

      <Modal
        open={secondModal}
        onClose={() => setSecondModal(false)}
        title="Second Modal"
      >
        <Modal.Section>
          <p>This is a nested modal with multiple backdrops.</p>
        </Modal.Section>
      </Modal>
    </>
  );
}

export default MultiLayerBackdrops;`,
    vanilla: `<!-- HTML Structure -->
<button id="open-first">Open First Modal</button>

<div class="polaris-backdrop backdrop-1" id="backdrop-1" style="display: none; z-index: 100;"></div>
<div class="polaris-modal modal-1" id="modal-1" style="display: none; z-index: 101;">
  <div class="polaris-modal__content">
    <h2>First Modal</h2>
    <button id="open-second">Open Second Modal</button>
  </div>
</div>

<div class="polaris-backdrop backdrop-2" id="backdrop-2" style="display: none; z-index: 200;"></div>
<div class="polaris-modal modal-2" id="modal-2" style="display: none; z-index: 201;">
  <div class="polaris-modal__content">
    <h2>Second Modal</h2>
    <p>This is a nested modal with multiple backdrops.</p>
    <button id="close-second">Close</button>
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const openFirst = $('#open-first');
const openSecond = $('#open-second');
const closeSecond = $('#close-second');

on(openFirst, 'click', () => {
  $('#backdrop-1').style.display = 'block';
  $('#modal-1').style.display = 'block';
});

on(openSecond, 'click', () => {
  $('#backdrop-2').style.display = 'block';
  $('#modal-2').style.display = 'block';
});

on(closeSecond, 'click', () => {
  $('#backdrop-2').style.display = 'none';
  $('#modal-2').style.display = 'none';
});
</script>`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Open First Modal',
  handler: function() {
    const firstWindow = Ext.create('Ext.window.Window', {
      title: 'First Modal',
      modal: true,
      width: 400,
      height: 200,
      items: [{
        xtype: 'button',
        text: 'Open Second Modal',
        handler: function() {
          Ext.create('Ext.window.Window', {
            title: 'Second Modal',
            modal: true,
            width: 350,
            height: 150,
            html: '<p>This is a nested modal with multiple backdrops.</p>'
          }).show();
        }
      }]
    });
    firstWindow.show();
  },
  renderTo: Ext.getBody()
});`,
    typescript: `import {Backdrop, Modal, Button} from '@shopify/polaris';
import {useState, useCallback, useMemo} from 'react';

// Modal layer identifier
type ModalLayerId = string;

// Z-index stack for multiple backdrops
interface ZIndexStack {
  base: number;
  increment: number;
  layers: Map<ModalLayerId, number>;
}

// Modal layer state
interface ModalLayerState {
  id: ModalLayerId;
  isOpen: boolean;
  zIndex: number;
  parent: ModalLayerId | null;
  children: ModalLayerId[];
  openedAt: number | null;
}

// Stack manager for multi-layer backdrops
interface BackdropStackManager {
  layers: Map<ModalLayerId, ModalLayerState>;
  activeCount: number;
  maxDepth: number;
  currentDepth: number;
}

// Main component props
interface MultiLayerBackdropsProps {
  firstModalTitle?: string;
  secondModalTitle?: string;
  maxStackDepth?: number;
  zIndexConfig?: ZIndexStack;
  onStackChange?: (manager: BackdropStackManager) => void;
}

function MultiLayerBackdrops({
  firstModalTitle = 'First Modal',
  secondModalTitle = 'Second Modal',
  maxStackDepth = 5,
  zIndexConfig = {
    base: 1000,
    increment: 100,
    layers: new Map()
  },
  onStackChange
}: MultiLayerBackdropsProps): JSX.Element {
  const [firstModal, setFirstModal] = useState<boolean>(false);
  const [secondModal, setSecondModal] = useState<boolean>(false);

  // Track backdrop stack state
  const [stackManager, setStackManager] = useState<BackdropStackManager>({
    layers: new Map(),
    activeCount: 0,
    maxDepth: maxStackDepth,
    currentDepth: 0
  });

  // Calculate z-index for each modal layer
  const firstModalZIndex = useMemo(() =>
    zIndexConfig.base + (zIndexConfig.increment * 1),
    [zIndexConfig]
  );

  const secondModalZIndex = useMemo(() =>
    zIndexConfig.base + (zIndexConfig.increment * 2),
    [zIndexConfig]
  );

  // Update stack when modals open/close
  const updateStack = useCallback((
    modalId: ModalLayerId,
    isOpen: boolean,
    parent: ModalLayerId | null = null
  ) => {
    setStackManager(prev => {
      const newLayers = new Map(prev.layers);

      if (isOpen) {
        const zIndex = zIndexConfig.base + (zIndexConfig.increment * (prev.currentDepth + 1));
        newLayers.set(modalId, {
          id: modalId,
          isOpen: true,
          zIndex,
          parent,
          children: [],
          openedAt: Date.now()
        });

        // Update parent's children
        if (parent && newLayers.has(parent)) {
          const parentLayer = newLayers.get(parent)!;
          newLayers.set(parent, {
            ...parentLayer,
            children: [...parentLayer.children, modalId]
          });
        }
      } else {
        // Close this layer and all children
        const closeLayer = (layerId: ModalLayerId) => {
          const layer = newLayers.get(layerId);
          if (layer) {
            layer.children.forEach(closeLayer);
            newLayers.delete(layerId);
          }
        };
        closeLayer(modalId);
      }

      const newManager: BackdropStackManager = {
        layers: newLayers,
        activeCount: newLayers.size,
        maxDepth: prev.maxDepth,
        currentDepth: newLayers.size
      };

      onStackChange?.(newManager);
      return newManager;
    });
  }, [zIndexConfig, onStackChange]);

  // Handle first modal
  const handleFirstModalOpen = useCallback(() => {
    setFirstModal(true);
    updateStack('first-modal', true);
  }, [updateStack]);

  const handleFirstModalClose = useCallback(() => {
    setFirstModal(false);
    setSecondModal(false); // Close children
    updateStack('first-modal', false);
  }, [updateStack]);

  // Handle second modal
  const handleSecondModalOpen = useCallback(() => {
    if (stackManager.currentDepth < stackManager.maxDepth) {
      setSecondModal(true);
      updateStack('second-modal', true, 'first-modal');
    }
  }, [stackManager.currentDepth, stackManager.maxDepth, updateStack]);

  const handleSecondModalClose = useCallback(() => {
    setSecondModal(false);
    updateStack('second-modal', false);
  }, [updateStack]);

  return (
    <>
      <Button onClick={handleFirstModalOpen}>Open First Modal</Button>

      <Modal
        open={firstModal}
        onClose={handleFirstModalClose}
        title={\`\${firstModalTitle} (Layer 1, z-index: \${firstModalZIndex})\`}
      >
        <Modal.Section>
          <p>Active layers: {stackManager.activeCount} / {stackManager.maxDepth}</p>
          <Button
            onClick={handleSecondModalOpen}
            disabled={stackManager.currentDepth >= stackManager.maxDepth}
          >
            Open Second Modal
          </Button>
        </Modal.Section>
      </Modal>

      <Modal
        open={secondModal}
        onClose={handleSecondModalClose}
        title={\`\${secondModalTitle} (Layer 2, z-index: \${secondModalZIndex})\`}
      >
        <Modal.Section>
          <p>This is a nested modal with multiple backdrops.</p>
          <p>Current stack depth: {stackManager.currentDepth}</p>
        </Modal.Section>
      </Modal>
    </>
  );
}

export default MultiLayerBackdrops;`
  },

  accessibility: {
    react: `import {Backdrop, Modal, Button, TextField} from '@shopify/polaris';
import {useState, useCallback, useRef, useEffect} from 'react';

function BackdropAccessibilityFocus() {
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (active && inputRef.current) {
      inputRef.current.focus();
    }
  }, [active]);

  const handleToggle = useCallback(() => setActive(!active), [active]);

  return (
    <>
      <Button onClick={handleToggle}>Open Accessible Modal</Button>
      <Modal
        open={active}
        onClose={handleToggle}
        title="Accessible Modal"
      >
        <Modal.Section>
          <TextField
            label="Name"
            value=""
            onChange={() => {}}
            autoFocus
          />
        </Modal.Section>
      </Modal>
    </>
  );
}

export default BackdropAccessibilityFocus;`,
    vanilla: `<!-- HTML Structure -->
<button id="open-modal">Open Accessible Modal</button>

<div class="polaris-backdrop" id="backdrop" style="display: none;" aria-hidden="true"></div>
<div class="polaris-modal" id="modal" style="display: none;" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="polaris-modal__header">
    <h2 id="modal-title">Accessible Modal</h2>
  </div>
  <div class="polaris-modal__content">
    <label for="name-input">Name</label>
    <input type="text" id="name-input" class="polaris-text-field__input" />
  </div>
  <button id="close-modal" aria-label="Close modal">×</button>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

const openBtn = $('#open-modal');
const closeBtn = $('#close-modal');
const backdrop = $('#backdrop');
const modal = $('#modal');
const nameInput = $('#name-input');

function showModal() {
  backdrop.style.display = 'block';
  backdrop.setAttribute('aria-hidden', 'false');
  modal.style.display = 'block';
  nameInput.focus();
  document.body.style.overflow = 'hidden';
}

function hideModal() {
  backdrop.style.display = 'none';
  backdrop.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  document.body.style.overflow = '';
  openBtn.focus();
}

on(openBtn, 'click', showModal);
on(closeBtn, 'click', hideModal);
on(backdrop, 'click', hideModal);
</script>`,
    extjs: `Ext.create('Ext.button.Button', {
  text: 'Open Accessible Modal',
  handler: function() {
    const win = Ext.create('Ext.window.Window', {
      title: 'Accessible Modal',
      modal: true,
      width: 400,
      height: 200,
      layout: 'fit',
      items: [{
        xtype: 'form',
        bodyPadding: 10,
        items: [{
          xtype: 'textfield',
          fieldLabel: 'Name',
          name: 'name',
          listeners: {
            afterrender: function(field) {
              field.focus();
            }
          }
        }]
      }],
      listeners: {
        close: function() {
          // Return focus to trigger button
          Ext.getCmp('open-btn').focus();
        }
      }
    });
    win.show();
  },
  id: 'open-btn',
  renderTo: Ext.getBody()
});`,
    typescript: `import {Backdrop, Modal, Button, TextField} from '@shopify/polaris';
import {useState, useCallback, useRef, useEffect} from 'react';

// Focus management types
type FocusableElement = HTMLElement | null;

// Focus trap configuration
interface FocusTrapConfig {
  enabled?: boolean;
  returnFocus?: boolean;
  initialFocus?: 'first' | 'last' | 'none';
  escapeDeactivates?: boolean;
}

// Accessibility metadata
interface AccessibilityMetadata {
  ariaLabel?: string;
  ariaDescribedBy?: string;
  ariaLabelledBy?: string;
  role?: string;
  tabIndex?: number;
}

// Focus history for tracking
interface FocusHistoryEntry {
  element: FocusableElement;
  timestamp: number;
  trigger: 'open' | 'close' | 'user';
}

// Focus state manager
interface FocusStateManager {
  currentFocus: FocusableElement;
  previousFocus: FocusableElement;
  history: FocusHistoryEntry[];
  trapActive: boolean;
}

// Main component props
interface BackdropAccessibilityFocusProps {
  modalTitle?: string;
  focusTrapConfig?: FocusTrapConfig;
  accessibility?: AccessibilityMetadata;
  autoFocusField?: boolean;
  onModalClose?: () => void;
  onFocusChange?: (element: FocusableElement) => void;
}

function BackdropAccessibilityFocus({
  modalTitle = 'Accessible Modal',
  focusTrapConfig = {
    enabled: true,
    returnFocus: true,
    initialFocus: 'first',
    escapeDeactivates: true
  },
  accessibility = {
    role: 'dialog',
    ariaLabel: 'Accessible modal dialog',
    tabIndex: -1
  },
  autoFocusField = true,
  onModalClose,
  onFocusChange
}: BackdropAccessibilityFocusProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [focusState, setFocusState] = useState<FocusStateManager>({
    currentFocus: null,
    previousFocus: null,
    history: [],
    trapActive: false
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLInputElement>(null);

  // Track focus changes
  const trackFocus = useCallback((
    element: FocusableElement,
    trigger: 'open' | 'close' | 'user'
  ) => {
    setFocusState(prev => {
      const entry: FocusHistoryEntry = {
        element,
        timestamp: Date.now(),
        trigger
      };

      return {
        currentFocus: element,
        previousFocus: prev.currentFocus,
        history: [...prev.history.slice(-9), entry], // Keep last 10
        trapActive: prev.trapActive
      };
    });

    onFocusChange?.(element);
  }, [onFocusChange]);

  // Activate focus trap when modal opens
  useEffect(() => {
    if (active && focusTrapConfig.enabled) {
      setFocusState(prev => ({ ...prev, trapActive: true }));

      // Set initial focus
      if (focusTrapConfig.initialFocus === 'first' && firstFocusableRef.current) {
        firstFocusableRef.current.focus();
        trackFocus(firstFocusableRef.current, 'open');
      }

      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && focusTrapConfig.escapeDeactivates) {
          handleToggle();
        }
      };

      document.addEventListener('keydown', handleEscape);

      return () => {
        document.removeEventListener('keydown', handleEscape);
        setFocusState(prev => ({ ...prev, trapActive: false }));
      };
    }
  }, [active, focusTrapConfig, trackFocus]);

  // Return focus when modal closes
  useEffect(() => {
    if (!active && focusTrapConfig.returnFocus && buttonRef.current) {
      // Small delay to ensure modal is fully closed
      setTimeout(() => {
        buttonRef.current?.focus();
        trackFocus(buttonRef.current, 'close');
      }, 100);
    }
  }, [active, focusTrapConfig.returnFocus, trackFocus]);

  // Handle modal toggle
  const handleToggle = useCallback(() => {
    const newState = !active;
    setActive(newState);

    if (!newState) {
      onModalClose?.();
    }
  }, [active, onModalClose]);

  // Handle input changes with focus tracking
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value);
    if (firstFocusableRef.current) {
      trackFocus(firstFocusableRef.current, 'user');
    }
  }, [trackFocus]);

  return (
    <>
      <Button
        onClick={handleToggle}
        ref={buttonRef}
        ariaLabel="Open accessible modal with focus management"
      >
        Open Accessible Modal
      </Button>
      <Modal
        open={active}
        onClose={handleToggle}
        title={modalTitle}
      >
        <Modal.Section>
          <div
            ref={modalRef}
            role={accessibility.role}
            aria-label={accessibility.ariaLabel}
            tabIndex={accessibility.tabIndex}
          >
            <TextField
              label="Name"
              value={inputValue}
              onChange={handleInputChange}
              autoFocus={autoFocusField}
              autoComplete="off"
              ref={firstFocusableRef}
              helpText={\`Focus trap: \${focusState.trapActive ? 'Active' : 'Inactive'} | Focus history: \${focusState.history.length} entries\`}
            />
          </div>
        </Modal.Section>
      </Modal>
    </>
  );
}

export default BackdropAccessibilityFocus;`
  }
};


// Placeholder for other components (to be added)
// Banner Component Examples

export const dropzoneExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { DropZone, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function DropZoneExample() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const fileUpload = !files.length && (
    <DropZone.FileUpload />
  );

  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: '20px' }}>
      {files.map((file, index) => (
        <Text key={index} variant="bodySm" as="p">
          {file.name} ({file.size} bytes)
        </Text>
      ))}
    </div>
  );

  return (
    <DropZone onDrop={handleDrop}>
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}

export default DropZoneExample;`,

    vanilla: `<!-- DropZone Structure -->
<div class="polaris-drop-zone" id="drop-zone">
  <input type="file" id="file-input" style="display: none;" multiple />
  <div class="polaris-drop-zone__content">
    <div class="polaris-drop-zone__placeholder" id="placeholder">
      <span>Drop files here or click to upload</span>
    </div>
    <div class="polaris-drop-zone__files" id="file-list"></div>
  </div>
</div>

<script>
import { EventBus } from '@cin7/vanilla-js';

const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');
const placeholder = document.getElementById('placeholder');

// Handle click to browse
dropZone.addEventListener('click', () => {
  fileInput.click();
});

// Handle drag and drop
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZone.classList.add('polaris-drop-zone--dragging');
});

dropZone.addEventListener('dragleave', () => {
  dropZone.classList.remove('polaris-drop-zone--dragging');
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropZone.classList.remove('polaris-drop-zone--dragging');

  const files = Array.from(e.dataTransfer.files);
  displayFiles(files);
  EventBus.emit('files:uploaded', { files });
});

// Handle file input change
fileInput.addEventListener('change', (e) => {
  const files = Array.from(e.target.files);
  displayFiles(files);
  EventBus.emit('files:uploaded', { files });
});

function displayFiles(files) {
  if (files.length > 0) {
    placeholder.style.display = 'none';
    fileList.innerHTML = files.map(file =>
      \`<p>\${file.name} (\${file.size} bytes)</p>\`
    ).join('');
  }
}
</script>`,

    extjs: `// ExtJS DropZone using filefield
Ext.create('Ext.form.Panel', {
  title: 'File Upload',
  bodyPadding: 16,
  items: [
    {
      xtype: 'filefield',
      name: 'files',
      fieldLabel: 'Files',
      labelWidth: 50,
      msgTarget: 'side',
      allowBlank: false,
      buttonText: 'Browse Files...',
      listeners: {
        change: function(field, value) {
          const files = field.fileInputEl.dom.files;
          console.log('Files selected:', files);

          Ext.GlobalEvents.fireEvent('files:uploaded', {
            files: Array.from(files),
            count: files.length
          });
        }
      }
    },
    {
      xtype: 'component',
      id: 'file-preview',
      html: '<div class="file-preview">No files selected</div>',
      margin: '8 0 0 0'
    }
  ],
  buttons: [
    {
      text: 'Upload',
      handler: function() {
        const form = this.up('form').getForm();
        if (form.isValid()) {
          // Handle file upload
          console.log('Uploading files...');
        }
      }
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { DropZone, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface DropZoneExampleProps {
  accept?: string;
  allowMultiple?: boolean;
  onDrop?: (files: File[]) => void;
}

function DropZoneExample({
  accept,
  allowMultiple = true,
  onDrop
}: DropZoneExampleProps): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = useCallback((acceptedFiles: File[]): void => {
    setFiles(acceptedFiles);
    onDrop?.(acceptedFiles);
  }, [onDrop]);

  const fileUpload = !files.length && (
    <DropZone.FileUpload />
  );

  const uploadedFiles = files.length > 0 && (
    <div style={{ padding: '20px' }}>
      {files.map((file, index) => (
        <Text key={index} variant="bodySm" as="p">
          {file.name} ({file.size} bytes)
        </Text>
      ))}
    </div>
  );

  return (
    <DropZone
      onDrop={handleDrop}
      accept={accept}
      allowMultiple={allowMultiple}
    >
      {uploadedFiles}
      {fileUpload}
    </DropZone>
  );
}

export default DropZoneExample;`,
  }
};

// KeyboardKey Component Examples

export const keyboardkeyExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { KeyboardKey } from '@shopify/polaris';

function KeyboardKeyExample() {
  return <KeyboardKey>Enter</KeyboardKey>;
}

export default KeyboardKeyExample;`,

    vanilla: `<!-- KeyboardKey Structure -->
<kbd class="polaris-keyboard-key">Enter</kbd>

<style>
.polaris-keyboard-key {
  display: inline-block;
  padding: 2px 6px;
  background-color: #f4f6f8;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
</style>`,

    extjs: `// ExtJS KeyboardKey representation
Ext.create('Ext.Component', {
  html: '<kbd class="polaris-keyboard-key">Enter</kbd>',
  cls: 'keyboard-key-wrapper',
  renderTo: Ext.getBody()
});

// For keyboard shortcuts display
Ext.create('Ext.panel.Panel', {
  title: 'Keyboard Shortcuts',
  bodyPadding: 16,
  items: [
    {
      xtype: 'component',
      html: \`
        <div class="shortcut-row">
          <span>Save</span>
          <span>
            <kbd class="polaris-keyboard-key">Ctrl</kbd> +
            <kbd class="polaris-keyboard-key">S</kbd>
          </span>
        </div>
      \`
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { KeyboardKey, InlineStack, Text } from '@shopify/polaris';

interface KeyboardKeyExampleProps {
  keys: string[];
  description?: string;
}

function KeyboardKeyExample({
  keys = ['Enter'],
  description
}: KeyboardKeyExampleProps): JSX.Element {
  return (
    <InlineStack gap="100" blockAlign="center">
      {description && <Text variant="bodySm">{description}:</Text>}
      {keys.map((key, index) => (
        <span key={index}>
          {index > 0 && <Text>+</Text>}
          <KeyboardKey>{key}</KeyboardKey>
        </span>
      ))}
    </InlineStack>
  );
}

export default KeyboardKeyExample;`,
  },

  singlekeys: {
    react: `import { KeyboardKey, InlineStack } from '@shopify/polaris';

function SingleKeysExample() {
  const modifierKeys = ['Enter', 'Esc', 'Space', 'Tab', 'Shift', 'Ctrl', 'Alt', 'Meta', 'Cmd', 'Fn'];

  return (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="300" wrap>
        {modifierKeys.map((key) => (
          <KeyboardKey key={key}>{key}</KeyboardKey>
        ))}
      </InlineStack>
    </div>
  );
}

export default SingleKeysExample;`,

    vanilla: `<!-- Single Modifier Keys -->
<div class="keys-container" style="padding: 24px; display: flex; flex-wrap: wrap; gap: 12px;">
  <kbd class="polaris-keyboard-key">Enter</kbd>
  <kbd class="polaris-keyboard-key">Esc</kbd>
  <kbd class="polaris-keyboard-key">Space</kbd>
  <kbd class="polaris-keyboard-key">Tab</kbd>
  <kbd class="polaris-keyboard-key">Shift</kbd>
  <kbd class="polaris-keyboard-key">Ctrl</kbd>
  <kbd class="polaris-keyboard-key">Alt</kbd>
  <kbd class="polaris-keyboard-key">Meta</kbd>
  <kbd class="polaris-keyboard-key">Cmd</kbd>
  <kbd class="polaris-keyboard-key">Fn</kbd>
</div>

<script>
import { createKeyboardDisplay } from '@cin7/vanilla-js';

// Create dynamic keyboard key display
const keys = ['Enter', 'Esc', 'Space', 'Tab', 'Shift', 'Ctrl', 'Alt', 'Meta', 'Cmd', 'Fn'];
const container = document.querySelector('.keys-container');

keys.forEach(key => {
  const kbd = createKeyboardDisplay({ key });
  container.appendChild(kbd);
});
</script>

<style>
.polaris-keyboard-key {
  display: inline-block;
  padding: 4px 8px;
  background-color: #f4f6f8;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
</style>`,

    extjs: `// ExtJS Single Keys Display
Ext.create('Ext.panel.Panel', {
  title: 'Modifier Keys',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    wrap: true,
    gap: 12
  },
  items: [
    'Enter', 'Esc', 'Space', 'Tab', 'Shift',
    'Ctrl', 'Alt', 'Meta', 'Cmd', 'Fn'
  ].map(key => ({
    xtype: 'component',
    html: \`<kbd class="polaris-keyboard-key">\${key}</kbd>\`,
    margin: '0 12 12 0'
  })),
  renderTo: Ext.getBody()
});

// Reusable component for keyboard keys
Ext.define('PolarisKeyboardKey', {
  extend: 'Ext.Component',
  alias: 'widget.keyboardkey',

  config: {
    keyText: ''
  },

  renderTpl: '<kbd class="polaris-keyboard-key">{keyText}</kbd>',

  initComponent: function() {
    this.renderData = {
      keyText: this.getKeyText()
    };
    this.callParent(arguments);
  }
});`,

    typescript: `import { KeyboardKey, InlineStack } from '@shopify/polaris';
import React from 'react';

interface ModifierKey {
  key: string;
  description?: string;
}

const MODIFIER_KEYS: ModifierKey[] = [
  { key: 'Enter', description: 'Execute command' },
  { key: 'Esc', description: 'Cancel operation' },
  { key: 'Space', description: 'Select item' },
  { key: 'Tab', description: 'Navigate forward' },
  { key: 'Shift', description: 'Modifier key' },
  { key: 'Ctrl', description: 'Control key' },
  { key: 'Alt', description: 'Alternate key' },
  { key: 'Meta', description: 'Command key' },
  { key: 'Cmd', description: 'Mac command' },
  { key: 'Fn', description: 'Function key' },
];

function SingleKeysExample(): JSX.Element {
  return (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="300" wrap>
        {MODIFIER_KEYS.map(({ key }) => (
          <KeyboardKey key={key}>{key}</KeyboardKey>
        ))}
      </InlineStack>
    </div>
  );
}

export default SingleKeysExample;`,
  },

  letterkeys: {
    react: `import { KeyboardKey, InlineStack } from '@shopify/polaris';

function LetterKeysExample() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="200" wrap>
        {letters.map((letter) => (
          <KeyboardKey key={letter}>{letter}</KeyboardKey>
        ))}
      </InlineStack>
    </div>
  );
}

export default LetterKeysExample;`,

    vanilla: `<!-- Alphabet Keys -->
<div id="letter-keys" style="padding: 24px; display: flex; flex-wrap: wrap; gap: 8px;"></div>

<script>
import { $ } from '@cin7/vanilla-js';

// Generate alphabet keys
const container = $('#letter-keys');
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

letters.forEach(letter => {
  const kbd = document.createElement('kbd');
  kbd.className = 'polaris-keyboard-key';
  kbd.textContent = letter;
  container.appendChild(kbd);
});
</script>

<style>
.polaris-keyboard-key {
  display: inline-block;
  padding: 4px 8px;
  min-width: 32px;
  text-align: center;
  background-color: #f4f6f8;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
</style>`,

    extjs: `// ExtJS Alphabet Keys Display
Ext.create('Ext.panel.Panel', {
  title: 'Letter Keys',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    wrap: true,
    gap: 8
  },
  items: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
    xtype: 'component',
    html: \`<kbd class="polaris-keyboard-key">\${letter}</kbd>\`,
    margin: '0 8 8 0'
  })),
  renderTo: Ext.getBody()
});

// Virtual keyboard panel
Ext.define('VirtualKeyboard', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.virtualkeyboard',

  title: 'Virtual Keyboard',
  bodyPadding: 16,

  initComponent: function() {
    this.items = this.createKeyboardKeys();
    this.callParent(arguments);
  },

  createKeyboardKeys: function() {
    const rows = [
      'QWERTYUIOP'.split(''),
      'ASDFGHJKL'.split(''),
      'ZXCVBNM'.split('')
    ];

    return rows.map(row => ({
      xtype: 'container',
      layout: 'hbox',
      items: row.map(key => ({
        xtype: 'button',
        text: key,
        width: 40,
        height: 40,
        margin: 2,
        handler: function() {
          console.log('Key pressed:', key);
        }
      }))
    }));
  }
});`,

    typescript: `import { KeyboardKey, InlineStack } from '@shopify/polaris';
import React from 'react';

interface LetterKeysExampleProps {
  onKeyClick?: (letter: string) => void;
}

function LetterKeysExample({ onKeyClick }: LetterKeysExampleProps): JSX.Element {
  const letters: string[] = React.useMemo(
    () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
    []
  );

  const handleKeyClick = React.useCallback((letter: string) => {
    onKeyClick?.(letter);
  }, [onKeyClick]);

  return (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="200" wrap>
        {letters.map((letter) => (
          <span
            key={letter}
            onClick={() => handleKeyClick(letter)}
            style={{ cursor: onKeyClick ? 'pointer' : 'default' }}
          >
            <KeyboardKey>{letter}</KeyboardKey>
          </span>
        ))}
      </InlineStack>
    </div>
  );
}

export default LetterKeysExample;`,
  },

  numberkeys: {
    react: `import { KeyboardKey, InlineStack } from '@shopify/polaris';

function NumberKeysExample() {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="200" wrap>
        {numbers.map((number) => (
          <KeyboardKey key={number}>{number}</KeyboardKey>
        ))}
      </InlineStack>
    </div>
  );
}

export default NumberKeysExample;`,

    vanilla: `<!-- Number Keys -->
<div class="number-keys" style="padding: 24px; display: flex; flex-wrap: wrap; gap: 8px;"></div>

<script>
import { createKeyRow } from '@cin7/vanilla-js';

// Generate number keys
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const container = document.querySelector('.number-keys');

numbers.forEach(num => {
  const kbd = document.createElement('kbd');
  kbd.className = 'polaris-keyboard-key polaris-keyboard-key--number';
  kbd.textContent = num;
  kbd.addEventListener('click', () => {
    console.log('Number key clicked:', num);
  });
  container.appendChild(kbd);
});
</script>

<style>
.polaris-keyboard-key {
  display: inline-block;
  padding: 6px 10px;
  min-width: 36px;
  text-align: center;
  background-color: #f4f6f8;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 14px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  cursor: default;
}

.polaris-keyboard-key--number {
  font-weight: 600;
}
</style>`,

    extjs: `// ExtJS Number Keys with Numpad
Ext.create('Ext.panel.Panel', {
  title: 'Number Keys',
  bodyPadding: 16,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'container',
      layout: 'hbox',
      items: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => ({
        xtype: 'component',
        html: \`<kbd class="polaris-keyboard-key">\${num}</kbd>\`,
        margin: '0 8 0 0'
      }))
    },
    {
      xtype: 'container',
      margin: '16 0 0 0',
      html: '<h4>Numpad Layout</h4>'
    },
    {
      xtype: 'container',
      layout: {
        type: 'table',
        columns: 3
      },
      items: ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'].map(num => ({
        xtype: 'button',
        text: num,
        width: 50,
        height: 50,
        margin: 2,
        handler: function() {
          console.log('Numpad key:', num);
        }
      }))
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { KeyboardKey, InlineStack } from '@shopify/polaris';
import React from 'react';

interface NumberKeysExampleProps {
  onNumberSelect?: (number: string) => void;
  highlightedNumbers?: string[];
}

function NumberKeysExample({
  onNumberSelect,
  highlightedNumbers = []
}: NumberKeysExampleProps): JSX.Element {
  const numbers: string[] = React.useMemo(
    () => ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    []
  );

  const handleNumberClick = React.useCallback((number: string) => {
    onNumberSelect?.(number);
  }, [onNumberSelect]);

  const isHighlighted = React.useCallback((number: string): boolean => {
    return highlightedNumbers.includes(number);
  }, [highlightedNumbers]);

  return (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="200" wrap>
        {numbers.map((number) => (
          <span
            key={number}
            onClick={() => handleNumberClick(number)}
            style={{
              cursor: onNumberSelect ? 'pointer' : 'default',
              opacity: isHighlighted(number) ? 1 : 0.6
            }}
          >
            <KeyboardKey>{number}</KeyboardKey>
          </span>
        ))}
      </InlineStack>
    </div>
  );
}

export default NumberKeysExample;`,
  },

  symbolkeys: {
    react: `import { KeyboardKey, InlineStack } from '@shopify/polaris';

function SymbolKeysExample() {
  const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=',
                   '[', ']', ';', "'", ',', '.', '/', '\\', '\`', '~'];

  return (
    <div style={{ padding: '24px' }}>
      <InlineStack gap="200" wrap>
        {symbols.map((symbol, index) => (
          <KeyboardKey key={index}>{symbol}</KeyboardKey>
        ))}
      </InlineStack>
    </div>
  );
}

export default SymbolKeysExample;`,

    vanilla: `<!-- Symbol Keys -->
<div id="symbol-keys" style="padding: 24px; display: flex; flex-wrap: wrap; gap: 8px;"></div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

// Generate symbol keys
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '+', '=',
                 '[', ']', ';', "'", ',', '.', '/', '\\\\', '\`', '~'];
const container = $('#symbol-keys');

symbols.forEach(symbol => {
  const kbd = createElement('kbd', {
    className: 'polaris-keyboard-key polaris-keyboard-key--symbol',
    textContent: symbol,
    onclick: () => console.log('Symbol:', symbol)
  });
  container.appendChild(kbd);
});
</script>

<style>
.polaris-keyboard-key {
  display: inline-block;
  padding: 4px 8px;
  min-width: 32px;
  text-align: center;
  background-color: #f4f6f8;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

.polaris-keyboard-key--symbol {
  font-size: 14px;
  font-weight: 600;
}
</style>`,

    extjs: `// ExtJS Symbol Keys Display
Ext.create('Ext.panel.Panel', {
  title: 'Symbol Keys',
  bodyPadding: 16,
  layout: {
    type: 'hbox',
    wrap: true,
    gap: 8
  },
  items: [
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    '-', '+', '=', '[', ']', ';', "'", ',', '.', '/',
    '\\\\', '\`', '~'
  ].map((symbol, index) => ({
    xtype: 'component',
    html: \`<kbd class="polaris-keyboard-key">\${Ext.String.htmlEncode(symbol)}</kbd>\`,
    margin: '0 8 8 0'
  })),
  renderTo: Ext.getBody()
});

// Symbol key categories
Ext.create('Ext.panel.Panel', {
  title: 'Symbol Categories',
  bodyPadding: 16,
  items: [
    {
      xtype: 'fieldset',
      title: 'Math Symbols',
      items: [{
        xtype: 'component',
        html: ['+', '-', '*', '/', '=', '%'].map(s =>
          \`<kbd class="polaris-keyboard-key">\${s}</kbd>\`
        ).join(' ')
      }]
    },
    {
      xtype: 'fieldset',
      title: 'Brackets',
      items: [{
        xtype: 'component',
        html: ['(', ')', '[', ']', '{', '}'].map(s =>
          \`<kbd class="polaris-keyboard-key">\${s}</kbd>\`
        ).join(' ')
      }]
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { KeyboardKey, InlineStack, BlockStack, Text } from '@shopify/polaris';
import React from 'react';

interface SymbolCategory {
  name: string;
  symbols: string[];
}

const SYMBOL_CATEGORIES: SymbolCategory[] = [
  { name: 'Math', symbols: ['+', '-', '*', '/', '=', '%'] },
  { name: 'Brackets', symbols: ['(', ')', '[', ']'] },
  { name: 'Punctuation', symbols: [';', "'", ',', '.', '?', '!'] },
  { name: 'Special', symbols: ['@', '#', '$', '^', '&', '~', '\`'] },
];

function SymbolKeysExample(): JSX.Element {
  return (
    <div style={{ padding: '24px' }}>
      <BlockStack gap="400">
        {SYMBOL_CATEGORIES.map((category) => (
          <div key={category.name}>
            <Text as="h4" variant="headingSm">{category.name} Symbols:</Text>
            <InlineStack gap="200" wrap>
              {category.symbols.map((symbol, index) => (
                <KeyboardKey key={index}>{symbol}</KeyboardKey>
              ))}
            </InlineStack>
          </div>
        ))}
      </BlockStack>
    </div>
  );
}

export default SymbolKeysExample;`,
  },

  arrowkeys: {
    react: `import { KeyboardKey, InlineStack, BlockStack, Text } from '@shopify/polaris';

function ArrowKeysExample() {
  const functionKeys = ['F1', 'F2', 'F3', 'F4', 'F5', 'F6',
                        'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];

  return (
    <div style={{ padding: '24px' }}>
      <BlockStack gap="300">
        <div>
          <Text as="p">Navigation Keys:</Text>
          <InlineStack gap="200">
            <KeyboardKey>↑</KeyboardKey>
            <KeyboardKey>↓</KeyboardKey>
            <KeyboardKey>←</KeyboardKey>
            <KeyboardKey>→</KeyboardKey>
          </InlineStack>
        </div>

        <div>
          <Text as="p">Function Keys:</Text>
          <InlineStack gap="200" wrap>
            {functionKeys.map((key) => (
              <KeyboardKey key={key}>{key}</KeyboardKey>
            ))}
          </InlineStack>
        </div>
      </BlockStack>
    </div>
  );
}

export default ArrowKeysExample;`,

    vanilla: `<!-- Arrow and Function Keys -->
<div style="padding: 24px;">
  <div class="key-section">
    <p>Navigation Keys:</p>
    <div class="arrow-keys">
      <kbd class="polaris-keyboard-key">↑</kbd>
      <kbd class="polaris-keyboard-key">↓</kbd>
      <kbd class="polaris-keyboard-key">←</kbd>
      <kbd class="polaris-keyboard-key">→</kbd>
    </div>
  </div>

  <div class="key-section" style="margin-top: 16px;">
    <p>Function Keys:</p>
    <div id="function-keys" class="function-keys"></div>
  </div>
</div>

<script>
import { $ } from '@cin7/vanilla-js';

// Generate function keys
const functionKeys = Array.from({ length: 12 }, (_, i) => \`F\${i + 1}\`);
const container = $('#function-keys');

functionKeys.forEach(key => {
  const kbd = document.createElement('kbd');
  kbd.className = 'polaris-keyboard-key';
  kbd.textContent = key;
  container.appendChild(kbd);
});
</script>

<style>
.arrow-keys, .function-keys {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.polaris-keyboard-key {
  display: inline-block;
  padding: 4px 8px;
  min-width: 36px;
  text-align: center;
  background-color: #f4f6f8;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
</style>`,

    extjs: `// ExtJS Navigation and Function Keys
Ext.create('Ext.panel.Panel', {
  title: 'Navigation & Function Keys',
  bodyPadding: 16,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'container',
      html: '<h4>Navigation Keys</h4>',
      margin: '0 0 8 0'
    },
    {
      xtype: 'container',
      layout: 'hbox',
      items: ['↑', '↓', '←', '→'].map(arrow => ({
        xtype: 'component',
        html: \`<kbd class="polaris-keyboard-key">\${arrow}</kbd>\`,
        margin: '0 8 0 0'
      }))
    },
    {
      xtype: 'container',
      html: '<h4>Function Keys</h4>',
      margin: '16 0 8 0'
    },
    {
      xtype: 'container',
      layout: {
        type: 'hbox',
        wrap: true
      },
      items: Array.from({ length: 12 }, (_, i) => \`F\${i + 1}\`).map(key => ({
        xtype: 'component',
        html: \`<kbd class="polaris-keyboard-key">\${key}</kbd>\`,
        margin: '0 8 8 0'
      }))
    },
    {
      xtype: 'container',
      html: '<h4>Arrow Key Grid</h4>',
      margin: '16 0 8 0'
    },
    {
      xtype: 'container',
      layout: {
        type: 'table',
        columns: 3
      },
      items: [
        { xtype: 'component', html: '' },
        { xtype: 'button', text: '↑', width: 40, height: 40 },
        { xtype: 'component', html: '' },
        { xtype: 'button', text: '←', width: 40, height: 40 },
        { xtype: 'button', text: '↓', width: 40, height: 40 },
        { xtype: 'button', text: '→', width: 40, height: 40 }
      ]
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { KeyboardKey, InlineStack, BlockStack, Text } from '@shopify/polaris';
import React from 'react';

interface NavigationKey {
  symbol: string;
  name: string;
  description: string;
}

const NAVIGATION_KEYS: NavigationKey[] = [
  { symbol: '↑', name: 'Up', description: 'Move up' },
  { symbol: '↓', name: 'Down', description: 'Move down' },
  { symbol: '←', name: 'Left', description: 'Move left' },
  { symbol: '→', name: 'Right', description: 'Move right' },
];

function ArrowKeysExample(): JSX.Element {
  const functionKeys: string[] = React.useMemo(
    () => Array.from({ length: 12 }, (_, i) => \`F\${i + 1}\`),
    []
  );

  return (
    <div style={{ padding: '24px' }}>
      <BlockStack gap="300">
        <div>
          <Text as="p" fontWeight="semibold">Navigation Keys:</Text>
          <InlineStack gap="200">
            {NAVIGATION_KEYS.map(({ symbol, name }) => (
              <span key={name} title={name}>
                <KeyboardKey>{symbol}</KeyboardKey>
              </span>
            ))}
          </InlineStack>
        </div>

        <div>
          <Text as="p" fontWeight="semibold">Function Keys:</Text>
          <InlineStack gap="200" wrap>
            {functionKeys.map((key) => (
              <KeyboardKey key={key}>{key}</KeyboardKey>
            ))}
          </InlineStack>
        </div>
      </BlockStack>
    </div>
  );
}

export default ArrowKeysExample;`,
  },

  keycombinations: {
    react: `import { KeyboardKey, InlineStack, BlockStack, Text } from '@shopify/polaris';

function KeyCombinationsExample() {
  return (
    <div style={{ padding: '24px' }}>
      <BlockStack gap="400">
        <div>
          <Text as="p">Common Combinations:</Text>
          <InlineStack gap="300" wrap>
            <InlineStack gap="100">
              <KeyboardKey>Ctrl</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>C</KeyboardKey>
            </InlineStack>
            <InlineStack gap="100">
              <KeyboardKey>Ctrl</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>V</KeyboardKey>
            </InlineStack>
            <InlineStack gap="100">
              <KeyboardKey>Ctrl</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>Z</KeyboardKey>
            </InlineStack>
          </InlineStack>
        </div>

        <div>
          <Text as="p">Mac Combinations:</Text>
          <InlineStack gap="300" wrap>
            <InlineStack gap="100">
              <KeyboardKey>⌘</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>C</KeyboardKey>
            </InlineStack>
            <InlineStack gap="100">
              <KeyboardKey>⌘</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>⌥</KeyboardKey>
              <Text>+</Text>
              <KeyboardKey>Esc</KeyboardKey>
            </InlineStack>
          </InlineStack>
        </div>
      </BlockStack>
    </div>
  );
}

export default KeyCombinationsExample;`,

    vanilla: `<!-- Keyboard Combinations -->
<div style="padding: 24px;">
  <div class="combo-section">
    <p><strong>Common Combinations:</strong></p>
    <div class="combinations">
      <div class="combo">
        <kbd class="polaris-keyboard-key">Ctrl</kbd>
        <span>+</span>
        <kbd class="polaris-keyboard-key">C</kbd>
        <span class="combo-desc">Copy</span>
      </div>
      <div class="combo">
        <kbd class="polaris-keyboard-key">Ctrl</kbd>
        <span>+</span>
        <kbd class="polaris-keyboard-key">V</kbd>
        <span class="combo-desc">Paste</span>
      </div>
      <div class="combo">
        <kbd class="polaris-keyboard-key">Ctrl</kbd>
        <span>+</span>
        <kbd class="polaris-keyboard-key">Z</kbd>
        <span class="combo-desc">Undo</span>
      </div>
    </div>
  </div>

  <div class="combo-section">
    <p><strong>Mac Combinations:</strong></p>
    <div class="combinations">
      <div class="combo">
        <kbd class="polaris-keyboard-key">⌘</kbd>
        <span>+</span>
        <kbd class="polaris-keyboard-key">C</kbd>
      </div>
      <div class="combo">
        <kbd class="polaris-keyboard-key">⌘</kbd>
        <span>+</span>
        <kbd class="polaris-keyboard-key">⌥</kbd>
        <span>+</span>
        <kbd class="polaris-keyboard-key">Esc</kbd>
      </div>
    </div>
  </div>
</div>

<script>
import { EventBus } from '@cin7/vanilla-js';

// Listen for keyboard combinations
document.addEventListener('keydown', (e) => {
  const combo = [];
  if (e.ctrlKey) combo.push('Ctrl');
  if (e.shiftKey) combo.push('Shift');
  if (e.altKey) combo.push('Alt');
  if (e.metaKey) combo.push('⌘');
  if (e.key.length === 1) combo.push(e.key.toUpperCase());

  if (combo.length > 1) {
    EventBus.emit('keyboard:combo', combo.join('+'));
  }
});
</script>

<style>
.combo-section {
  margin-bottom: 24px;
}

.combinations {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 8px;
}

.combo {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
}

.combo-desc {
  margin-left: 8px;
  font-size: 12px;
  color: #6b7280;
}

.polaris-keyboard-key {
  display: inline-block;
  padding: 4px 8px;
  background-color: #fff;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
</style>`,

    extjs: `// ExtJS Keyboard Combinations Display
Ext.create('Ext.panel.Panel', {
  title: 'Keyboard Combinations',
  bodyPadding: 16,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'fieldset',
      title: 'Common Combinations',
      items: [
        {
          xtype: 'container',
          layout: 'hbox',
          defaults: { margin: '0 16 0 0' },
          items: [
            {
              xtype: 'component',
              html: \`
                <div class="combo">
                  <kbd class="polaris-keyboard-key">Ctrl</kbd> +
                  <kbd class="polaris-keyboard-key">C</kbd>
                  <span>Copy</span>
                </div>
              \`
            },
            {
              xtype: 'component',
              html: \`
                <div class="combo">
                  <kbd class="polaris-keyboard-key">Ctrl</kbd> +
                  <kbd class="polaris-keyboard-key">V</kbd>
                  <span>Paste</span>
                </div>
              \`
            },
            {
              xtype: 'component',
              html: \`
                <div class="combo">
                  <kbd class="polaris-keyboard-key">Ctrl</kbd> +
                  <kbd class="polaris-keyboard-key">Z</kbd>
                  <span>Undo</span>
                </div>
              \`
            }
          ]
        }
      ]
    },
    {
      xtype: 'fieldset',
      title: 'Mac Combinations',
      margin: '16 0 0 0',
      items: [
        {
          xtype: 'container',
          layout: 'hbox',
          defaults: { margin: '0 16 0 0' },
          items: [
            {
              xtype: 'component',
              html: \`
                <div class="combo">
                  <kbd class="polaris-keyboard-key">⌘</kbd> +
                  <kbd class="polaris-keyboard-key">C</kbd>
                </div>
              \`
            },
            {
              xtype: 'component',
              html: \`
                <div class="combo">
                  <kbd class="polaris-keyboard-key">⌘</kbd> +
                  <kbd class="polaris-keyboard-key">⌥</kbd> +
                  <kbd class="polaris-keyboard-key">Esc</kbd>
                </div>
              \`
            }
          ]
        }
      ]
    }
  ],
  renderTo: Ext.getBody()
});

// Keyboard shortcut manager
Ext.define('ShortcutManager', {
  singleton: true,

  shortcuts: {},

  register: function(combo, handler) {
    this.shortcuts[combo] = handler;
  },

  handleKeyPress: function(e) {
    const combo = [];
    if (e.ctrlKey) combo.push('Ctrl');
    if (e.shiftKey) combo.push('Shift');
    if (e.altKey) combo.push('Alt');
    combo.push(e.key.toUpperCase());

    const comboStr = combo.join('+');
    if (this.shortcuts[comboStr]) {
      e.preventDefault();
      this.shortcuts[comboStr]();
    }
  }
});`,

    typescript: `import { KeyboardKey, InlineStack, BlockStack, Text } from '@shopify/polaris';
import React from 'react';

interface KeyCombo {
  keys: string[];
  description: string;
  platform?: 'windows' | 'mac' | 'all';
}

const COMMON_COMBOS: KeyCombo[] = [
  { keys: ['Ctrl', 'C'], description: 'Copy', platform: 'windows' },
  { keys: ['Ctrl', 'V'], description: 'Paste', platform: 'windows' },
  { keys: ['Ctrl', 'Z'], description: 'Undo', platform: 'windows' },
  { keys: ['Ctrl', 'S'], description: 'Save', platform: 'windows' },
];

const MAC_COMBOS: KeyCombo[] = [
  { keys: ['⌘', 'C'], description: 'Copy', platform: 'mac' },
  { keys: ['⌘', 'V'], description: 'Paste', platform: 'mac' },
  { keys: ['⌘', '⌥', 'Esc'], description: 'Force Quit', platform: 'mac' },
];

interface KeyCombinationsExampleProps {
  onComboClick?: (combo: KeyCombo) => void;
}

function KeyCombinationsExample({ onComboClick }: KeyCombinationsExampleProps): JSX.Element {
  const renderCombo = React.useCallback((combo: KeyCombo, index: number) => (
    <div
      key={index}
      onClick={() => onComboClick?.(combo)}
      style={{
        cursor: onComboClick ? 'pointer' : 'default',
        padding: '8px',
        borderRadius: '4px',
        transition: 'background-color 0.2s'
      }}
    >
      <InlineStack gap="100" blockAlign="center">
        {combo.keys.map((key, keyIndex) => (
          <React.Fragment key={keyIndex}>
            {keyIndex > 0 && <Text>+</Text>}
            <KeyboardKey>{key}</KeyboardKey>
          </React.Fragment>
        ))}
        {combo.description && (
          <Text variant="bodySm" tone="subdued">
            {combo.description}
          </Text>
        )}
      </InlineStack>
    </div>
  ), [onComboClick]);

  return (
    <div style={{ padding: '24px' }}>
      <BlockStack gap="400">
        <div>
          <Text as="p" variant="headingSm">Common Combinations:</Text>
          <InlineStack gap="300" wrap>
            {COMMON_COMBOS.map((combo, index) => renderCombo(combo, index))}
          </InlineStack>
        </div>

        <div>
          <Text as="p" variant="headingSm">Mac Combinations:</Text>
          <InlineStack gap="300" wrap>
            {MAC_COMBOS.map((combo, index) => renderCombo(combo, index))}
          </InlineStack>
        </div>
      </BlockStack>
    </div>
  );
}

export default KeyCombinationsExample;`,
  },

  shortcutguide: {
    react: `import { KeyboardKey, InlineStack, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

function ShortcutGuideExample() {
  const shortcuts = [
    { category: 'Navigation', keys: ['Ctrl', '+', 'Home'], description: 'Go to beginning' },
    { category: 'Editing', keys: ['Ctrl', '+', 'C'], description: 'Copy' },
    { category: 'Editing', keys: ['Ctrl', '+', 'V'], description: 'Paste' },
    { category: 'Search', keys: ['Ctrl', '+', 'F'], description: 'Find' },
  ];

  const categories = Array.from(new Set(shortcuts.map(s => s.category)));

  return (
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="400">
            <div>
              <h3 style={{ margin: '0 0 16px 0' }}>Keyboard Shortcuts</h3>
              <Text as="p">Master these shortcuts to work more efficiently.</Text>
            </div>

            {categories.map((category) => (
              <div key={category}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>{category}</h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {shortcuts
                    .filter(s => s.category === category)
                    .map((shortcut, index) => (
                      <div key={index} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '6px'
                      }}>
                        <Text variant="bodySm">{shortcut.description}</Text>
                        <InlineStack gap="50">
                          {shortcut.keys.map((key, i) => (
                            <React.Fragment key={i}>
                              {key !== '+' ? <KeyboardKey>{key}</KeyboardKey> : <Text>{key}</Text>}
                            </React.Fragment>
                          ))}
                        </InlineStack>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </BlockStack>
        </div>
      </Card>
    </div>
  );
}

export default ShortcutGuideExample;`,

    vanilla: `<!-- Shortcut Guide -->
<div class="shortcut-guide">
  <div class="guide-header">
    <h3>Keyboard Shortcuts</h3>
    <p>Master these shortcuts to work more efficiently.</p>
  </div>

  <div class="shortcuts-container" id="shortcuts"></div>
</div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

const shortcuts = [
  { category: 'Navigation', combo: ['Ctrl', 'Home'], description: 'Go to beginning' },
  { category: 'Editing', combo: ['Ctrl', 'C'], description: 'Copy' },
  { category: 'Editing', combo: ['Ctrl', 'V'], description: 'Paste' },
  { category: 'Editing', combo: ['Ctrl', 'Z'], description: 'Undo' },
  { category: 'Search', combo: ['Ctrl', 'F'], description: 'Find' },
];

const container = $('#shortcuts');
const categories = [...new Set(shortcuts.map(s => s.category))];

categories.forEach(category => {
  const section = createElement('div', { className: 'shortcut-section' });
  const title = createElement('h4', { textContent: category });
  section.appendChild(title);

  const items = shortcuts.filter(s => s.category === category);
  items.forEach(item => {
    const row = createElement('div', { className: 'shortcut-row' });

    const desc = createElement('span', {
      className: 'shortcut-desc',
      textContent: item.description
    });

    const keys = createElement('div', { className: 'shortcut-keys' });
    item.combo.forEach((key, i) => {
      if (i > 0) {
        keys.appendChild(document.createTextNode(' + '));
      }
      const kbd = createElement('kbd', {
        className: 'polaris-keyboard-key',
        textContent: key
      });
      keys.appendChild(kbd);
    });

    row.appendChild(desc);
    row.appendChild(keys);
    section.appendChild(row);
  });

  container.appendChild(section);
});
</script>

<style>
.shortcut-guide {
  max-width: 800px;
  padding: 24px;
  background: #fff;
  border: 1px solid #e1e3e5;
  border-radius: 8px;
}

.guide-header h3 {
  margin: 0 0 8px 0;
}

.shortcuts-container {
  margin-top: 24px;
}

.shortcut-section {
  margin-bottom: 24px;
}

.shortcut-section h4 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #202223;
}

.shortcut-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  margin-bottom: 8px;
}

.shortcut-desc {
  font-size: 14px;
}

.shortcut-keys {
  display: flex;
  align-items: center;
  gap: 4px;
}

.polaris-keyboard-key {
  display: inline-block;
  padding: 4px 8px;
  background-color: #fff;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
</style>`,

    extjs: `// ExtJS Keyboard Shortcut Guide
Ext.define('ShortcutGuide', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.shortcutguide',

  title: 'Keyboard Shortcuts',
  bodyPadding: 24,
  width: 800,

  initComponent: function() {
    const shortcuts = [
      { category: 'Navigation', combo: ['Ctrl', 'Home'], description: 'Go to beginning' },
      { category: 'Editing', combo: ['Ctrl', 'C'], description: 'Copy' },
      { category: 'Editing', combo: ['Ctrl', 'V'], description: 'Paste' },
      { category: 'Editing', combo: ['Ctrl', 'Z'], description: 'Undo' },
      { category: 'Search', combo: ['Ctrl', 'F'], description: 'Find' },
    ];

    const categories = [...new Set(shortcuts.map(s => s.category))];

    this.items = [
      {
        xtype: 'component',
        html: '<p>Master these shortcuts to work more efficiently.</p>',
        margin: '0 0 16 0'
      },
      ...categories.map(category => ({
        xtype: 'fieldset',
        title: category,
        margin: '0 0 16 0',
        items: shortcuts
          .filter(s => s.category === category)
          .map(shortcut => ({
            xtype: 'container',
            layout: 'hbox',
            margin: '8 0',
            items: [
              {
                xtype: 'component',
                html: shortcut.description,
                flex: 1
              },
              {
                xtype: 'component',
                html: shortcut.combo.map(key =>
                  \`<kbd class="polaris-keyboard-key">\${key}</kbd>\`
                ).join(' + ')
              }
            ]
          }))
      }))
    ];

    this.callParent(arguments);
  }
});

Ext.create('ShortcutGuide', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { KeyboardKey, InlineStack, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

interface Shortcut {
  category: string;
  keys: string[];
  description: string;
  platform?: 'windows' | 'mac' | 'all';
}

const SHORTCUTS: Shortcut[] = [
  { category: 'Navigation', keys: ['Ctrl', 'Home'], description: 'Go to beginning', platform: 'all' },
  { category: 'Navigation', keys: ['Ctrl', 'End'], description: 'Go to end', platform: 'all' },
  { category: 'Editing', keys: ['Ctrl', 'X'], description: 'Cut', platform: 'windows' },
  { category: 'Editing', keys: ['Ctrl', 'C'], description: 'Copy', platform: 'windows' },
  { category: 'Editing', keys: ['Ctrl', 'V'], description: 'Paste', platform: 'windows' },
  { category: 'Editing', keys: ['Ctrl', 'Z'], description: 'Undo', platform: 'windows' },
  { category: 'Search', keys: ['Ctrl', 'F'], description: 'Find', platform: 'all' },
  { category: 'Windows', keys: ['Ctrl', 'W'], description: 'Close tab', platform: 'all' },
];

interface ShortcutGuideExampleProps {
  filterPlatform?: 'windows' | 'mac' | 'all';
}

function ShortcutGuideExample({ filterPlatform = 'all' }: ShortcutGuideExampleProps): JSX.Element {
  const filteredShortcuts = React.useMemo(() => {
    if (filterPlatform === 'all') return SHORTCUTS;
    return SHORTCUTS.filter(s => s.platform === filterPlatform || s.platform === 'all');
  }, [filterPlatform]);

  const categories = React.useMemo(
    () => Array.from(new Set(filteredShortcuts.map(s => s.category))),
    [filteredShortcuts]
  );

  return (
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="400">
            <div>
              <h3 style={{ margin: '0 0 16px 0' }}>Keyboard Shortcuts</h3>
              <Text as="p">Master these shortcuts to work more efficiently.</Text>
            </div>

            {categories.map((category) => (
              <div key={category}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>{category}</h4>
                <div style={{ display: 'grid', gap: '12px' }}>
                  {filteredShortcuts
                    .filter(s => s.category === category)
                    .map((shortcut, index) => (
                      <div
                        key={index}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          backgroundColor: '#f8f9fa',
                          borderRadius: '6px'
                        }}
                      >
                        <Text variant="bodySm">{shortcut.description}</Text>
                        <InlineStack gap="50">
                          {shortcut.keys.map((key, keyIndex) => (
                            <React.Fragment key={keyIndex}>
                              {keyIndex > 0 && <Text>+</Text>}
                              <KeyboardKey>{key}</KeyboardKey>
                            </React.Fragment>
                          ))}
                        </InlineStack>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </BlockStack>
        </div>
      </Card>
    </div>
  );
}

export default ShortcutGuideExample;`,
  },

  interactivekeyboard: {
    react: `import { KeyboardKey, InlineStack, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

function InteractiveKeyboardExample() {
  const [pressedKeys, setPressedKeys] = React.useState<string[]>([]);
  const [keyHistory, setKeyHistory] = React.useState<string[][]>([]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keyMap: { [key: string]: string } = {
        'Control': 'Ctrl',
        'Meta': '⌘',
        'Alt': 'Alt',
        'Shift': 'Shift',
        'Enter': 'Enter',
        'Escape': 'Esc',
        ' ': 'Space',
      };

      const key = keyMap[e.key] || e.key.toUpperCase();

      setPressedKeys(prev => {
        if (prev.includes(key)) return prev;
        const newKeys = [...prev, key];
        if (newKeys.length > 4) {
          setKeyHistory(history => [...history.slice(-4), newKeys]);
          return [];
        }
        return newKeys;
      });
    };

    const handleKeyUp = () => {
      setTimeout(() => {
        setPressedKeys(prev => {
          if (prev.length > 0) {
            setKeyHistory(history => [...history.slice(-4), prev]);
          }
          return [];
        });
      }, 100);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div style={{ maxWidth: '700px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="400">
            <div>
              <h3>Interactive Keyboard Demo</h3>
              <Text as="p">Press any keys to see them displayed.</Text>
            </div>

            <div style={{
              minHeight: '120px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '2px dashed #e1e3e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {pressedKeys.length > 0 ? (
                <InlineStack gap="200">
                  {pressedKeys.map((key, index) => (
                    <React.Fragment key={index}>
                      <KeyboardKey>{key}</KeyboardKey>
                      {index < pressedKeys.length - 1 && <Text>+</Text>}
                    </React.Fragment>
                  ))}
                </InlineStack>
              ) : (
                <Text as="p" tone="subdued">Press keys to see them here...</Text>
              )}
            </div>

            {keyHistory.length > 0 && (
              <div>
                <h4 style={{ fontSize: '14px' }}>Recent Combinations:</h4>
                <BlockStack gap="200">
                  {keyHistory.map((combo, index) => (
                    <div key={index} style={{
                      padding: '8px 12px',
                      backgroundColor: '#f1f3f4',
                      borderRadius: '6px'
                    }}>
                      <InlineStack gap="200">
                        {combo.map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            <KeyboardKey>{key}</KeyboardKey>
                            {keyIndex < combo.length - 1 && <Text>+</Text>}
                          </React.Fragment>
                        ))}
                      </InlineStack>
                    </div>
                  ))}
                </BlockStack>
              </div>
            )}
          </BlockStack>
        </div>
      </Card>
    </div>
  );
}

export default InteractiveKeyboardExample;`,

    vanilla: `<!-- Interactive Keyboard Demo -->
<div class="interactive-keyboard">
  <div class="keyboard-header">
    <h3>Interactive Keyboard Demo</h3>
    <p>Press any keys to see them displayed below.</p>
  </div>

  <div id="key-display" class="key-display">
    <p class="placeholder">Press keys to see them here...</p>
  </div>

  <div id="key-history" class="key-history" style="display: none;">
    <h4>Recent Combinations:</h4>
    <div id="history-list"></div>
  </div>
</div>

<script>
import { $, addClass, removeClass, on } from '@cin7/vanilla-js';

const display = $('#key-display');
const historyContainer = $('#key-history');
const historyList = $('#history-list');
let pressedKeys = [];
let keyHistory = [];

const keyMap = {
  'Control': 'Ctrl',
  'Meta': '⌘',
  'Alt': 'Alt',
  'Shift': 'Shift',
  'Enter': 'Enter',
  'Escape': 'Esc',
  ' ': 'Space'
};

on(window, 'keydown', (e) => {
  const key = keyMap[e.key] || e.key.toUpperCase();

  if (!pressedKeys.includes(key)) {
    pressedKeys.push(key);
    updateDisplay();
  }

  if (pressedKeys.length > 4) {
    addToHistory(pressedKeys);
    pressedKeys = [];
    updateDisplay();
  }
});

on(window, 'keyup', () => {
  setTimeout(() => {
    if (pressedKeys.length > 0) {
      addToHistory(pressedKeys);
      pressedKeys = [];
      updateDisplay();
    }
  }, 100);
});

function updateDisplay() {
  if (pressedKeys.length === 0) {
    display.innerHTML = '<p class="placeholder">Press keys to see them here...</p>';
  } else {
    display.innerHTML = pressedKeys
      .map(key => \`<kbd class="polaris-keyboard-key">\${key}</kbd>\`)
      .join(' + ');
  }
}

function addToHistory(keys) {
  keyHistory.push([...keys]);
  if (keyHistory.length > 5) keyHistory.shift();

  historyContainer.style.display = 'block';
  historyList.innerHTML = keyHistory.map(combo =>
    \`<div class="history-item">
      \${combo.map(k => \`<kbd class="polaris-keyboard-key">\${k}</kbd>\`).join(' + ')}
    </div>\`
  ).join('');
}
</script>

<style>
.interactive-keyboard {
  max-width: 700px;
  padding: 24px;
  background: #fff;
  border: 1px solid #e1e3e5;
  border-radius: 8px;
}

.key-display {
  min-height: 120px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #e1e3e5;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 16px 0;
}

.placeholder {
  color: #6b7280;
}

.key-history {
  margin-top: 24px;
}

.key-history h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.history-item {
  padding: 8px 12px;
  background-color: #f1f3f4;
  border-radius: 6px;
  margin-bottom: 8px;
}

.polaris-keyboard-key {
  display: inline-block;
  padding: 4px 8px;
  background-color: #fff;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  margin: 0 4px;
}
</style>`,

    extjs: `// ExtJS Interactive Keyboard Component
Ext.define('InteractiveKeyboard', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.interactivekeyboard',

  title: 'Interactive Keyboard Demo',
  width: 700,
  bodyPadding: 24,

  pressedKeys: [],
  keyHistory: [],

  initComponent: function() {
    this.items = [
      {
        xtype: 'component',
        html: '<p>Press any keys to see them displayed below. Try combinations!</p>',
        margin: '0 0 16 0'
      },
      {
        xtype: 'container',
        itemId: 'keyDisplay',
        cls: 'key-display',
        html: '<p class="placeholder">Press keys to see them here...</p>',
        style: {
          minHeight: '120px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          border: '2px dashed #e1e3e5',
          textAlign: 'center'
        }
      },
      {
        xtype: 'container',
        itemId: 'keyHistory',
        hidden: true,
        margin: '16 0 0 0',
        items: [
          {
            xtype: 'component',
            html: '<h4 style="margin: 0 0 12px 0; font-size: 14px;">Recent Combinations:</h4>'
          },
          {
            xtype: 'container',
            itemId: 'historyList'
          }
        ]
      }
    ];

    this.callParent(arguments);
    this.initKeyboardListeners();
  },

  initKeyboardListeners: function() {
    const me = this;
    const keyMap = {
      'Control': 'Ctrl',
      'Meta': '⌘',
      'Alt': 'Alt',
      'Shift': 'Shift',
      'Enter': 'Enter',
      'Escape': 'Esc',
      ' ': 'Space'
    };

    Ext.getBody().on('keydown', function(e) {
      const key = keyMap[e.browserEvent.key] || e.browserEvent.key.toUpperCase();

      if (!me.pressedKeys.includes(key)) {
        me.pressedKeys.push(key);
        me.updateDisplay();
      }

      if (me.pressedKeys.length > 4) {
        me.addToHistory();
        me.pressedKeys = [];
        me.updateDisplay();
      }
    });

    Ext.getBody().on('keyup', function() {
      setTimeout(function() {
        if (me.pressedKeys.length > 0) {
          me.addToHistory();
          me.pressedKeys = [];
          me.updateDisplay();
        }
      }, 100);
    });
  },

  updateDisplay: function() {
    const display = this.down('#keyDisplay');

    if (this.pressedKeys.length === 0) {
      display.update('<p class="placeholder">Press keys to see them here...</p>');
    } else {
      const html = this.pressedKeys
        .map(key => \`<kbd class="polaris-keyboard-key">\${key}</kbd>\`)
        .join(' + ');
      display.update(html);
    }
  },

  addToHistory: function() {
    this.keyHistory.push([...this.pressedKeys]);
    if (this.keyHistory.length > 5) {
      this.keyHistory.shift();
    }

    const historyContainer = this.down('#keyHistory');
    const historyList = this.down('#historyList');

    historyContainer.setHidden(false);

    historyList.removeAll();
    this.keyHistory.forEach(combo => {
      historyList.add({
        xtype: 'component',
        html: combo.map(k => \`<kbd class="polaris-keyboard-key">\${k}</kbd>\`).join(' + '),
        style: {
          padding: '8px 12px',
          backgroundColor: '#f1f3f4',
          borderRadius: '6px',
          marginBottom: '8px'
        }
      });
    });
  }
});

Ext.create('InteractiveKeyboard', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { KeyboardKey, InlineStack, BlockStack, Text, Card } from '@shopify/polaris';
import React from 'react';

interface KeyMapping {
  [key: string]: string;
}

const KEY_MAP: KeyMapping = {
  'Control': 'Ctrl',
  'Meta': '⌘',
  'Alt': 'Alt',
  'Shift': 'Shift',
  'Enter': 'Enter',
  'Escape': 'Esc',
  'ArrowUp': '↑',
  'ArrowDown': '↓',
  'ArrowLeft': '←',
  'ArrowRight': '→',
  ' ': 'Space',
};

function InteractiveKeyboardExample(): JSX.Element {
  const [pressedKeys, setPressedKeys] = React.useState<string[]>([]);
  const [keyHistory, setKeyHistory] = React.useState<string[][]>([]);

  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    const key = KEY_MAP[e.key] || e.key.toUpperCase();

    setPressedKeys(prev => {
      if (prev.includes(key)) return prev;

      const newKeys = [...prev, key];

      if (newKeys.length > 4) {
        setKeyHistory(history => [...history.slice(-4), newKeys]);
        return [];
      }

      return newKeys;
    });
  }, []);

  const handleKeyUp = React.useCallback(() => {
    const timeout = setTimeout(() => {
      setPressedKeys(prev => {
        if (prev.length > 0) {
          setKeyHistory(history => [...history.slice(-4), prev]);
        }
        return [];
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  return (
    <div style={{ maxWidth: '700px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="400">
            <div>
              <h3 style={{ margin: '0 0 16px 0' }}>Interactive Keyboard Demo</h3>
              <Text as="p">Press any keys to see them displayed below. Try combinations!</Text>
            </div>

            <div style={{
              minHeight: '120px',
              padding: '20px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '2px dashed #e1e3e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {pressedKeys.length > 0 ? (
                <InlineStack gap="200">
                  {pressedKeys.map((key, index) => (
                    <React.Fragment key={index}>
                      <KeyboardKey>{key}</KeyboardKey>
                      {index < pressedKeys.length - 1 && <Text>+</Text>}
                    </React.Fragment>
                  ))}
                </InlineStack>
              ) : (
                <Text as="p" tone="subdued">Press keys to see them here...</Text>
              )}
            </div>

            {keyHistory.length > 0 && (
              <div>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px' }}>Recent Combinations:</h4>
                <BlockStack gap="200">
                  {keyHistory.map((combo, index) => (
                    <div key={index} style={{
                      padding: '8px 12px',
                      backgroundColor: '#f1f3f4',
                      borderRadius: '6px'
                    }}>
                      <InlineStack gap="200">
                        {combo.map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            <KeyboardKey>{key}</KeyboardKey>
                            {keyIndex < combo.length - 1 && <Text>+</Text>}
                          </React.Fragment>
                        ))}
                      </InlineStack>
                    </div>
                  ))}
                </BlockStack>
              </div>
            )}

            <div style={{
              padding: '12px',
              backgroundColor: '#e3f2fd',
              borderRadius: '6px',
              border: '1px solid #90caf9'
            }}>
              <Text variant="bodySm" as="p">
                <strong>Tip:</strong> Try common shortcuts like Ctrl+C, Ctrl+V, or Ctrl+Z.
                On Mac, use the ⌘ key instead of Ctrl.
              </Text>
            </div>
          </BlockStack>
        </div>
      </Card>
    </div>
  );
}

export default InteractiveKeyboardExample;`,
  },

  gamingkeyboard: {
    react: `import { KeyboardKey, BlockStack, InlineStack, Text, Card } from '@shopify/polaris';
import React from 'react';

interface GameControl {
  keys: string[];
  description: string;
  color: string;
}

function GamingKeyboardExample() {
  const gameControls: GameControl[] = [
    { keys: ['W', 'A', 'S', 'D'], description: 'Movement', color: '#4CAF50' },
    { keys: ['Space'], description: 'Jump', color: '#2196F3' },
    { keys: ['Shift'], description: 'Run', color: '#FF9800' },
    { keys: ['E'], description: 'Interact', color: '#9C27B0' },
    { keys: ['Q'], description: 'Ability 1', color: '#F44336' },
    { keys: ['R'], description: 'Reload', color: '#607D8B' },
    { keys: ['Tab'], description: 'Scoreboard', color: '#795548' },
    { keys: ['Esc'], description: 'Menu', color: '#3F51B5' },
  ];

  return (
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="400">
            <div>
              <h3 style={{ margin: '0 0 16px 0' }}>Game Controls</h3>
              <Text as="p">Common keyboard layouts for gaming controls.</Text>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              {gameControls.map((control, index) => (
                <div key={index} style={{
                  padding: '16px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '8px',
                  border: \`1px solid \${control.color}20\`,
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '4px',
                    height: '100%',
                    backgroundColor: control.color,
                    borderRadius: '8px 0 0 8px'
                  }} />
                  <BlockStack gap="200">
                    <Text as="p" fontWeight="600">{control.description}</Text>
                    <InlineStack gap="100" wrap>
                      {control.keys.map((key, keyIndex) => (
                        <KeyboardKey key={keyIndex}>{key}</KeyboardKey>
                      ))}
                    </InlineStack>
                  </BlockStack>
                </div>
              ))}
            </div>

            <div style={{
              padding: '16px',
              backgroundColor: '#fff3e0',
              borderRadius: '8px',
              border: '1px solid #ffcc02'
            }}>
              <BlockStack gap="200">
                <Text as="p" fontWeight="600">WASD Movement Layout</Text>
                <Text variant="bodySm" as="p">
                  The WASD keys are the standard movement controls in most PC games,
                  providing easy access to other keys while keeping fingers in a comfortable position.
                </Text>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 40px)', gap: '4px' }}>
                    <div />
                    <KeyboardKey>W</KeyboardKey>
                    <div />
                    <KeyboardKey>A</KeyboardKey>
                    <KeyboardKey>S</KeyboardKey>
                    <KeyboardKey>D</KeyboardKey>
                  </div>
                </div>
              </BlockStack>
            </div>
          </BlockStack>
        </div>
      </Card>
    </div>
  );
}

export default GamingKeyboardExample;`,

    vanilla: `<!-- Gaming Keyboard Controls -->
<div class="gaming-controls">
  <div class="header">
    <h3>Game Controls</h3>
    <p>Common keyboard layouts for gaming controls.</p>
  </div>

  <div class="controls-grid">
    <div class="control-card" data-color="#4CAF50">
      <div class="color-bar"></div>
      <h4>Movement</h4>
      <div class="keys">
        <kbd class="polaris-keyboard-key">W</kbd>
        <kbd class="polaris-keyboard-key">A</kbd>
        <kbd class="polaris-keyboard-key">S</kbd>
        <kbd class="polaris-keyboard-key">D</kbd>
      </div>
    </div>

    <div class="control-card" data-color="#2196F3">
      <div class="color-bar"></div>
      <h4>Jump</h4>
      <div class="keys">
        <kbd class="polaris-keyboard-key">Space</kbd>
      </div>
    </div>

    <div class="control-card" data-color="#FF9800">
      <div class="color-bar"></div>
      <h4>Run</h4>
      <div class="keys">
        <kbd class="polaris-keyboard-key">Shift</kbd>
      </div>
    </div>

    <div class="control-card" data-color="#9C27B0">
      <div class="color-bar"></div>
      <h4>Interact</h4>
      <div class="keys">
        <kbd class="polaris-keyboard-key">E</kbd>
      </div>
    </div>

    <div class="control-card" data-color="#F44336">
      <div class="color-bar"></div>
      <h4>Ability 1</h4>
      <div class="keys">
        <kbd class="polaris-keyboard-key">Q</kbd>
      </div>
    </div>

    <div class="control-card" data-color="#607D8B">
      <div class="color-bar"></div>
      <h4>Reload</h4>
      <div class="keys">
        <kbd class="polaris-keyboard-key">R</kbd>
      </div>
    </div>

    <div class="control-card" data-color="#795548">
      <div class="color-bar"></div>
      <h4>Scoreboard</h4>
      <div class="keys">
        <kbd class="polaris-keyboard-key">Tab</kbd>
      </div>
    </div>

    <div class="control-card" data-color="#3F51B5">
      <div class="color-bar"></div>
      <h4>Menu</h4>
      <div class="keys">
        <kbd class="polaris-keyboard-key">Esc</kbd>
      </div>
    </div>
  </div>

  <div class="wasd-info">
    <h4>WASD Movement Layout</h4>
    <p>The WASD keys are the standard movement controls in most PC games.</p>
    <div class="wasd-grid">
      <div></div>
      <kbd class="polaris-keyboard-key">W</kbd>
      <div></div>
      <kbd class="polaris-keyboard-key">A</kbd>
      <kbd class="polaris-keyboard-key">S</kbd>
      <kbd class="polaris-keyboard-key">D</kbd>
    </div>
  </div>
</div>

<script>
import { $, on } from '@cin7/vanilla-js';

// Add dynamic color bars
document.querySelectorAll('.control-card').forEach(card => {
  const color = card.getAttribute('data-color');
  const colorBar = card.querySelector('.color-bar');
  if (colorBar && color) {
    colorBar.style.backgroundColor = color;
  }
  card.style.border = \`1px solid \${color}20\`;
});
</script>

<style>
.gaming-controls {
  max-width: 800px;
  background: #fff;
  border: 1px solid #e1e3e5;
  border-radius: 8px;
  padding: 24px;
}

.controls-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin: 24px 0;
}

.control-card {
  padding: 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  position: relative;
}

.color-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  border-radius: 8px 0 0 8px;
}

.control-card h4 {
  margin: 0 0 12px 0;
  font-weight: 600;
}

.keys {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.wasd-info {
  padding: 16px;
  background-color: #fff3e0;
  border-radius: 8px;
  border: 1px solid #ffcc02;
}

.wasd-grid {
  display: grid;
  grid-template-columns: repeat(3, 40px);
  gap: 4px;
  justify-content: center;
  margin-top: 16px;
}

.polaris-keyboard-key {
  display: inline-block;
  padding: 4px 8px;
  min-width: 40px;
  text-align: center;
  background-color: #fff;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
</style>`,

    extjs: `// ExtJS Gaming Keyboard Controls
Ext.define('GamingControls', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.gamingcontrols',

  title: 'Game Controls',
  width: 800,
  bodyPadding: 24,

  gameControls: [
    { keys: ['W', 'A', 'S', 'D'], description: 'Movement', color: '#4CAF50' },
    { keys: ['Space'], description: 'Jump', color: '#2196F3' },
    { keys: ['Shift'], description: 'Run', color: '#FF9800' },
    { keys: ['E'], description: 'Interact', color: '#9C27B0' },
    { keys: ['Q'], description: 'Ability 1', color: '#F44336' },
    { keys: ['R'], description: 'Reload', color: '#607D8B' },
    { keys: ['Tab'], description: 'Scoreboard', color: '#795548' },
    { keys: ['Esc'], description: 'Menu', color: '#3F51B5' }
  ],

  initComponent: function() {
    this.items = [
      {
        xtype: 'component',
        html: '<p>Common keyboard layouts for gaming controls.</p>',
        margin: '0 0 16 0'
      },
      {
        xtype: 'container',
        layout: {
          type: 'table',
          columns: 4
        },
        items: this.createControlCards()
      },
      {
        xtype: 'container',
        cls: 'wasd-info',
        style: {
          padding: '16px',
          backgroundColor: '#fff3e0',
          borderRadius: '8px',
          border: '1px solid #ffcc02',
          marginTop: '24px'
        },
        items: [
          {
            xtype: 'component',
            html: '<h4>WASD Movement Layout</h4><p>The WASD keys are the standard movement controls in most PC games.</p>'
          },
          this.createWASDLayout()
        ]
      }
    ];

    this.callParent(arguments);
  },

  createControlCards: function() {
    return this.gameControls.map(control => ({
      xtype: 'container',
      width: 200,
      height: 100,
      style: {
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: \`1px solid \${control.color}20\`,
        position: 'relative',
        margin: '8px'
      },
      items: [
        {
          xtype: 'component',
          html: \`
            <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%;
                        background-color: \${control.color}; border-radius: 8px 0 0 8px;"></div>
            <h4 style="margin: 0 0 12px 0; font-weight: 600;">\${control.description}</h4>
            <div>
              \${control.keys.map(key => \`<kbd class="polaris-keyboard-key">\${key}</kbd>\`).join(' ')}
            </div>
          \`
        }
      ]
    }));
  },

  createWASDLayout: function() {
    return {
      xtype: 'container',
      layout: {
        type: 'table',
        columns: 3
      },
      style: {
        marginTop: '16px',
        justifyContent: 'center'
      },
      items: [
        { xtype: 'component', html: '' },
        { xtype: 'component', html: '<kbd class="polaris-keyboard-key" style="width: 40px; height: 40px;">W</kbd>' },
        { xtype: 'component', html: '' },
        { xtype: 'component', html: '<kbd class="polaris-keyboard-key" style="width: 40px; height: 40px;">A</kbd>' },
        { xtype: 'component', html: '<kbd class="polaris-keyboard-key" style="width: 40px; height: 40px;">S</kbd>' },
        { xtype: 'component', html: '<kbd class="polaris-keyboard-key" style="width: 40px; height: 40px;">D</kbd>' }
      ]
    };
  }
});

Ext.create('GamingControls', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { KeyboardKey, BlockStack, InlineStack, Text, Card } from '@shopify/polaris';
import React from 'react';

interface GameControl {
  keys: string[];
  description: string;
  color: string;
}

interface GamingKeyboardExampleProps {
  customControls?: GameControl[];
  showWASDLayout?: boolean;
}

const DEFAULT_GAME_CONTROLS: GameControl[] = [
  { keys: ['W', 'A', 'S', 'D'], description: 'Movement', color: '#4CAF50' },
  { keys: ['Space'], description: 'Jump', color: '#2196F3' },
  { keys: ['Shift'], description: 'Run', color: '#FF9800' },
  { keys: ['E'], description: 'Interact', color: '#9C27B0' },
  { keys: ['Q'], description: 'Ability 1', color: '#F44336' },
  { keys: ['R'], description: 'Reload', color: '#607D8B' },
  { keys: ['Tab'], description: 'Scoreboard', color: '#795548' },
  { keys: ['Esc'], description: 'Menu', color: '#3F51B5' },
];

function GamingKeyboardExample({
  customControls,
  showWASDLayout = true
}: GamingKeyboardExampleProps): JSX.Element {
  const gameControls = customControls || DEFAULT_GAME_CONTROLS;

  return (
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="400">
            <div>
              <h3 style={{ margin: '0 0 16px 0' }}>Game Controls</h3>
              <Text as="p">Common keyboard layouts for gaming controls.</Text>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {gameControls.map((control, index) => (
                <div
                  key={index}
                  style={{
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: \`1px solid \${control.color}20\`,
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '0',
                      width: '4px',
                      height: '100%',
                      backgroundColor: control.color,
                      borderRadius: '8px 0 0 8px'
                    }}
                  />
                  <BlockStack gap="200">
                    <Text as="p" fontWeight="600">{control.description}</Text>
                    <InlineStack gap="100" wrap>
                      {control.keys.map((key, keyIndex) => (
                        <KeyboardKey key={keyIndex}>{key}</KeyboardKey>
                      ))}
                    </InlineStack>
                  </BlockStack>
                </div>
              ))}
            </div>

            {showWASDLayout && (
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#fff3e0',
                  borderRadius: '8px',
                  border: '1px solid #ffcc02'
                }}
              >
                <BlockStack gap="200">
                  <Text as="p" fontWeight="600">WASD Movement Layout</Text>
                  <Text variant="bodySm" as="p">
                    The WASD keys are the standard movement controls in most PC games,
                    providing easy access to other keys while keeping fingers in a comfortable position.
                  </Text>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 40px)', gap: '4px' }}>
                      <div />
                      <KeyboardKey>W</KeyboardKey>
                      <div />
                      <KeyboardKey>A</KeyboardKey>
                      <KeyboardKey>S</KeyboardKey>
                      <KeyboardKey>D</KeyboardKey>
                    </div>
                  </div>
                </BlockStack>
              </div>
            )}
          </BlockStack>
        </div>
      </Card>
    </div>
  );
}

export default GamingKeyboardExample;`,
  },

  accessibilityinfo: {
    react: `import { KeyboardKey, InlineStack, BlockStack, Text, Card, Badge } from '@shopify/polaris';
import React from 'react';

interface Shortcut {
  keys: string[];
  description: string;
}

interface PlatformShortcuts {
  platform: string;
  shortcuts: Shortcut[];
}

function AccessibilityInfoExample() {
  const accessibilityShortcuts: PlatformShortcuts[] = [
    {
      platform: 'Windows',
      shortcuts: [
        { keys: ['Alt', '+', 'Tab'], description: 'Switch between windows' },
        { keys: ['Alt', '+', 'F4'], description: 'Close current window' },
        { keys: ['Ctrl', '+', 'Esc'], description: 'Open Task Manager' },
        { keys: ['Windows', '+', 'D'], description: 'Show desktop' },
        { keys: ['Windows', '+', 'L'], description: 'Lock computer' },
      ]
    },
    {
      platform: 'Mac',
      shortcuts: [
        { keys: ['⌘', '+', 'Tab'], description: 'Switch between apps' },
        { keys: ['⌘', '+', 'Q'], description: 'Quit current app' },
        { keys: ['⌘', '+', '⌥', '+', 'Esc'], description: 'Force Quit' },
        { keys: ['⌘', '+', 'F3'], description: 'Show desktop' },
        { keys: ['⌘', '+', '⌃', '+', 'Q'], description: 'Lock screen' },
      ]
    }
  ];

  return (
    <div style={{ maxWidth: '900px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="400">
            <div>
              <h3 style={{ margin: '0 0 16px 0' }}>Accessibility Shortcuts</h3>
              <Text as="p">Essential keyboard shortcuts for accessibility and system navigation.</Text>
            </div>

            {accessibilityShortcuts.map((platform) => (
              <div key={platform.platform}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
                  <Badge tone="info">{platform.platform}</Badge>
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '12px'
                }}>
                  {platform.shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e1e3e5'
                      }}
                    >
                      <Text>{shortcut.description}</Text>
                      <InlineStack gap="50">
                        {shortcut.keys.map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            {key !== '+' ? <KeyboardKey>{key}</KeyboardKey> : <Text>{key}</Text>}
                          </React.Fragment>
                        ))}
                      </InlineStack>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div
              style={{
                padding: '16px',
                backgroundColor: '#e8f5e8',
                borderRadius: '8px',
                border: '1px solid #4CAF50'
              }}
            >
              <BlockStack gap="200">
                <Text as="p" fontWeight="600">Accessibility Tips</Text>
                <Text variant="bodySm" as="p">
                  • Use keyboard navigation when mouse control is difficult<br/>
                  • Learn screen reader shortcuts for better accessibility<br/>
                  • Customize keyboard shortcuts in system settings<br/>
                  • Use sticky keys for one-handed keyboard operation
                </Text>
              </BlockStack>
            </div>
          </BlockStack>
        </div>
      </Card>
    </div>
  );
}

export default AccessibilityInfoExample;`,

    vanilla: `<!-- Accessibility Shortcuts -->
<div class="accessibility-shortcuts">
  <div class="header">
    <h3>Accessibility Shortcuts</h3>
    <p>Essential keyboard shortcuts for accessibility and system navigation.</p>
  </div>

  <div class="platform-section">
    <h4><span class="badge badge-info">Windows</span></h4>
    <div class="shortcuts-grid">
      <div class="shortcut-row">
        <span>Switch between windows</span>
        <div class="keys">
          <kbd class="polaris-keyboard-key">Alt</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">Tab</kbd>
        </div>
      </div>
      <div class="shortcut-row">
        <span>Close current window</span>
        <div class="keys">
          <kbd class="polaris-keyboard-key">Alt</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">F4</kbd>
        </div>
      </div>
      <div class="shortcut-row">
        <span>Open Task Manager</span>
        <div class="keys">
          <kbd class="polaris-keyboard-key">Ctrl</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">Esc</kbd>
        </div>
      </div>
      <div class="shortcut-row">
        <span>Show desktop</span>
        <div class="keys">
          <kbd class="polaris-keyboard-key">Windows</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">D</kbd>
        </div>
      </div>
      <div class="shortcut-row">
        <span>Lock computer</span>
        <div class="keys">
          <kbd class="polaris-keyboard-key">Windows</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">L</kbd>
        </div>
      </div>
    </div>
  </div>

  <div class="platform-section">
    <h4><span class="badge badge-info">Mac</span></h4>
    <div class="shortcuts-grid">
      <div class="shortcut-row">
        <span>Switch between apps</span>
        <div class="keys">
          <kbd class="polaris-keyboard-key">⌘</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">Tab</kbd>
        </div>
      </div>
      <div class="shortcut-row">
        <span>Quit current app</span>
        <div class="keys">
          <kbd class="polaris-keyboard-key">⌘</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">Q</kbd>
        </div>
      </div>
      <div class="shortcut-row">
        <span>Force Quit</span>
        <div class="keys">
          <kbd class="polaris-keyboard-key">⌘</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">⌥</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">Esc</kbd>
        </div>
      </div>
      <div class="shortcut-row">
        <span>Show desktop</span>
        <div class="keys">
          <kbd class="polaris-keyboard-key">⌘</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">F3</kbd>
        </div>
      </div>
      <div class="shortcut-row">
        <span>Lock screen</span>
        <div class="keys">
          <kbd class="polaris-keyboard-key">⌘</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">⌃</kbd>
          <span>+</span>
          <kbd class="polaris-keyboard-key">Q</kbd>
        </div>
      </div>
    </div>
  </div>

  <div class="tips-section">
    <h4>Accessibility Tips</h4>
    <ul>
      <li>Use keyboard navigation when mouse control is difficult</li>
      <li>Learn screen reader shortcuts for better accessibility</li>
      <li>Customize keyboard shortcuts in system settings</li>
      <li>Use sticky keys for one-handed keyboard operation</li>
    </ul>
  </div>
</div>

<script>
import { createShortcutTable } from '@cin7/vanilla-js';

// Dynamically create shortcuts from data
const platformData = [
  {
    platform: 'Windows',
    shortcuts: [
      { keys: ['Alt', '+', 'Tab'], description: 'Switch between windows' },
      { keys: ['Alt', '+', 'F4'], description: 'Close current window' },
      { keys: ['Ctrl', '+', 'Esc'], description: 'Open Task Manager' },
      { keys: ['Windows', '+', 'D'], description: 'Show desktop' },
      { keys: ['Windows', '+', 'L'], description: 'Lock computer' }
    ]
  }
];
</script>

<style>
.accessibility-shortcuts {
  max-width: 900px;
  background: #fff;
  border: 1px solid #e1e3e5;
  border-radius: 8px;
  padding: 24px;
}

.platform-section {
  margin: 24px 0;
}

.platform-section h4 {
  margin: 0 0 16px 0;
  font-size: 18px;
}

.badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.badge-info {
  background-color: #e3f2fd;
  color: #1976d2;
}

.shortcuts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 12px;
}

.shortcut-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e1e3e5;
}

.keys {
  display: flex;
  align-items: center;
  gap: 4px;
}

.tips-section {
  padding: 16px;
  background-color: #e8f5e8;
  border-radius: 8px;
  border: 1px solid #4CAF50;
  margin-top: 24px;
}

.tips-section h4 {
  margin: 0 0 12px 0;
  font-weight: 600;
}

.tips-section ul {
  margin: 0;
  padding-left: 20px;
}

.tips-section li {
  font-size: 14px;
  line-height: 1.6;
}

.polaris-keyboard-key {
  display: inline-block;
  padding: 4px 8px;
  background-color: #fff;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}
</style>`,

    extjs: `// ExtJS Accessibility Shortcuts Panel
Ext.define('AccessibilityShortcuts', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.accessibilityshortcuts',

  title: 'Accessibility Shortcuts',
  width: 900,
  bodyPadding: 24,

  platformShortcuts: [
    {
      platform: 'Windows',
      shortcuts: [
        { keys: ['Alt', '+', 'Tab'], description: 'Switch between windows' },
        { keys: ['Alt', '+', 'F4'], description: 'Close current window' },
        { keys: ['Ctrl', '+', 'Esc'], description: 'Open Task Manager' },
        { keys: ['Windows', '+', 'D'], description: 'Show desktop' },
        { keys: ['Windows', '+', 'L'], description: 'Lock computer' }
      ]
    },
    {
      platform: 'Mac',
      shortcuts: [
        { keys: ['⌘', '+', 'Tab'], description: 'Switch between apps' },
        { keys: ['⌘', '+', 'Q'], description: 'Quit current app' },
        { keys: ['⌘', '+', '⌥', '+', 'Esc'], description: 'Force Quit' },
        { keys: ['⌘', '+', 'F3'], description: 'Show desktop' },
        { keys: ['⌘', '+', '⌃', '+', 'Q'], description: 'Lock screen' }
      ]
    }
  ],

  initComponent: function() {
    const platformPanels = this.platformShortcuts.map(platform =>
      this.createPlatformPanel(platform)
    );

    this.items = [
      {
        xtype: 'component',
        html: '<p>Essential keyboard shortcuts for accessibility and system navigation.</p>',
        margin: '0 0 16 0'
      },
      ...platformPanels,
      {
        xtype: 'container',
        cls: 'tips-panel',
        style: {
          padding: '16px',
          backgroundColor: '#e8f5e8',
          borderRadius: '8px',
          border: '1px solid #4CAF50',
          marginTop: '24px'
        },
        items: [
          {
            xtype: 'component',
            html: \`
              <h4 style="margin: 0 0 12px 0; font-weight: 600;">Accessibility Tips</h4>
              <ul style="margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
                <li>Use keyboard navigation when mouse control is difficult</li>
                <li>Learn screen reader shortcuts for better accessibility</li>
                <li>Customize keyboard shortcuts in system settings</li>
                <li>Use sticky keys for one-handed keyboard operation</li>
              </ul>
            \`
          }
        ]
      }
    ];

    this.callParent(arguments);
  },

  createPlatformPanel: function(platform) {
    return {
      xtype: 'container',
      margin: '16 0',
      items: [
        {
          xtype: 'component',
          html: \`<h4 style="margin: 0 0 16px 0; font-size: 18px;">
                   <span class="badge badge-info">\${platform.platform}</span>
                 </h4>\`,
          margin: '0 0 12 0'
        },
        {
          xtype: 'container',
          layout: {
            type: 'table',
            columns: 2
          },
          items: platform.shortcuts.map(shortcut => ({
            xtype: 'container',
            width: 450,
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 16px',
              backgroundColor: '#f8f9fa',
              borderRadius: '8px',
              border: '1px solid #e1e3e5',
              margin: '6px'
            },
            html: \`
              <span>\${shortcut.description}</span>
              <div class="keys">
                \${shortcut.keys.map(key =>
                  key !== '+'
                    ? \`<kbd class="polaris-keyboard-key">\${key}</kbd>\`
                    : '<span>+</span>'
                ).join(' ')}
              </div>
            \`
          }))
        }
      ]
    };
  }
});

Ext.create('AccessibilityShortcuts', {
  renderTo: Ext.getBody()
});`,

    typescript: `import { KeyboardKey, InlineStack, BlockStack, Text, Card, Badge } from '@shopify/polaris';
import React from 'react';

interface Shortcut {
  keys: string[];
  description: string;
}

interface PlatformShortcuts {
  platform: string;
  shortcuts: Shortcut[];
}

interface AccessibilityInfoExampleProps {
  customShortcuts?: PlatformShortcuts[];
  showTips?: boolean;
}

const DEFAULT_SHORTCUTS: PlatformShortcuts[] = [
  {
    platform: 'Windows',
    shortcuts: [
      { keys: ['Alt', '+', 'Tab'], description: 'Switch between windows' },
      { keys: ['Alt', '+', 'F4'], description: 'Close current window' },
      { keys: ['Ctrl', '+', 'Esc'], description: 'Open Task Manager' },
      { keys: ['Windows', '+', 'D'], description: 'Show desktop' },
      { keys: ['Windows', '+', 'L'], description: 'Lock computer' },
    ]
  },
  {
    platform: 'Mac',
    shortcuts: [
      { keys: ['⌘', '+', 'Tab'], description: 'Switch between apps' },
      { keys: ['⌘', '+', 'Q'], description: 'Quit current app' },
      { keys: ['⌘', '+', '⌥', '+', 'Esc'], description: 'Force Quit' },
      { keys: ['⌘', '+', 'F3'], description: 'Show desktop' },
      { keys: ['⌘', '+', '⌃', '+', 'Q'], description: 'Lock screen' },
    ]
  }
];

function AccessibilityInfoExample({
  customShortcuts,
  showTips = true
}: AccessibilityInfoExampleProps): JSX.Element {
  const accessibilityShortcuts = customShortcuts || DEFAULT_SHORTCUTS;

  return (
    <div style={{ maxWidth: '900px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="400">
            <div>
              <h3 style={{ margin: '0 0 16px 0' }}>Accessibility Shortcuts</h3>
              <Text as="p">Essential keyboard shortcuts for accessibility and system navigation.</Text>
            </div>

            {accessibilityShortcuts.map((platform) => (
              <div key={platform.platform}>
                <h4 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
                  <Badge tone="info">{platform.platform}</Badge>
                </h4>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '12px'
                }}>
                  {platform.shortcuts.map((shortcut, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '12px 16px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '8px',
                        border: '1px solid #e1e3e5'
                      }}
                    >
                      <Text>{shortcut.description}</Text>
                      <InlineStack gap="50">
                        {shortcut.keys.map((key, keyIndex) => (
                          <React.Fragment key={keyIndex}>
                            {key !== '+' ? <KeyboardKey>{key}</KeyboardKey> : <Text>{key}</Text>}
                          </React.Fragment>
                        ))}
                      </InlineStack>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {showTips && (
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#e8f5e8',
                  borderRadius: '8px',
                  border: '1px solid #4CAF50'
                }}
              >
                <BlockStack gap="200">
                  <Text as="p" fontWeight="600">Accessibility Tips</Text>
                  <Text variant="bodySm" as="p">
                    • Use keyboard navigation when mouse control is difficult<br/>
                    • Learn screen reader shortcuts for better accessibility<br/>
                    • Customize keyboard shortcuts in system settings<br/>
                    • Use sticky keys for one-handed keyboard operation
                  </Text>
                </BlockStack>
              </div>
            )}
          </BlockStack>
        </div>
      </Card>
    </div>
  );
}

export default AccessibilityInfoExample;`,
  },

  customstyling: {
    react: `import { KeyboardKey, InlineStack, Text, Card, BlockStack } from '@shopify/polaris';
import React from 'react';

function CustomStylingExample() {
  return (
    <div style={{ maxWidth: '600px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="400">
            <div>
              <h3 style={{ margin: '0 0 16px 0' }}>Styled Keyboard Examples</h3>
              <Text as="p">Different ways to style and present keyboard keys.</Text>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0' }}>Standard Style:</h4>
              <InlineStack gap="200">
                <KeyboardKey>Ctrl</KeyboardKey>
                <Text>+</Text>
                <KeyboardKey>S</KeyboardKey>
              </InlineStack>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0' }}>Compact Style:</h4>
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                {['Ctrl', '+', 'S'].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: item === '+' ? '0 4px' : '2px 8px',
                      backgroundColor: item === '+' ? 'transparent' : '#f1f3f4',
                      border: item === '+' ? 'none' : '1px solid #dadce0',
                      borderRadius: item === '+' ? '0' : '4px',
                      fontSize: '12px',
                      fontFamily: 'monospace'
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0' }}>Highlighted Style:</h4>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {['Ctrl', '+', 'S'].map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: item === '+' ? '0 4px' : '4px 10px',
                      backgroundColor: item === '+' ? 'transparent' : '#e3f2fd',
                      border: item === '+' ? 'none' : '1px solid #2196F3',
                      borderRadius: item === '+' ? '0' : '6px',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: item === '+' ? '#666' : '#1976D2'
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ margin: '0 0 12px 0' }}>Minimal Style:</h4>
              <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                {['Ctrl', '+', 'S'].map((item, index) => (
                  <span
                    key={index}
                    style={{
                      padding: item === '+' ? '0 2px' : '1px 6px',
                      backgroundColor: item === '+' ? 'transparent' : '#fafafa',
                      border: item === '+' ? 'none' : '1px solid #e0e0e0',
                      borderRadius: '2px',
                      fontSize: '11px',
                      fontFamily: 'monospace'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </BlockStack>
        </div>
      </Card>
    </div>
  );
}

export default CustomStylingExample;`,

    vanilla: `<!-- Custom Styled Keyboard Keys -->
<div class="custom-keyboard-styles">
  <div class="header">
    <h3>Styled Keyboard Examples</h3>
    <p>Different ways to style and present keyboard keys.</p>
  </div>

  <div class="style-examples">
    <div class="style-section">
      <h4>Standard Style:</h4>
      <div class="keys-row">
        <kbd class="polaris-keyboard-key">Ctrl</kbd>
        <span>+</span>
        <kbd class="polaris-keyboard-key">S</kbd>
      </div>
    </div>

    <div class="style-section">
      <h4>Compact Style:</h4>
      <div class="keys-row">
        <kbd class="kbd-compact">Ctrl</kbd>
        <span>+</span>
        <kbd class="kbd-compact">S</kbd>
      </div>
    </div>

    <div class="style-section">
      <h4>Highlighted Style:</h4>
      <div class="keys-row">
        <kbd class="kbd-highlighted">Ctrl</kbd>
        <span>+</span>
        <kbd class="kbd-highlighted">S</kbd>
      </div>
    </div>

    <div class="style-section">
      <h4>Minimal Style:</h4>
      <div class="keys-row">
        <kbd class="kbd-minimal">Ctrl</kbd>
        <span>+</span>
        <kbd class="kbd-minimal">S</kbd>
      </div>
    </div>
  </div>
</div>

<script>
import { $ } from '@cin7/vanilla-js';

// Apply dynamic styling if needed
document.querySelectorAll('.kbd-highlighted').forEach(kbd => {
  kbd.addEventListener('mouseenter', () => {
    kbd.style.transform = 'scale(1.05)';
  });
  kbd.addEventListener('mouseleave', () => {
    kbd.style.transform = 'scale(1)';
  });
});
</script>

<style>
.custom-keyboard-styles {
  max-width: 600px;
  background: #fff;
  border: 1px solid #e1e3e5;
  border-radius: 8px;
  padding: 24px;
}

.style-examples {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 24px;
}

.style-section h4 {
  margin: 0 0 12px 0;
  font-size: 14px;
}

.keys-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Standard style */
.polaris-keyboard-key {
  display: inline-block;
  padding: 4px 8px;
  background-color: #f4f6f8;
  border: 1px solid #c4cdd5;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

/* Compact style */
.kbd-compact {
  display: inline-block;
  padding: 2px 8px;
  background-color: #f1f3f4;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
}

/* Highlighted style */
.kbd-highlighted {
  display: inline-block;
  padding: 4px 10px;
  background-color: #e3f2fd;
  border: 1px solid #2196F3;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #1976D2;
  transition: transform 0.2s;
}

.kbd-highlighted:hover {
  transform: scale(1.05);
}

/* Minimal style */
.kbd-minimal {
  display: inline-block;
  padding: 1px 6px;
  background-color: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  font-size: 11px;
  font-family: monospace;
}
</style>`,

    extjs: `// ExtJS Custom Keyboard Key Styles
Ext.define('CustomKeyboardStyles', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.customkeyboardstyles',

  title: 'Styled Keyboard Examples',
  width: 600,
  bodyPadding: 24,

  initComponent: function() {
    this.items = [
      {
        xtype: 'component',
        html: '<p>Different ways to style and present keyboard keys.</p>',
        margin: '0 0 24 0'
      },
      {
        xtype: 'container',
        items: [
          this.createStyleExample('Standard Style:', 'standard'),
          this.createStyleExample('Compact Style:', 'compact'),
          this.createStyleExample('Highlighted Style:', 'highlighted'),
          this.createStyleExample('Minimal Style:', 'minimal')
        ]
      }
    ];

    this.callParent(arguments);
  },

  createStyleExample: function(title, styleType) {
    const keys = ['Ctrl', '+', 'S'];
    let styleClass = '';

    switch(styleType) {
      case 'standard':
        styleClass = 'polaris-keyboard-key';
        break;
      case 'compact':
        styleClass = 'kbd-compact';
        break;
      case 'highlighted':
        styleClass = 'kbd-highlighted';
        break;
      case 'minimal':
        styleClass = 'kbd-minimal';
        break;
    }

    return {
      xtype: 'container',
      margin: '0 0 24 0',
      items: [
        {
          xtype: 'component',
          html: \`<h4 style="margin: 0 0 12px 0; font-size: 14px;">\${title}</h4>\`
        },
        {
          xtype: 'container',
          layout: 'hbox',
          items: keys.map(key => {
            if (key === '+') {
              return {
                xtype: 'component',
                html: '<span style="padding: 0 4px;">+</span>'
              };
            }
            return {
              xtype: 'component',
              html: \`<kbd class="\${styleClass}">\${key}</kbd>\`,
              margin: '0 8 0 0'
            };
          })
        }
      ]
    };
  }
});

Ext.create('CustomKeyboardStyles', {
  renderTo: Ext.getBody()
});

// Add CSS styles dynamically
Ext.util.CSS.createStyleSheet(\`
  .polaris-keyboard-key {
    display: inline-block;
    padding: 4px 8px;
    background-color: #f4f6f8;
    border: 1px solid #c4cdd5;
    border-radius: 4px;
    font-family: monospace;
    font-size: 12px;
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
  }

  .kbd-compact {
    display: inline-block;
    padding: 2px 8px;
    background-color: #f1f3f4;
    border: 1px solid #dadce0;
    border-radius: 4px;
    font-size: 12px;
    font-family: monospace;
  }

  .kbd-highlighted {
    display: inline-block;
    padding: 4px 10px;
    background-color: #e3f2fd;
    border: 1px solid #2196F3;
    border-radius: 6px;
    font-size: 13px;
    font-weight: 500;
    color: #1976D2;
  }

  .kbd-minimal {
    display: inline-block;
    padding: 1px 6px;
    background-color: #fafafa;
    border: 1px solid #e0e0e0;
    border-radius: 2px;
    font-size: 11px;
    font-family: monospace;
  }
\`);`,

    typescript: `import { KeyboardKey, InlineStack, Text, Card, BlockStack } from '@shopify/polaris';
import React from 'react';

interface StyleVariant {
  name: string;
  getStyle: (item: string) => React.CSSProperties;
}

interface CustomStylingExampleProps {
  customVariants?: StyleVariant[];
  showAllVariants?: boolean;
}

const DEFAULT_STYLE_VARIANTS: StyleVariant[] = [
  {
    name: 'Standard Style',
    getStyle: (item) => ({
      padding: item === '+' ? '0 4px' : '4px 8px',
      backgroundColor: item === '+' ? 'transparent' : '#f4f6f8',
      border: item === '+' ? 'none' : '1px solid #c4cdd5',
      borderRadius: item === '+' ? '0' : '4px',
      fontSize: '12px',
      fontFamily: 'monospace',
      boxShadow: item === '+' ? 'none' : '0 1px 0 rgba(0, 0, 0, 0.1)'
    })
  },
  {
    name: 'Compact Style',
    getStyle: (item) => ({
      padding: item === '+' ? '0 4px' : '2px 8px',
      backgroundColor: item === '+' ? 'transparent' : '#f1f3f4',
      border: item === '+' ? 'none' : '1px solid #dadce0',
      borderRadius: item === '+' ? '0' : '4px',
      fontSize: '12px',
      fontFamily: 'monospace'
    })
  },
  {
    name: 'Highlighted Style',
    getStyle: (item) => ({
      padding: item === '+' ? '0 4px' : '4px 10px',
      backgroundColor: item === '+' ? 'transparent' : '#e3f2fd',
      border: item === '+' ? 'none' : '1px solid #2196F3',
      borderRadius: item === '+' ? '0' : '6px',
      fontSize: '13px',
      fontWeight: '500',
      color: item === '+' ? '#666' : '#1976D2'
    })
  },
  {
    name: 'Minimal Style',
    getStyle: (item) => ({
      padding: item === '+' ? '0 2px' : '1px 6px',
      backgroundColor: item === '+' ? 'transparent' : '#fafafa',
      border: item === '+' ? 'none' : '1px solid #e0e0e0',
      borderRadius: '2px',
      fontSize: '11px',
      fontFamily: 'monospace'
    })
  }
];

function CustomStylingExample({
  customVariants,
  showAllVariants = true
}: CustomStylingExampleProps): JSX.Element {
  const styleVariants = customVariants || DEFAULT_STYLE_VARIANTS;
  const keys = ['Ctrl', '+', 'S'];

  return (
    <div style={{ maxWidth: '600px', width: '100%' }}>
      <Card>
        <div style={{ padding: '24px' }}>
          <BlockStack gap="400">
            <div>
              <h3 style={{ margin: '0 0 16px 0' }}>Styled Keyboard Examples</h3>
              <Text as="p">Different ways to style and present keyboard keys.</Text>
            </div>

            {(showAllVariants ? styleVariants : styleVariants.slice(0, 1)).map((variant, variantIndex) => (
              <div key={variantIndex}>
                <h4 style={{ margin: '0 0 12px 0' }}>{variant.name}:</h4>
                <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {keys.map((item, index) => (
                    <div key={index} style={variant.getStyle(item)}>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </BlockStack>
        </div>
      </Card>
    </div>
  );
}

export default CustomStylingExample;`,
  }
};


// Text Component Examples

export const textExamples: Record<string, CodeVariant> = {
  body: {
    react: `import { Text } from '@shopify/polaris';

function TextExample() {
  return (
    <Text variant="bodyMd" as="p">
      This is default body text using the Text component.
    </Text>
  );
}

export default TextExample;`,

    vanilla: `<!-- Text Structure -->
<p class="polaris-text polaris-text--body-md">
  This is default body text using the Text component.
</p>

<script>
// Using @cin7/vanilla-js for dynamic text creation
import { createTextElement } from '@cin7/vanilla-js';

const textEl = createTextElement({
  tag: 'p',
  text: 'This is default body text using the Text component.',
  className: 'polaris-text polaris-text--body-md'
});

document.getElementById('app').appendChild(textEl);
</script>

<style>
.polaris-text--body-md {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
</style>`,

    extjs: `// ExtJS Text representation using @cin7/extjs-adapters
Ext.create('Ext.Component', {
  html: '<p class="polaris-text polaris-text--body-md">This is default body text using the Text component.</p>',
  renderTo: Ext.getBody()
});

// Alternative: Using ExtJS Container with typography
Ext.create('Ext.container.Container', {
  html: 'This is default body text using the Text component.',
  cls: 'polaris-text polaris-text--body-md',
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text } from '@shopify/polaris';
import React from 'react';

interface TextExampleProps {
  variant?: 'bodySm' | 'bodyMd' | 'bodyLg' | 'headingSm' | 'headingMd' | 'headingLg' | 'headingXl';
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  tone?: 'base' | 'subdued' | 'critical' | 'success' | 'warning' | 'attention' | 'info';
  children: React.ReactNode;
}

function TextExample({
  variant = 'bodyMd',
  as = 'p',
  tone = 'base',
  children
}: TextExampleProps): JSX.Element {
  return (
    <Text variant={variant} as={as} tone={tone}>
      {children}
    </Text>
  );
}

export default TextExample;`,
  },

  variants: {
    react: `import { Text } from '@shopify/polaris';

function TextVariantsExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <Text variant="bodySm" as="p">
        Body Small - Used for captions, metadata, and helper text
      </Text>
      <Text variant="bodyMd" as="p">
        Body Medium - Default text for paragraphs and descriptions
      </Text>
      <Text variant="bodyLg" as="p">
        Body Large - Emphasized body text and short descriptions
      </Text>
      <Text variant="headingSm" as="h4">
        Heading Small - Section headers and card titles
      </Text>
      <Text variant="headingMd" as="h3">
        Heading Medium - Subsection titles and important labels
      </Text>
      <Text variant="headingLg" as="h2">
        Heading Large - Main section titles
      </Text>
      <Text variant="headingXl" as="h1">
        Heading XL - Page titles and major headlines
      </Text>
    </div>
  );
}

export default TextVariantsExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="text-variants-container" style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
  <p class="polaris-text polaris-text--body-sm">
    Body Small - Used for captions, metadata, and helper text
  </p>
  <p class="polaris-text polaris-text--body-md">
    Body Medium - Default text for paragraphs and descriptions
  </p>
  <p class="polaris-text polaris-text--body-lg">
    Body Large - Emphasized body text and short descriptions
  </p>
  <h4 class="polaris-text polaris-text--heading-sm">
    Heading Small - Section headers and card titles
  </h4>
  <h3 class="polaris-text polaris-text--heading-md">
    Heading Medium - Subsection titles and important labels
  </h3>
  <h2 class="polaris-text polaris-text--heading-lg">
    Heading Large - Main section titles
  </h2>
  <h1 class="polaris-text polaris-text--heading-xl">
    Heading XL - Page titles and major headlines
  </h1>
</div>

<style>
.polaris-text--body-sm { font-size: 12px; line-height: 16px; font-weight: 400; }
.polaris-text--body-md { font-size: 14px; line-height: 20px; font-weight: 400; }
.polaris-text--body-lg { font-size: 16px; line-height: 24px; font-weight: 400; }
.polaris-text--heading-sm { font-size: 14px; line-height: 20px; font-weight: 600; }
.polaris-text--heading-md { font-size: 16px; line-height: 24px; font-weight: 600; }
.polaris-text--heading-lg { font-size: 20px; line-height: 28px; font-weight: 700; }
.polaris-text--heading-xl { font-size: 24px; line-height: 32px; font-weight: 700; }
</style>`,

    extjs: `// ExtJS Text Variants Panel using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  title: 'Text Variants',
  bodyPadding: 16,
  width: 600,
  items: [
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-sm">Body Small - Used for captions, metadata, and helper text</p>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md">Body Medium - Default text for paragraphs and descriptions</p>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-lg">Body Large - Emphasized body text and short descriptions</p>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'component',
      html: '<h4 class="polaris-text polaris-text--heading-sm">Heading Small - Section headers and card titles</h4>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'component',
      html: '<h3 class="polaris-text polaris-text--heading-md">Heading Medium - Subsection titles and important labels</h3>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'component',
      html: '<h2 class="polaris-text polaris-text--heading-lg">Heading Large - Main section titles</h2>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'component',
      html: '<h1 class="polaris-text polaris-text--heading-xl">Heading XL - Page titles and major headlines</h1>'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text } from '@shopify/polaris';
import React from 'react';

type TextVariant = 'bodySm' | 'bodyMd' | 'bodyLg' | 'headingSm' | 'headingMd' | 'headingLg' | 'headingXl';
type TextElement = 'p' | 'h1' | 'h2' | 'h3' | 'h4';

interface VariantConfig {
  variant: TextVariant;
  as: TextElement;
  text: string;
}

function TextVariantsExample(): JSX.Element {
  const variants: VariantConfig[] = [
    { variant: 'bodySm', as: 'p', text: 'Body Small - Used for captions, metadata, and helper text' },
    { variant: 'bodyMd', as: 'p', text: 'Body Medium - Default text for paragraphs and descriptions' },
    { variant: 'bodyLg', as: 'p', text: 'Body Large - Emphasized body text and short descriptions' },
    { variant: 'headingSm', as: 'h4', text: 'Heading Small - Section headers and card titles' },
    { variant: 'headingMd', as: 'h3', text: 'Heading Medium - Subsection titles and important labels' },
    { variant: 'headingLg', as: 'h2', text: 'Heading Large - Main section titles' },
    { variant: 'headingXl', as: 'h1', text: 'Heading XL - Page titles and major headlines' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      {variants.map((config, index) => (
        <Text key={index} variant={config.variant} as={config.as}>
          {config.text}
        </Text>
      ))}
    </div>
  );
}

export default TextVariantsExample;`,
  },

  tones: {
    react: `import { Text } from '@shopify/polaris';

function TextTonesExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
      <Text variant="bodyMd" tone="base">Base tone - Default text color</Text>
      <Text variant="bodyMd" tone="subdued">Subdued tone - Secondary information</Text>
      <Text variant="bodyMd" tone="success">Success tone - Positive messages</Text>
      <Text variant="bodyMd" tone="warning">Warning tone - Caution messages</Text>
      <Text variant="bodyMd" tone="attention">Attention tone - Important notices</Text>
      <Text variant="bodyMd" tone="critical">Critical tone - Error messages</Text>
      <Text variant="bodyMd" tone="info">Info tone - Informational content</Text>
    </div>
  );
}

export default TextTonesExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px;">
  <p class="polaris-text polaris-text--body-md polaris-text--tone-base">
    Base tone - Default text color
  </p>
  <p class="polaris-text polaris-text--body-md polaris-text--tone-subdued">
    Subdued tone - Secondary information
  </p>
  <p class="polaris-text polaris-text--body-md polaris-text--tone-success">
    Success tone - Positive messages
  </p>
  <p class="polaris-text polaris-text--body-md polaris-text--tone-warning">
    Warning tone - Caution messages
  </p>
  <p class="polaris-text polaris-text--body-md polaris-text--tone-attention">
    Attention tone - Important notices
  </p>
  <p class="polaris-text polaris-text--body-md polaris-text--tone-critical">
    Critical tone - Error messages
  </p>
  <p class="polaris-text polaris-text--body-md polaris-text--tone-info">
    Info tone - Informational content
  </p>
</div>

<style>
.polaris-text--tone-base { color: #202223; }
.polaris-text--tone-subdued { color: #6d7175; }
.polaris-text--tone-success { color: #008060; }
.polaris-text--tone-warning { color: #916a00; }
.polaris-text--tone-attention { color: #c05717; }
.polaris-text--tone-critical { color: #d72c0d; }
.polaris-text--tone-info { color: #006fbb; }
</style>`,

    extjs: `// ExtJS Text Tones using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  title: 'Text Tones',
  bodyPadding: 16,
  width: 500,
  items: [
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--tone-base">Base tone - Default text color</p>',
      margin: '0 0 12 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--tone-subdued">Subdued tone - Secondary information</p>',
      margin: '0 0 12 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--tone-success">Success tone - Positive messages</p>',
      margin: '0 0 12 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--tone-warning">Warning tone - Caution messages</p>',
      margin: '0 0 12 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--tone-attention">Attention tone - Important notices</p>',
      margin: '0 0 12 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--tone-critical">Critical tone - Error messages</p>',
      margin: '0 0 12 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--tone-info">Info tone - Informational content</p>'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text } from '@shopify/polaris';
import React from 'react';

type TextTone = 'base' | 'subdued' | 'success' | 'warning' | 'attention' | 'critical' | 'info';

interface ToneConfig {
  tone: TextTone;
  label: string;
}

function TextTonesExample(): JSX.Element {
  const tones: ToneConfig[] = [
    { tone: 'base', label: 'Base tone - Default text color' },
    { tone: 'subdued', label: 'Subdued tone - Secondary information' },
    { tone: 'success', label: 'Success tone - Positive messages' },
    { tone: 'warning', label: 'Warning tone - Caution messages' },
    { tone: 'attention', label: 'Attention tone - Important notices' },
    { tone: 'critical', label: 'Critical tone - Error messages' },
    { tone: 'info', label: 'Info tone - Informational content' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
      {tones.map((config, index) => (
        <Text key={index} variant="bodyMd" tone={config.tone}>
          {config.label}
        </Text>
      ))}
    </div>
  );
}

export default TextTonesExample;`,
  },

  fontWeights: {
    react: `import { Text } from '@shopify/polaris';

function FontWeightsExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
      <Text variant="bodyMd" fontWeight="regular">Regular weight - Default text</Text>
      <Text variant="bodyMd" fontWeight="medium">Medium weight - Slightly emphasized</Text>
      <Text variant="bodyMd" fontWeight="semibold">Semibold weight - Moderately emphasized</Text>
      <Text variant="bodyMd" fontWeight="bold">Bold weight - Strongly emphasized</Text>
    </div>
  );
}

export default FontWeightsExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="display: flex; flex-direction: column; gap: 12px; max-width: 500px;">
  <p class="polaris-text polaris-text--body-md polaris-text--weight-regular">
    Regular weight - Default text
  </p>
  <p class="polaris-text polaris-text--body-md polaris-text--weight-medium">
    Medium weight - Slightly emphasized
  </p>
  <p class="polaris-text polaris-text--body-md polaris-text--weight-semibold">
    Semibold weight - Moderately emphasized
  </p>
  <p class="polaris-text polaris-text--body-md polaris-text--weight-bold">
    Bold weight - Strongly emphasized
  </p>
</div>

<style>
.polaris-text--weight-regular { font-weight: 400; }
.polaris-text--weight-medium { font-weight: 500; }
.polaris-text--weight-semibold { font-weight: 600; }
.polaris-text--weight-bold { font-weight: 700; }
</style>`,

    extjs: `// ExtJS Font Weights using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  title: 'Font Weights',
  bodyPadding: 16,
  width: 500,
  items: [
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--weight-regular">Regular weight - Default text</p>',
      margin: '0 0 12 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--weight-medium">Medium weight - Slightly emphasized</p>',
      margin: '0 0 12 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--weight-semibold">Semibold weight - Moderately emphasized</p>',
      margin: '0 0 12 0'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--weight-bold">Bold weight - Strongly emphasized</p>'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text } from '@shopify/polaris';
import React from 'react';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

interface WeightConfig {
  weight: FontWeight;
  label: string;
}

function FontWeightsExample(): JSX.Element {
  const weights: WeightConfig[] = [
    { weight: 'regular', label: 'Regular weight - Default text' },
    { weight: 'medium', label: 'Medium weight - Slightly emphasized' },
    { weight: 'semibold', label: 'Semibold weight - Moderately emphasized' },
    { weight: 'bold', label: 'Bold weight - Strongly emphasized' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
      {weights.map((config, index) => (
        <Text key={index} variant="bodyMd" fontWeight={config.weight}>
          {config.label}
        </Text>
      ))}
    </div>
  );
}

export default FontWeightsExample;`,
  },

  alignment: {
    react: `import { Text } from '@shopify/polaris';

function TextAlignmentExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <Text variant="bodyMd" alignment="start">
          Left aligned text (start) - Default alignment for most content
        </Text>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <Text variant="bodyMd" alignment="center">
          Center aligned text - Perfect for headers and callouts
        </Text>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <Text variant="bodyMd" alignment="end">
          Right aligned text (end) - Good for prices and metadata
        </Text>
      </div>
      <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
        <Text variant="bodyMd" alignment="justify">
          Justified text - Creates clean columns and professional layouts
        </Text>
      </div>
    </div>
  );
}

export default TextAlignmentExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="display: flex; flex-direction: column; gap: 16px; max-width: 600px;">
  <div style="padding: 12px; background-color: #f8f9fa; border-radius: 4px;">
    <p class="polaris-text polaris-text--body-md polaris-text--align-start">
      Left aligned text (start) - Default alignment for most content
    </p>
  </div>
  <div style="padding: 12px; background-color: #f8f9fa; border-radius: 4px;">
    <p class="polaris-text polaris-text--body-md polaris-text--align-center">
      Center aligned text - Perfect for headers and callouts
    </p>
  </div>
  <div style="padding: 12px; background-color: #f8f9fa; border-radius: 4px;">
    <p class="polaris-text polaris-text--body-md polaris-text--align-end">
      Right aligned text (end) - Good for prices and metadata
    </p>
  </div>
  <div style="padding: 12px; background-color: #f8f9fa; border-radius: 4px;">
    <p class="polaris-text polaris-text--body-md polaris-text--align-justify">
      Justified text - Creates clean columns and professional layouts
    </p>
  </div>
</div>

<style>
.polaris-text--align-start { text-align: left; }
.polaris-text--align-center { text-align: center; }
.polaris-text--align-end { text-align: right; }
.polaris-text--align-justify { text-align: justify; }
</style>`,

    extjs: `// ExtJS Text Alignment using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  title: 'Text Alignment',
  bodyPadding: 16,
  width: 600,
  items: [
    {
      xtype: 'container',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--align-start">Left aligned text (start) - Default alignment for most content</p>',
      style: {
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        marginBottom: '16px'
      }
    },
    {
      xtype: 'container',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--align-center">Center aligned text - Perfect for headers and callouts</p>',
      style: {
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        marginBottom: '16px'
      }
    },
    {
      xtype: 'container',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--align-end">Right aligned text (end) - Good for prices and metadata</p>',
      style: {
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        marginBottom: '16px'
      }
    },
    {
      xtype: 'container',
      html: '<p class="polaris-text polaris-text--body-md polaris-text--align-justify">Justified text - Creates clean columns and professional layouts</p>',
      style: {
        padding: '12px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px'
      }
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text } from '@shopify/polaris';
import React from 'react';

type TextAlignment = 'start' | 'center' | 'end' | 'justify';

interface AlignmentConfig {
  alignment: TextAlignment;
  label: string;
}

function TextAlignmentExample(): JSX.Element {
  const alignments: AlignmentConfig[] = [
    { alignment: 'start', label: 'Left aligned text (start) - Default alignment for most content' },
    { alignment: 'center', label: 'Center aligned text - Perfect for headers and callouts' },
    { alignment: 'end', label: 'Right aligned text (end) - Good for prices and metadata' },
    { alignment: 'justify', label: 'Justified text - Creates clean columns and professional layouts' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
      {alignments.map((config, index) => (
        <div key={index} style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
          <Text variant="bodyMd" alignment={config.alignment}>
            {config.label}
          </Text>
        </div>
      ))}
    </div>
  );
}

export default TextAlignmentExample;`,
  },

  specialized: {
    react: `import { Text } from '@shopify/polaris';

function SpecializedTextExample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
      <div>
        <Text variant="headingMd" as="h3">Numeric Text</Text>
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Text variant="bodyLg" numeric>123,456.78</Text>
          <Text variant="bodyMd" numeric>$1,234.56</Text>
          <Text variant="bodySm" numeric>99.9%</Text>
        </div>
      </div>

      <div>
        <Text variant="headingMd" as="h3">Truncated Text</Text>
        <div style={{ marginTop: '8px' }}>
          <Text variant="bodyMd" truncate>
            This is a very long text that will be truncated with an ellipsis when it exceeds the container width
          </Text>
        </div>
      </div>

      <div>
        <Text variant="headingMd" as="h3">Text with Word Breaking</Text>
        <div style={{ marginTop: '8px', width: '200px' }}>
          <Text variant="bodyMd" breakWord>
            Supercalifragilisticexpialidocious
          </Text>
        </div>
      </div>

      <div>
        <Text variant="headingMd" as="h3">Semantic HTML Elements</Text>
        <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Text variant="bodyMd" as="p">Paragraph text</Text>
          <Text variant="bodyMd" as="label">Label text</Text>
          <Text variant="bodyMd" as="strong">Strong text</Text>
          <Text variant="bodyMd" as="em">Emphasized text</Text>
          <Text variant="bodyMd" as="span">Span text</Text>
        </div>
      </div>
    </div>
  );
}

export default SpecializedTextExample;`,

    vanilla: `<!-- HTML Structure -->
<div style="display: flex; flex-direction: column; gap: 20px; max-width: 600px;">
  <!-- Numeric Text -->
  <div>
    <h3 class="polaris-text polaris-text--heading-md">Numeric Text</h3>
    <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 8px;">
      <p class="polaris-text polaris-text--body-lg polaris-text--numeric">123,456.78</p>
      <p class="polaris-text polaris-text--body-md polaris-text--numeric">$1,234.56</p>
      <p class="polaris-text polaris-text--body-sm polaris-text--numeric">99.9%</p>
    </div>
  </div>

  <!-- Truncated Text -->
  <div>
    <h3 class="polaris-text polaris-text--heading-md">Truncated Text</h3>
    <div style="margin-top: 8px;">
      <p class="polaris-text polaris-text--body-md polaris-text--truncate">
        This is a very long text that will be truncated with an ellipsis when it exceeds the container width
      </p>
    </div>
  </div>

  <!-- Word Breaking -->
  <div>
    <h3 class="polaris-text polaris-text--heading-md">Text with Word Breaking</h3>
    <div style="margin-top: 8px; width: 200px;">
      <p class="polaris-text polaris-text--body-md polaris-text--break-word">
        Supercalifragilisticexpialidocious
      </p>
    </div>
  </div>

  <!-- Semantic Elements -->
  <div>
    <h3 class="polaris-text polaris-text--heading-md">Semantic HTML Elements</h3>
    <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 4px;">
      <p class="polaris-text polaris-text--body-md">Paragraph text</p>
      <label class="polaris-text polaris-text--body-md">Label text</label>
      <strong class="polaris-text polaris-text--body-md">Strong text</strong>
      <em class="polaris-text polaris-text--body-md">Emphasized text</em>
      <span class="polaris-text polaris-text--body-md">Span text</span>
    </div>
  </div>
</div>

<style>
.polaris-text--numeric { font-variant-numeric: tabular-nums; }
.polaris-text--truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.polaris-text--break-word { word-break: break-word; }
</style>`,

    extjs: `// ExtJS Specialized Text using @cin7/extjs-adapters
Ext.create('Ext.panel.Panel', {
  title: 'Specialized Text',
  bodyPadding: 16,
  width: 600,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'container',
      html: '<h3 class="polaris-text polaris-text--heading-md">Numeric Text</h3>' +
            '<p class="polaris-text polaris-text--body-lg polaris-text--numeric">123,456.78</p>' +
            '<p class="polaris-text polaris-text--body-md polaris-text--numeric">$1,234.56</p>' +
            '<p class="polaris-text polaris-text--body-sm polaris-text--numeric">99.9%</p>',
      margin: '0 0 20 0'
    },
    {
      xtype: 'container',
      html: '<h3 class="polaris-text polaris-text--heading-md">Truncated Text</h3>' +
            '<p class="polaris-text polaris-text--body-md polaris-text--truncate">This is a very long text that will be truncated with an ellipsis when it exceeds the container width</p>',
      margin: '0 0 20 0'
    },
    {
      xtype: 'container',
      html: '<h3 class="polaris-text polaris-text--heading-md">Text with Word Breaking</h3>' +
            '<p class="polaris-text polaris-text--body-md polaris-text--break-word" style="width: 200px;">Supercalifragilisticexpialidocious</p>',
      margin: '0 0 20 0'
    },
    {
      xtype: 'container',
      html: '<h3 class="polaris-text polaris-text--heading-md">Semantic HTML Elements</h3>' +
            '<p class="polaris-text polaris-text--body-md">Paragraph text</p>' +
            '<label class="polaris-text polaris-text--body-md">Label text</label><br>' +
            '<strong class="polaris-text polaris-text--body-md">Strong text</strong><br>' +
            '<em class="polaris-text polaris-text--body-md">Emphasized text</em><br>' +
            '<span class="polaris-text polaris-text--body-md">Span text</span>'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text } from '@shopify/polaris';
import React from 'react';

interface SpecializedTextExampleProps {
  showNumeric?: boolean;
  showTruncate?: boolean;
  showBreakWord?: boolean;
  showSemantic?: boolean;
}

function SpecializedTextExample({
  showNumeric = true,
  showTruncate = true,
  showBreakWord = true,
  showSemantic = true
}: SpecializedTextExampleProps): JSX.Element {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '600px' }}>
      {showNumeric && (
        <div>
          <Text variant="headingMd" as="h3">Numeric Text</Text>
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Text variant="bodyLg" numeric>123,456.78</Text>
            <Text variant="bodyMd" numeric>$1,234.56</Text>
            <Text variant="bodySm" numeric>99.9%</Text>
          </div>
        </div>
      )}

      {showTruncate && (
        <div>
          <Text variant="headingMd" as="h3">Truncated Text</Text>
          <div style={{ marginTop: '8px' }}>
            <Text variant="bodyMd" truncate>
              This is a very long text that will be truncated with an ellipsis when it exceeds the container width
            </Text>
          </div>
        </div>
      )}

      {showBreakWord && (
        <div>
          <Text variant="headingMd" as="h3">Text with Word Breaking</Text>
          <div style={{ marginTop: '8px', width: '200px' }}>
            <Text variant="bodyMd" breakWord>
              Supercalifragilisticexpialidocious
            </Text>
          </div>
        </div>
      )}

      {showSemantic && (
        <div>
          <Text variant="headingMd" as="h3">Semantic HTML Elements</Text>
          <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Text variant="bodyMd" as="p">Paragraph text</Text>
            <Text variant="bodyMd" as="label">Label text</Text>
            <Text variant="bodyMd" as="strong">Strong text</Text>
            <Text variant="bodyMd" as="em">Emphasized text</Text>
            <Text variant="bodyMd" as="span">Span text</Text>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpecializedTextExample;`,
  }
};

// Truncate Component Examples

export const truncateExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Text, BlockStack } from '@shopify/polaris';
import React from 'react';

function TruncateDefault() {
  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Basic Truncation</Text>
      <div style={{ maxWidth: '200px' }}>
        <Text variant="bodyMd" truncate>
          This is a very long text that will be truncated with an ellipsis when it exceeds the container width
        </Text>
      </div>
    </BlockStack>
  );
}

export default TruncateDefault;`,

    vanilla: `<!-- Truncate using @cin7/vanilla-js -->
<div id="truncate-container"></div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

const container = $('#truncate-container');

const heading = createElement('h3', {
  className: 'polaris-text polaris-text--heading-md',
  textContent: 'Basic Truncation'
});

const textContainer = createElement('div', {
  style: 'max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'
});

const text = createElement('p', {
  className: 'polaris-text polaris-text--body-md',
  textContent: 'This is a very long text that will be truncated with an ellipsis when it exceeds the container width'
});

textContainer.appendChild(text);
container.appendChild(heading);
container.appendChild(textContainer);
</script>

<style>
.truncate-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>`,

    extjs: `// ExtJS Truncate using @cin7/extjs-adapters
import { PolarisText } from '@cin7/extjs-adapters';

Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'component',
      html: '<h3 class="polaris-text polaris-text--heading-md">Basic Truncation</h3>'
    },
    {
      xtype: 'container',
      width: 200,
      layout: 'fit',
      items: [
        {
          xtype: 'component',
          html: '<p class="polaris-text polaris-text--body-md" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">This is a very long text that will be truncated with an ellipsis when it exceeds the container width</p>'
        }
      ]
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text, BlockStack } from '@shopify/polaris';
import React, { useMemo, useCallback } from 'react';
import type { CSSProperties } from 'react';

/**
 * Props interface for the TruncateDefault component
 * @interface TruncateDefaultProps
 */
interface TruncateDefaultProps {
  /** Maximum width of the truncated text container */
  maxWidth?: string | number;
  /** Text content to be displayed and potentially truncated */
  text?: string;
  /** Optional callback when text is truncated */
  onTruncate?: (isTruncated: boolean) => void;
}

/**
 * Configuration for truncation behavior
 * @interface TruncateConfig
 */
interface TruncateConfig {
  readonly maxWidth: string;
  readonly displayText: string;
  readonly shouldTruncate: boolean;
}

/**
 * Type guard to check if a value is a valid width string
 * @param value - The value to check
 * @returns True if the value is a valid width string
 */
const isValidWidth = (value: string | number | undefined): value is string | number => {
  return value !== undefined && (typeof value === 'string' || typeof value === 'number');
};

/**
 * TruncateDefault component with comprehensive type safety
 * Demonstrates basic text truncation with configurable width
 */
const TruncateDefault: React.FC<TruncateDefaultProps> = ({
  maxWidth = '200px',
  text = 'This is a very long text that will be truncated with an ellipsis when it exceeds the container width',
  onTruncate
}): JSX.Element => {
  /**
   * Memoized truncation configuration
   */
  const config = useMemo<TruncateConfig>(() => {
    const width = isValidWidth(maxWidth)
      ? typeof maxWidth === 'number' ? \`\${maxWidth}px\` : maxWidth
      : '200px';

    return {
      maxWidth: width,
      displayText: text,
      shouldTruncate: text.length > 50
    };
  }, [maxWidth, text]);

  /**
   * Container styles with proper typing
   */
  const containerStyle = useMemo<CSSProperties>(() => ({
    maxWidth: config.maxWidth
  }), [config.maxWidth]);

  /**
   * Effect callback for truncation detection
   */
  const handleTruncationCheck = useCallback(() => {
    if (onTruncate && config.shouldTruncate) {
      onTruncate(true);
    }
  }, [onTruncate, config.shouldTruncate]);

  React.useEffect(() => {
    handleTruncationCheck();
  }, [handleTruncationCheck]);

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Basic Truncation</Text>
      <div style={containerStyle}>
        <Text variant="bodyMd" truncate>
          {config.displayText}
        </Text>
      </div>
    </BlockStack>
  );
};

export default TruncateDefault;`,
  },

  inTableCell: {
    react: `import { DataTable, Card } from '@shopify/polaris';
import React from 'react';

function TruncateInTableCell() {
  const rows = [
    ['Product A', 'This is a very long product description that will be truncated in the table cell to maintain layout consistency'],
    ['Product B', 'Another lengthy description that demonstrates how truncation works within DataTable cells'],
    ['Product C', 'Short description']
  ];

  return (
    <Card>
      <DataTable
        columnContentTypes={['text', 'text']}
        headings={['Product', 'Description']}
        rows={rows}
        truncate
      />
    </Card>
  );
}

export default TruncateInTableCell;`,

    vanilla: `<!-- Truncate in Table Cell using @cin7/vanilla-js -->
<div id="truncate-table-container"></div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

const container = $('#truncate-table-container');

const card = createElement('div', {
  className: 'polaris-card'
});

const table = createElement('table', {
  className: 'polaris-data-table'
});

const thead = createElement('thead');
const headerRow = createElement('tr');
['Product', 'Description'].forEach(heading => {
  const th = createElement('th', {
    className: 'polaris-data-table__cell',
    textContent: heading
  });
  headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);

const tbody = createElement('tbody');
const data = [
  ['Product A', 'This is a very long product description that will be truncated in the table cell to maintain layout consistency'],
  ['Product B', 'Another lengthy description that demonstrates how truncation works within DataTable cells'],
  ['Product C', 'Short description']
];

data.forEach(row => {
  const tr = createElement('tr');
  row.forEach(cell => {
    const td = createElement('td', {
      className: 'polaris-data-table__cell',
      style: 'max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
      textContent: cell
    });
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});
table.appendChild(tbody);
card.appendChild(table);
container.appendChild(card);
</script>`,

    extjs: `// ExtJS Truncate in Grid Cell using @cin7/extjs-adapters
import { PolarisDataGrid } from '@cin7/extjs-adapters';

Ext.create('Ext.grid.Panel', {
  title: 'Products with Truncated Descriptions',
  store: {
    fields: ['product', 'description'],
    data: [
      { product: 'Product A', description: 'This is a very long product description that will be truncated in the table cell to maintain layout consistency' },
      { product: 'Product B', description: 'Another lengthy description that demonstrates how truncation works within DataTable cells' },
      { product: 'Product C', description: 'Short description' }
    ]
  },
  columns: [
    { text: 'Product', dataIndex: 'product', width: 150 },
    {
      text: 'Description',
      dataIndex: 'description',
      flex: 1,
      renderer: function(value) {
        return '<div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + value + '</div>';
      }
    }
  ],
  width: 600,
  height: 300,
  renderTo: Ext.getBody()
});`,

    typescript: `import { DataTable, Card } from '@shopify/polaris';
import React, { useMemo, useState } from 'react';
import type { DataTableProps } from '@shopify/polaris';

/**
 * Product entity with detailed type information
 * @interface ProductEntity
 */
interface ProductEntity {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category?: string;
}

/**
 * Table configuration with type-safe column definitions
 * @interface TableConfig
 */
interface TableConfig {
  readonly columnContentTypes: DataTableProps['columnContentTypes'];
  readonly headings: string[];
  readonly enableTruncation: boolean;
}

/**
 * Props for the TruncateInTableCell component
 * @interface TruncateInTableCellProps
 */
interface TruncateInTableCellProps {
  /** Array of products to display in the table */
  products?: ReadonlyArray<ProductEntity>;
  /** Enable or disable text truncation */
  truncate?: boolean;
  /** Callback when a row is clicked */
  onRowClick?: (product: ProductEntity) => void;
}

/**
 * Type guard to validate product entity structure
 * @param product - The product to validate
 * @returns True if the product is valid
 */
const isValidProduct = (product: any): product is ProductEntity => {
  return (
    typeof product === 'object' &&
    product !== null &&
    typeof product.name === 'string' &&
    typeof product.description === 'string'
  );
};

/**
 * TruncateInTableCell component with comprehensive type safety
 * Demonstrates truncation in data table cells with validation
 */
const TruncateInTableCell: React.FC<TruncateInTableCellProps> = ({
  products = [
    { id: '1', name: 'Product A', description: 'This is a very long product description that will be truncated in the table cell to maintain layout consistency', category: 'Electronics' },
    { id: '2', name: 'Product B', description: 'Another lengthy description that demonstrates how truncation works within DataTable cells', category: 'Accessories' },
    { id: '3', name: 'Product C', description: 'Short description', category: 'Software' }
  ],
  truncate = true,
  onRowClick
}): JSX.Element => {
  const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null);

  /**
   * Validate and transform products into table rows
   */
  const tableRows = useMemo<string[][]>(() => {
    const validProducts = products.filter(isValidProduct);
    return validProducts.map(product => [product.name, product.description]);
  }, [products]);

  /**
   * Table configuration with proper typing
   */
  const tableConfig = useMemo<TableConfig>(() => ({
    columnContentTypes: ['text', 'text'],
    headings: ['Product', 'Description'],
    enableTruncation: truncate
  }), [truncate]);

  /**
   * Handle row selection with type safety
   */
  const handleRowInteraction = React.useCallback((rowIndex: number) => {
    setSelectedRowIndex(rowIndex);
    const product = products[rowIndex];
    if (product && isValidProduct(product) && onRowClick) {
      onRowClick(product);
    }
  }, [products, onRowClick]);

  return (
    <Card>
      <DataTable
        columnContentTypes={tableConfig.columnContentTypes}
        headings={tableConfig.headings}
        rows={tableRows}
        truncate={tableConfig.enableTruncation}
      />
    </Card>
  );
};

export default TruncateInTableCell;`,
  },

  inListItem: {
    react: `import { List, Card, BlockStack } from '@shopify/polaris';
import React from 'react';

function TruncateInListItem() {
  return (
    <Card>
      <BlockStack gap="400">
        <List type="bullet">
          <List.Item>
            <div style={{ maxWidth: '300px' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                This is a very long list item that will be truncated to maintain consistent layout
              </span>
            </div>
          </List.Item>
          <List.Item>
            <div style={{ maxWidth: '300px' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                Another lengthy item demonstrating truncation in list contexts
              </span>
            </div>
          </List.Item>
          <List.Item>Short item</List.Item>
        </List>
      </BlockStack>
    </Card>
  );
}

export default TruncateInListItem;`,

    vanilla: `<!-- Truncate in List Item using @cin7/vanilla-js -->
<div id="truncate-list-container"></div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

const container = $('#truncate-list-container');

const card = createElement('div', {
  className: 'polaris-card'
});

const list = createElement('ul', {
  className: 'polaris-list'
});

const items = [
  'This is a very long list item that will be truncated to maintain consistent layout',
  'Another lengthy item demonstrating truncation in list contexts',
  'Short item'
];

items.forEach(itemText => {
  const li = createElement('li', {
    className: 'polaris-list__item'
  });

  const wrapper = createElement('div', {
    style: 'max-width: 300px;'
  });

  const span = createElement('span', {
    style: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: block;',
    textContent: itemText
  });

  wrapper.appendChild(span);
  li.appendChild(wrapper);
  list.appendChild(li);
});

card.appendChild(list);
container.appendChild(card);
</script>`,

    extjs: `// ExtJS Truncate in List using @cin7/extjs-adapters
import { PolarisList } from '@cin7/extjs-adapters';

Ext.create('Ext.panel.Panel', {
  title: 'List with Truncated Items',
  width: 400,
  bodyPadding: 10,
  items: [
    {
      xtype: 'component',
      html: '<ul class="polaris-list">' +
        '<li class="polaris-list__item"><div style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">This is a very long list item that will be truncated to maintain consistent layout</div></li>' +
        '<li class="polaris-list__item"><div style="max-width: 300px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Another lengthy item demonstrating truncation in list contexts</div></li>' +
        '<li class="polaris-list__item">Short item</li>' +
        '</ul>'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { List, Card, BlockStack } from '@shopify/polaris';
import React, { useMemo, useCallback } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Type for list item types
 */
type ListType = 'bullet' | 'number';

/**
 * Detailed list item entity with metadata
 * @interface ListItemEntity
 */
interface ListItemEntity {
  readonly id: string;
  readonly text: string;
  readonly shouldTruncate: boolean;
  readonly priority?: 'high' | 'medium' | 'low';
  readonly metadata?: Record<string, unknown>;
}

/**
 * Styling configuration for truncated items
 * @interface TruncateStyleConfig
 */
interface TruncateStyleConfig {
  readonly maxWidth: string;
  readonly containerStyle: CSSProperties;
  readonly textStyle: CSSProperties;
}

/**
 * Props for TruncateInListItem component
 * @interface TruncateInListItemProps
 */
interface TruncateInListItemProps {
  /** Array of list items to display */
  items?: ReadonlyArray<ListItemEntity>;
  /** Maximum width for truncated items */
  maxWidth?: string | number;
  /** List type (bullet or number) */
  listType?: ListType;
  /** Callback when item is clicked */
  onItemClick?: (item: ListItemEntity) => void;
}

/**
 * Type guard to validate list item structure
 * @param item - The item to validate
 * @returns True if the item is valid
 */
const isValidListItem = (item: any): item is ListItemEntity => {
  return (
    typeof item === 'object' &&
    item !== null &&
    typeof item.text === 'string' &&
    typeof item.shouldTruncate === 'boolean'
  );
};

/**
 * Creates style configuration for truncated text
 * @param maxWidth - Maximum width value
 * @returns Style configuration object
 */
const createTruncateStyles = (maxWidth: string | number): TruncateStyleConfig => {
  const widthValue = typeof maxWidth === 'number' ? \`\${maxWidth}px\` : maxWidth;

  return {
    maxWidth: widthValue,
    containerStyle: {
      maxWidth: widthValue
    },
    textStyle: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      display: 'block'
    }
  };
};

/**
 * TruncateInListItem component with comprehensive type safety
 * Demonstrates conditional truncation in list items with validation
 */
const TruncateInListItem: React.FC<TruncateInListItemProps> = ({
  items = [
    { id: '1', text: 'This is a very long list item that will be truncated to maintain consistent layout', shouldTruncate: true, priority: 'high' },
    { id: '2', text: 'Another lengthy item demonstrating truncation in list contexts', shouldTruncate: true, priority: 'medium' },
    { id: '3', text: 'Short item', shouldTruncate: false, priority: 'low' }
  ],
  maxWidth = '300px',
  listType = 'bullet',
  onItemClick
}): JSX.Element => {
  /**
   * Validate all items
   */
  const validatedItems = useMemo<ReadonlyArray<ListItemEntity>>(() => {
    return items.filter(isValidListItem);
  }, [items]);

  /**
   * Memoized style configuration
   */
  const styleConfig = useMemo<TruncateStyleConfig>(() => {
    return createTruncateStyles(maxWidth);
  }, [maxWidth]);

  /**
   * Renders a single list item with proper truncation handling
   */
  const renderListItem = useCallback((item: ListItemEntity, index: number): ReactNode => {
    const handleClick = () => {
      if (onItemClick) {
        onItemClick(item);
      }
    };

    if (item.shouldTruncate) {
      return (
        <List.Item key={item.id || index}>
          <div style={styleConfig.containerStyle} onClick={handleClick}>
            <span style={styleConfig.textStyle}>
              {item.text}
            </span>
          </div>
        </List.Item>
      );
    }

    return (
      <List.Item key={item.id || index} onClick={handleClick}>
        {item.text}
      </List.Item>
    );
  }, [styleConfig, onItemClick]);

  return (
    <Card>
      <BlockStack gap="400">
        <List type={listType}>
          {validatedItems.map((item, index) => renderListItem(item, index))}
        </List>
      </BlockStack>
    </Card>
  );
};

export default TruncateInListItem;`,
  },

  withTooltip: {
    react: `import { Text, Tooltip, BlockStack } from '@shopify/polaris';
import React from 'react';

function TruncateWithTooltip() {
  const longText = 'This is a very long text that will be truncated with an ellipsis. Hover to see the full content in a tooltip.';

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Truncate with Tooltip</Text>
      <div style={{ maxWidth: '200px' }}>
        <Tooltip content={longText}>
          <Text variant="bodyMd" truncate>
            {longText}
          </Text>
        </Tooltip>
      </div>
    </BlockStack>
  );
}

export default TruncateWithTooltip;`,

    vanilla: `<!-- Truncate with Tooltip using @cin7/vanilla-js -->
<div id="truncate-tooltip-container"></div>

<script>
import { $, createElement, on } from '@cin7/vanilla-js';

const container = $('#truncate-tooltip-container');
const longText = 'This is a very long text that will be truncated with an ellipsis. Hover to see the full content in a tooltip.';

const heading = createElement('h3', {
  className: 'polaris-text polaris-text--heading-md',
  textContent: 'Truncate with Tooltip'
});

const textContainer = createElement('div', {
  style: 'max-width: 200px; position: relative;'
});

const text = createElement('p', {
  className: 'polaris-text polaris-text--body-md',
  style: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: help;',
  textContent: longText,
  title: longText
});

const tooltip = createElement('div', {
  className: 'polaris-tooltip',
  style: 'display: none; position: absolute; background: #000; color: #fff; padding: 8px; border-radius: 4px; max-width: 300px; z-index: 1000;',
  textContent: longText
});

on(text, 'mouseenter', () => {
  tooltip.style.display = 'block';
});

on(text, 'mouseleave', () => {
  tooltip.style.display = 'none';
});

textContainer.appendChild(text);
textContainer.appendChild(tooltip);
container.appendChild(heading);
container.appendChild(textContainer);
</script>`,

    extjs: `// ExtJS Truncate with Tooltip using @cin7/extjs-adapters
import { PolarisTooltip } from '@cin7/extjs-adapters';

const longText = 'This is a very long text that will be truncated with an ellipsis. Hover to see the full content in a tooltip.';

Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'component',
      html: '<h3 class="polaris-text polaris-text--heading-md">Truncate with Tooltip</h3>'
    },
    {
      xtype: 'container',
      width: 200,
      items: [
        {
          xtype: 'component',
          html: '<p class="polaris-text polaris-text--body-md" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + longText + '</p>',
          listeners: {
            afterrender: function(component) {
              Ext.tip.QuickTipManager.init();
              component.getEl().set({
                'data-qtip': longText
              });
            }
          }
        }
      ]
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text, Tooltip, BlockStack } from '@shopify/polaris';
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { CSSProperties, ReactElement } from 'react';

/**
 * Tooltip configuration options
 * @interface TooltipConfig
 */
interface TooltipConfig {
  readonly enabled: boolean;
  readonly content: string;
  readonly preferredPosition?: 'above' | 'below';
  readonly dismissOnMouseOut?: boolean;
}

/**
 * Truncation state management
 * @interface TruncationState
 */
interface TruncationState {
  readonly isHovered: boolean;
  readonly isTruncated: boolean;
  readonly shouldShowTooltip: boolean;
}

/**
 * Props for TruncateWithTooltip component
 * @interface TruncateWithTooltipProps
 */
interface TruncateWithTooltipProps {
  /** Text content to display and potentially truncate */
  text?: string;
  /** Maximum width of the container */
  maxWidth?: string | number;
  /** Whether to show tooltip on hover */
  showTooltip?: boolean;
  /** Tooltip configuration */
  tooltipConfig?: Partial<TooltipConfig>;
  /** Callback when tooltip is shown */
  onTooltipShow?: (text: string) => void;
  /** Callback when tooltip is hidden */
  onTooltipHide?: () => void;
}

/**
 * Type guard to check if text should be truncated
 * @param text - The text to check
 * @param threshold - Character threshold
 * @returns True if text exceeds threshold
 */
const shouldTruncateText = (text: string, threshold: number = 50): boolean => {
  return text.length > threshold;
};

/**
 * Creates normalized width value
 * @param width - Width value (string or number)
 * @returns Normalized width string
 */
const normalizeWidth = (width: string | number | undefined): string => {
  if (width === undefined) return '200px';
  return typeof width === 'number' ? \`\${width}px\` : width;
};

/**
 * TruncateWithTooltip component with comprehensive state management
 * Demonstrates truncation with interactive tooltip and hover state tracking
 */
const TruncateWithTooltip: React.FC<TruncateWithTooltipProps> = ({
  text = 'This is a very long text that will be truncated with an ellipsis. Hover to see the full content in a tooltip.',
  maxWidth = '200px',
  showTooltip = true,
  tooltipConfig,
  onTooltipShow,
  onTooltipHide
}): JSX.Element => {
  const textRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<TruncationState>({
    isHovered: false,
    isTruncated: false,
    shouldShowTooltip: false
  });

  /**
   * Merged tooltip configuration
   */
  const mergedTooltipConfig = useMemo<TooltipConfig>(() => ({
    enabled: showTooltip,
    content: text,
    preferredPosition: tooltipConfig?.preferredPosition ?? 'above',
    dismissOnMouseOut: tooltipConfig?.dismissOnMouseOut ?? true
  }), [showTooltip, text, tooltipConfig]);

  /**
   * Container style configuration
   */
  const containerStyle = useMemo<CSSProperties>(() => ({
    maxWidth: normalizeWidth(maxWidth)
  }), [maxWidth]);

  /**
   * Check if text is actually truncated
   */
  useEffect(() => {
    if (textRef.current) {
      const isTruncated = shouldTruncateText(text);
      setState(prev => ({
        ...prev,
        isTruncated,
        shouldShowTooltip: isTruncated && mergedTooltipConfig.enabled
      }));
    }
  }, [text, mergedTooltipConfig.enabled]);

  /**
   * Handle mouse enter event
   */
  const handleMouseEnter = useCallback(() => {
    setState(prev => ({ ...prev, isHovered: true }));
    if (state.shouldShowTooltip && onTooltipShow) {
      onTooltipShow(text);
    }
  }, [state.shouldShowTooltip, onTooltipShow, text]);

  /**
   * Handle mouse leave event
   */
  const handleMouseLeave = useCallback(() => {
    setState(prev => ({ ...prev, isHovered: false }));
    if (mergedTooltipConfig.dismissOnMouseOut && onTooltipHide) {
      onTooltipHide();
    }
  }, [mergedTooltipConfig.dismissOnMouseOut, onTooltipHide]);

  /**
   * Render truncated text element
   */
  const truncatedTextElement: ReactElement = (
    <div
      ref={textRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Text variant="bodyMd" truncate>
        {text}
      </Text>
    </div>
  );

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Truncate with Tooltip</Text>
      <div style={containerStyle}>
        {state.shouldShowTooltip ? (
          <Tooltip content={mergedTooltipConfig.content} preferredPosition={mergedTooltipConfig.preferredPosition}>
            {truncatedTextElement}
          </Tooltip>
        ) : (
          truncatedTextElement
        )}
      </div>
    </BlockStack>
  );
};

export default TruncateWithTooltip;`,
  },

  multiline: {
    react: `import { Text, BlockStack } from '@shopify/polaris';
import React from 'react';

function MultiLineTruncation() {
  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Multi-line Truncation</Text>
      <div style={{
        maxWidth: '300px',
        display: '-webkit-box',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden'
      }}>
        <Text variant="bodyMd">
          This is a longer text that will be truncated after three lines.
          The text continues beyond the visible area. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Text>
      </div>
    </BlockStack>
  );
}

export default MultiLineTruncation;`,

    vanilla: `<!-- Multi-line Truncation using @cin7/vanilla-js -->
<div id="multiline-truncate-container"></div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

const container = $('#multiline-truncate-container');

const heading = createElement('h3', {
  className: 'polaris-text polaris-text--heading-md',
  textContent: 'Multi-line Truncation'
});

const textContainer = createElement('div', {
  style: 'max-width: 300px; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;'
});

const text = createElement('p', {
  className: 'polaris-text polaris-text--body-md',
  textContent: 'This is a longer text that will be truncated after three lines. The text continues beyond the visible area. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
});

textContainer.appendChild(text);
container.appendChild(heading);
container.appendChild(textContainer);
</script>

<style>
.multiline-truncate {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>`,

    extjs: `// ExtJS Multi-line Truncation using @cin7/extjs-adapters
import { PolarisText } from '@cin7/extjs-adapters';

Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'component',
      html: '<h3 class="polaris-text polaris-text--heading-md">Multi-line Truncation</h3>'
    },
    {
      xtype: 'component',
      width: 300,
      html: '<div style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">' +
        '<p class="polaris-text polaris-text--body-md">' +
        'This is a longer text that will be truncated after three lines. The text continues beyond the visible area. ' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.' +
        '</p>' +
        '</div>'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text, BlockStack } from '@shopify/polaris';
import React, { useMemo, useCallback, useRef, useEffect, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Line clamp configuration range
 * @type LineClampValue
 */
type LineClampValue = 1 | 2 | 3 | 4 | 5 | 6 | number;

/**
 * Truncation detection result
 * @interface TruncationDetection
 */
interface TruncationDetection {
  readonly isTruncated: boolean;
  readonly visibleLines: number;
  readonly totalHeight: number;
  readonly lineHeight: number;
}

/**
 * Multi-line truncation configuration
 * @interface MultiLineTruncationConfig
 */
interface MultiLineTruncationConfig {
  readonly maxWidth: string;
  readonly lineClamp: LineClampValue;
  readonly enableDetection: boolean;
  readonly animateExpansion: boolean;
}

/**
 * Props for MultiLineTruncation component
 * @interface MultiLineTruncationProps
 */
interface MultiLineTruncationProps {
  /** Text content to display and potentially truncate */
  text?: string;
  /** Maximum width of the container */
  maxWidth?: string | number;
  /** Number of lines before truncation */
  lineClamp?: LineClampValue;
  /** Enable truncation detection */
  detectTruncation?: boolean;
  /** Callback when truncation state changes */
  onTruncationChange?: (detection: TruncationDetection) => void;
  /** Show expand/collapse toggle */
  showToggle?: boolean;
}

/**
 * Type guard to validate line clamp value
 * @param value - The value to check
 * @returns True if the value is a valid line clamp number
 */
const isValidLineClamp = (value: number): value is LineClampValue => {
  return Number.isInteger(value) && value > 0 && value <= 10;
};

/**
 * Normalizes width value to CSS string
 * @param width - Width value (string or number)
 * @returns Normalized CSS width string
 */
const normalizeWidth = (width: string | number | undefined): string => {
  if (width === undefined) return '300px';
  return typeof width === 'number' ? \`\${width}px\` : width;
};

/**
 * Creates truncation style configuration
 * @param config - Truncation configuration
 * @returns CSS properties for multi-line truncation
 */
const createTruncationStyle = (config: MultiLineTruncationConfig): CSSProperties => ({
  maxWidth: config.maxWidth,
  display: '-webkit-box',
  WebkitLineClamp: config.lineClamp,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  transition: config.animateExpansion ? 'max-height 0.3s ease-in-out' : undefined
});

/**
 * MultiLineTruncation component with comprehensive truncation detection
 * Demonstrates multi-line text truncation with optional expand/collapse functionality
 */
const MultiLineTruncation: React.FC<MultiLineTruncationProps> = ({
  text = 'This is a longer text that will be truncated after three lines. The text continues beyond the visible area. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  maxWidth = '300px',
  lineClamp = 3,
  detectTruncation = false,
  onTruncationChange,
  showToggle = false
}): JSX.Element => {
  const textRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [detection, setDetection] = useState<TruncationDetection | null>(null);

  /**
   * Validated and normalized configuration
   */
  const config = useMemo<MultiLineTruncationConfig>(() => {
    const validLineClamp = isValidLineClamp(lineClamp) ? lineClamp : 3;

    return {
      maxWidth: normalizeWidth(maxWidth),
      lineClamp: validLineClamp,
      enableDetection: detectTruncation,
      animateExpansion: showToggle
    };
  }, [maxWidth, lineClamp, detectTruncation, showToggle]);

  /**
   * Truncation style with expansion support
   */
  const truncateStyle = useMemo<CSSProperties>(() => {
    const baseStyle = createTruncationStyle(config);

    if (isExpanded) {
      return {
        ...baseStyle,
        WebkitLineClamp: 'unset' as any,
        maxHeight: 'none'
      };
    }

    return baseStyle;
  }, [config, isExpanded]);

  /**
   * Detect if text is actually truncated
   */
  const detectTextTruncation = useCallback((): TruncationDetection | null => {
    if (!textRef.current) return null;

    const element = textRef.current;
    const computedStyle = window.getComputedStyle(element);
    const lineHeight = parseFloat(computedStyle.lineHeight) || 20;
    const totalHeight = element.scrollHeight;
    const visibleHeight = element.clientHeight;
    const visibleLines = Math.floor(visibleHeight / lineHeight);

    return {
      isTruncated: totalHeight > visibleHeight,
      visibleLines,
      totalHeight,
      lineHeight
    };
  }, []);

  /**
   * Effect to detect truncation on mount and text changes
   */
  useEffect(() => {
    if (config.enableDetection && textRef.current) {
      const result = detectTextTruncation();
      if (result) {
        setDetection(result);
        if (onTruncationChange) {
          onTruncationChange(result);
        }
      }
    }
  }, [config.enableDetection, text, detectTextTruncation, onTruncationChange]);

  /**
   * Handle toggle expansion
   */
  const handleToggle = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  /**
   * Render toggle button if needed
   */
  const renderToggleButton = (): ReactNode => {
    if (!showToggle || !detection?.isTruncated) return null;

    return (
      <button
        onClick={handleToggle}
        style={{
          marginTop: '8px',
          background: 'none',
          border: 'none',
          color: '#007ace',
          cursor: 'pointer',
          fontSize: '14px',
          padding: '4px 0'
        }}
      >
        {isExpanded ? 'Show less' : 'Show more'}
      </button>
    );
  };

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Multi-line Truncation</Text>
      <div>
        <div ref={textRef} style={truncateStyle}>
          <Text variant="bodyMd">
            {text}
          </Text>
        </div>
        {renderToggleButton()}
      </div>
    </BlockStack>
  );
};

export default MultiLineTruncation;`,
  },

  responsive: {
    react: `import { Text, BlockStack } from '@shopify/polaris';
import React from 'react';

function ResponsiveTruncation() {
  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Responsive Truncation</Text>
      <div className="responsive-truncate">
        <Text variant="bodyMd">
          This text truncates differently at various breakpoints:
          single line on mobile, two lines on tablet, three lines on desktop.
        </Text>
      </div>
      <style>
        {\`
          .responsive-truncate {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
            -webkit-line-clamp: 1;
          }
          @media (min-width: 768px) {
            .responsive-truncate {
              -webkit-line-clamp: 2;
            }
          }
          @media (min-width: 1024px) {
            .responsive-truncate {
              -webkit-line-clamp: 3;
            }
          }
        \`}
      </style>
    </BlockStack>
  );
}

export default ResponsiveTruncation;`,

    vanilla: `<!-- Responsive Truncation using @cin7/vanilla-js -->
<div id="responsive-truncate-container"></div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

const container = $('#responsive-truncate-container');

const heading = createElement('h3', {
  className: 'polaris-text polaris-text--heading-md',
  textContent: 'Responsive Truncation'
});

const textContainer = createElement('div', {
  className: 'responsive-truncate'
});

const text = createElement('p', {
  className: 'polaris-text polaris-text--body-md',
  textContent: 'This text truncates differently at various breakpoints: single line on mobile, two lines on tablet, three lines on desktop.'
});

textContainer.appendChild(text);
container.appendChild(heading);
container.appendChild(textContainer);
</script>

<style>
.responsive-truncate {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 1;
}

@media (min-width: 768px) {
  .responsive-truncate {
    -webkit-line-clamp: 2;
  }
}

@media (min-width: 1024px) {
  .responsive-truncate {
    -webkit-line-clamp: 3;
  }
}
</style>`,

    extjs: `// ExtJS Responsive Truncation using @cin7/extjs-adapters
import { PolarisText } from '@cin7/extjs-adapters';

Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'component',
      html: '<h3 class="polaris-text polaris-text--heading-md">Responsive Truncation</h3>'
    },
    {
      xtype: 'component',
      cls: 'responsive-truncate',
      html: '<p class="polaris-text polaris-text--body-md">' +
        'This text truncates differently at various breakpoints: single line on mobile, two lines on tablet, three lines on desktop.' +
        '</p>',
      listeners: {
        afterrender: function() {
          const style = document.createElement('style');
          style.textContent = \`
            .responsive-truncate {
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
              -webkit-line-clamp: 1;
            }
            @media (min-width: 768px) {
              .responsive-truncate {
                -webkit-line-clamp: 2;
              }
            }
            @media (min-width: 1024px) {
              .responsive-truncate {
                -webkit-line-clamp: 3;
              }
            }
          \`;
          document.head.appendChild(style);
        }
      }
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text, BlockStack } from '@shopify/polaris';
import React, { useMemo, useCallback, useState, useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Breakpoint types for responsive truncation
 * @type BreakpointName
 */
type BreakpointName = 'mobile' | 'tablet' | 'desktop' | 'wide';

/**
 * Line clamp values for different breakpoints
 * @type LineClampValue
 */
type LineClampValue = 1 | 2 | 3 | 4 | 5 | number;

/**
 * Comprehensive breakpoint configuration
 * @interface BreakpointConfig
 */
interface BreakpointConfig {
  readonly name: BreakpointName;
  readonly minWidth: number;
  readonly maxWidth?: number;
  readonly lineClamp: LineClampValue;
  readonly description: string;
}

/**
 * Responsive truncation settings
 * @interface ResponsiveTruncationConfig
 */
interface ResponsiveTruncationConfig {
  readonly text: string;
  readonly breakpoints: ReadonlyArray<BreakpointConfig>;
  readonly enableMediaQueries: boolean;
  readonly showBreakpointInfo: boolean;
}

/**
 * Current viewport state
 * @interface ViewportState
 */
interface ViewportState {
  readonly width: number;
  readonly currentBreakpoint: BreakpointName;
  readonly lineClamp: LineClampValue;
}

/**
 * Props for ResponsiveTruncation component
 * @interface ResponsiveTruncationProps
 */
interface ResponsiveTruncationProps {
  /** Text content to truncate */
  text?: string;
  /** Number of lines on mobile devices */
  mobileLines?: LineClampValue;
  /** Number of lines on tablet devices */
  tabletLines?: LineClampValue;
  /** Number of lines on desktop devices */
  desktopLines?: LineClampValue;
  /** Number of lines on wide screens */
  wideLines?: LineClampValue;
  /** Show current breakpoint information */
  showBreakpointInfo?: boolean;
  /** Callback when breakpoint changes */
  onBreakpointChange?: (breakpoint: BreakpointName, lineClamp: LineClampValue) => void;
}

/**
 * Default breakpoint configurations
 */
const DEFAULT_BREAKPOINTS: ReadonlyArray<BreakpointConfig> = [
  { name: 'mobile', minWidth: 0, maxWidth: 767, lineClamp: 1, description: 'Mobile devices' },
  { name: 'tablet', minWidth: 768, maxWidth: 1023, lineClamp: 2, description: 'Tablet devices' },
  { name: 'desktop', minWidth: 1024, maxWidth: 1439, lineClamp: 3, description: 'Desktop screens' },
  { name: 'wide', minWidth: 1440, lineClamp: 4, description: 'Wide screens' }
];

/**
 * Type guard to validate line clamp value
 * @param value - The value to check
 * @returns True if the value is a valid line clamp number
 */
const isValidLineClamp = (value: number): value is LineClampValue => {
  return Number.isInteger(value) && value > 0 && value <= 10;
};

/**
 * Creates responsive CSS media queries
 * @param breakpoints - Breakpoint configurations
 * @returns CSS string with media queries
 */
const createResponsiveStyles = (breakpoints: ReadonlyArray<BreakpointConfig>): string => {
  const baseBreakpoint = breakpoints[0];
  let css = \`
    .responsive-truncate {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      -webkit-line-clamp: \${baseBreakpoint.lineClamp};
    }
  \`;

  for (let i = 1; i < breakpoints.length; i++) {
    const bp = breakpoints[i];
    css += \`
    @media (min-width: \${bp.minWidth}px) {
      .responsive-truncate {
        -webkit-line-clamp: \${bp.lineClamp};
      }
    }
    \`;
  }

  return css;
};

/**
 * Determines current breakpoint based on viewport width
 * @param width - Current viewport width
 * @param breakpoints - Breakpoint configurations
 * @returns Current breakpoint configuration
 */
const getCurrentBreakpoint = (
  width: number,
  breakpoints: ReadonlyArray<BreakpointConfig>
): BreakpointConfig => {
  for (let i = breakpoints.length - 1; i >= 0; i--) {
    const bp = breakpoints[i];
    if (width >= bp.minWidth && (!bp.maxWidth || width <= bp.maxWidth)) {
      return bp;
    }
  }
  return breakpoints[0];
};

/**
 * ResponsiveTruncation component with comprehensive breakpoint management
 * Demonstrates responsive text truncation with viewport-aware line clamping
 */
const ResponsiveTruncation: React.FC<ResponsiveTruncationProps> = ({
  text = 'This text truncates differently at various breakpoints: single line on mobile, two lines on tablet, three lines on desktop.',
  mobileLines = 1,
  tabletLines = 2,
  desktopLines = 3,
  wideLines = 4,
  showBreakpointInfo = false,
  onBreakpointChange
}): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewportState, setViewportState] = useState<ViewportState>({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    currentBreakpoint: 'desktop',
    lineClamp: desktopLines
  });

  /**
   * Create breakpoint configurations with custom line clamp values
   */
  const breakpoints = useMemo<ReadonlyArray<BreakpointConfig>>(() => {
    const validatedMobile = isValidLineClamp(mobileLines) ? mobileLines : 1;
    const validatedTablet = isValidLineClamp(tabletLines) ? tabletLines : 2;
    const validatedDesktop = isValidLineClamp(desktopLines) ? desktopLines : 3;
    const validatedWide = isValidLineClamp(wideLines) ? wideLines : 4;

    return [
      { ...DEFAULT_BREAKPOINTS[0], lineClamp: validatedMobile },
      { ...DEFAULT_BREAKPOINTS[1], lineClamp: validatedTablet },
      { ...DEFAULT_BREAKPOINTS[2], lineClamp: validatedDesktop },
      { ...DEFAULT_BREAKPOINTS[3], lineClamp: validatedWide }
    ];
  }, [mobileLines, tabletLines, desktopLines, wideLines]);

  /**
   * Memoized configuration object
   */
  const config = useMemo<ResponsiveTruncationConfig>(() => ({
    text,
    breakpoints,
    enableMediaQueries: true,
    showBreakpointInfo
  }), [text, breakpoints, showBreakpointInfo]);

  /**
   * Generate responsive CSS styles
   */
  const responsiveStyles = useMemo<string>(() => {
    return createResponsiveStyles(config.breakpoints);
  }, [config.breakpoints]);

  /**
   * Handle viewport resize
   */
  const handleResize = useCallback(() => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;
    const currentBp = getCurrentBreakpoint(width, breakpoints);

    setViewportState({
      width,
      currentBreakpoint: currentBp.name,
      lineClamp: currentBp.lineClamp
    });

    if (onBreakpointChange) {
      onBreakpointChange(currentBp.name, currentBp.lineClamp);
    }
  }, [breakpoints, onBreakpointChange]);

  /**
   * Set up resize listener
   */
  useEffect(() => {
    if (typeof window === 'undefined') return;

    handleResize(); // Initial call

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  /**
   * Render breakpoint information
   */
  const renderBreakpointInfo = useCallback((): ReactNode => {
    if (!config.showBreakpointInfo) return null;

    return (
      <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f6f6f7', borderRadius: '8px' }}>
        <Text variant="bodySm" as="p">
          <strong>Current breakpoint:</strong> {viewportState.currentBreakpoint} ({viewportState.width}px)
        </Text>
        <Text variant="bodySm" as="p" tone="subdued">
          <strong>Line clamp:</strong> {viewportState.lineClamp} lines
        </Text>
      </div>
    );
  }, [config.showBreakpointInfo, viewportState]);

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Responsive Truncation</Text>
      <div ref={containerRef} className="responsive-truncate">
        <Text variant="bodyMd">
          {config.text}
        </Text>
      </div>
      {renderBreakpointInfo()}
      <style>{responsiveStyles}</style>
    </BlockStack>
  );
};

export default ResponsiveTruncation;`,
  },

  productCard: {
    react: `import { Card, Text, BlockStack, InlineStack, Badge } from '@shopify/polaris';
import React from 'react';

function ProductCardTruncation() {
  return (
    <Card>
      <BlockStack gap="400">
        <InlineStack align="space-between" blockAlign="center">
          <Text as="h3" variant="headingMd" truncate>
            Premium Wireless Bluetooth Headphones with Active Noise Cancellation
          </Text>
          <Badge>New</Badge>
        </InlineStack>
        <div style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          <Text variant="bodyMd" tone="subdued">
            Experience superior sound quality with our premium wireless headphones
            featuring advanced active noise cancellation technology, 30-hour battery
            life, and comfortable over-ear design perfect for all-day listening.
          </Text>
        </div>
        <Text variant="headingLg" as="p">$299.99</Text>
      </BlockStack>
    </Card>
  );
}

export default ProductCardTruncation;`,

    vanilla: `<!-- Product Card Truncation using @cin7/vanilla-js -->
<div id="product-card-container"></div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

const container = $('#product-card-container');

const card = createElement('div', {
  className: 'polaris-card',
  style: 'padding: 16px;'
});

const header = createElement('div', {
  style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;'
});

const title = createElement('h3', {
  className: 'polaris-text polaris-text--heading-md',
  style: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;',
  textContent: 'Premium Wireless Bluetooth Headphones with Active Noise Cancellation'
});

const badge = createElement('span', {
  className: 'polaris-badge',
  textContent: 'New'
});

header.appendChild(title);
header.appendChild(badge);

const description = createElement('div', {
  style: 'display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; margin-bottom: 16px;'
});

const descriptionText = createElement('p', {
  className: 'polaris-text polaris-text--body-md polaris-text--subdued',
  textContent: 'Experience superior sound quality with our premium wireless headphones featuring advanced active noise cancellation technology, 30-hour battery life, and comfortable over-ear design perfect for all-day listening.'
});

description.appendChild(descriptionText);

const price = createElement('p', {
  className: 'polaris-text polaris-text--heading-lg',
  textContent: '$299.99'
});

card.appendChild(header);
card.appendChild(description);
card.appendChild(price);
container.appendChild(card);
</script>`,

    extjs: `// ExtJS Product Card with Truncation using @cin7/extjs-adapters
import { PolarisCard } from '@cin7/extjs-adapters';

Ext.create('Ext.panel.Panel', {
  cls: 'polaris-card',
  width: 400,
  bodyPadding: 16,
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'container',
      layout: {
        type: 'hbox',
        align: 'middle'
      },
      items: [
        {
          xtype: 'component',
          flex: 1,
          html: '<h3 class="polaris-text polaris-text--heading-md" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Premium Wireless Bluetooth Headphones with Active Noise Cancellation</h3>'
        },
        {
          xtype: 'component',
          html: '<span class="polaris-badge">New</span>'
        }
      ]
    },
    {
      xtype: 'component',
      margin: '16 0',
      html: '<div style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">' +
        '<p class="polaris-text polaris-text--body-md polaris-text--subdued">' +
        'Experience superior sound quality with our premium wireless headphones featuring advanced active noise cancellation technology, ' +
        '30-hour battery life, and comfortable over-ear design perfect for all-day listening.' +
        '</p>' +
        '</div>'
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--heading-lg">$299.99</p>'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Card, Text, BlockStack, InlineStack, Badge } from '@shopify/polaris';
import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Badge tone types for product status
 * @type BadgeTone
 */
type BadgeTone = 'success' | 'info' | 'attention' | 'warning' | 'critical' | 'new';

/**
 * Product pricing information
 * @interface PriceInfo
 */
interface PriceInfo {
  readonly amount: string;
  readonly currency: string;
  readonly originalPrice?: string;
  readonly discount?: number;
}

/**
 * Comprehensive product entity
 * @interface ProductEntity
 */
interface ProductEntity {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: string | PriceInfo;
  readonly badge?: {
    readonly text: string;
    readonly tone?: BadgeTone;
  };
  readonly images?: ReadonlyArray<string>;
  readonly category?: string;
  readonly sku?: string;
  readonly inStock?: boolean;
}

/**
 * Truncation style configuration
 * @interface TruncationStyleConfig
 */
interface TruncationStyleConfig {
  readonly title: CSSProperties;
  readonly description: CSSProperties;
  readonly enableTitleTruncation: boolean;
  readonly descriptionLines: number;
}

/**
 * Product card display state
 * @interface ProductCardState
 */
interface ProductCardState {
  readonly isHovered: boolean;
  readonly isTitleTruncated: boolean;
  readonly isDescriptionTruncated: boolean;
  readonly showFullDescription: boolean;
}

/**
 * Props for ProductCardTruncation component
 * @interface ProductCardTruncationProps
 */
interface ProductCardTruncationProps {
  /** Product data to display */
  product?: ProductEntity;
  /** Number of description lines before truncation */
  descriptionLines?: number;
  /** Enable title truncation */
  truncateTitle?: boolean;
  /** Card width configuration */
  cardWidth?: string | number;
  /** Callback when product is clicked */
  onProductClick?: (product: ProductEntity) => void;
  /** Show expand/collapse for description */
  allowDescriptionExpansion?: boolean;
}

/**
 * Type guard to validate product entity
 * @param product - The product to validate
 * @returns True if the product is valid
 */
const isValidProduct = (product: any): product is ProductEntity => {
  return (
    typeof product === 'object' &&
    product !== null &&
    typeof product.title === 'string' &&
    typeof product.description === 'string' &&
    (typeof product.price === 'string' || typeof product.price === 'object')
  );
};

/**
 * Formats price information for display
 * @param price - Price data (string or PriceInfo)
 * @returns Formatted price string
 */
const formatPrice = (price: string | PriceInfo): string => {
  if (typeof price === 'string') {
    return price;
  }

  const formatted = \`\${price.currency || '$'}\${price.amount}\`;
  if (price.originalPrice) {
    return \`\${formatted} (was \${price.currency || '$'}\${price.originalPrice})\`;
  }
  return formatted;
};

/**
 * Creates truncation style configuration
 * @param descriptionLines - Number of lines for description
 * @param truncateTitle - Whether to truncate title
 * @returns Style configuration object
 */
const createTruncationStyles = (
  descriptionLines: number,
  truncateTitle: boolean
): TruncationStyleConfig => ({
  title: truncateTitle ? {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%'
  } : {},
  description: {
    display: '-webkit-box',
    WebkitLineClamp: descriptionLines,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  },
  enableTitleTruncation: truncateTitle,
  descriptionLines
});

/**
 * Default product data
 */
const DEFAULT_PRODUCT: ProductEntity = {
  id: 'prod-001',
  title: 'Premium Wireless Bluetooth Headphones with Active Noise Cancellation',
  description: 'Experience superior sound quality with our premium wireless headphones featuring advanced active noise cancellation technology, 30-hour battery life, and comfortable over-ear design perfect for all-day listening.',
  price: {
    amount: '299.99',
    currency: '$',
    originalPrice: '349.99',
    discount: 14
  },
  badge: {
    text: 'New',
    tone: 'info'
  },
  category: 'Electronics',
  sku: 'HDN-WL-001',
  inStock: true
};

/**
 * ProductCardTruncation component with comprehensive product display
 * Demonstrates truncation in product card layouts with pricing and badges
 */
const ProductCardTruncation: React.FC<ProductCardTruncationProps> = ({
  product = DEFAULT_PRODUCT,
  descriptionLines = 2,
  truncateTitle = true,
  cardWidth,
  onProductClick,
  allowDescriptionExpansion = false
}): JSX.Element => {
  const titleRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState<ProductCardState>({
    isHovered: false,
    isTitleTruncated: false,
    isDescriptionTruncated: false,
    showFullDescription: false
  });

  /**
   * Validate product data
   */
  const validatedProduct = useMemo<ProductEntity>(() => {
    return isValidProduct(product) ? product : DEFAULT_PRODUCT;
  }, [product]);

  /**
   * Memoized style configuration
   */
  const styleConfig = useMemo<TruncationStyleConfig>(() => {
    return createTruncationStyles(descriptionLines, truncateTitle);
  }, [descriptionLines, truncateTitle]);

  /**
   * Card container style
   */
  const cardContainerStyle = useMemo<CSSProperties>(() => {
    if (!cardWidth) return {};
    return {
      width: typeof cardWidth === 'number' ? \`\${cardWidth}px\` : cardWidth
    };
  }, [cardWidth]);

  /**
   * Description style with expansion support
   */
  const descriptionStyle = useMemo<CSSProperties>(() => {
    if (state.showFullDescription) {
      return {
        overflow: 'visible'
      };
    }
    return styleConfig.description;
  }, [state.showFullDescription, styleConfig.description]);

  /**
   * Handle product card click
   */
  const handleCardClick = useCallback(() => {
    if (onProductClick) {
      onProductClick(validatedProduct);
    }
  }, [onProductClick, validatedProduct]);

  /**
   * Handle description expansion toggle
   */
  const handleDescriptionToggle = useCallback(() => {
    if (allowDescriptionExpansion) {
      setState(prev => ({
        ...prev,
        showFullDescription: !prev.showFullDescription
      }));
    }
  }, [allowDescriptionExpansion]);

  /**
   * Detect truncation on mount
   */
  useEffect(() => {
    if (titleRef.current && truncateTitle) {
      const isTitleTruncated = titleRef.current.scrollWidth > titleRef.current.clientWidth;
      setState(prev => ({ ...prev, isTitleTruncated }));
    }

    if (descriptionRef.current) {
      const isDescTruncated = descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight;
      setState(prev => ({ ...prev, isDescriptionTruncated: isDescTruncated }));
    }
  }, [validatedProduct.title, validatedProduct.description, truncateTitle]);

  /**
   * Render badge if present
   */
  const renderBadge = useCallback((): ReactNode => {
    if (!validatedProduct.badge) return null;

    return (
      <Badge tone={validatedProduct.badge.tone as any}>
        {validatedProduct.badge.text}
      </Badge>
    );
  }, [validatedProduct.badge]);

  /**
   * Render expansion button if needed
   */
  const renderExpansionButton = useCallback((): ReactNode => {
    if (!allowDescriptionExpansion || !state.isDescriptionTruncated) return null;

    return (
      <button
        onClick={handleDescriptionToggle}
        style={{
          background: 'none',
          border: 'none',
          color: '#007ace',
          cursor: 'pointer',
          fontSize: '14px',
          padding: '4px 0',
          marginTop: '8px'
        }}
      >
        {state.showFullDescription ? 'Show less' : 'Show more'}
      </button>
    );
  }, [allowDescriptionExpansion, state.isDescriptionTruncated, state.showFullDescription, handleDescriptionToggle]);

  return (
    <div style={cardContainerStyle}>
      <Card>
        <div onClick={handleCardClick} style={{ cursor: onProductClick ? 'pointer' : 'default' }}>
          <BlockStack gap="400">
            <InlineStack align="space-between" blockAlign="center">
              <div ref={titleRef} style={{ flex: 1, ...styleConfig.title }}>
                <Text
                  as="h3"
                  variant="headingMd"
                  truncate={styleConfig.enableTitleTruncation}
                >
                  {validatedProduct.title}
                </Text>
              </div>
              {renderBadge()}
            </InlineStack>

            <div>
              <div ref={descriptionRef} style={descriptionStyle}>
                <Text variant="bodyMd" tone="subdued">
                  {validatedProduct.description}
                </Text>
              </div>
              {renderExpansionButton()}
            </div>

            <Text variant="headingLg" as="p">
              {formatPrice(validatedProduct.price)}
            </Text>

            {validatedProduct.sku && (
              <Text variant="bodySm" tone="subdued">
                SKU: {validatedProduct.sku}
              </Text>
            )}
          </BlockStack>
        </div>
      </Card>
    </div>
  );
};

export default ProductCardTruncation;`,
  },

  variableWidth: {
    react: `import { Text, BlockStack, InlineStack } from '@shopify/polaris';
import React from 'react';

function VariableWidthContainers() {
  const sampleText = 'This text demonstrates truncation behavior in containers of different widths';

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Variable Width Truncation</Text>
      <InlineStack gap="400" wrap={false}>
        <div style={{ width: '100px', border: '1px solid #ccc', padding: '8px' }}>
          <Text variant="bodySm" truncate>{sampleText}</Text>
        </div>
        <div style={{ width: '200px', border: '1px solid #ccc', padding: '8px' }}>
          <Text variant="bodySm" truncate>{sampleText}</Text>
        </div>
        <div style={{ width: '300px', border: '1px solid #ccc', padding: '8px' }}>
          <Text variant="bodySm" truncate>{sampleText}</Text>
        </div>
      </InlineStack>
    </BlockStack>
  );
}

export default VariableWidthContainers;`,

    vanilla: `<!-- Variable Width Truncation using @cin7/vanilla-js -->
<div id="variable-width-container"></div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

const container = $('#variable-width-container');
const sampleText = 'This text demonstrates truncation behavior in containers of different widths';

const heading = createElement('h3', {
  className: 'polaris-text polaris-text--heading-md',
  textContent: 'Variable Width Truncation',
  style: 'margin-bottom: 16px;'
});

const flexContainer = createElement('div', {
  style: 'display: flex; gap: 16px;'
});

[100, 200, 300].forEach(width => {
  const box = createElement('div', {
    style: \`width: \${width}px; border: 1px solid #ccc; padding: 8px;\`
  });

  const text = createElement('p', {
    className: 'polaris-text polaris-text--body-sm',
    style: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
    textContent: sampleText
  });

  box.appendChild(text);
  flexContainer.appendChild(box);
});

container.appendChild(heading);
container.appendChild(flexContainer);
</script>`,

    extjs: `// ExtJS Variable Width Truncation using @cin7/extjs-adapters
import { PolarisText } from '@cin7/extjs-adapters';

const sampleText = 'This text demonstrates truncation behavior in containers of different widths';

Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'component',
      html: '<h3 class="polaris-text polaris-text--heading-md">Variable Width Truncation</h3>',
      margin: '0 0 16 0'
    },
    {
      xtype: 'container',
      layout: {
        type: 'hbox',
        align: 'stretch'
      },
      defaults: {
        border: 1,
        style: {
          borderColor: '#ccc',
          borderStyle: 'solid'
        },
        bodyPadding: 8,
        margin: '0 16 0 0'
      },
      items: [
        {
          xtype: 'component',
          width: 100,
          html: '<p class="polaris-text polaris-text--body-sm" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + sampleText + '</p>'
        },
        {
          xtype: 'component',
          width: 200,
          html: '<p class="polaris-text polaris-text--body-sm" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + sampleText + '</p>'
        },
        {
          xtype: 'component',
          width: 300,
          html: '<p class="polaris-text polaris-text--body-sm" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">' + sampleText + '</p>'
        }
      ]
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text, BlockStack, InlineStack } from '@shopify/polaris';
import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Container width types
 * @type ContainerWidth
 */
type ContainerWidth = number | string;

/**
 * Truncation measurement data
 * @interface TruncationMeasurement
 */
interface TruncationMeasurement {
  readonly containerWidth: number;
  readonly textWidth: number;
  readonly isTruncated: boolean;
  readonly visibleCharacters: number;
  readonly truncationPercentage: number;
}

/**
 * Container configuration
 * @interface ContainerConfig
 */
interface ContainerConfig {
  readonly width: ContainerWidth;
  readonly id: string;
  readonly label?: string;
  readonly borderColor?: string;
  readonly backgroundColor?: string;
}

/**
 * Container display state
 * @interface ContainerState
 */
interface ContainerState {
  readonly measurements: Map<string, TruncationMeasurement>;
  readonly hoveredContainer: string | null;
  readonly selectedContainer: string | null;
}

/**
 * Props for VariableWidthContainers component
 * @interface VariableWidthContainersProps
 */
interface VariableWidthContainersProps {
  /** Text content to display in containers */
  text?: string;
  /** Array of container widths (in pixels) */
  widths?: ReadonlyArray<ContainerWidth>;
  /** Container configurations (alternative to widths) */
  containers?: ReadonlyArray<ContainerConfig>;
  /** Show measurement data */
  showMeasurements?: boolean;
  /** Enable interactive hover states */
  enableInteraction?: boolean;
  /** Container padding */
  containerPadding?: string;
  /** Callback when container is clicked */
  onContainerClick?: (containerId: string, measurement: TruncationMeasurement) => void;
}

/**
 * Type guard to validate container width
 * @param width - The width to validate
 * @returns True if the width is valid
 */
const isValidWidth = (width: ContainerWidth): boolean => {
  if (typeof width === 'number') {
    return width > 0 && width <= 2000;
  }
  if (typeof width === 'string') {
    return /^\d+(%|px|em|rem)$/.test(width);
  }
  return false;
};

/**
 * Normalizes width value to pixel string
 * @param width - Width value (number or string)
 * @returns Normalized width string
 */
const normalizeWidth = (width: ContainerWidth): string => {
  if (typeof width === 'number') {
    return \`\${width}px\`;
  }
  return width;
};

/**
 * Creates container configurations from widths array
 * @param widths - Array of width values
 * @returns Array of container configurations
 */
const createContainerConfigs = (widths: ReadonlyArray<ContainerWidth>): ReadonlyArray<ContainerConfig> => {
  const colors = ['#e3f2fd', '#f3e5f5', '#e8f5e9', '#fff3e0', '#fce4ec'];

  return widths
    .filter(isValidWidth)
    .map((width, index) => ({
      width,
      id: \`container-\${index}\`,
      label: \`\${normalizeWidth(width)}\`,
      borderColor: '#ccc',
      backgroundColor: colors[index % colors.length]
    }));
};

/**
 * Calculates truncation measurement for a container
 * @param element - Container element
 * @param textElement - Text element
 * @param containerWidth - Configured width
 * @returns Truncation measurement data
 */
const measureTruncation = (
  element: HTMLElement | null,
  textElement: HTMLElement | null,
  containerWidth: number
): TruncationMeasurement | null => {
  if (!element || !textElement) return null;

  const actualWidth = element.clientWidth;
  const textWidth = textElement.scrollWidth;
  const isTruncated = textWidth > actualWidth;
  const fullText = textElement.textContent || '';

  let visibleCharacters = fullText.length;
  if (isTruncated) {
    // Estimate visible characters based on width ratio
    visibleCharacters = Math.floor((actualWidth / textWidth) * fullText.length);
  }

  const truncationPercentage = isTruncated
    ? Math.round(((textWidth - actualWidth) / textWidth) * 100)
    : 0;

  return {
    containerWidth: actualWidth,
    textWidth,
    isTruncated,
    visibleCharacters,
    truncationPercentage
  };
};

/**
 * Default container widths
 */
const DEFAULT_WIDTHS: ReadonlyArray<number> = [100, 200, 300, 400];

/**
 * VariableWidthContainers component with comprehensive truncation measurement
 * Demonstrates how text truncation behaves across containers of different sizes
 */
const VariableWidthContainers: React.FC<VariableWidthContainersProps> = ({
  text = 'This text demonstrates truncation behavior in containers of different widths',
  widths,
  containers,
  showMeasurements = false,
  enableInteraction = false,
  containerPadding = '8px',
  onContainerClick
}): JSX.Element => {
  const containerRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const textRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

  const [state, setState] = useState<ContainerState>({
    measurements: new Map(),
    hoveredContainer: null,
    selectedContainer: null
  });

  /**
   * Create or use provided container configurations
   */
  const containerConfigs = useMemo<ReadonlyArray<ContainerConfig>>(() => {
    if (containers && containers.length > 0) {
      return containers;
    }
    const widthsToUse = widths && widths.length > 0 ? widths : DEFAULT_WIDTHS;
    return createContainerConfigs(widthsToUse);
  }, [containers, widths]);

  /**
   * Measure all containers
   */
  const measureAllContainers = useCallback(() => {
    const newMeasurements = new Map<string, TruncationMeasurement>();

    containerConfigs.forEach(config => {
      const containerEl = containerRefs.current.get(config.id);
      const textEl = textRefs.current.get(config.id);

      const widthValue = typeof config.width === 'number' ? config.width : 200;
      const measurement = measureTruncation(containerEl, textEl, widthValue);

      if (measurement) {
        newMeasurements.set(config.id, measurement);
      }
    });

    setState(prev => ({
      ...prev,
      measurements: newMeasurements
    }));
  }, [containerConfigs]);

  /**
   * Measure on mount and when text/widths change
   */
  useEffect(() => {
    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(measureAllContainers, 100);
    return () => clearTimeout(timer);
  }, [measureAllContainers, text]);

  /**
   * Handle container mouse enter
   */
  const handleMouseEnter = useCallback((containerId: string) => {
    if (enableInteraction) {
      setState(prev => ({ ...prev, hoveredContainer: containerId }));
    }
  }, [enableInteraction]);

  /**
   * Handle container mouse leave
   */
  const handleMouseLeave = useCallback(() => {
    if (enableInteraction) {
      setState(prev => ({ ...prev, hoveredContainer: null }));
    }
  }, [enableInteraction]);

  /**
   * Handle container click
   */
  const handleClick = useCallback((containerId: string) => {
    setState(prev => ({ ...prev, selectedContainer: containerId }));

    const measurement = state.measurements.get(containerId);
    if (onContainerClick && measurement) {
      onContainerClick(containerId, measurement);
    }
  }, [state.measurements, onContainerClick]);

  /**
   * Render container style
   */
  const getContainerStyle = useCallback((config: ContainerConfig, isHovered: boolean): CSSProperties => {
    return {
      width: normalizeWidth(config.width),
      border: \`1px solid \${config.borderColor || '#ccc'}\`,
      padding: containerPadding,
      backgroundColor: config.backgroundColor || (isHovered ? '#f6f6f7' : 'transparent'),
      transition: enableInteraction ? 'background-color 0.2s ease' : undefined,
      cursor: enableInteraction ? 'pointer' : 'default',
      borderRadius: '4px'
    };
  }, [containerPadding, enableInteraction]);

  /**
   * Render measurement info for a container
   */
  const renderMeasurementInfo = useCallback((containerId: string): ReactNode => {
    if (!showMeasurements) return null;

    const measurement = state.measurements.get(containerId);
    if (!measurement) return null;

    return (
      <div style={{ marginTop: '8px', fontSize: '11px', color: '#6d7175' }}>
        <div>Width: {measurement.containerWidth}px</div>
        <div>Text: {measurement.textWidth}px</div>
        {measurement.isTruncated && (
          <>
            <div style={{ color: '#c05717' }}>
              Truncated: {measurement.truncationPercentage}%
            </div>
            <div>Visible: ~{measurement.visibleCharacters} chars</div>
          </>
        )}
      </div>
    );
  }, [showMeasurements, state.measurements]);

  /**
   * Render individual container
   */
  const renderContainer = useCallback((config: ContainerConfig, index: number): ReactNode => {
    const isHovered = state.hoveredContainer === config.id;
    const isSelected = state.selectedContainer === config.id;

    return (
      <div
        key={config.id}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {config.label && (
          <Text variant="bodySm" as="p" tone="subdued" alignment="center">
            {config.label}
          </Text>
        )}
        <div
          ref={el => {
            if (el) containerRefs.current.set(config.id, el);
          }}
          style={getContainerStyle(config, isHovered)}
          onMouseEnter={() => handleMouseEnter(config.id)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(config.id)}
        >
          <span
            ref={el => {
              if (el) textRefs.current.set(config.id, el);
            }}
            style={{
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            <Text variant="bodySm" truncate>
              {text}
            </Text>
          </span>
        </div>
        {renderMeasurementInfo(config.id)}
      </div>
    );
  }, [state.hoveredContainer, state.selectedContainer, text, getContainerStyle, handleMouseEnter, handleMouseLeave, handleClick, renderMeasurementInfo]);

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Variable Width Truncation</Text>
      <InlineStack gap="400" wrap={false} align="start">
        {containerConfigs.map((config, index) => renderContainer(config, index))}
      </InlineStack>
    </BlockStack>
  );
};

export default VariableWidthContainers;`,
  },

  accessibility: {
    react: `import { Text, BlockStack, Tooltip } from '@shopify/polaris';
import React from 'react';

function AccessibilityExample() {
  const longText = 'Important accessible content that should be available to screen readers even when visually truncated';

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Accessible Truncation</Text>
      <div style={{ maxWidth: '200px' }}>
        <Tooltip content={longText}>
          <Text
            variant="bodyMd"
            truncate
            accessibilityLabel={longText}
          >
            {longText}
          </Text>
        </Tooltip>
      </div>
      <Text variant="bodySm" tone="subdued">
        Screen readers will read the full text even though it's visually truncated
      </Text>
    </BlockStack>
  );
}

export default AccessibilityExample;`,

    vanilla: `<!-- Accessible Truncation using @cin7/vanilla-js -->
<div id="accessible-truncate-container"></div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

const container = $('#accessible-truncate-container');
const longText = 'Important accessible content that should be available to screen readers even when visually truncated';

const heading = createElement('h3', {
  className: 'polaris-text polaris-text--heading-md',
  textContent: 'Accessible Truncation'
});

const textContainer = createElement('div', {
  style: 'max-width: 200px; margin: 16px 0;'
});

const text = createElement('p', {
  className: 'polaris-text polaris-text--body-md',
  style: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
  textContent: longText,
  title: longText
});

// Add aria-label for screen readers
text.setAttribute('aria-label', longText);

const note = createElement('p', {
  className: 'polaris-text polaris-text--body-sm polaris-text--subdued',
  textContent: 'Screen readers will read the full text even though it\\'s visually truncated'
});

textContainer.appendChild(text);
container.appendChild(heading);
container.appendChild(textContainer);
container.appendChild(note);
</script>`,

    extjs: `// ExtJS Accessible Truncation using @cin7/extjs-adapters
import { PolarisText } from '@cin7/extjs-adapters';

const longText = 'Important accessible content that should be available to screen readers even when visually truncated';

Ext.create('Ext.container.Container', {
  layout: {
    type: 'vbox',
    align: 'stretch'
  },
  items: [
    {
      xtype: 'component',
      html: '<h3 class="polaris-text polaris-text--heading-md">Accessible Truncation</h3>'
    },
    {
      xtype: 'container',
      width: 200,
      margin: '16 0',
      items: [
        {
          xtype: 'component',
          html: '<p class="polaris-text polaris-text--body-md" ' +
            'style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" ' +
            'aria-label="' + longText + '" ' +
            'title="' + longText + '">' +
            longText +
            '</p>'
        }
      ]
    },
    {
      xtype: 'component',
      html: '<p class="polaris-text polaris-text--body-sm polaris-text--subdued">' +
        'Screen readers will read the full text even though it\\'s visually truncated' +
        '</p>'
    }
  ],
  renderTo: Ext.getBody()
});`,

    typescript: `import { Text, BlockStack, Tooltip } from '@shopify/polaris';
import React, { useMemo, useCallback, useState, useRef, useEffect } from 'react';
import type { CSSProperties, ReactNode, AriaAttributes } from 'react';

/**
 * ARIA role types for accessible elements
 * @type AriaRole
 */
type AriaRole = 'text' | 'article' | 'region' | 'complementary' | 'note';

/**
 * Screen reader announcement priority
 * @type AriaLive
 */
type AriaLive = 'off' | 'polite' | 'assertive';

/**
 * Comprehensive ARIA attributes configuration
 * @interface AriaConfig
 */
interface AriaConfig {
  readonly label: string;
  readonly describedBy?: string;
  readonly role?: AriaRole;
  readonly live?: AriaLive;
  readonly atomic?: boolean;
  readonly relevant?: string;
}

/**
 * Accessibility compliance level
 * @interface A11yCompliance
 */
interface A11yCompliance {
  readonly wcagLevel: 'A' | 'AA' | 'AAA';
  readonly hasAriaLabel: boolean;
  readonly hasTooltip: boolean;
  readonly hasVisibleLabel: boolean;
  readonly hasScreenReaderText: boolean;
  readonly score: number;
}

/**
 * Truncation accessibility state
 * @interface TruncationA11yState
 */
interface TruncationA11yState {
  readonly isTruncated: boolean;
  readonly fullTextAvailable: boolean;
  readonly tooltipVisible: boolean;
  readonly screenReaderMode: boolean;
}

/**
 * Props for AccessibilityExample component
 * @interface AccessibilityExampleProps
 */
interface AccessibilityExampleProps {
  /** Text content to display */
  text?: string;
  /** Maximum width of the container */
  maxWidth?: string | number;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Show accessibility note */
  showNote?: boolean;
  /** ARIA label (defaults to full text) */
  ariaLabel?: string;
  /** ARIA described by ID */
  ariaDescribedBy?: string;
  /** ARIA role */
  ariaRole?: AriaRole;
  /** Enable high contrast mode */
  highContrastMode?: boolean;
  /** Callback when screen reader accesses text */
  onScreenReaderAccess?: (text: string) => void;
}

/**
 * Type guard to validate ARIA label
 * @param label - The label to validate
 * @returns True if the label is valid
 */
const isValidAriaLabel = (label: string | undefined): label is string => {
  return typeof label === 'string' && label.trim().length > 0;
};

/**
 * Normalizes width value to CSS string
 * @param width - Width value (string or number)
 * @returns Normalized CSS width string
 */
const normalizeWidth = (width: string | number | undefined): string => {
  if (width === undefined) return '200px';
  return typeof width === 'number' ? \`\${width}px\` : width;
};

/**
 * Creates ARIA configuration from props
 * @param text - Full text content
 * @param ariaLabel - Custom ARIA label
 * @param ariaDescribedBy - ARIA described by ID
 * @param ariaRole - ARIA role
 * @returns ARIA configuration object
 */
const createAriaConfig = (
  text: string,
  ariaLabel?: string,
  ariaDescribedBy?: string,
  ariaRole?: AriaRole
): AriaConfig => ({
  label: isValidAriaLabel(ariaLabel) ? ariaLabel : text,
  describedBy: ariaDescribedBy,
  role: ariaRole,
  live: 'polite',
  atomic: true,
  relevant: 'additions text'
});

/**
 * Calculates accessibility compliance score
 * @param config - ARIA configuration
 * @param hasTooltip - Whether tooltip is enabled
 * @param hasNote - Whether note is shown
 * @returns Compliance information
 */
const calculateA11yCompliance = (
  config: AriaConfig,
  hasTooltip: boolean,
  hasNote: boolean
): A11yCompliance => {
  const checks = {
    hasAriaLabel: isValidAriaLabel(config.label),
    hasTooltip,
    hasVisibleLabel: true,
    hasScreenReaderText: isValidAriaLabel(config.label),
  };

  const score = Object.values(checks).filter(Boolean).length / 4;
  const wcagLevel: 'A' | 'AA' | 'AAA' = score >= 0.9 ? 'AAA' : score >= 0.7 ? 'AA' : 'A';

  return {
    wcagLevel,
    ...checks,
    score: Math.round(score * 100)
  };
};

/**
 * Creates ARIA attributes object
 * @param config - ARIA configuration
 * @returns ARIA attributes
 */
const createAriaAttributes = (config: AriaConfig): AriaAttributes => {
  const attributes: AriaAttributes = {
    'aria-label': config.label
  };

  if (config.describedBy) {
    attributes['aria-describedby'] = config.describedBy;
  }

  if (config.role) {
    attributes['role'] = config.role;
  }

  if (config.live) {
    attributes['aria-live'] = config.live;
  }

  if (config.atomic !== undefined) {
    attributes['aria-atomic'] = config.atomic;
  }

  return attributes;
};

/**
 * Default accessible text
 */
const DEFAULT_TEXT = 'Important accessible content that should be available to screen readers even when visually truncated';

/**
 * AccessibilityExample component with comprehensive ARIA support
 * Demonstrates proper accessibility implementation for truncated text
 */
const AccessibilityExample: React.FC<AccessibilityExampleProps> = ({
  text = DEFAULT_TEXT,
  maxWidth = '200px',
  showTooltip = true,
  showNote = true,
  ariaLabel,
  ariaDescribedBy,
  ariaRole,
  highContrastMode = false,
  onScreenReaderAccess
}): JSX.Element => {
  const textRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<TruncationA11yState>({
    isTruncated: false,
    fullTextAvailable: true,
    tooltipVisible: false,
    screenReaderMode: false
  });

  /**
   * Create ARIA configuration
   */
  const ariaConfig = useMemo<AriaConfig>(() => {
    return createAriaConfig(text, ariaLabel, ariaDescribedBy, ariaRole);
  }, [text, ariaLabel, ariaDescribedBy, ariaRole]);

  /**
   * Calculate compliance information
   */
  const compliance = useMemo<A11yCompliance>(() => {
    return calculateA11yCompliance(ariaConfig, showTooltip, showNote);
  }, [ariaConfig, showTooltip, showNote]);

  /**
   * Container style with accessibility considerations
   */
  const containerStyle = useMemo<CSSProperties>(() => {
    const baseStyle: CSSProperties = {
      maxWidth: normalizeWidth(maxWidth)
    };

    if (highContrastMode) {
      return {
        ...baseStyle,
        border: '2px solid currentColor',
        padding: '4px'
      };
    }

    return baseStyle;
  }, [maxWidth, highContrastMode]);

  /**
   * Generate ARIA attributes
   */
  const ariaAttributes = useMemo<AriaAttributes>(() => {
    return createAriaAttributes(ariaConfig);
  }, [ariaConfig]);

  /**
   * Detect if text is truncated
   */
  useEffect(() => {
    if (textRef.current) {
      const element = textRef.current;
      const isTruncated = element.scrollWidth > element.clientWidth;

      setState(prev => ({
        ...prev,
        isTruncated
      }));
    }
  }, [text, maxWidth]);

  /**
   * Handle focus for screen reader access
   */
  const handleFocus = useCallback(() => {
    setState(prev => ({ ...prev, screenReaderMode: true }));

    if (onScreenReaderAccess) {
      onScreenReaderAccess(text);
    }
  }, [text, onScreenReaderAccess]);

  /**
   * Handle blur
   */
  const handleBlur = useCallback(() => {
    setState(prev => ({ ...prev, screenReaderMode: false }));
  }, []);

  /**
   * Handle tooltip visibility
   */
  const handleTooltipToggle = useCallback((visible: boolean) => {
    setState(prev => ({ ...prev, tooltipVisible: visible }));
  }, []);

  /**
   * Render truncated text element with full accessibility
   */
  const renderTruncatedText = useCallback((): ReactElement => {
    return (
      <div
        ref={textRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        {...ariaAttributes}
        style={{ outline: state.screenReaderMode ? '2px solid #007ace' : undefined }}
      >
        <Text
          variant="bodyMd"
          truncate
        >
          {text}
        </Text>
      </div>
    );
  }, [text, ariaAttributes, state.screenReaderMode, handleFocus, handleBlur]);

  /**
   * Render compliance badge
   */
  const renderComplianceBadge = useCallback((): ReactNode => {
    if (!showNote) return null;

    const badgeColor = compliance.wcagLevel === 'AAA' ? '#008060' :
                       compliance.wcagLevel === 'AA' ? '#006fbb' : '#916a00';

    return (
      <div style={{
        display: 'inline-block',
        padding: '4px 8px',
        backgroundColor: badgeColor,
        color: 'white',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '600',
        marginTop: '8px'
      }}>
        WCAG {compliance.wcagLevel} - {compliance.score}% Compliant
      </div>
    );
  }, [showNote, compliance]);

  /**
   * Render accessibility features list
   */
  const renderA11yFeatures = useCallback((): ReactNode => {
    if (!showNote) return null;

    const features = [
      { enabled: compliance.hasAriaLabel, text: 'ARIA label for screen readers' },
      { enabled: compliance.hasTooltip, text: 'Tooltip for visual users' },
      { enabled: compliance.hasScreenReaderText, text: 'Full text accessible' },
      { enabled: state.isTruncated, text: 'Keyboard focusable' }
    ];

    return (
      <div style={{ marginTop: '16px' }}>
        <Text variant="bodySm" as="p" fontWeight="semibold">
          Accessibility Features:
        </Text>
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          {features.map((feature, index) => (
            <li key={index}>
              <Text variant="bodySm" tone={feature.enabled ? 'success' : 'subdued'}>
                {feature.enabled ? '✓' : '○'} {feature.text}
              </Text>
            </li>
          ))}
        </ul>
      </div>
    );
  }, [showNote, compliance, state.isTruncated]);

  /**
   * Render screen reader only text
   */
  const renderScreenReaderText = useCallback((): ReactNode => {
    return (
      <span
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0
        }}
        aria-live="polite"
      >
        {state.screenReaderMode && \`Full text: \${text}\`}
      </span>
    );
  }, [state.screenReaderMode, text]);

  return (
    <BlockStack gap="400">
      <Text as="h3" variant="headingMd">Accessible Truncation</Text>

      <div style={containerStyle}>
        {showTooltip ? (
          <Tooltip
            content={text}
            preferredPosition="above"
            dismissOnMouseOut
          >
            {renderTruncatedText()}
          </Tooltip>
        ) : (
          renderTruncatedText()
        )}
      </div>

      {renderScreenReaderText()}

      {showNote && (
        <>
          <Text variant="bodySm" tone="subdued">
            Screen readers will read the full text even though it's visually truncated.
            Press Tab to focus and hear the complete content.
          </Text>
          {renderComplianceBadge()}
          {renderA11yFeatures()}
        </>
      )}
    </BlockStack>
  );
};

export default AccessibilityExample;`,
  },

  dataTable: {
    react: `import { DataTable, Card, Text } from '@shopify/polaris';
import React from 'react';

function DataTableExample() {
  const rows = [
    [
      'INV-001',
      'John Smith from New York City, United States',
      'Premium Wireless Bluetooth Headphones with Active Noise Cancellation and 30-hour Battery Life',
      '$299.99'
    ],
    [
      'INV-002',
      'Sarah Johnson from Los Angeles, California',
      'Professional Grade Camera Lens Kit with Multiple Focal Lengths',
      '$1,249.00'
    ],
    [
      'INV-003',
      'Michael Chen from San Francisco Bay Area',
      'Ergonomic Office Chair with Lumbar Support and Adjustable Height',
      '$549.99'
    ]
  ];

  return (
    <Card>
      <DataTable
        columnContentTypes={['text', 'text', 'text', 'numeric']}
        headings={['Invoice', 'Customer', 'Product', 'Amount']}
        rows={rows}
        truncate
      />
    </Card>
  );
}

export default DataTableExample;`,

    vanilla: `<!-- DataTable with Truncation using @cin7/vanilla-js -->
<div id="datatable-truncate-container"></div>

<script>
import { $, createElement } from '@cin7/vanilla-js';

const container = $('#datatable-truncate-container');

const card = createElement('div', {
  className: 'polaris-card'
});

const table = createElement('table', {
  className: 'polaris-data-table'
});

const thead = createElement('thead');
const headerRow = createElement('tr');
['Invoice', 'Customer', 'Product', 'Amount'].forEach(heading => {
  const th = createElement('th', {
    className: 'polaris-data-table__cell',
    textContent: heading
  });
  headerRow.appendChild(th);
});
thead.appendChild(headerRow);
table.appendChild(thead);

const tbody = createElement('tbody');
const data = [
  ['INV-001', 'John Smith from New York City, United States', 'Premium Wireless Bluetooth Headphones with Active Noise Cancellation and 30-hour Battery Life', '$299.99'],
  ['INV-002', 'Sarah Johnson from Los Angeles, California', 'Professional Grade Camera Lens Kit with Multiple Focal Lengths', '$1,249.00'],
  ['INV-003', 'Michael Chen from San Francisco Bay Area', 'Ergonomic Office Chair with Lumbar Support and Adjustable Height', '$549.99']
];

data.forEach(row => {
  const tr = createElement('tr');
  row.forEach((cell, index) => {
    const td = createElement('td', {
      className: 'polaris-data-table__cell',
      style: index < 3 ? 'max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;' : 'text-align: right;',
      textContent: cell
    });
    tr.appendChild(td);
  });
  tbody.appendChild(tr);
});
table.appendChild(tbody);
card.appendChild(table);
container.appendChild(card);
</script>`,

    extjs: `// ExtJS DataTable with Truncation using @cin7/extjs-adapters
import { PolarisDataGrid } from '@cin7/extjs-adapters';

Ext.create('Ext.grid.Panel', {
  title: 'Invoices',
  store: {
    fields: ['invoice', 'customer', 'product', 'amount'],
    data: [
      {
        invoice: 'INV-001',
        customer: 'John Smith from New York City, United States',
        product: 'Premium Wireless Bluetooth Headphones with Active Noise Cancellation and 30-hour Battery Life',
        amount: '$299.99'
      },
      {
        invoice: 'INV-002',
        customer: 'Sarah Johnson from Los Angeles, California',
        product: 'Professional Grade Camera Lens Kit with Multiple Focal Lengths',
        amount: '$1,249.00'
      },
      {
        invoice: 'INV-003',
        customer: 'Michael Chen from San Francisco Bay Area',
        product: 'Ergonomic Office Chair with Lumbar Support and Adjustable Height',
        amount: '$549.99'
      }
    ]
  },
  columns: [
    { text: 'Invoice', dataIndex: 'invoice', width: 100 },
    {
      text: 'Customer',
      dataIndex: 'customer',
      width: 200,
      renderer: function(value) {
        return '<div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="' + value + '">' + value + '</div>';
      }
    },
    {
      text: 'Product',
      dataIndex: 'product',
      flex: 1,
      renderer: function(value) {
        return '<div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="' + value + '">' + value + '</div>';
      }
    },
    { text: 'Amount', dataIndex: 'amount', width: 100, align: 'right' }
  ],
  width: 800,
  height: 300,
  renderTo: Ext.getBody()
});`,

    typescript: `import { DataTable, Card, Text } from '@shopify/polaris';
import React from 'react';

interface Invoice {
  id: string;
  customer: string;
  product: string;
  amount: string;
}

interface DataTableExampleProps {
  invoices?: Invoice[];
  truncate?: boolean;
}

function DataTableExample({
  invoices = [
    {
      id: 'INV-001',
      customer: 'John Smith from New York City, United States',
      product: 'Premium Wireless Bluetooth Headphones with Active Noise Cancellation and 30-hour Battery Life',
      amount: '$299.99'
    },
    {
      id: 'INV-002',
      customer: 'Sarah Johnson from Los Angeles, California',
      product: 'Professional Grade Camera Lens Kit with Multiple Focal Lengths',
      amount: '$1,249.00'
    },
    {
      id: 'INV-003',
      customer: 'Michael Chen from San Francisco Bay Area',
      product: 'Ergonomic Office Chair with Lumbar Support and Adjustable Height',
      amount: '$549.99'
    }
  ],
  truncate = true
}: DataTableExampleProps): JSX.Element {
  const rows = invoices.map(invoice => [
    invoice.id,
    invoice.customer,
    invoice.product,
    invoice.amount
  ]);

  return (
    <Card>
      <DataTable
        columnContentTypes={['text', 'text', 'text', 'numeric']}
        headings={['Invoice', 'Customer', 'Product', 'Amount']}
        rows={rows}
        truncate={truncate}
      />
    </Card>
  );
}

export default DataTableExample;`,
  },

  emailSubjects: {
    react: `import { Card, Text, BlockStack, InlineStack, Badge, Checkbox } from '@shopify/polaris';
import React, { useState } from 'react';

function EmailSubjects() {
  const [selected, setSelected] = useState<string[]>([]);

  const emails = [
    { id: '1', from: 'Sarah Johnson', subject: 'Quarterly Performance Review and Team Goals Discussion for Q4 2024', unread: true },
    { id: '2', from: 'Marketing Team', subject: 'New Campaign Launch Strategy - Please Review by End of Week', unread: true },
    { id: '3', from: 'John Smith', subject: 'Re: Budget Approval for the New Project Initiative', unread: false }
  ];

  return (
    <Card>
      <BlockStack gap="0">
        {emails.map(email => (
          <div
            key={email.id}
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #e1e3e5',
              cursor: 'pointer'
            }}
          >
            <InlineStack gap="300" blockAlign="start">
              <Checkbox
                label=""
                checked={selected.includes(email.id)}
                onChange={() => {
                  setSelected(prev =>
                    prev.includes(email.id)
                      ? prev.filter(id => id !== email.id)
                      : [...prev, email.id]
                  );
                }}
              />
              <BlockStack gap="100">
                <InlineStack gap="200" blockAlign="center">
                  <Text variant="bodyMd" fontWeight={email.unread ? 'semibold' : 'regular'}>
                    {email.from}
                  </Text>
                  {email.unread && <Badge tone="info">New</Badge>}
                </InlineStack>
                <div style={{ maxWidth: '500px' }}>
                  <Text
                    variant="bodySm"
                    tone="subdued"
                    truncate
                  >
                    {email.subject}
                  </Text>
                </div>
              </BlockStack>
            </InlineStack>
          </div>
        ))}
      </BlockStack>
    </Card>
  );
}

export default EmailSubjects;`,

    vanilla: `<!-- Email Subjects with Truncation using @cin7/vanilla-js -->
<div id="email-subjects-container"></div>

<script>
import { $, createElement, on } from '@cin7/vanilla-js';

const container = $('#email-subjects-container');

const card = createElement('div', {
  className: 'polaris-card'
});

const emails = [
  { id: '1', from: 'Sarah Johnson', subject: 'Quarterly Performance Review and Team Goals Discussion for Q4 2024', unread: true },
  { id: '2', from: 'Marketing Team', subject: 'New Campaign Launch Strategy - Please Review by End of Week', unread: true },
  { id: '3', from: 'John Smith', subject: 'Re: Budget Approval for the New Project Initiative', unread: false }
];

emails.forEach((email, index) => {
  const emailRow = createElement('div', {
    style: 'padding: 12px 16px; border-bottom: 1px solid #e1e3e5; cursor: pointer; display: flex; gap: 12px; align-items: start;'
  });

  const checkbox = createElement('input', {
    type: 'checkbox',
    id: \`email-\${email.id}\`,
    className: 'polaris-checkbox__input'
  });

  const contentContainer = createElement('div', {
    style: 'flex: 1;'
  });

  const headerRow = createElement('div', {
    style: 'display: flex; gap: 8px; align-items: center; margin-bottom: 4px;'
  });

  const fromText = createElement('span', {
    className: \`polaris-text polaris-text--body-md\${email.unread ? ' polaris-text--semibold' : ''}\`,
    textContent: email.from
  });

  headerRow.appendChild(fromText);

  if (email.unread) {
    const badge = createElement('span', {
      className: 'polaris-badge polaris-badge--tone-info',
      textContent: 'New'
    });
    headerRow.appendChild(badge);
  }

  const subjectContainer = createElement('div', {
    style: 'max-width: 500px;'
  });

  const subjectText = createElement('p', {
    className: 'polaris-text polaris-text--body-sm polaris-text--subdued',
    style: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;',
    textContent: email.subject
  });

  subjectContainer.appendChild(subjectText);
  contentContainer.appendChild(headerRow);
  contentContainer.appendChild(subjectContainer);

  emailRow.appendChild(checkbox);
  emailRow.appendChild(contentContainer);
  card.appendChild(emailRow);
});

container.appendChild(card);
</script>`,

    extjs: `// ExtJS Email Subjects with Truncation using @cin7/extjs-adapters
import { PolarisCard } from '@cin7/extjs-adapters';

Ext.create('Ext.grid.Panel', {
  title: 'Email Inbox',
  store: {
    fields: ['id', 'from', 'subject', 'unread'],
    data: [
      { id: '1', from: 'Sarah Johnson', subject: 'Quarterly Performance Review and Team Goals Discussion for Q4 2024', unread: true },
      { id: '2', from: 'Marketing Team', subject: 'New Campaign Launch Strategy - Please Review by End of Week', unread: true },
      { id: '3', from: 'John Smith', subject: 'Re: Budget Approval for the New Project Initiative', unread: false }
    ]
  },
  selModel: {
    type: 'checkboxmodel'
  },
  columns: [
    {
      text: 'From',
      dataIndex: 'from',
      width: 200,
      renderer: function(value, metaData, record) {
        const fontWeight = record.get('unread') ? 'font-weight: 600;' : '';
        return '<span style="' + fontWeight + '">' + value + '</span>';
      }
    },
    {
      text: 'Subject',
      dataIndex: 'subject',
      flex: 1,
      renderer: function(value, metaData, record) {
        const badge = record.get('unread') ? ' <span class="polaris-badge polaris-badge--tone-info">New</span>' : '';
        return '<div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="' + value + '">' +
          value + badge +
          '</div>';
      }
    }
  ],
  width: 700,
  height: 300,
  renderTo: Ext.getBody()
});`,

    typescript: `import { Card, Text, BlockStack, InlineStack, Badge, Checkbox } from '@shopify/polaris';
import React, { useState } from 'react';

interface Email {
  id: string;
  from: string;
  subject: string;
  unread: boolean;
}

interface EmailSubjectsProps {
  emails?: Email[];
  onSelect?: (selectedIds: string[]) => void;
}

function EmailSubjects({
  emails = [
    { id: '1', from: 'Sarah Johnson', subject: 'Quarterly Performance Review and Team Goals Discussion for Q4 2024', unread: true },
    { id: '2', from: 'Marketing Team', subject: 'New Campaign Launch Strategy - Please Review by End of Week', unread: true },
    { id: '3', from: 'John Smith', subject: 'Re: Budget Approval for the New Project Initiative', unread: false }
  ],
  onSelect
}: EmailSubjectsProps): JSX.Element {
  const [selected, setSelected] = useState<string[]>([]);

  const handleCheckboxChange = (emailId: string) => {
    const newSelected = selected.includes(emailId)
      ? selected.filter(id => id !== emailId)
      : [...selected, emailId];

    setSelected(newSelected);
    onSelect?.(newSelected);
  };

  return (
    <Card>
      <BlockStack gap="0">
        {emails.map(email => (
          <div
            key={email.id}
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #e1e3e5',
              cursor: 'pointer'
            }}
          >
            <InlineStack gap="300" blockAlign="start">
              <Checkbox
                label=""
                checked={selected.includes(email.id)}
                onChange={() => handleCheckboxChange(email.id)}
              />
              <BlockStack gap="100">
                <InlineStack gap="200" blockAlign="center">
                  <Text variant="bodyMd" fontWeight={email.unread ? 'semibold' : 'regular'}>
                    {email.from}
                  </Text>
                  {email.unread && <Badge tone="info">New</Badge>}
                </InlineStack>
                <div style={{ maxWidth: '500px' }}>
                  <Text
                    variant="bodySm"
                    tone="subdued"
                    truncate
                  >
                    {email.subject}
                  </Text>
                </div>
              </BlockStack>
            </InlineStack>
          </div>
        ))}
      </BlockStack>
    </Card>
  );
}

export default EmailSubjects;`,
  }
};

// AlphaStack Component Examples

export const filtersExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Filters, Select } from '@shopify/polaris';
import { useState, useCallback } from 'react';

function FiltersExample() {
  const [queryValue, setQueryValue] = useState('');
  const [appliedFilters, setAppliedFilters] = useState([]);

  const handleQueryChange = useCallback((value: string) => {
    setQueryValue(value);
  }, []);

  const handleQueryClear = useCallback(() => {
    setQueryValue('');
  }, []);

  const filters = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <Select
          label="Status"
          options={[
            { label: 'All', value: '' },
            { label: 'Active', value: 'active' },
            { label: 'Draft', value: 'draft' },
          ]}
          onChange={() => {}}
        />
      ),
    },
  ];

  return (
    <Filters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryChange}
      onQueryClear={handleQueryClear}
      onFiltersChange={setAppliedFilters}
    />
  );
}`,

    extjs: `// ExtJS Grid with filtering toolbar
Ext.create('Ext.grid.Panel', {
  title: 'Product Filters',
  tbar: [{
    xtype: 'textfield',
    fieldLabel: 'Search',
    name: 'search',
    width: 300,
    listeners: {
      change: function(field, newValue) {
        const grid = this.up('grid');
        const store = grid.getStore();
        store.clearFilter();
        if (newValue) {
          store.filter('name', newValue);
        }
      }
    }
  }, {
    xtype: 'combo',
    fieldLabel: 'Status',
    store: ['All', 'Active', 'Draft', 'Archived'],
    value: 'All',
    width: 200,
    listeners: {
      select: function(combo, record) {
        const grid = this.up('grid');
        const store = grid.getStore();
        if (record.get('field1') !== 'All') {
          store.filter('status', record.get('field1'));
        } else {
          store.clearFilter();
        }
      }
    }
  }],
  columns: [
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Status', dataIndex: 'status', width: 100 }
  ],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="filters-container">
  <div class="search-box">
    <input
      type="text"
      id="search-input"
      placeholder="Search..."
      class="filter-search"
    />
  </div>

  <div class="filter-controls">
    <select id="status-filter" class="filter-select">
      <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="draft">Draft</option>
      <option value="archived">Archived</option>
    </select>
  </div>

  <div id="applied-filters" class="applied-filters"></div>
</div>

<script>
import { on, $ } from '@cin7/vanilla-js';

const searchInput = $('#search-input');
const statusFilter = $('#status-filter');
const appliedFiltersEl = $('#applied-filters');

on(searchInput, 'input', (e) => {
  const query = e.target.value;
  // Filter data based on query
  filterData({ query, status: statusFilter.value });
});

on(statusFilter, 'change', (e) => {
  const status = e.target.value;
  filterData({ query: searchInput.value, status });
  updateAppliedFilters(status);
});

function filterData(filters) {
  // Apply filters to your data
  console.log('Filtering with:', filters);
}
</script>`,

    typescript: `import { Filters, Select } from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface Filter {
  key: string;
  label: string;
  filter: JSX.Element;
}

interface FiltersExampleProps {
  onFiltersApply?: (filters: any[]) => void;
}

function FiltersExample({
  onFiltersApply
}: FiltersExampleProps): JSX.Element {
  const [queryValue, setQueryValue] = useState<string>('');
  const [appliedFilters, setAppliedFilters] = useState<any[]>([]);

  const handleQueryChange = useCallback((value: string) => {
    setQueryValue(value);
  }, []);

  const handleQueryClear = useCallback(() => {
    setQueryValue('');
  }, []);

  const handleFiltersChange = useCallback((filters: any[]) => {
    setAppliedFilters(filters);
    onFiltersApply?.(filters);
  }, [onFiltersApply]);

  const filters: Filter[] = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <Select
          label="Status"
          options={[
            { label: 'All', value: '' },
            { label: 'Active', value: 'active' },
            { label: 'Draft', value: 'draft' },
          ]}
          onChange={() => {}}
        />
      ),
    },
  ];

  return (
    <Filters
      queryValue={queryValue}
      filters={filters}
      appliedFilters={appliedFilters}
      onQueryChange={handleQueryChange}
      onQueryClear={handleQueryClear}
      onFiltersChange={handleFiltersChange}
    />
  );
}`
  }
};

// Scrollable Component Examples

export const scrollableExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { Scrollable, Card, Text } from '@shopify/polaris';

function ScrollableExample() {
  return (
    <Scrollable height="200px" shadow>
      <div style={{ padding: '16px' }}>
        {Array.from({ length: 15 }, (_, i) => (
          <Card key={i} sectioned style={{ marginBottom: '12px' }}>
            <Text variant="headingSm">Card {i + 1}</Text>
            <Text variant="bodyMd">
              This is card number {i + 1} in the scrollable container.
            </Text>
          </Card>
        ))}
      </div>
    </Scrollable>
  );
}`,

    extjs: `// ExtJS Panel with scrollable content
Ext.create('Ext.panel.Panel', {
  title: 'Scrollable Content',
  width: 400,
  height: 300,
  autoScroll: true,
  scrollable: true,
  items: [{
    xtype: 'container',
    html: Array.from({ length: 20 }, (_, i) =>
      '<div style="padding: 16px; margin: 8px; border: 1px solid #ccc;">' +
      '<h4>Item ' + (i + 1) + '</h4>' +
      '<p>This is scrollable content item ' + (i + 1) + '</p>' +
      '</div>'
    ).join('')
  }],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="scrollable-container" style="height: 300px; overflow-y: auto;">
  <div class="scrollable-content">
    <div class="scroll-item">Item 1</div>
    <div class="scroll-item">Item 2</div>
    <div class="scroll-item">Item 3</div>
    <!-- More items... -->
  </div>
</div>

<style>
.scrollable-container {
  position: relative;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.scrollable-container::-webkit-scrollbar {
  width: 8px;
}

.scrollable-container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.scroll-item {
  padding: 16px;
  margin: 8px;
  border: 1px solid #eee;
  border-radius: 4px;
  background: white;
}
</style>

<script>
import { on, $ } from '@cin7/vanilla-js';

const scrollContainer = $('.scrollable-container');

// Detect scroll to bottom
on(scrollContainer, 'scroll', (e) => {
  const el = e.target;
  const isBottom = el.scrollHeight - el.scrollTop === el.clientHeight;
  if (isBottom) {
    console.log('Scrolled to bottom!');
  }
});
</script>`,

    typescript: `import { Scrollable, Card, Text } from '@shopify/polaris';
import { ReactNode } from 'react';

interface ScrollableExampleProps {
  height?: string;
  children?: ReactNode;
  onScrolledToBottom?: () => void;
}

function ScrollableExample({
  height = '200px',
  children,
  onScrolledToBottom
}: ScrollableExampleProps): JSX.Element {
  const items = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: 'Card ' + (i + 1),
    content: 'This is card number ' + (i + 1)
  }));

  return (
    <Scrollable
      height={height}
      shadow
      onScrolledToBottom={onScrolledToBottom}
    >
      <div style={{ padding: '16px' }}>
        {children || items.map((item) => (
          <Card key={item.id} sectioned style={{ marginBottom: '12px' }}>
            <Text variant="headingSm">{item.title}</Text>
            <Text variant="bodyMd">{item.content}</Text>
          </Card>
        ))}
      </div>
    </Scrollable>
  );
}`
  },

  verticalScrolling: {
    react: `import { Scrollable, Text, Badge } from '@shopify/polaris';
import React, { useState } from 'react';

function VerticalScrollingExample() {
  const [scrolledToBottom, setScrolledToBottom] = useState(false);

  const handleScrolledToBottom = () => {
    setScrolledToBottom(true);
    setTimeout(() => setScrolledToBottom(false), 2000);
  };

  return (
    <div>
      {scrolledToBottom && (
        <div style={{
          marginBottom: '16px',
          padding: '12px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '8px'
        }}>
          <Text variant="bodyMd" style={{ color: '#155724' }}>
            You have reached the bottom!
          </Text>
        </div>
      )}

      <Scrollable height="300px" shadow onScrolledToBottom={handleScrolledToBottom}>
        <div style={{ padding: '16px' }}>
          {Array.from({ length: 25 }, (_, i) => (
            <div key={i} style={{
              padding: '16px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              marginBottom: '12px',
              border: '1px solid #eee'
            }}>
              <Text variant="headingSm">Section {i + 1}</Text>
              <Text variant="bodyMd">
                This is section {i + 1} of 25. Keep scrolling to see all sections.
              </Text>
              {i === 24 && (
                <div style={{ marginTop: '12px' }}>
                  <Badge status="success">You've reached the end!</Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </Scrollable>
    </div>
  );
}

export default VerticalScrollingExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="notification" class="notification" style="display: none; padding: 12px; margin-bottom: 16px; background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 8px; color: #155724;">
  You have reached the bottom!
</div>

<div class="scrollable-vertical" style="height: 300px; overflow-y: auto; border: 1px solid #ddd; border-radius: 8px;">
  <div style="padding: 16px;" id="scrollable-content">
    <!-- Content sections will be generated here -->
  </div>
</div>

<style>
.scrollable-vertical::-webkit-scrollbar {
  width: 8px;
}

.scrollable-vertical::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

.scroll-section {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 12px;
  border: 1px solid #eee;
}
</style>

<script>
import { on, $, show, hide } from '@cin7/vanilla-js';

const scrollContainer = $('.scrollable-vertical');
const notification = $('#notification');
const contentArea = $('#scrollable-content');

// Generate content
for (let i = 0; i < 25; i++) {
  const section = document.createElement('div');
  section.className = 'scroll-section';
  section.innerHTML = \`
    <h4>Section \${i + 1}</h4>
    <p>This is section \${i + 1} of 25. Keep scrolling to see all sections.</p>
  \`;
  contentArea.appendChild(section);
}

// Detect scroll to bottom
on(scrollContainer, 'scroll', (e) => {
  const el = e.target;
  const isAtBottom = Math.abs(el.scrollHeight - el.scrollTop - el.clientHeight) < 1;

  if (isAtBottom) {
    show(notification);
    setTimeout(() => hide(notification), 2000);
  }
});
</script>`,

    extjs: `// ExtJS Panel with vertical scrolling and scroll events
Ext.create('Ext.panel.Panel', {
  title: 'Vertical Scrolling',
  width: 600,
  height: 400,
  autoScroll: true,
  scrollable: 'vertical',

  items: [{
    xtype: 'container',
    padding: 16,
    html: Array.from({ length: 25 }, (_, i) =>
      '<div class="scroll-section" style="padding: 16px; background-color: #f9f9f9; border-radius: 8px; margin-bottom: 12px; border: 1px solid #eee;">' +
      '<h4>Section ' + (i + 1) + '</h4>' +
      '<p>This is section ' + (i + 1) + ' of 25. Keep scrolling to see all sections.</p>' +
      (i === 24 ? '<span style="background-color: #d4edda; color: #155724; padding: 4px 8px; border-radius: 4px;">You have reached the end!</span>' : '') +
      '</div>'
    ).join('')
  }],

  listeners: {
    afterrender: function(panel) {
      var scroller = panel.getScrollable();
      if (scroller) {
        scroller.on('scrollend', function(scroller, x, y) {
          var maxY = scroller.getMaxPosition().y;
          if (y >= maxY) {
            Ext.Msg.alert('Scroll Event', 'You have reached the bottom!');
          }
        });
      }
    }
  },

  renderTo: Ext.getBody()
});`,

    typescript: `import { Scrollable, Text, Badge } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface VerticalScrollingProps {
  itemCount?: number;
  height?: string;
  onReachBottom?: () => void;
}

function VerticalScrollingExample({
  itemCount = 25,
  height = '300px',
  onReachBottom
}: VerticalScrollingProps): JSX.Element {
  const [scrolledToBottom, setScrolledToBottom] = useState<boolean>(false);

  const handleScrolledToBottom = useCallback(() => {
    setScrolledToBottom(true);
    onReachBottom?.();

    const timer = setTimeout(() => setScrolledToBottom(false), 2000);
    return () => clearTimeout(timer);
  }, [onReachBottom]);

  const sections = Array.from({ length: itemCount }, (_, i) => ({
    id: i + 1,
    isLast: i === itemCount - 1
  }));

  return (
    <div>
      {scrolledToBottom && (
        <div style={{
          marginBottom: '16px',
          padding: '12px',
          backgroundColor: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '8px'
        }}>
          <Text variant="bodyMd" style={{ color: '#155724' }}>
            You have reached the bottom!
          </Text>
        </div>
      )}

      <Scrollable
        height={height}
        shadow
        onScrolledToBottom={handleScrolledToBottom}
      >
        <div style={{ padding: '16px' }}>
          {sections.map((section) => (
            <div key={section.id} style={{
              padding: '16px',
              backgroundColor: '#f9f9f9',
              borderRadius: '8px',
              marginBottom: '12px',
              border: '1px solid #eee'
            }}>
              <Text variant="headingSm">Section {section.id}</Text>
              <Text variant="bodyMd">
                This is section {section.id} of {itemCount}. Keep scrolling to see all sections.
              </Text>
              {section.isLast && (
                <div style={{ marginTop: '12px' }}>
                  <Badge status="success">You've reached the end!</Badge>
                </div>
              )}
            </div>
          ))}
        </div>
      </Scrollable>
    </div>
  );
}

export default VerticalScrollingExample;`,
  },

  horizontalScrolling: {
    react: `import { Scrollable, Card, Text } from '@shopify/polaris';

function HorizontalScrollingExample() {
  return (
    <Scrollable horizontal width="600px" shadow>
      <div style={{
        display: 'flex',
        gap: '16px',
        padding: '16px',
        minWidth: '1200px'
      }}>
        {Array.from({ length: 8 }, (_, i) => (
          <Card key={i} style={{ width: '250px', flexShrink: 0 }}>
            <Card.Section>
              <div style={{
                height: '120px',
                backgroundColor: \`hsl(\${i * 45}, 70%, 85%)\`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text variant="headingLg">Card {i + 1}</Text>
              </div>
            </Card.Section>
            <Card.Section>
              <Text variant="headingSm">Feature {i + 1}</Text>
              <Text variant="bodySm">
                This card demonstrates horizontal scrolling functionality.
              </Text>
            </Card.Section>
          </Card>
        ))}
      </div>
    </Scrollable>
  );
}

export default HorizontalScrollingExample;`,

    vanilla: `<!-- HTML Structure -->
<div class="scrollable-horizontal" style="width: 600px; overflow-x: auto; border: 1px solid #ddd; border-radius: 8px;">
  <div class="card-container" style="display: flex; gap: 16px; padding: 16px; min-width: 1200px;">
    <!-- Cards -->
  </div>
</div>

<style>
.scrollable-horizontal {
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
}

.scrollable-horizontal::-webkit-scrollbar {
  height: 8px;
}

.scrollable-horizontal::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>

<script>
import { $ } from '@cin7/vanilla-js';

const container = $('.card-container');

for (let i = 0; i < 8; i++) {
  const card = document.createElement('div');
  card.style.cssText = 'width: 250px; flex-shrink: 0; background: white; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;';
  card.innerHTML = \`
    <div style="height: 120px; background: hsl(\${i * 45}, 70%, 85%); display: flex; align-items: center; justify-content: center;">
      <h3>Card \${i + 1}</h3>
    </div>
    <div style="padding: 16px;">
      <h4>Feature \${i + 1}</h4>
      <p>This card demonstrates horizontal scrolling functionality.</p>
    </div>
  \`;
  container.appendChild(card);
}
</script>`,

    extjs: `// ExtJS Panel with horizontal scrolling
Ext.create('Ext.panel.Panel', {
  title: 'Horizontal Scrolling',
  width: 600,
  height: 300,
  scrollable: 'horizontal',
  layout: {
    type: 'hbox',
    align: 'stretch'
  },

  items: Array.from({ length: 8 }, (_, i) => ({
    xtype: 'panel',
    width: 250,
    margin: '0 8 0 0',
    html: '<div style="height: 120px; background: hsl(' + (i * 45) + ', 70%, 85%); display: flex; align-items: center; justify-content: center;">' +
          '<h3>Card ' + (i + 1) + '</h3></div>' +
          '<div style="padding: 16px;"><h4>Feature ' + (i + 1) + '</h4>' +
          '<p>This card demonstrates horizontal scrolling functionality.</p></div>'
  })),

  renderTo: Ext.getBody()
});`,

    typescript: `import { Scrollable, Card, Text } from '@shopify/polaris';
import React from 'react';

interface HorizontalScrollingProps {
  cardCount?: number;
  width?: string;
  cardWidth?: string;
}

function HorizontalScrollingExample({
  cardCount = 8,
  width = '600px',
  cardWidth = '250px'
}: HorizontalScrollingProps): JSX.Element {
  const cards = Array.from({ length: cardCount }, (_, i) => ({
    id: i + 1,
    title: \`Feature \${i + 1}\`,
    description: 'This card demonstrates horizontal scrolling functionality.',
    color: \`hsl(\${i * 45}, 70%, 85%)\`
  }));

  return (
    <Scrollable horizontal width={width} shadow>
      <div style={{
        display: 'flex',
        gap: '16px',
        padding: '16px',
        minWidth: \`\${parseInt(cardWidth) * cardCount + 16 * (cardCount - 1)}px\`
      }}>
        {cards.map((card) => (
          <Card key={card.id} style={{ width: cardWidth, flexShrink: 0 }}>
            <Card.Section>
              <div style={{
                height: '120px',
                backgroundColor: card.color,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Text variant="headingLg">Card {card.id}</Text>
              </div>
            </Card.Section>
            <Card.Section>
              <Text variant="headingSm">{card.title}</Text>
              <Text variant="bodySm">{card.description}</Text>
            </Card.Section>
          </Card>
        ))}
      </div>
    </Scrollable>
  );
}

export default HorizontalScrollingExample;`,
  }
};

// Collapsible Component Examples

export const appProviderExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { AppProvider, Page, Card, Button, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

function AppProviderExample() {
  return (
    <AppProvider i18n={{}}>
      <Page title="My Application">
        <Card>
          <BlockStack gap="400">
            <Text as="h2" variant="headingMd">Welcome to Cin7 DSL</Text>
            <Text as="p">
              This application is wrapped with AppProvider to provide
              global context, theming, and i18n support.
            </Text>
            <Button variant="primary">Get Started</Button>
          </BlockStack>
        </Card>
      </Page>
    </AppProvider>
  );
}

export default AppProviderExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="app" data-theme="light" data-locale="en">
  <div class="page">
    <div class="page-header">
      <h1>My Application</h1>
    </div>
    <div class="card">
      <h2>Welcome to Cin7 DSL</h2>
      <p>
        This application uses a vanilla JS context provider pattern
        to manage global state, theming, and internationalization.
      </p>
      <button class="polaris-button polaris-button--primary">
        Get Started
      </button>
    </div>
  </div>
</div>

<script>
// JavaScript context provider using @cin7/vanilla-js
import { createContext } from '@cin7/vanilla-js';

const AppContext = createContext({
  theme: 'light',
  locale: 'en',
  i18n: {}
});

// Initialize app with context
const app = document.getElementById('app');
AppContext.provide(app, {
  theme: app.dataset.theme,
  locale: app.dataset.locale,
  i18n: {} // Load translations here
});

// Components can access context
const context = AppContext.use(app);
console.log('App theme:', context.theme);
console.log('App locale:', context.locale);
</script>`,

    extjs: `// ExtJS Application with global configuration
Ext.application({
  name: 'Cin7App',

  // Global app configuration (similar to AppProvider)
  appConfig: {
    theme: 'neptune',
    locale: 'en',
    i18n: {}
  },

  launch: function() {
    // Create viewport with configured theme
    Ext.create('Ext.container.Viewport', {
      layout: 'fit',
      items: [{
        xtype: 'panel',
        title: 'My Application',
        bodyPadding: 16,
        items: [{
          xtype: 'container',
          html: '<h2>Welcome to Cin7 DSL</h2>' +
                '<p>This application uses ExtJS application ' +
                'configuration to provide global context.</p>'
        }, {
          xtype: 'button',
          text: 'Get Started',
          ui: 'action',
          margin: '16 0 0 0',
          handler: function() {
            console.log('Get started clicked');
          }
        }]
      }]
    });
  }
});`,

    typescript: `import { AppProvider, Page, Card, Button, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

interface AppConfig {
  theme?: 'light' | 'dark';
  locale?: string;
  features?: {
    enableBetaFeatures: boolean;
    enableAnalytics: boolean;
  };
}

interface AppProviderExampleProps {
  config?: AppConfig;
  children?: React.ReactNode;
}

function AppProviderExample({
  config = {
    theme: 'light',
    locale: 'en',
    features: {
      enableBetaFeatures: false,
      enableAnalytics: true
    }
  },
  children
}: AppProviderExampleProps): JSX.Element {
  const i18nConfig = {
    Polaris: {
      Common: {
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete'
      }
    }
  };

  return (
    <AppProvider i18n={i18nConfig}>
      {children || (
        <Page title="My Application">
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">Welcome to Cin7 DSL</Text>
              <Text as="p">
                Theme: {config.theme}, Locale: {config.locale}
              </Text>
              <Button variant="primary">Get Started</Button>
            </BlockStack>
          </Card>
        </Page>
      )}
    </AppProvider>
  );
}

export default AppProviderExample;`,
  },

  'with-custom-i18n': {
    react: `import { AppProvider, Card, Button, Text, BlockStack, InlineStack, Modal, Toast } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

const customI18n = {
  Polaris: {
    Common: {
      checkbox: '同意',
      undo: '撤销',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      add: '添加',
      remove: '移除',
      edit: '编辑',
      close: '关闭',
      search: '搜索',
      loading: '加载中...',
      more: '更多',
      less: '更少',
    },
    Button: {
      disabled: '按钮已禁用',
      undo: '撤销操作',
      save: '保存更改',
    },
    Modal: {
      close: '关闭对话框',
    },
    Toast: {
      success: '成功',
      error: '错误',
      warning: '警告',
      info: '信息',
    },
  },
};

function CustomI18nExample() {
  const [active, setActive] = useState(false);
  const [toastActive, setToastActive] = useState(false);

  const toggleModal = useCallback(() => setActive((active) => !active), []);
  const toggleToast = useCallback(() => setToastActive((active) => !active), []);

  const modalActivator = <Button onClick={toggleModal}>打开对话框</Button>;

  return (
    <AppProvider i18n={customI18n}>
      <div style={{ padding: '24px', width: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">自定义中文界面</Text>
              <Text>
                这是使用自定义中文翻译的 AppProvider。所有按钮和文本都显示为中文。
              </Text>
              <InlineStack gap="12px">
                {modalActivator}
                <Button onClick={toggleToast}>显示提示</Button>
              </InlineStack>
            </BlockStack>
          </div>
        </Card>

        <Modal
          activator={modalActivator}
          open={active}
          onClose={toggleModal}
          title="中文主题模态框"
          primaryAction={{
            content: '保存',
            onAction: toggleModal,
          }}
          secondaryActions={[
            {
              content: '取消',
              onAction: toggleModal,
            },
          ]}
        >
          <Modal.Section>
            <Text>
              这个模态框使用自定义的中文翻译。所有的按钮和文本都显示为中文。
            </Text>
          </Modal.Section>
        </Modal>

        {toastActive && (
          <Toast
            content="这是一个中文提示通知"
            onDismiss={toggleToast}
          />
        )}
      </div>
    </AppProvider>
  );
}

export default CustomI18nExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="app" data-locale="zh">
  <div class="card" style="padding: 24px; max-width: 600px;">
    <h2>自定义中文界面</h2>
    <p>这是使用自定义中文翻译的应用程序。所有按钮和文本都显示为中文。</p>
    <div style="display: flex; gap: 12px; margin-top: 16px;">
      <button class="polaris-button" id="modalBtn">打开对话框</button>
      <button class="polaris-button" id="toastBtn">显示提示</button>
    </div>
  </div>

  <!-- Modal -->
  <div id="modal" class="polaris-modal" style="display: none;">
    <div class="polaris-modal__overlay"></div>
    <div class="polaris-modal__dialog">
      <div class="polaris-modal__header">
        <h2>中文主题模态框</h2>
        <button class="polaris-modal__close" id="modalClose">关闭</button>
      </div>
      <div class="polaris-modal__body">
        <p>这个模态框使用自定义的中文翻译。所有的按钮和文本都显示为中文。</p>
      </div>
      <div class="polaris-modal__footer">
        <button class="polaris-button polaris-button--primary" id="modalSave">保存</button>
        <button class="polaris-button" id="modalCancel">取消</button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div id="toast" class="polaris-toast" style="display: none;">
    <span>这是一个中文提示通知</span>
    <button id="toastClose">×</button>
  </div>
</div>

<script>
// Custom i18n translations
const customI18n = {
  buttons: {
    open: '打开对话框',
    show: '显示提示',
    save: '保存',
    cancel: '取消',
    close: '关闭'
  },
  messages: {
    toast: '这是一个中文提示通知',
    modalTitle: '中文主题模态框',
    modalContent: '这个模态框使用自定义的中文翻译。'
  }
};

// Apply translations
document.getElementById('modalBtn').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.getElementById('toastBtn').addEventListener('click', () => {
  const toast = document.getElementById('toast');
  toast.style.display = 'flex';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
});

document.querySelectorAll('#modalClose, #modalSave, #modalCancel').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
  });
});

document.getElementById('toastClose').addEventListener('click', () => {
  document.getElementById('toast').style.display = 'none';
});
</script>

<style>
.polaris-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
}
.polaris-modal__overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
}
.polaris-modal__dialog {
  position: relative;
  background: white;
  border-radius: 8px;
  max-width: 500px;
  margin: 100px auto;
  padding: 24px;
}
.polaris-toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #202123;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>`,

    extjs: `// ExtJS Application with custom Chinese i18n
Ext.application({
  name: 'Cin7App',

  // Custom Chinese translations
  i18nConfig: {
    buttons: {
      open: '打开对话框',
      show: '显示提示',
      save: '保存',
      cancel: '取消',
      close: '关闭'
    },
    messages: {
      toast: '这是一个中文提示通知',
      modalTitle: '中文主题模态框',
      modalContent: '这个模态框使用自定义的中文翻译。'
    }
  },

  launch: function() {
    const i18n = this.i18nConfig;

    // Create main panel with Chinese text
    Ext.create('Ext.panel.Panel', {
      renderTo: Ext.getBody(),
      title: '自定义中文界面',
      width: 600,
      bodyPadding: 24,
      items: [{
        xtype: 'container',
        html: '<p>这是使用自定义中文翻译的应用程序。所有按钮和文本都显示为中文。</p>'
      }, {
        xtype: 'container',
        layout: 'hbox',
        margin: '16 0 0 0',
        defaults: {
          margin: '0 12 0 0'
        },
        items: [{
          xtype: 'button',
          text: i18n.buttons.open,
          handler: function() {
            Ext.create('Ext.window.Window', {
              title: i18n.messages.modalTitle,
              width: 500,
              modal: true,
              bodyPadding: 16,
              html: '<p>' + i18n.messages.modalContent + '</p>',
              buttons: [{
                text: i18n.buttons.save,
                handler: function() {
                  this.up('window').close();
                }
              }, {
                text: i18n.buttons.cancel,
                handler: function() {
                  this.up('window').close();
                }
              }]
            }).show();
          }
        }, {
          xtype: 'button',
          text: i18n.buttons.show,
          handler: function() {
            Ext.toast({
              html: i18n.messages.toast,
              closable: true,
              align: 'b',
              slideInDuration: 400
            });
          }
        }]
      }]
    });
  }
});`,

    typescript: `import { AppProvider, Card, Button, Text, BlockStack, InlineStack, Modal, Toast } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

/**
 * Custom i18n translation configuration
 */
interface I18nTranslation {
  [key: string]: string | I18nTranslation;
}

interface CustomI18nConfig {
  Polaris: {
    Common: {
      [key: string]: string;
    };
    Button: {
      [key: string]: string;
    };
    Modal: {
      [key: string]: string;
    };
    Toast: {
      [key: string]: string;
    };
  };
}

/**
 * Chinese translation configuration for Polaris components
 */
const customI18n: CustomI18nConfig = {
  Polaris: {
    Common: {
      checkbox: '同意',
      undo: '撤销',
      cancel: '取消',
      save: '保存',
      delete: '删除',
      add: '添加',
      remove: '移除',
      edit: '编辑',
      close: '关闭',
      search: '搜索',
      loading: '加载中...',
      more: '更多',
      less: '更少',
    },
    Button: {
      disabled: '按钮已禁用',
      undo: '撤销操作',
      save: '保存更改',
    },
    Modal: {
      close: '关闭对话框',
    },
    Toast: {
      success: '成功',
      error: '错误',
      warning: '警告',
      info: '信息',
    },
  },
};

interface CustomI18nExampleProps {
  locale?: string;
}

/**
 * Example demonstrating AppProvider with custom Chinese i18n translations
 */
function CustomI18nExample({ locale = 'zh' }: CustomI18nExampleProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const [toastActive, setToastActive] = useState<boolean>(false);

  const toggleModal = useCallback(() => setActive((active) => !active), []);
  const toggleToast = useCallback(() => setToastActive((active) => !active), []);

  const modalActivator = <Button onClick={toggleModal}>打开对话框</Button>;

  return (
    <AppProvider i18n={customI18n}>
      <div style={{ padding: '24px', width: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">自定义中文界面</Text>
              <Text>
                这是使用自定义中文翻译的 AppProvider。所有按钮和文本都显示为中文。
                当前语言: {locale}
              </Text>
              <InlineStack gap="12px">
                {modalActivator}
                <Button onClick={toggleToast}>显示提示</Button>
              </InlineStack>
            </BlockStack>
          </div>
        </Card>

        <Modal
          activator={modalActivator}
          open={active}
          onClose={toggleModal}
          title="中文主题模态框"
          primaryAction={{
            content: '保存',
            onAction: toggleModal,
          }}
          secondaryActions={[
            {
              content: '取消',
              onAction: toggleModal,
            },
          ]}
        >
          <Modal.Section>
            <Text>
              这个模态框使用自定义的中文翻译。所有的按钮和文本都显示为中文。
            </Text>
          </Modal.Section>
        </Modal>

        {toastActive && (
          <Toast
            content="这是一个中文提示通知"
            onDismiss={toggleToast}
          />
        )}
      </div>
    </AppProvider>
  );
}

export default CustomI18nExample;`,
  },

  'with-custom-theme': {
    react: `import { AppProvider, Card, Button, Text, BlockStack, InlineStack, Modal, Toast } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

const darkTheme = {
  colors: {
    surface: '#1a1a1a',
    onSurface: '#ffffff',
    interactive: '#ffffff',
    decorative: '#4a4a4a',
    subText: '#a0a0a0',
    border: '#333333',
    background: '#000000',
    backgroundHovered: '#2a2a2a',
    backgroundPressed: '#3a3a3a',
    backgroundSelected: '#4a4a4a',
    borderHovered: '#555555',
    borderDisabled: '#2a2a2a',
    shadow: 'rgba(0, 0, 0, 0.3)',
    icon: '#ffffff',
    iconDisabled: '#666666',
    iconOnSurface: '#ffffff',
    text: '#ffffff',
    textDisabled: '#666666',
    textOnSurface: '#ffffff',
    critical: '#ff6b6b',
    warning: '#ffa726',
    highlight: '#42a5f5',
    success: '#66bb6a',
    primary: '#42a5f5',
    secondary: '#7e57c2',
  },
};

function DarkThemeExample() {
  const [active, setActive] = useState(false);
  const [toastActive, setToastActive] = useState(false);

  const toggleModal = useCallback(() => setActive((active) => !active), []);
  const toggleToast = useCallback(() => setToastActive((active) => !active), []);

  const modalActivator = <Button onClick={toggleModal}>Dark Theme Modal</Button>;

  return (
    <AppProvider theme={darkTheme}>
      <div style={{ padding: '24px', width: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Dark Theme Interface</Text>
              <Text>
                This interface uses a custom dark theme with inverted colors and dark backgrounds.
              </Text>
              <InlineStack gap="12px">
                {modalActivator}
                <Button onClick={toggleToast}>Show Toast</Button>
              </InlineStack>
              <div style={{ padding: '12px', backgroundColor: '#2a2a2a', borderRadius: '4px' }}>
                <Text variant="bodySm">
                  Dark theme colors are applied throughout the interface.
                </Text>
              </div>
            </BlockStack>
          </div>
        </Card>

        <Modal
          activator={modalActivator}
          open={active}
          onClose={toggleModal}
          title="Dark Theme Modal"
          primaryAction={{
            content: 'Save',
            onAction: toggleModal,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: toggleModal,
            },
          ]}
        >
          <Modal.Section>
            <Text>
              This modal uses the dark theme configuration with custom colors
              for backgrounds, text, and interactive elements.
            </Text>
          </Modal.Section>
        </Modal>

        {toastActive && (
          <Toast
            content="Dark theme toast notification"
            onDismiss={toggleToast}
          />
        )}
      </div>
    </AppProvider>
  );
}

export default DarkThemeExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="app" data-theme="dark">
  <div class="card dark-theme" style="padding: 24px; max-width: 600px;">
    <h2 style="color: #ffffff;">Dark Theme Interface</h2>
    <p style="color: #a0a0a0;">
      This interface uses a custom dark theme with inverted colors and dark backgrounds.
    </p>
    <div style="display: flex; gap: 12px; margin-top: 16px;">
      <button class="polaris-button dark" id="modalBtn">Dark Theme Modal</button>
      <button class="polaris-button dark" id="toastBtn">Show Toast</button>
    </div>
    <div style="padding: 12px; background-color: #2a2a2a; border-radius: 4px; margin-top: 16px;">
      <p style="color: #ffffff; font-size: 14px; margin: 0;">
        Dark theme colors are applied throughout the interface.
      </p>
    </div>
  </div>

  <!-- Modal -->
  <div id="modal" class="polaris-modal dark-theme" style="display: none;">
    <div class="polaris-modal__overlay"></div>
    <div class="polaris-modal__dialog dark">
      <div class="polaris-modal__header">
        <h2 style="color: #ffffff;">Dark Theme Modal</h2>
        <button class="polaris-modal__close" id="modalClose">×</button>
      </div>
      <div class="polaris-modal__body">
        <p style="color: #a0a0a0;">
          This modal uses the dark theme configuration with custom colors
          for backgrounds, text, and interactive elements.
        </p>
      </div>
      <div class="polaris-modal__footer">
        <button class="polaris-button polaris-button--primary dark" id="modalSave">Save</button>
        <button class="polaris-button dark" id="modalCancel">Cancel</button>
      </div>
    </div>
  </div>

  <!-- Toast -->
  <div id="toast" class="polaris-toast dark" style="display: none;">
    <span>Dark theme toast notification</span>
    <button id="toastClose">×</button>
  </div>
</div>

<script>
// Dark theme configuration
const darkTheme = {
  colors: {
    surface: '#1a1a1a',
    text: '#ffffff',
    textSubdued: '#a0a0a0',
    border: '#333333',
    background: '#000000',
    backgroundHovered: '#2a2a2a',
    primary: '#42a5f5',
  }
};

// Apply theme to document
document.body.style.backgroundColor = darkTheme.colors.background;

// Event listeners
document.getElementById('modalBtn').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.getElementById('toastBtn').addEventListener('click', () => {
  const toast = document.getElementById('toast');
  toast.style.display = 'flex';
  setTimeout(() => {
    toast.style.display = 'none';
  }, 3000);
});

document.querySelectorAll('#modalClose, #modalSave, #modalCancel').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
  });
});

document.getElementById('toastClose').addEventListener('click', () => {
  document.getElementById('toast').style.display = 'none';
});
</script>

<style>
.dark-theme {
  background-color: #1a1a1a;
  color: #ffffff;
}
.polaris-button.dark {
  background-color: #2a2a2a;
  color: #ffffff;
  border: 1px solid #333333;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
.polaris-button.dark:hover {
  background-color: #3a3a3a;
}
.polaris-button--primary.dark {
  background-color: #42a5f5;
  border-color: #42a5f5;
}
.polaris-modal__dialog.dark {
  background: #1a1a1a;
  border: 1px solid #333333;
}
.polaris-toast.dark {
  background: #2a2a2a;
  color: #ffffff;
}
</style>`,

    extjs: `// ExtJS Application with dark theme configuration
Ext.application({
  name: 'Cin7App',

  // Dark theme configuration
  themeConfig: {
    name: 'dark',
    colors: {
      surface: '#1a1a1a',
      text: '#ffffff',
      textSubdued: '#a0a0a0',
      border: '#333333',
      background: '#000000',
      backgroundHovered: '#2a2a2a',
      primary: '#42a5f5',
    }
  },

  launch: function() {
    const theme = this.themeConfig;

    // Apply dark theme CSS
    Ext.util.CSS.createStyleSheet(
      '.x-panel { background-color: ' + theme.colors.surface + '; color: ' + theme.colors.text + '; }' +
      '.x-panel-header { background-color: ' + theme.colors.background + '; color: ' + theme.colors.text + '; border-color: ' + theme.colors.border + '; }' +
      '.x-btn { background-color: ' + theme.colors.backgroundHovered + '; color: ' + theme.colors.text + '; }' +
      '.x-btn-primary { background-color: ' + theme.colors.primary + '; }'
    );

    // Create main panel
    Ext.create('Ext.panel.Panel', {
      renderTo: Ext.getBody(),
      title: 'Dark Theme Interface',
      width: 600,
      bodyPadding: 24,
      bodyCls: 'dark-theme',
      items: [{
        xtype: 'container',
        html: '<p style="color: ' + theme.colors.textSubdued + ';">This interface uses a custom dark theme with inverted colors and dark backgrounds.</p>'
      }, {
        xtype: 'container',
        layout: 'hbox',
        margin: '16 0 0 0',
        defaults: {
          margin: '0 12 0 0'
        },
        items: [{
          xtype: 'button',
          text: 'Dark Theme Modal',
          handler: function() {
            Ext.create('Ext.window.Window', {
              title: 'Dark Theme Modal',
              width: 500,
              modal: true,
              bodyPadding: 16,
              bodyCls: 'dark-theme',
              html: '<p style="color: ' + theme.colors.textSubdued + ';">This modal uses the dark theme configuration with custom colors for backgrounds, text, and interactive elements.</p>',
              buttons: [{
                text: 'Save',
                ui: 'primary',
                handler: function() {
                  this.up('window').close();
                }
              }, {
                text: 'Cancel',
                handler: function() {
                  this.up('window').close();
                }
              }]
            }).show();
          }
        }, {
          xtype: 'button',
          text: 'Show Toast',
          handler: function() {
            Ext.toast({
              html: 'Dark theme toast notification',
              closable: true,
              align: 'b',
              slideInDuration: 400
            });
          }
        }]
      }, {
        xtype: 'container',
        margin: '16 0 0 0',
        padding: 12,
        style: {
          backgroundColor: theme.colors.backgroundHovered,
          borderRadius: '4px'
        },
        html: '<p style="color: ' + theme.colors.text + '; font-size: 14px; margin: 0;">Dark theme colors are applied throughout the interface.</p>'
      }]
    });
  }
});`,

    typescript: `import { AppProvider, Card, Button, Text, BlockStack, InlineStack, Modal, Toast } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

/**
 * Dark theme color configuration
 */
interface ThemeColors {
  surface: string;
  onSurface: string;
  interactive: string;
  decorative: string;
  subText: string;
  border: string;
  background: string;
  backgroundHovered: string;
  backgroundPressed: string;
  backgroundSelected: string;
  borderHovered: string;
  borderDisabled: string;
  shadow: string;
  icon: string;
  iconDisabled: string;
  iconOnSurface: string;
  text: string;
  textDisabled: string;
  textOnSurface: string;
  critical: string;
  warning: string;
  highlight: string;
  success: string;
  primary: string;
  secondary: string;
}

interface Theme {
  colors: ThemeColors;
  logo?: {
    light: string;
    dark: string;
  };
}

/**
 * Custom dark theme configuration
 */
const darkTheme: Theme = {
  colors: {
    surface: '#1a1a1a',
    onSurface: '#ffffff',
    interactive: '#ffffff',
    decorative: '#4a4a4a',
    subText: '#a0a0a0',
    border: '#333333',
    background: '#000000',
    backgroundHovered: '#2a2a2a',
    backgroundPressed: '#3a3a3a',
    backgroundSelected: '#4a4a4a',
    borderHovered: '#555555',
    borderDisabled: '#2a2a2a',
    shadow: 'rgba(0, 0, 0, 0.3)',
    icon: '#ffffff',
    iconDisabled: '#666666',
    iconOnSurface: '#ffffff',
    text: '#ffffff',
    textDisabled: '#666666',
    textOnSurface: '#ffffff',
    critical: '#ff6b6b',
    warning: '#ffa726',
    highlight: '#42a5f5',
    success: '#66bb6a',
    primary: '#42a5f5',
    secondary: '#7e57c2',
  },
};

interface DarkThemeExampleProps {
  theme?: Theme;
}

/**
 * Example demonstrating AppProvider with custom dark theme
 */
function DarkThemeExample({ theme = darkTheme }: DarkThemeExampleProps): JSX.Element {
  const [active, setActive] = useState<boolean>(false);
  const [toastActive, setToastActive] = useState<boolean>(false);

  const toggleModal = useCallback(() => setActive((active) => !active), []);
  const toggleToast = useCallback(() => setToastActive((active) => !active), []);

  const modalActivator = <Button onClick={toggleModal}>Dark Theme Modal</Button>;

  return (
    <AppProvider theme={theme}>
      <div style={{ padding: '24px', width: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Dark Theme Interface</Text>
              <Text>
                This interface uses a custom dark theme with inverted colors and dark backgrounds.
                Primary color: {theme.colors.primary}
              </Text>
              <InlineStack gap="12px">
                {modalActivator}
                <Button onClick={toggleToast}>Show Toast</Button>
              </InlineStack>
              <div style={{
                padding: '12px',
                backgroundColor: theme.colors.backgroundHovered,
                borderRadius: '4px'
              }}>
                <Text variant="bodySm">
                  Dark theme colors are applied throughout the interface.
                </Text>
              </div>
            </BlockStack>
          </div>
        </Card>

        <Modal
          activator={modalActivator}
          open={active}
          onClose={toggleModal}
          title="Dark Theme Modal"
          primaryAction={{
            content: 'Save',
            onAction: toggleModal,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: toggleModal,
            },
          ]}
        >
          <Modal.Section>
            <Text>
              This modal uses the dark theme configuration with custom colors
              for backgrounds, text, and interactive elements.
            </Text>
          </Modal.Section>
        </Modal>

        {toastActive && (
          <Toast
            content="Dark theme toast notification"
            onDismiss={toggleToast}
          />
        )}
      </div>
    </AppProvider>
  );
}

export default DarkThemeExample;`,
  },

  'with-custom-link': {
    react: `import { AppProvider, Card, Button, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

// Custom link component for routing integration
const CustomLink = ({ children, url, ...rest }: any) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Custom link clicked:', url);
    alert(\`Custom link to: \${url}\`);
    // In a real app, this would integrate with React Router, Next.js, etc.
  };

  return (
    <a
      href={url}
      onClick={handleClick}
      style={{
        color: '#5c6ac4',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
      {...rest}
    >
      {children}
    </a>
  );
};

function CustomLinkExample() {
  return (
    <AppProvider
      i18n={{}}
      linkComponent={CustomLink}
    >
      <div style={{ padding: '24px', width: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Custom Link Component</Text>
              <Text>
                This AppProvider uses a custom link component for all internal links.
                Click the links below to see the custom behavior.
              </Text>
              <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                <BlockStack gap="8px">
                  <Text>
                    <CustomLink url="/custom-route">
                      This is a custom link component
                    </CustomLink>
                  </Text>
                  <Text>
                    <CustomLink url="/products">
                      Navigate to products
                    </CustomLink>
                  </Text>
                  <Text>
                    <CustomLink url="/settings">
                      Go to settings
                    </CustomLink>
                  </Text>
                </BlockStack>
              </div>
              <Text variant="bodySm" color="subdued">
                The custom link component intercepts all link clicks and provides
                custom routing behavior instead of default browser navigation.
                This allows integration with React Router, Next.js, or other routing solutions.
              </Text>
            </BlockStack>
          </div>
        </Card>
      </div>
    </AppProvider>
  );
}

export default CustomLinkExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="app">
  <div class="card" style="padding: 24px; max-width: 600px;">
    <h2>Custom Link Component</h2>
    <p>
      This application uses a custom link component for all internal links.
      Click the links below to see the custom behavior.
    </p>
    <div style="padding: 12px; background-color: #f8f9fa; border-radius: 4px; margin-top: 16px;">
      <div style="display: flex; flex-direction: column; gap: 8px;">
        <a href="/custom-route" class="custom-link" data-custom-link>
          This is a custom link component
        </a>
        <a href="/products" class="custom-link" data-custom-link>
          Navigate to products
        </a>
        <a href="/settings" class="custom-link" data-custom-link>
          Go to settings
        </a>
      </div>
    </div>
    <p style="color: #6d7175; font-size: 14px; margin-top: 16px;">
      The custom link component intercepts all link clicks and provides
      custom routing behavior instead of default browser navigation.
    </p>
  </div>
</div>

<script>
// Custom link handler
class CustomLinkComponent {
  constructor() {
    this.init();
  }

  init() {
    // Intercept all custom link clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('[data-custom-link]');
      if (link) {
        e.preventDefault();
        const url = link.getAttribute('href');
        this.navigate(url);
      }
    });
  }

  navigate(url) {
    console.log('Custom link clicked:', url);
    alert(\`Custom link to: \${url}\`);

    // In a real application, you would:
    // 1. Update browser history: history.pushState({}, '', url);
    // 2. Load new content dynamically
    // 3. Update page title
    // 4. Trigger analytics
  }
}

// Initialize custom link component
const customLinks = new CustomLinkComponent();
</script>

<style>
.custom-link {
  color: #5c6ac4;
  text-decoration: underline;
  cursor: pointer;
  font-size: 14px;
}
.custom-link:hover {
  color: #3f4eae;
}
</style>`,

    extjs: `// ExtJS Application with custom link component
Ext.define('Cin7.CustomLink', {
  extend: 'Ext.Component',
  xtype: 'customlink',

  config: {
    url: '',
    text: ''
  },

  initComponent: function() {
    this.callParent();
    this.html = '<a href="' + this.url + '" class="custom-link">' + this.text + '</a>';
  },

  afterRender: function() {
    this.callParent();

    // Attach click handler
    this.el.on('click', function(e, target) {
      if (target.classList.contains('custom-link')) {
        e.preventDefault();
        const url = target.getAttribute('href');
        this.handleNavigation(url);
      }
    }, this);
  },

  handleNavigation: function(url) {
    console.log('Custom link clicked:', url);
    Ext.Msg.alert('Custom Navigation', 'Navigating to: ' + url);

    // In a real application, you would:
    // 1. Update browser history
    // 2. Load new content
    // 3. Update application state
  }
});

Ext.application({
  name: 'Cin7App',

  launch: function() {
    Ext.create('Ext.panel.Panel', {
      renderTo: Ext.getBody(),
      title: 'Custom Link Component',
      width: 600,
      bodyPadding: 24,
      items: [{
        xtype: 'container',
        html: '<p>This application uses a custom link component for all internal links. Click the links below to see the custom behavior.</p>'
      }, {
        xtype: 'container',
        padding: 12,
        margin: '16 0 0 0',
        style: {
          backgroundColor: '#f8f9fa',
          borderRadius: '4px'
        },
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
        items: [{
          xtype: 'customlink',
          url: '/custom-route',
          text: 'This is a custom link component',
          margin: '0 0 8 0'
        }, {
          xtype: 'customlink',
          url: '/products',
          text: 'Navigate to products',
          margin: '0 0 8 0'
        }, {
          xtype: 'customlink',
          url: '/settings',
          text: 'Go to settings'
        }]
      }, {
        xtype: 'container',
        margin: '16 0 0 0',
        html: '<p style="color: #6d7175; font-size: 14px;">The custom link component intercepts all link clicks and provides custom routing behavior instead of default browser navigation.</p>'
      }]
    });
  }
});`,

    typescript: `import { AppProvider, Card, Button, Text, BlockStack } from '@shopify/polaris';
import React from 'react';

/**
 * Custom link component props
 */
interface CustomLinkProps {
  children: React.ReactNode;
  url: string;
  external?: boolean;
  [key: string]: any;
}

/**
 * Custom link component for routing integration
 * In a real app, this would integrate with React Router, Next.js, etc.
 */
const CustomLink: React.FC<CustomLinkProps> = ({
  children,
  url,
  external = false,
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!external) {
      e.preventDefault();
      console.log('Custom link clicked:', url);
      alert(\`Custom link to: \${url}\`);

      // In a real application:
      // - Use history.pushState() for browser history
      // - Trigger route change in router
      // - Load new content
      // - Update analytics
    }
  };

  return (
    <a
      href={url}
      onClick={handleClick}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        color: '#5c6ac4',
        textDecoration: 'underline',
        cursor: 'pointer',
      }}
      {...rest}
    >
      {children}
    </a>
  );
};

/**
 * Route configuration type
 */
interface Route {
  path: string;
  label: string;
}

interface CustomLinkExampleProps {
  routes?: Route[];
}

/**
 * Example demonstrating AppProvider with custom link component
 */
function CustomLinkExample({
  routes = [
    { path: '/custom-route', label: 'This is a custom link component' },
    { path: '/products', label: 'Navigate to products' },
    { path: '/settings', label: 'Go to settings' }
  ]
}: CustomLinkExampleProps): JSX.Element {
  return (
    <AppProvider
      i18n={{}}
      linkComponent={CustomLink}
    >
      <div style={{ padding: '24px', width: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Custom Link Component</Text>
              <Text>
                This AppProvider uses a custom link component for all internal links.
                Click the links below to see the custom behavior.
              </Text>
              <div style={{
                padding: '12px',
                backgroundColor: '#f8f9fa',
                borderRadius: '4px'
              }}>
                <BlockStack gap="8px">
                  {routes.map((route, index) => (
                    <Text key={index}>
                      <CustomLink url={route.path}>
                        {route.label}
                      </CustomLink>
                    </Text>
                  ))}
                </BlockStack>
              </div>
              <Text variant="bodySm" color="subdued">
                The custom link component intercepts all link clicks and provides
                custom routing behavior instead of default browser navigation.
                This allows integration with React Router, Next.js, or other routing solutions.
              </Text>
            </BlockStack>
          </div>
        </Card>
      </div>
    </AppProvider>
  );
}

export default CustomLinkExample;`,
  },

  'nested-providers': {
    react: `import { AppProvider, Card, Button, Text, BlockStack, Badge } from '@shopify/polaris';
import React, { useState } from 'react';

const darkTheme = {
  colors: {
    surface: '#1a1a1a',
    onSurface: '#ffffff',
    interactive: '#ffffff',
    text: '#ffffff',
    primary: '#42a5f5',
  },
};

function NestedProvidersExample() {
  const [outerTheme, setOuterTheme] = useState('default');
  const [innerTheme, setInnerTheme] = useState('default');

  const toggleOuterTheme = () => {
    setOuterTheme(outerTheme === 'default' ? 'dark' : 'default');
  };

  const toggleInnerTheme = () => {
    setInnerTheme(innerTheme === 'default' ? 'dark' : 'default');
  };

  return (
    <AppProvider theme={outerTheme === 'dark' ? darkTheme : {}}>
      <div style={{ padding: '24px', width: '700px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Nested AppProviders</Text>
              <Text>
                This demonstrates nested AppProvider instances with different theme configurations.
                Each provider can have its own theme, i18n, and link components.
              </Text>
              <Button onClick={toggleOuterTheme}>
                Toggle Outer Theme ({outerTheme})
              </Button>
            </BlockStack>
          </div>
        </Card>

        <div style={{
          marginTop: '24px',
          padding: '24px',
          border: '2px dashed #e1e3e5',
          borderRadius: '4px'
        }}>
          <AppProvider theme={innerTheme === 'dark' ? darkTheme : {}}>
            <Card>
              <div style={{ padding: '24px' }}>
                <BlockStack gap="16px">
                  <Text variant="headingMd" as="h3">Inner Provider</Text>
                  <Text>
                    This card is inside a nested AppProvider with its own theme.
                    The inner provider can override the outer provider's configuration.
                  </Text>
                  <Button onClick={toggleInnerTheme}>
                    Toggle Inner Theme ({innerTheme})
                  </Button>
                  <Badge>
                    Outer: {outerTheme} | Inner: {innerTheme}
                  </Badge>
                </BlockStack>
              </div>
            </Card>
          </AppProvider>
        </div>
      </div>
    </AppProvider>
  );
}

export default NestedProvidersExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="outer-app" data-theme="default">
  <div class="card" style="padding: 24px; max-width: 700px;">
    <h2>Nested AppProviders</h2>
    <p>
      This demonstrates nested context providers with different theme configurations.
      Each provider can have its own theme and configuration.
    </p>
    <button class="polaris-button" id="toggleOuter">
      Toggle Outer Theme (<span id="outerThemeLabel">default</span>)
    </button>
  </div>

  <div style="margin-top: 24px; padding: 24px; border: 2px dashed #e1e3e5; border-radius: 4px;">
    <div id="inner-app" data-theme="default">
      <div class="card" style="padding: 24px;">
        <h3>Inner Provider</h3>
        <p>
          This card is inside a nested provider with its own theme.
          The inner provider can override the outer provider's configuration.
        </p>
        <button class="polaris-button" id="toggleInner">
          Toggle Inner Theme (<span id="innerThemeLabel">default</span>)
        </button>
        <div style="margin-top: 12px;">
          <span class="polaris-badge">
            Outer: <span id="outerStatus">default</span> |
            Inner: <span id="innerStatus">default</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
// Theme configurations
const themes = {
  default: {
    background: '#ffffff',
    text: '#000000',
    surface: '#f8f9fa'
  },
  dark: {
    background: '#1a1a1a',
    text: '#ffffff',
    surface: '#2a2a2a'
  }
};

let outerTheme = 'default';
let innerTheme = 'default';

// Apply theme to element
function applyTheme(element, theme) {
  const themeConfig = themes[theme];
  element.style.backgroundColor = themeConfig.background;
  element.style.color = themeConfig.text;
  const cards = element.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.backgroundColor = themeConfig.surface;
    card.style.color = themeConfig.text;
  });
}

// Toggle outer theme
document.getElementById('toggleOuter').addEventListener('click', () => {
  outerTheme = outerTheme === 'default' ? 'dark' : 'default';
  applyTheme(document.getElementById('outer-app'), outerTheme);
  document.getElementById('outerThemeLabel').textContent = outerTheme;
  document.getElementById('outerStatus').textContent = outerTheme;
});

// Toggle inner theme
document.getElementById('toggleInner').addEventListener('click', () => {
  innerTheme = innerTheme === 'default' ? 'dark' : 'default';
  applyTheme(document.getElementById('inner-app'), innerTheme);
  document.getElementById('innerThemeLabel').textContent = innerTheme;
  document.getElementById('innerStatus').textContent = innerTheme;
});

// Initial theme application
applyTheme(document.getElementById('outer-app'), outerTheme);
applyTheme(document.getElementById('inner-app'), innerTheme);
</script>

<style>
.polaris-badge {
  background-color: #e3e3e3;
  color: #202123;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  display: inline-block;
}
</style>`,

    extjs: `// ExtJS Application with nested configuration contexts
Ext.define('Cin7.NestedProvidersExample', {
  extend: 'Ext.container.Container',
  xtype: 'nestedproviders',

  layout: 'vbox',
  padding: 24,
  width: 700,

  themes: {
    default: {
      background: '#ffffff',
      text: '#000000',
      surface: '#f8f9fa'
    },
    dark: {
      background: '#1a1a1a',
      text: '#ffffff',
      surface: '#2a2a2a'
    }
  },

  initComponent: function() {
    this.outerTheme = 'default';
    this.innerTheme = 'default';

    this.items = [{
      xtype: 'panel',
      title: 'Nested AppProviders',
      bodyPadding: 24,
      items: [{
        xtype: 'container',
        html: '<p>This demonstrates nested configuration contexts with different theme configurations. Each context can have its own theme and configuration.</p>'
      }, {
        xtype: 'button',
        text: 'Toggle Outer Theme (default)',
        itemId: 'outerBtn',
        margin: '16 0 0 0',
        handler: 'onToggleOuter',
        scope: this
      }]
    }, {
      xtype: 'container',
      margin: '24 0 0 0',
      padding: 24,
      style: {
        border: '2px dashed #e1e3e5',
        borderRadius: '4px'
      },
      items: [{
        xtype: 'panel',
        itemId: 'innerPanel',
        title: 'Inner Provider',
        bodyPadding: 24,
        items: [{
          xtype: 'container',
          html: '<p>This panel is inside a nested context with its own theme. The inner context can override the outer context\'s configuration.</p>'
        }, {
          xtype: 'button',
          text: 'Toggle Inner Theme (default)',
          itemId: 'innerBtn',
          margin: '16 0 0 0',
          handler: 'onToggleInner',
          scope: this
        }, {
          xtype: 'container',
          itemId: 'statusBadge',
          margin: '12 0 0 0',
          html: '<span style="background-color: #e3e3e3; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Outer: default | Inner: default</span>'
        }]
      }]
    }];

    this.callParent();
  },

  onToggleOuter: function() {
    this.outerTheme = this.outerTheme === 'default' ? 'dark' : 'default';
    const theme = this.themes[this.outerTheme];

    // Apply outer theme
    const outerPanel = this.down('panel');
    outerPanel.setStyle({
      backgroundColor: theme.surface,
      color: theme.text
    });

    // Update button text
    const btn = this.down('#outerBtn');
    btn.setText('Toggle Outer Theme (' + this.outerTheme + ')');

    this.updateStatus();
  },

  onToggleInner: function() {
    this.innerTheme = this.innerTheme === 'default' ? 'dark' : 'default';
    const theme = this.themes[this.innerTheme];

    // Apply inner theme
    const innerPanel = this.down('#innerPanel');
    innerPanel.setStyle({
      backgroundColor: theme.surface,
      color: theme.text
    });

    // Update button text
    const btn = this.down('#innerBtn');
    btn.setText('Toggle Inner Theme (' + this.innerTheme + ')');

    this.updateStatus();
  },

  updateStatus: function() {
    const badge = this.down('#statusBadge');
    badge.update('<span style="background-color: #e3e3e3; padding: 4px 8px; border-radius: 4px; font-size: 12px;">Outer: ' + this.outerTheme + ' | Inner: ' + this.innerTheme + '</span>');
  }
});

// Create and render
Ext.onReady(function() {
  Ext.create('Cin7.NestedProvidersExample', {
    renderTo: Ext.getBody()
  });
});`,

    typescript: `import { AppProvider, Card, Button, Text, BlockStack, Badge } from '@shopify/polaris';
import React, { useState } from 'react';

/**
 * Theme configuration type
 */
interface Theme {
  colors: {
    surface: string;
    onSurface: string;
    interactive: string;
    text: string;
    primary: string;
  };
}

/**
 * Dark theme configuration
 */
const darkTheme: Theme = {
  colors: {
    surface: '#1a1a1a',
    onSurface: '#ffffff',
    interactive: '#ffffff',
    text: '#ffffff',
    primary: '#42a5f5',
  },
};

type ThemeType = 'default' | 'dark';

interface NestedProvidersExampleProps {
  initialOuterTheme?: ThemeType;
  initialInnerTheme?: ThemeType;
}

/**
 * Example demonstrating nested AppProvider instances with independent themes
 * This pattern is useful for:
 * - Feature-specific themes
 * - Different i18n contexts in different parts of the app
 * - Isolated component configurations
 */
function NestedProvidersExample({
  initialOuterTheme = 'default',
  initialInnerTheme = 'default'
}: NestedProvidersExampleProps): JSX.Element {
  const [outerTheme, setOuterTheme] = useState<ThemeType>(initialOuterTheme);
  const [innerTheme, setInnerTheme] = useState<ThemeType>(initialInnerTheme);

  const toggleOuterTheme = () => {
    setOuterTheme(prev => prev === 'default' ? 'dark' : 'default');
  };

  const toggleInnerTheme = () => {
    setInnerTheme(prev => prev === 'default' ? 'dark' : 'default');
  };

  const getThemeConfig = (theme: ThemeType): Theme | {} => {
    return theme === 'dark' ? darkTheme : {};
  };

  return (
    <AppProvider theme={getThemeConfig(outerTheme)}>
      <div style={{ padding: '24px', width: '700px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Nested AppProviders</Text>
              <Text>
                This demonstrates nested AppProvider instances with different theme configurations.
                Each provider can have its own theme, i18n, and link components.
              </Text>
              <Button onClick={toggleOuterTheme}>
                Toggle Outer Theme ({outerTheme})
              </Button>
              <Text variant="bodySm" color="subdued">
                Current outer theme: {outerTheme}
              </Text>
            </BlockStack>
          </div>
        </Card>

        <div style={{
          marginTop: '24px',
          padding: '24px',
          border: '2px dashed #e1e3e5',
          borderRadius: '4px'
        }}>
          <AppProvider theme={getThemeConfig(innerTheme)}>
            <Card>
              <div style={{ padding: '24px' }}>
                <BlockStack gap="16px">
                  <Text variant="headingMd" as="h3">Inner Provider</Text>
                  <Text>
                    This card is inside a nested AppProvider with its own theme.
                    The inner provider can override the outer provider's configuration.
                  </Text>
                  <Button onClick={toggleInnerTheme}>
                    Toggle Inner Theme ({innerTheme})
                  </Button>
                  <Badge>
                    Outer: {outerTheme} | Inner: {innerTheme}
                  </Badge>
                  <Text variant="bodySm" color="subdued">
                    Current inner theme: {innerTheme}
                  </Text>
                </BlockStack>
              </div>
            </Card>
          </AppProvider>
        </div>
      </div>
    </AppProvider>
  );
}

export default NestedProvidersExample;`,
  },

  'complete-app': {
    react: `import { AppProvider, Frame, TopBar, Page, Layout, Card, Button, Text, BlockStack, InlineStack, Modal, Toast } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

function CompleteApplicationExample() {
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [toastActive, setToastActive] = useState(false);

  const toggleMobileNavigation = useCallback(() => {
    setMobileNavigationActive((active) => !active);
  }, []);

  const toggleModal = useCallback(() => setModalActive((active) => !active), []);
  const toggleToast = useCallback(() => setToastActive((active) => !active), []);

  const topBar = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigation}
      searchField={{
        placeholder: 'Search...',
        value: searchValue,
        onChange: setSearchValue,
      }}
      userMenu={{
        name: 'John Doe',
        initials: 'JD',
        actions: [
          {
            items: [
              { content: 'Settings' },
              { content: 'Logout' },
            ],
          },
        ],
      }}
    />
  );

  return (
    <AppProvider i18n={{}}>
      <Frame topBar={topBar}>
        <div style={{ height: '100vh' }}>
          <Page
            title="Complete Application"
            breadcrumbs={[{ content: 'Home', url: '#' }]}
            primaryAction={{
              content: 'New Item',
              onAction: toggleModal,
            }}
          >
            <Layout>
              <Layout.Section>
                <Card>
                  <div style={{ padding: '24px' }}>
                    <BlockStack gap="16px">
                      <Text variant="headingMd" as="h2">
                        Complete AppProvider Example
                      </Text>
                      <Text>
                        This is a complete application using AppProvider with Frame, TopBar,
                        Page, Layout, and other Polaris components working together.
                      </Text>
                      <InlineStack gap="12px">
                        <Button onClick={toggleModal}>Open Modal</Button>
                        <Button onClick={toggleToast}>Show Toast</Button>
                      </InlineStack>
                      <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                        <Text variant="bodySm">
                          This demonstrates a full application structure with:
                          • Global context via AppProvider
                          • Frame for app shell
                          • TopBar with navigation and search
                          • Page with breadcrumbs and actions
                          • Layout for responsive content
                        </Text>
                      </div>
                    </BlockStack>
                  </div>
                </Card>
              </Layout.Section>

              <Layout.Section secondary>
                <Card title="Theme Status">
                  <div style={{ padding: '16px' }}>
                    <BlockStack gap="8px">
                      <Text>✅ Default theme active</Text>
                      <Text>✅ English translations loaded</Text>
                      <Text>✅ Global context available</Text>
                      <Text>✅ Frame and TopBar configured</Text>
                    </BlockStack>
                  </div>
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        </div>

        <Modal
          open={modalActive}
          onClose={toggleModal}
          title="Application Modal"
          primaryAction={{
            content: 'Save',
            onAction: toggleModal,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: toggleModal,
            },
          ]}
        >
          <Modal.Section>
            <Text>
              This modal is part of a complete application powered by AppProvider.
              All components share the same context, theme, and i18n configuration.
            </Text>
          </Modal.Section>
        </Modal>

        {toastActive && (
          <Toast
            content="Application notification from AppProvider"
            onDismiss={toggleToast}
          />
        )}
      </Frame>
    </AppProvider>
  );
}

export default CompleteApplicationExample;`,

    vanilla: `<!-- HTML Structure for Complete Application -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Complete Application</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }

    .app-frame { display: flex; flex-direction: column; height: 100vh; }
    .top-bar { background: #00848e; color: white; padding: 12px 24px; display: flex; align-items: center; gap: 16px; }
    .top-bar-search { flex: 1; max-width: 400px; }
    .top-bar-search input { width: 100%; padding: 8px 12px; border-radius: 4px; border: none; }
    .top-bar-user { display: flex; align-items: center; gap: 8px; }
    .user-avatar { width: 32px; height: 32px; border-radius: 50%; background: #fff; color: #00848e; display: flex; align-items: center; justify-content: center; font-weight: bold; }

    .page { flex: 1; overflow-y: auto; background: #f4f6f8; }
    .page-header { background: white; border-bottom: 1px solid #e1e3e5; padding: 16px 24px; }
    .page-header h1 { font-size: 24px; font-weight: 600; margin-bottom: 4px; }
    .breadcrumbs { font-size: 14px; color: #6d7175; margin-bottom: 8px; }
    .page-actions { margin-top: 12px; }

    .page-content { padding: 24px; }
    .layout { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; }
    .card { background: white; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); padding: 24px; }
    .card h2 { font-size: 18px; font-weight: 600; margin-bottom: 12px; }

    .polaris-button { background: #008296; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 14px; }
    .polaris-button:hover { background: #006a7a; }
    .polaris-button-group { display: flex; gap: 12px; margin: 16px 0; }

    .status-box { background: #f8f9fa; padding: 12px; border-radius: 4px; margin-top: 16px; }
    .status-item { margin: 8px 0; }

    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: none; align-items: center; justify-content: center; z-index: 1000; }
    .modal.active { display: flex; }
    .modal-dialog { background: white; border-radius: 8px; max-width: 500px; width: 90%; }
    .modal-header { padding: 16px 24px; border-bottom: 1px solid #e1e3e5; }
    .modal-body { padding: 24px; }
    .modal-footer { padding: 16px 24px; border-top: 1px solid #e1e3e5; display: flex; gap: 12px; justify-content: flex-end; }

    .toast { position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%); background: #202123; color: white; padding: 12px 24px; border-radius: 8px; display: none; align-items: center; gap: 12px; }
    .toast.active { display: flex; }
  </style>
</head>
<body>
  <div id="app" class="app-frame">
    <!-- Top Bar -->
    <div class="top-bar">
      <button class="toggle-nav">☰</button>
      <div class="top-bar-search">
        <input type="search" placeholder="Search..." id="searchInput">
      </div>
      <div class="top-bar-user">
        <div class="user-avatar">JD</div>
        <span>John Doe</span>
      </div>
    </div>

    <!-- Page Content -->
    <div class="page">
      <div class="page-header">
        <div class="breadcrumbs">
          <a href="#">Home</a> › Complete Application
        </div>
        <h1>Complete Application</h1>
        <div class="page-actions">
          <button class="polaris-button" id="newItemBtn">New Item</button>
        </div>
      </div>

      <div class="page-content">
        <div class="layout">
          <div>
            <div class="card">
              <h2>Complete AppProvider Example</h2>
              <p>
                This is a complete application using a provider pattern with frame, navigation,
                page layout, and other components working together.
              </p>
              <div class="polaris-button-group">
                <button class="polaris-button" id="modalBtn">Open Modal</button>
                <button class="polaris-button" id="toastBtn">Show Toast</button>
              </div>
              <div class="status-box">
                <p><strong>This demonstrates a full application structure with:</strong></p>
                <p>• Global context via provider pattern</p>
                <p>• Frame for app shell</p>
                <p>• TopBar with navigation and search</p>
                <p>• Page with breadcrumbs and actions</p>
                <p>• Layout for responsive content</p>
              </div>
            </div>
          </div>

          <div>
            <div class="card">
              <h2>Theme Status</h2>
              <div class="status-item">✅ Default theme active</div>
              <div class="status-item">✅ English translations loaded</div>
              <div class="status-item">✅ Global context available</div>
              <div class="status-item">✅ Frame and TopBar configured</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div id="modal" class="modal">
      <div class="modal-dialog">
        <div class="modal-header">
          <h2>Application Modal</h2>
        </div>
        <div class="modal-body">
          <p>
            This modal is part of a complete application powered by the provider pattern.
            All components share the same context, theme, and configuration.
          </p>
        </div>
        <div class="modal-footer">
          <button class="polaris-button" id="modalSave">Save</button>
          <button class="polaris-button" id="modalCancel">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <div id="toast" class="toast">
      <span>Application notification from provider</span>
      <button id="toastClose" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer;">×</button>
    </div>
  </div>

  <script>
    // Modal handlers
    document.querySelectorAll('#newItemBtn, #modalBtn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('modal').classList.add('active');
      });
    });

    document.querySelectorAll('#modalSave, #modalCancel').forEach(btn => {
      btn.addEventListener('click', () => {
        document.getElementById('modal').classList.remove('active');
      });
    });

    document.getElementById('modal').addEventListener('click', (e) => {
      if (e.target === document.getElementById('modal')) {
        document.getElementById('modal').classList.remove('active');
      }
    });

    // Toast handlers
    document.getElementById('toastBtn').addEventListener('click', () => {
      const toast = document.getElementById('toast');
      toast.classList.add('active');
      setTimeout(() => {
        toast.classList.remove('active');
      }, 3000);
    });

    document.getElementById('toastClose').addEventListener('click', () => {
      document.getElementById('toast').classList.remove('active');
    });

    // Search handler
    document.getElementById('searchInput').addEventListener('input', (e) => {
      console.log('Search:', e.target.value);
    });
  </script>
</body>
</html>`,

    extjs: `// ExtJS Complete Application with MVC architecture
Ext.application({
  name: 'Cin7App',

  // Application configuration (similar to AppProvider)
  appConfig: {
    theme: 'neptune',
    locale: 'en',
    i18n: {}
  },

  launch: function() {
    // Create main viewport with Frame structure
    Ext.create('Ext.container.Viewport', {
      layout: 'border',
      items: [{
        // Top Bar (similar to Polaris TopBar)
        region: 'north',
        xtype: 'toolbar',
        height: 60,
        style: {
          background: '#00848e'
        },
        items: [{
          xtype: 'button',
          text: '☰',
          handler: function() {
            console.log('Toggle navigation');
          }
        }, {
          xtype: 'textfield',
          emptyText: 'Search...',
          width: 400,
          margin: '0 0 0 16',
          listeners: {
            change: function(field, newValue) {
              console.log('Search:', newValue);
            }
          }
        }, '->', {
          xtype: 'component',
          html: '<div style="display: flex; align-items: center; gap: 8px; color: white;">' +
                '<div style="width: 32px; height: 32px; border-radius: 50%; background: white; color: #00848e; display: flex; align-items: center; justify-content: center; font-weight: bold;">JD</div>' +
                '<span>John Doe</span>' +
                '</div>'
        }]
      }, {
        // Main content area (Page + Layout)
        region: 'center',
        xtype: 'panel',
        title: 'Complete Application',
        layout: {
          type: 'hbox',
          align: 'stretch',
          padding: 24
        },
        dockedItems: [{
          xtype: 'toolbar',
          dock: 'top',
          items: [{
            xtype: 'button',
            text: 'Home',
            disabled: true
          }, {
            xtype: 'tbtext',
            text: '›'
          }, {
            xtype: 'tbtext',
            text: 'Complete Application'
          }, '->', {
            xtype: 'button',
            text: 'New Item',
            ui: 'action',
            handler: function() {
              Ext.create('Ext.window.Window', {
                title: 'Application Modal',
                width: 500,
                modal: true,
                bodyPadding: 16,
                html: '<p>This modal is part of a complete application powered by the provider pattern. All components share the same context, theme, and configuration.</p>',
                buttons: [{
                  text: 'Save',
                  handler: function() {
                    this.up('window').close();
                  }
                }, {
                  text: 'Cancel',
                  handler: function() {
                    this.up('window').close();
                  }
                }]
              }).show();
            }
          }]
        }],
        items: [{
          // Main section
          flex: 2,
          xtype: 'panel',
          title: 'Complete AppProvider Example',
          bodyPadding: 24,
          margin: '0 12 0 0',
          items: [{
            xtype: 'container',
            html: '<p>This is a complete application using a provider pattern with frame, navigation, page layout, and other components working together.</p>'
          }, {
            xtype: 'container',
            layout: 'hbox',
            margin: '16 0',
            defaults: {
              margin: '0 12 0 0'
            },
            items: [{
              xtype: 'button',
              text: 'Open Modal',
              handler: function() {
                Ext.create('Ext.window.Window', {
                  title: 'Application Modal',
                  width: 500,
                  modal: true,
                  bodyPadding: 16,
                  html: '<p>This modal is part of a complete application powered by the provider pattern.</p>',
                  buttons: ['Save', 'Cancel']
                }).show();
              }
            }, {
              xtype: 'button',
              text: 'Show Toast',
              handler: function() {
                Ext.toast({
                  html: 'Application notification from provider',
                  closable: true,
                  align: 'b',
                  slideInDuration: 400
                });
              }
            }]
          }, {
            xtype: 'container',
            padding: 12,
            margin: '16 0 0 0',
            style: {
              backgroundColor: '#f8f9fa',
              borderRadius: '4px'
            },
            html: '<p><strong>This demonstrates a full application structure with:</strong></p>' +
                  '<p>• Global context via provider pattern</p>' +
                  '<p>• Frame for app shell</p>' +
                  '<p>• TopBar with navigation and search</p>' +
                  '<p>• Page with breadcrumbs and actions</p>' +
                  '<p>• Layout for responsive content</p>'
          }]
        }, {
          // Secondary section
          flex: 1,
          xtype: 'panel',
          title: 'Theme Status',
          bodyPadding: 16,
          html: '<div>✅ Default theme active</div>' +
                '<div>✅ English translations loaded</div>' +
                '<div>✅ Global context available</div>' +
                '<div>✅ Frame and TopBar configured</div>'
        }]
      }]
    });
  }
});`,

    typescript: `import { AppProvider, Frame, TopBar, Page, Layout, Card, Button, Text, BlockStack, InlineStack, Modal, Toast } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

/**
 * User menu configuration
 */
interface UserConfig {
  name: string;
  initials: string;
  email?: string;
}

/**
 * Application state interface
 */
interface AppState {
  mobileNavigationActive: boolean;
  searchValue: string;
  modalActive: boolean;
  toastActive: boolean;
}

interface CompleteApplicationExampleProps {
  user?: UserConfig;
  initialSearchValue?: string;
}

/**
 * Complete application example demonstrating full AppProvider integration
 * with Frame, TopBar, Page, Layout, and other structural components.
 *
 * This represents a production-ready application structure with:
 * - Global context management via AppProvider
 * - Application shell via Frame
 * - Navigation via TopBar
 * - Content structure via Page and Layout
 * - Modal and Toast for user interactions
 */
function CompleteApplicationExample({
  user = { name: 'John Doe', initials: 'JD', email: 'john@example.com' },
  initialSearchValue = ''
}: CompleteApplicationExampleProps): JSX.Element {
  const [appState, setAppState] = useState<AppState>({
    mobileNavigationActive: false,
    searchValue: initialSearchValue,
    modalActive: false,
    toastActive: false,
  });

  const toggleMobileNavigation = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      mobileNavigationActive: !prev.mobileNavigationActive
    }));
  }, []);

  const toggleModal = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      modalActive: !prev.modalActive
    }));
  }, []);

  const toggleToast = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      toastActive: !prev.toastActive
    }));
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setAppState(prev => ({
      ...prev,
      searchValue: value
    }));
  }, []);

  const topBar = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigation}
      searchField={{
        placeholder: 'Search...',
        value: appState.searchValue,
        onChange: handleSearchChange,
      }}
      userMenu={{
        name: user.name,
        initials: user.initials,
        actions: [
          {
            items: [
              { content: 'Settings' },
              { content: 'Logout' },
            ],
          },
        ],
      }}
    />
  );

  return (
    <AppProvider i18n={{}}>
      <Frame topBar={topBar}>
        <div style={{ height: '100vh' }}>
          <Page
            title="Complete Application"
            breadcrumbs={[{ content: 'Home', url: '#' }]}
            primaryAction={{
              content: 'New Item',
              onAction: toggleModal,
            }}
          >
            <Layout>
              <Layout.Section>
                <Card>
                  <div style={{ padding: '24px' }}>
                    <BlockStack gap="16px">
                      <Text variant="headingMd" as="h2">
                        Complete AppProvider Example
                      </Text>
                      <Text>
                        This is a complete application using AppProvider with Frame, TopBar,
                        Page, Layout, and other Polaris components working together.
                      </Text>
                      <InlineStack gap="12px">
                        <Button onClick={toggleModal}>Open Modal</Button>
                        <Button onClick={toggleToast}>Show Toast</Button>
                      </InlineStack>
                      <div style={{
                        padding: '12px',
                        backgroundColor: '#f8f9fa',
                        borderRadius: '4px'
                      }}>
                        <BlockStack gap="4px">
                          <Text variant="bodySm">
                            <strong>This demonstrates a full application structure with:</strong>
                          </Text>
                          <Text variant="bodySm">• Global context via AppProvider</Text>
                          <Text variant="bodySm">• Frame for app shell</Text>
                          <Text variant="bodySm">• TopBar with navigation and search</Text>
                          <Text variant="bodySm">• Page with breadcrumbs and actions</Text>
                          <Text variant="bodySm">• Layout for responsive content</Text>
                        </BlockStack>
                      </div>
                    </BlockStack>
                  </div>
                </Card>
              </Layout.Section>

              <Layout.Section secondary>
                <Card title="Theme Status">
                  <div style={{ padding: '16px' }}>
                    <BlockStack gap="8px">
                      <Text>✅ Default theme active</Text>
                      <Text>✅ English translations loaded</Text>
                      <Text>✅ Global context available</Text>
                      <Text>✅ Frame and TopBar configured</Text>
                      {user.email && (
                        <Text>✅ User: {user.email}</Text>
                      )}
                    </BlockStack>
                  </div>
                </Card>
              </Layout.Section>
            </Layout>
          </Page>
        </div>

        <Modal
          open={appState.modalActive}
          onClose={toggleModal}
          title="Application Modal"
          primaryAction={{
            content: 'Save',
            onAction: toggleModal,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: toggleModal,
            },
          ]}
        >
          <Modal.Section>
            <Text>
              This modal is part of a complete application powered by AppProvider.
              All components share the same context, theme, and i18n configuration.
            </Text>
          </Modal.Section>
        </Modal>

        {appState.toastActive && (
          <Toast
            content="Application notification from AppProvider"
            onDismiss={toggleToast}
          />
        )}
      </Frame>
    </AppProvider>
  );
}

export default CompleteApplicationExample;`,
  },

  'error-boundary': {
    react: `import { AppProvider, Card, Button, Text, BlockStack } from '@shopify/polaris';
import React, { useState, Component, ErrorInfo } from 'react';

// Error Boundary Component
class ErrorBoundary extends Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2" color="critical">
                Error Occurred
              </Text>
              <Text>
                {this.state.error?.message || 'An unexpected error occurred'}
              </Text>
              <Button onClick={() => this.setState({ hasError: false, error: null })}>
                Try Again
              </Button>
            </BlockStack>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Component that can throw an error
function ProblematicComponent({ shouldError }: { shouldError: boolean }) {
  if (shouldError) {
    throw new Error('Test error for boundary demonstration');
  }

  return <Text>Component is working correctly</Text>;
}

function ErrorBoundaryExample() {
  const [shouldError, setShouldError] = useState(false);

  return (
    <AppProvider i18n={{}}>
      <div style={{ padding: '24px', width: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Error Boundary Testing</Text>
              <Text>
                AppProvider works with error boundaries to handle component errors gracefully.
                Error boundaries catch errors in the component tree and display fallback UI.
              </Text>

              <ErrorBoundary>
                <div style={{ padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '4px' }}>
                  <BlockStack gap="8px">
                    <Text variant="bodySm" fontWeight="bold">
                      Protected Component Area:
                    </Text>
                    <ProblematicComponent shouldError={shouldError} />
                  </BlockStack>
                </div>
              </ErrorBoundary>

              <Button
                destructive
                onClick={() => setShouldError(true)}
              >
                Trigger Error
              </Button>

              <Text variant="bodySm" color="subdued">
                Note: Clicking "Trigger Error" will throw an error that will be caught
                by the error boundary. In a real application, the error boundary prevents
                the entire app from crashing and provides a way to recover.
              </Text>
            </BlockStack>
          </div>
        </Card>
      </div>
    </AppProvider>
  );
}

export default ErrorBoundaryExample;`,

    vanilla: `<!-- HTML Structure -->
<div id="app">
  <div class="card" style="padding: 24px; max-width: 600px;">
    <h2>Error Boundary Testing</h2>
    <p>
      Application context works with error handling to manage component errors gracefully.
      Error handlers catch errors and display fallback UI.
    </p>

    <div id="protectedArea" style="padding: 12px; background-color: #f8f9fa; border-radius: 4px; margin: 16px 0;">
      <p style="font-weight: bold; font-size: 14px; margin-bottom: 8px;">Protected Component Area:</p>
      <div id="componentContent">
        <p>Component is working correctly</p>
      </div>
    </div>

    <button class="polaris-button polaris-button--destructive" id="errorBtn">
      Trigger Error
    </button>

    <p style="color: #6d7175; font-size: 14px; margin-top: 16px;">
      Note: Clicking "Trigger Error" will throw an error that will be caught
      by the error handler. In a real application, error handling prevents
      the entire app from crashing and provides a way to recover.
    </p>
  </div>
</div>

<script>
// Error boundary pattern in vanilla JavaScript
class ErrorHandler {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.originalContent = this.container.innerHTML;
  }

  // Wrap component execution in try-catch
  tryRender(renderFunction) {
    try {
      renderFunction();
    } catch (error) {
      this.handleError(error);
    }
  }

  // Display error UI
  handleError(error) {
    console.error('Error caught by handler:', error);
    this.container.innerHTML = \`
      <div class="error-state" style="padding: 16px; background: #fee; border: 1px solid #fcc; border-radius: 4px;">
        <h3 style="color: #c00; margin: 0 0 8px 0;">Error Occurred</h3>
        <p style="margin: 0 0 12px 0;">\${error.message}</p>
        <button class="polaris-button" id="retryBtn">Try Again</button>
      </div>
    \`;

    // Add retry handler
    document.getElementById('retryBtn').addEventListener('click', () => {
      this.container.innerHTML = this.originalContent;
    });
  }

  // Simulate error
  throwError() {
    throw new Error('Test error for boundary demonstration');
  }
}

// Initialize error handler
const errorHandler = new ErrorHandler('componentContent');

// Trigger error button
document.getElementById('errorBtn').addEventListener('click', () => {
  errorHandler.tryRender(() => {
    errorHandler.throwError();
  });
});

// Global error handler for uncaught errors
window.addEventListener('error', (event) => {
  console.error('Global error handler:', event.error);
  // In production, you might send this to an error tracking service
});

// Promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
</script>

<style>
.polaris-button {
  background: #008296;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.polaris-button:hover {
  background: #006a7a;
}
.polaris-button--destructive {
  background: #d72c0d;
}
.polaris-button--destructive:hover {
  background: #bf2609;
}
</style>`,

    extjs: `// ExtJS Application with error handling
Ext.define('Cin7.ErrorBoundary', {
  extend: 'Ext.container.Container',
  xtype: 'errorboundary',

  config: {
    hasError: false,
    errorMessage: ''
  },

  layout: 'fit',

  initComponent: function() {
    this.callParent();
    this.setupErrorHandling();
  },

  setupErrorHandling: function() {
    // Catch errors in child components
    this.on('afterrender', function() {
      this.el.on('error', this.handleError, this, { delegate: '*' });
    });
  },

  handleError: function(error) {
    console.error('Error caught by boundary:', error);
    this.setHasError(true);
    this.setErrorMessage(error.message || 'An unexpected error occurred');
    this.renderErrorState();
  },

  renderErrorState: function() {
    this.removeAll();
    this.add({
      xtype: 'container',
      padding: 24,
      style: {
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        borderRadius: '4px'
      },
      items: [{
        xtype: 'component',
        html: '<h3 style="color: #c00; margin: 0 0 8px 0;">Error Occurred</h3>'
      }, {
        xtype: 'component',
        html: '<p style="margin: 0 0 12px 0;">' + this.getErrorMessage() + '</p>'
      }, {
        xtype: 'button',
        text: 'Try Again',
        handler: this.reset,
        scope: this
      }]
    });
  },

  reset: function() {
    this.setHasError(false);
    this.setErrorMessage('');
    this.removeAll();
    this.fireEvent('reset');
  }
});

// Example usage
Ext.application({
  name: 'Cin7App',

  launch: function() {
    // Global error handler
    Ext.Error.handle = function(err) {
      console.error('Global error handler:', err);
      Ext.Msg.alert('Error', err.msg || 'An error occurred');
      return true; // Prevent default error handling
    };

    const errorBoundary = Ext.create('Cin7.ErrorBoundary', {
      renderTo: Ext.getBody(),
      width: 600
    });

    const mainPanel = Ext.create('Ext.panel.Panel', {
      title: 'Error Boundary Testing',
      bodyPadding: 24,
      items: [{
        xtype: 'container',
        html: '<p>Application context works with error handling to manage component errors gracefully. Error handlers catch errors and display fallback UI.</p>'
      }, {
        xtype: 'container',
        itemId: 'protectedArea',
        padding: 12,
        margin: '16 0',
        style: {
          backgroundColor: '#f8f9fa',
          borderRadius: '4px'
        },
        html: '<p><strong>Protected Component Area:</strong></p><p>Component is working correctly</p>'
      }, {
        xtype: 'button',
        text: 'Trigger Error',
        ui: 'destructive',
        handler: function() {
          try {
            throw new Error('Test error for boundary demonstration');
          } catch (error) {
            errorBoundary.handleError(error);
          }
        }
      }, {
        xtype: 'container',
        margin: '16 0 0 0',
        html: '<p style="color: #6d7175; font-size: 14px;">Note: Clicking "Trigger Error" will throw an error that will be caught by the error handler. In a real application, error handling prevents the entire app from crashing and provides a way to recover.</p>'
      }]
    });

    errorBoundary.add(mainPanel);

    // Reset handler
    errorBoundary.on('reset', function() {
      errorBoundary.add(mainPanel);
    });
  }
});`,

    typescript: `import { AppProvider, Card, Button, Text, BlockStack } from '@shopify/polaris';
import React, { useState, Component, ErrorInfo, ReactNode } from 'react';

/**
 * Error boundary props and state types
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  fallback?: (error: Error, reset: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary component that catches and handles React errors
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // In production, send to error tracking service
    // logErrorToService(error, errorInfo);
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }

      // Default error UI
      return (
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2" tone="critical">
                Error Occurred
              </Text>
              <Text>
                {this.state.error.message || 'An unexpected error occurred'}
              </Text>
              <Button onClick={this.reset}>
                Try Again
              </Button>
            </BlockStack>
          </div>
        </Card>
      );
    }

    return this.props.children;
  }
}

/**
 * Component that can throw an error for testing
 */
interface ProblematicComponentProps {
  shouldError: boolean;
}

function ProblematicComponent({ shouldError }: ProblematicComponentProps): JSX.Element {
  if (shouldError) {
    throw new Error('Test error for boundary demonstration');
  }

  return <Text>Component is working correctly</Text>;
}

/**
 * Error logging function (would integrate with service like Sentry)
 */
function logError(error: Error, errorInfo: ErrorInfo): void {
  console.error('Logging error to service:', {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
    timestamp: new Date().toISOString()
  });
}

interface ErrorBoundaryExampleProps {
  enableLogging?: boolean;
}

/**
 * Example demonstrating error boundary integration with AppProvider
 */
function ErrorBoundaryExample({ enableLogging = true }: ErrorBoundaryExampleProps): JSX.Element {
  const [shouldError, setShouldError] = useState<boolean>(false);

  const handleError = (error: Error, errorInfo: ErrorInfo): void => {
    if (enableLogging) {
      logError(error, errorInfo);
    }
  };

  return (
    <AppProvider i18n={{}}>
      <div style={{ padding: '24px', width: '600px' }}>
        <Card>
          <div style={{ padding: '24px' }}>
            <BlockStack gap="16px">
              <Text variant="headingMd" as="h2">Error Boundary Testing</Text>
              <Text>
                AppProvider works with error boundaries to handle component errors gracefully.
                Error boundaries catch errors in the component tree and display fallback UI.
              </Text>

              <ErrorBoundary onError={handleError}>
                <div style={{
                  padding: '12px',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px'
                }}>
                  <BlockStack gap="8px">
                    <Text variant="bodySm" fontWeight="bold">
                      Protected Component Area:
                    </Text>
                    <ProblematicComponent shouldError={shouldError} />
                  </BlockStack>
                </div>
              </ErrorBoundary>

              <Button
                destructive
                onClick={() => setShouldError(true)}
                disabled={shouldError}
              >
                Trigger Error
              </Button>

              <Text variant="bodySm" tone="subdued">
                Note: Clicking "Trigger Error" will throw an error that will be caught
                by the error boundary. In a real application, the error boundary prevents
                the entire app from crashing and provides a way to recover.
                {enableLogging && ' Errors are logged to the console.'}
              </Text>
            </BlockStack>
          </div>
        </Card>
      </div>
    </AppProvider>
  );
}

export default ErrorBoundaryExample;`,
  }
};

// IndexFilters Component Examples

export const indexFiltersExamples: Record<string, CodeVariant> = {
  default: {
    react: `import {
  IndexFilters,
  Card,
  Filters,
  ChoiceList,
  useSetIndexFiltersMode
} from '@shopify/polaris';
import { useState } from 'react';

function IndexFiltersExample() {
  const [queryValue, setQueryValue] = useState('');
  const [selected, setSelected] = useState([]);
  const [sortSelected, setSortSelected] = useState(['created_desc']);
  const { mode, setMode } = useSetIndexFiltersMode();

  const filters = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <ChoiceList
          title="Status"
          titleHidden
          choices={[
            { label: 'Active', value: 'active' },
            { label: 'Draft', value: 'draft' },
          ]}
          selected={[]}
          onChange={() => {}}
          allowMultiple
        />
      ),
    },
  ];

  const sortOptions = [
    { label: 'Created', value: 'created_asc', directionLabel: 'Oldest first' },
    { label: 'Created', value: 'created_desc', directionLabel: 'Newest first' },
  ];

  return (
    <Card padding="0">
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        onSortChange={setSortSelected}
        queryValue={queryValue}
        onQueryChange={setQueryValue}
        onQueryClear={() => setQueryValue('')}
        selected={selected}
        onSelectionChange={setSelected}
        tabs={[
          { content: 'All', id: 'all', panelID: 'all-content' },
          { content: 'Active', id: 'active', panelID: 'active-content' },
        ]}
        mode={mode}
        setMode={setMode}
        filters={
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={[]}
          />
        }
      />
    </Card>
  );
}`,

    extjs: `// ExtJS Grid with comprehensive filtering and sorting
Ext.create('Ext.grid.Panel', {
  title: 'Products',
  width: 800,
  height: 500,
  selModel: {
    mode: 'MULTI',
    checkboxSelect: true
  },
  tbar: [{
    xtype: 'textfield',
    emptyText: 'Search...',
    width: 300,
    listeners: {
      change: function(field, value) {
        const store = this.up('grid').getStore();
        store.clearFilter();
        if (value) {
          store.filter([{
            property: 'name',
            value: value,
            anyMatch: true,
            caseSensitive: false
          }]);
        }
      }
    }
  }, '->', {
    xtype: 'combo',
    fieldLabel: 'Sort by',
    store: [
      ['created_asc', 'Created (Oldest first)'],
      ['created_desc', 'Created (Newest first)'],
      ['name_asc', 'Name (A-Z)'],
      ['name_desc', 'Name (Z-A)']
    ],
    value: 'created_desc',
    listeners: {
      select: function(combo, record) {
        const store = this.up('grid').getStore();
        const [field, direction] = record.get('field1').split('_');
        store.sort(field, direction.toUpperCase());
      }
    }
  }],
  columns: [
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Status', dataIndex: 'status', width: 100 },
    { text: 'Created', dataIndex: 'created', width: 150 }
  ],
  renderTo: Ext.getBody()
});`,

    vanilla: `<!-- HTML Structure -->
<div class="index-filters">
  <div class="filters-toolbar">
    <input
      type="text"
      id="search-query"
      placeholder="Search..."
      class="search-input"
    />

    <div class="filter-controls">
      <button id="filter-btn" class="filter-button">
        Filters
      </button>

      <select id="sort-select" class="sort-select">
        <option value="created_desc">Newest first</option>
        <option value="created_asc">Oldest first</option>
        <option value="name_asc">Name (A-Z)</option>
        <option value="name_desc">Name (Z-A)</option>
      </select>
    </div>
  </div>

  <div class="tabs">
    <button class="tab active" data-tab="all">All</button>
    <button class="tab" data-tab="active">Active</button>
    <button class="tab" data-tab="draft">Draft</button>
  </div>

  <div id="results-container" class="results"></div>
</div>

<script>
import { on, $, $$ } from '@cin7/vanilla-js';

const searchInput = $('#search-query');
const sortSelect = $('#sort-select');
const tabs = $$('.tab');

on(searchInput, 'input', (e) => {
  filterResults({ query: e.target.value });
});

on(sortSelect, 'change', (e) => {
  sortResults(e.target.value);
});

tabs.forEach(tab => {
  on(tab, 'click', (e) => {
    tabs.forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    filterResults({ tab: e.target.dataset.tab });
  });
});
</script>`,

    typescript: `import {
  IndexFilters,
  Card,
  Filters,
  ChoiceList,
  useSetIndexFiltersMode,
  IndexFiltersProps
} from '@shopify/polaris';
import { useState, useCallback } from 'react';

interface Filter {
  key: string;
  label: string;
  filter: JSX.Element;
}

interface IndexFiltersExampleProps {
  onFilterChange?: (filters: any) => void;
  onSortChange?: (sort: string[]) => void;
}

function IndexFiltersExample({
  onFilterChange,
  onSortChange
}: IndexFiltersExampleProps): JSX.Element {
  const [queryValue, setQueryValue] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);
  const [sortSelected, setSortSelected] = useState<string[]>(['created_desc']);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { mode, setMode } = useSetIndexFiltersMode();

  const handleSortChange = useCallback((sort: string[]) => {
    setSortSelected(sort);
    onSortChange?.(sort);
  }, [onSortChange]);

  const filters: Filter[] = [
    {
      key: 'status',
      label: 'Status',
      filter: (
        <ChoiceList
          title="Status"
          titleHidden
          choices={[
            { label: 'Active', value: 'active' },
            { label: 'Draft', value: 'draft' },
          ]}
          selected={[]}
          onChange={() => {}}
          allowMultiple
        />
      ),
    },
  ];

  const sortOptions = [
    { label: 'Created', value: 'created_asc', directionLabel: 'Oldest first' },
    { label: 'Created', value: 'created_desc', directionLabel: 'Newest first' },
  ];

  return (
    <Card padding="0">
      <IndexFilters
        sortOptions={sortOptions}
        sortSelected={sortSelected}
        onSortChange={handleSortChange}
        queryValue={queryValue}
        onQueryChange={setQueryValue}
        onQueryClear={() => setQueryValue('')}
        selected={selected}
        onSelectionChange={setSelected}
        tabs={[
          { content: 'All', id: 'all', panelID: 'all-content' },
          { content: 'Active', id: 'active', panelID: 'active-content' },
        ]}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
        mode={mode}
        setMode={setMode}
        filters={
          <Filters
            queryValue={queryValue}
            filters={filters}
            appliedFilters={[]}
          />
        }
      />
    </Card>
  );
}`
  }
};

// CheckboxGroup Component Examples

export const footerHelpExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { FooterHelp } from '@shopify/polaris';
import React from 'react';

function FooterHelpExample() {
  return (
    <FooterHelp>
      Need help? Our support team is available 24/7 to assist you with any questions.
    </FooterHelp>
  );
}

export default FooterHelpExample;`,
    vanilla: `<!-- HTML Structure -->
<div class="polaris-footer-help">
  <div class="polaris-footer-help__content">
    Need help? Our support team is available 24/7 to assist you with any questions.
  </div>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { createFooterHelp } from '@cin7/vanilla-js';

const footerHelp = createFooterHelp({
  content: 'Need help? Our support team is available 24/7 to assist you with any questions.'
});

document.getElementById('app').appendChild(footerHelp);
</script>`,
    extjs: `// ExtJS Footer Help using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  cls: 'polaris-footer-help',
  html: 'Need help? Our support team is available 24/7 to assist you with any questions.',
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisFooterHelp } from '@cin7/extjs-adapters';

const footerHelp = Ext.create('PolarisFooterHelp', {
  content: 'Need help? Our support team is available 24/7 to assist you with any questions.',
  learnMore: {
    url: 'https://help.shopify.com',
    content: 'View guide'
  }
});`,
    typescript: `import { FooterHelp } from '@shopify/polaris';
import React from 'react';

interface FooterHelpExampleProps {
  children: React.ReactNode;
  learnMore?: {
    url: string;
    content: string;
    onAction?: () => void;
  };
}

function FooterHelpExample({
  children,
  learnMore
}: FooterHelpExampleProps): JSX.Element {
  return (
    <FooterHelp learnMore={learnMore}>
      {children}
    </FooterHelp>
  );
}

export default FooterHelpExample;`,
  }
};

// KeypressListener Component Examples

export const keypressListenerExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { KeypressListener } from '@shopify/polaris';
import React, { useState } from 'react';

function KeypressListenerExample() {
  const [message, setMessage] = useState('');

  const handleEnter = (event: KeyboardEvent) => {
    setMessage('Enter key pressed!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div>
      <p>Press the Enter key to trigger the listener.</p>
      {message && <p>{message}</p>}
      <KeypressListener keyCode="Enter" handler={handleEnter} />
    </div>
  );
}

export default KeypressListenerExample;`,
    vanilla: `<!-- HTML Structure -->
<div id="keypress-demo">
  <p>Press the Enter key to trigger the listener.</p>
  <p id="message"></p>
</div>

<script>
// JavaScript behavior using @cin7/vanilla-js
import { on } from '@cin7/vanilla-js';

const messageEl = document.getElementById('message');

on(document, 'keydown', (event) => {
  if (event.key === 'Enter') {
    messageEl.textContent = 'Enter key pressed!';
    setTimeout(() => {
      messageEl.textContent = '';
    }, 3000);
  }
});
</script>`,
    extjs: `// ExtJS KeyPress Handler using @cin7/extjs-adapters
Ext.create('Ext.container.Container', {
  html: '<p>Press the Enter key to trigger the listener.</p>',
  listeners: {
    afterrender: function(cmp) {
      Ext.getDoc().on('keydown', function(event) {
        if (event.getKey() === Ext.event.Event.ENTER) {
          Ext.Msg.alert('Keypress', 'Enter key pressed!');
        }
      });
    }
  },
  renderTo: Ext.getBody()
});

// Or using Polaris adapter
import { PolarisKeypressListener } from '@cin7/extjs-adapters';

const listener = Ext.create('PolarisKeypressListener', {
  keyCode: 'Enter',
  handler: function(event) {
    console.log('Enter key pressed!');
  }
});`,
    typescript: `import { KeypressListener } from '@shopify/polaris';
import React, { useState, useCallback } from 'react';

interface KeypressListenerExampleProps {
  keyCode: string;
  onKeyPress?: (event: KeyboardEvent) => void;
  preventDefault?: boolean;
}

function KeypressListenerExample({
  keyCode,
  onKeyPress,
  preventDefault = false
}: KeypressListenerExampleProps): JSX.Element {
  const [message, setMessage] = useState<string>('');

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    setMessage(\`\${keyCode} key pressed!\`);
    setTimeout(() => setMessage(''), 3000);
    onKeyPress?.(event);
  }, [keyCode, onKeyPress]);

  return (
    <>
      <p>Press the {keyCode} key to trigger the listener.</p>
      {message && <p>{message}</p>}
      <KeypressListener
        keyCode={keyCode}
        handler={handleKeyPress}
        preventDefault={preventDefault}
      />
    </>
  );
}

export default KeypressListenerExample;`,
  }
};

// Frame Component Examples

export const coreUtilitiesExamples: Record<string, CodeVariant> = {
  default: {
    react: `import { useCallback } from 'react';
function CoreUtilities() {
  const handleClick = useCallback(() => console.log('clicked'), []);
  return <button onClick={handleClick}>Click me</button>;
}`,
    extjs: `Ext.get('button').on('click', function() { console.log('clicked'); });`,
    vanilla: `document.querySelector('button').addEventListener('click', () => console.log('clicked'));`,
    typescript: `const button = document.querySelector<HTMLButtonElement>('button');
button?.addEventListener('click', () => console.log('clicked'));`
  }
};

// EcommerceComponents Component Examples
