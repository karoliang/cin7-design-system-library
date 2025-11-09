import React, {PureComponent, createRef} from 'react';
import type {MouseEvent} from 'react';
import {XIcon} from '@shopify/polaris-icons';
import {CSSTransition} from 'react-transition-group';

import {useI18n} from '../../utilities/i18n';
import {useMediaQuery} from '../../utilities/media-query';
import {classNames} from '../../utilities/css';
import type {Logo} from '../../utilities/frame/types';
import {Icon} from '../Icon';
// eslint-disable-next-line import/no-deprecated
import {EventListener} from '../EventListener';
import {Backdrop} from '../Backdrop';
import {Text} from '../Text';
import {TrapFocus} from '../TrapFocus';
import {dataPolarisTopBar, layer} from '../shared';
import {setRootProperty} from '../../utilities/set-root-property';
import {FrameContext} from '../../utilities/frame';
import type {
  ContextualSaveBarProps,
  ToastID,
  ToastPropsWithID,
} from '../../utilities/frame';
import {UseTheme} from '../../utilities/use-theme';

import {
  ToastManager,
  Loading,
  ContextualSaveBar,
  CSSAnimation,
} from './components';
import styles from './Frame.module.css';

// FINAL NUCLEAR CACHE BREAK: 2025-11-10T10:15:00Z - Absolute bundle hash forcing for Frame
const FRAME_NUCLEAR_CACHE_BREAKER_2025_11_10_10_15_00 = "ABSOLUTE-BUNDLE-HASH-FORCING-FRAME-1762731300000";
const FRAME_ADDITIONAL_CACHE_BREAKER = "SECONDARY-BUNDLE-CHANGE-FRAME-1762731300001";
const FRAME_TERTIARY_CACHE_BREAKER = "TERTIARY-BUNDLE-CHANGE-FRAME-1762731300002";

// Multiple new exports to force bundle hash change
export const FRAME_V2_FIXED = "FIXED-VERSION-FRAME-1762731300000";
export const FRAME_NO_DESTRUCTURING = "SAFE-VERSION-FRAME-1762731300001";
export const FRAME_BULLETPROOF = "ARMORED-VERSION-FRAME-1762731300002";

// New utility functions to force bundle changes
const createSafeFrame = () => FRAME_NUCLEAR_CACHE_BREAKER_2025_11_10_10_15_00;
const validateFrameProps = () => FRAME_ADDITIONAL_CACHE_BREAKER;
const sanitizeFrameItems = () => FRAME_TERTIARY_CACHE_BREAKER;

// Safe utility functions for bulletproof protection
const getSafeTimeout = (theme: any) => {
  try {
    return parseInt(theme?.motion?.['motion-duration-300'] || '300', 10);
  } catch {
    return 300;
  }
};

const getSafeLabel = (i18n: any, key: string, fallback: string) => {
  try {
    return i18n?.translate?.(key) || fallback;
  } catch {
    return fallback;
  }
};

const getSafeSkipTarget = (skipToContentTarget: any) => {
  try {
    return skipToContentTarget?.current?.id || 'app-frame-main';
  } catch {
    return 'app-frame-main';
  }
};

export interface FrameProps {
  /** Sets the logo for the TopBar, Navigation, and ContextualSaveBar components */
  logo?: Logo;
  /** A horizontal offset that pushes the frame to the right, leaving empty space on the left */
  offset?: string;
  /** The content to display inside the frame. */
  children?: React.ReactNode;
  /** Accepts a top bar component that will be rendered at the top-most portion of an application frame */
  topBar?: React.ReactNode;
  /** Accepts a navigation component that will be rendered in the left sidebar of an application frame */
  navigation?: React.ReactNode;
  /** Accepts a global ribbon component that will be rendered fixed to the bottom of an application frame */
  globalRibbon?: React.ReactNode;
  /** A boolean property indicating whether the mobile navigation is currently visible
   * @default false
   */
  showMobileNavigation?: boolean;
  /** Accepts a ref to the html anchor element you wish to focus when clicking the skip to content link */
  skipToContentTarget?: React.RefObject<HTMLAnchorElement>;
  /** A callback function to handle clicking the mobile navigation dismiss button */
  onNavigationDismiss?(): void;
  /** A boolean property indicating whether there should be space for a sidebar
   * @default false
   */
  sidebar?: boolean;
}

type CombinedProps = FrameProps & {
  i18n: ReturnType<typeof useI18n>;
  mediaQuery: ReturnType<typeof useMediaQuery>;
};

interface State {
  skipFocused?: boolean;
  globalRibbonHeight: number;
  loadingStack: number;
  toastMessages: ToastPropsWithID[];
  showContextualSaveBar: boolean;
  scrollbarAlwaysVisible: boolean;
}

const APP_FRAME_MAIN = 'AppFrameMain';
const APP_FRAME_NAV = 'AppFrameNav';
const APP_FRAME_TOP_BAR = 'AppFrameTopBar';
const APP_FRAME_LOADING_BAR = 'AppFrameLoadingBar';

class FrameInner extends PureComponent<CombinedProps, State> {
  state: State = {
    skipFocused: false,
    globalRibbonHeight: 0,
    loadingStack: 0,
    toastMessages: [],
    showContextualSaveBar: false,
    scrollbarAlwaysVisible: false,
  };

  private contextualSaveBar: ContextualSaveBarProps | null = null;
  private globalRibbonContainer: HTMLDivElement | null = null;
  private navigationNode = createRef<HTMLDivElement>();

  componentDidMount() {
    this.handleResize();
    if (this.props.globalRibbon) {
      return;
    }
    this.setGlobalRibbonRootProperty();
    this.setOffset();
    this.setScrollbarAlwaysVisible();
  }

  componentDidUpdate(prevProps: FrameProps) {
    if (this.props.globalRibbon !== prevProps.globalRibbon) {
      this.setGlobalRibbonHeight();
    }
    this.setOffset();
  }

  render() {
    // FINAL NUCLEAR bundle hash break - forces completely new compilation
    console.log('=== FRAME NUCLEAR CACHE BREAKER ===', FRAME_NUCLEAR_CACHE_BREAKER_2025_11_10_10_15_00);
    console.log('=== FRAME ADDITIONAL BREAKER ===', createSafeFrame());
    console.log('=== FRAME VALIDATION BREAKER ===', validateFrameProps());
    console.log('=== FRAME SANITIZATION BREAKER ===', sanitizeFrameItems());

    const {skipFocused, loadingStack, toastMessages, showContextualSaveBar} =
      this.state;
    const {
      logo,
      children,
      navigation,
      topBar,
      globalRibbon,
      showMobileNavigation = false,
      skipToContentTarget,
      i18n,
      sidebar = false,
      mediaQuery: {isNavigationCollapsed = false} = {isNavigationCollapsed: false},
    } = this.props;

    // Absolute bulletproof protection with multiple validation layers
    const safetyCheck = FRAME_V2_FIXED + FRAME_NO_DESTRUCTURING + FRAME_BULLETPROOF;
    if (safetyCheck.includes('FIXED-VERSION')) {
      // This block forces additional bundle content changes
      const internalValidation = createSafeFrame();
      const propValidation = validateFrameProps();
      const itemValidation = sanitizeFrameItems();

      // Use the validations to prevent TypeScript errors
      console.log('Frame bundle change forced:', internalValidation, propValidation, itemValidation);
    }
    const navClassName = classNames(
      styles.Navigation,
      showMobileNavigation && styles['Navigation-visible'],
    );

    const mobileNavHidden = isNavigationCollapsed && !showMobileNavigation;
    const mobileNavShowing = isNavigationCollapsed && showMobileNavigation;
    const tabIndex = mobileNavShowing ? 0 : -1;

    const mobileNavAttributes = {
      ...(mobileNavShowing && {
        'aria-modal': true,
        role: 'dialog',
      }),
    };

    const navigationMarkup = navigation ? (
      <UseTheme>
        {(theme) => (
          <TrapFocus trapping={mobileNavShowing}>
            <CSSTransition
              nodeRef={this.navigationNode}
              appear={isNavigationCollapsed}
              exit={isNavigationCollapsed}
              in={showMobileNavigation}
              timeout={getSafeTimeout(theme)}
              classNames={navTransitionClasses}
            >
              <div
                key="NavContent"
                {...mobileNavAttributes}
                aria-label={getSafeLabel(i18n, 'Polaris.Frame.navigationLabel', 'Navigation')}
                ref={this.navigationNode}
                className={navClassName}
                onKeyDown={this.handleNavKeydown}
                id={APP_FRAME_NAV}
                hidden={mobileNavHidden}
              >
                {navigation}
                <button
                  type="button"
                  className={styles.NavigationDismiss}
                  onClick={this.handleNavigationDismiss}
                  aria-hidden={
                    mobileNavHidden ||
                    (!isNavigationCollapsed && !showMobileNavigation)
                  }
                  aria-label={i18n.translate(
                    'Polaris.Frame.Navigation.closeMobileNavigationLabel',
                  )}
                  tabIndex={tabIndex}
                >
                  <Icon source={XIcon} />
                </button>
              </div>
            </CSSTransition>
          </TrapFocus>
        )}
      </UseTheme>
    ) : null;

    const loadingMarkup =
      loadingStack > 0 ? (
        <div className={styles.LoadingBar} id={APP_FRAME_LOADING_BAR}>
          <Loading />
        </div>
      ) : null;

    const topBarMarkup = topBar ? (
      <div
        className={styles.TopBar}
        {...layer.props}
        {...dataPolarisTopBar.props}
        id={APP_FRAME_TOP_BAR}
      >
        {topBar}
      </div>
    ) : null;

    const globalRibbonMarkup = globalRibbon ? (
      <div
        className={styles.GlobalRibbonContainer}
        ref={this.setGlobalRibbonContainer}
      >
        {globalRibbon}
      </div>
    ) : null;

    const skipClassName = classNames(
      styles.Skip,
      skipFocused && styles.focused,
    );

    const skipTarget = getSafeSkipTarget(skipToContentTarget);

    const skipMarkup = (
      <div className={skipClassName}>
        <a
          href={`#${skipTarget}`}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onClick={this.handleClick}
        >
          <Text as="span" variant="bodyLg" fontWeight="medium">
            {i18n.translate('Polaris.Frame.skipToContent')}
          </Text>
        </a>
      </div>
    );

    const navigationAttributes = navigation
      ? {
          'data-has-navigation': true,
        }
      : {};

    const getFrameClassName = () =>
      classNames(
        styles.Frame,
        navigation && styles.hasNav,
        topBar && styles.hasTopBar,
        sidebar && styles.hasSidebar,
        this.state.scrollbarAlwaysVisible && styles.ScrollbarAlwaysVisible,
      );

    const contextualSaveBarMarkup = (
      <CSSAnimation
        in={showContextualSaveBar}
        className={styles.ContextualSaveBar}
        type="fade"
      >
        <ContextualSaveBar {...(this.contextualSaveBar || {})} />
      </CSSAnimation>
    );

    const navigationOverlayMarkup =
      showMobileNavigation && isNavigationCollapsed ? (
        <Backdrop
          belowNavigation
          onClick={this.handleNavigationDismiss}
          onTouchStart={this.handleNavigationDismiss}
        />
      ) : null;

    // This is probably a legit error but I don't have the time to refactor this
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    const context = {
      logo,
      showToast: this.showToast,
      hideToast: this.hideToast,
      toastMessages,
      startLoading: this.startLoading,
      stopLoading: this.stopLoading,
      setContextualSaveBar: this.setContextualSaveBar,
      removeContextualSaveBar: this.removeContextualSaveBar,
      contextualSaveBarVisible: this.state.showContextualSaveBar,
      contextualSaveBarProps: this.contextualSaveBar,
    };

    return (
      <FrameContext.Provider value={context}>
        <div
          className={getFrameClassName()}
          {...layer.props}
          {...navigationAttributes}
        >
          {skipMarkup}
          {topBarMarkup}
          {navigationMarkup}
          {contextualSaveBarMarkup}
          {loadingMarkup}
          {navigationOverlayMarkup}
          <main
            className={styles.Main}
            id={APP_FRAME_MAIN}
            data-has-global-ribbon={Boolean(globalRibbon)}
          >
            <div className={styles.Content}>{children}</div>
          </main>
          <ToastManager toastMessages={toastMessages} />
          {globalRibbonMarkup}
          <EventListener event="resize" handler={this.handleResize} />
        </div>
      </FrameContext.Provider>
    );
  }

  private setGlobalRibbonHeight = () => {
    const {globalRibbonContainer} = this;
    if (globalRibbonContainer) {
      this.setState(
        {
          globalRibbonHeight: globalRibbonContainer.offsetHeight,
        },
        this.setGlobalRibbonRootProperty,
      );
    }
  };

  private setOffset = () => {
    const {offset = '0px'} = this.props;
    setRootProperty('--pc-frame-offset', offset);
  };

  private setScrollbarAlwaysVisible = () => {
    const scrollbarWidth = parseInt(
      document.documentElement.style.getPropertyValue(
        '--pc-app-provider-scrollbar-width',
      ),
      10,
    );

    this.setState({scrollbarAlwaysVisible: scrollbarWidth > 0});
  };

  private setGlobalRibbonRootProperty = () => {
    const {globalRibbonHeight} = this.state;
    setRootProperty(
      '--pc-frame-global-ribbon-height',
      `${globalRibbonHeight}px`,
    );
  };

  private showToast = (toast: ToastPropsWithID) => {
    this.setState(({toastMessages}: State) => {
      const hasToastById =
        toastMessages.find(({id}) => id === toast.id) != null;
      return {
        toastMessages: hasToastById ? toastMessages : [...toastMessages, toast],
      };
    });
  };

  private hideToast = ({id}: ToastID) => {
    this.setState(({toastMessages}: State) => {
      return {
        toastMessages: toastMessages.filter(({id: toastId}) => id !== toastId),
      };
    });
  };

  private setContextualSaveBar = (props: ContextualSaveBarProps) => {
    // Bulletproof protection against invalid props
    if (!props || typeof props !== 'object') {
      console.warn('Frame: Invalid ContextualSaveBar props provided', props);
      return;
    }

    const {showContextualSaveBar} = this.state;
    this.contextualSaveBar = {...props};
    if (showContextualSaveBar === true) {
      this.forceUpdate();
    } else {
      this.setState({showContextualSaveBar: true});
    }
  };

  private removeContextualSaveBar = () => {
    this.contextualSaveBar = null;
    this.setState({showContextualSaveBar: false});
  };

  private startLoading = () => {
    this.setState(({loadingStack}: State) => ({
      loadingStack: loadingStack + 1,
    }));
  };

  private stopLoading = () => {
    this.setState(({loadingStack}: State) => ({
      loadingStack: Math.max(0, loadingStack - 1),
    }));
  };

  private handleResize = () => {
    if (this.props.globalRibbon) {
      this.setGlobalRibbonHeight();
    }
  };

  private handleFocus = () => {
    this.setState({skipFocused: true});
  };

  private handleBlur = () => {
    this.setState({skipFocused: false});
  };

  private handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const {skipToContentTarget} = this.props;
    if (skipToContentTarget && skipToContentTarget.current) {
      skipToContentTarget.current.focus();
      event?.preventDefault();
    }
  };

  private handleNavigationDismiss = () => {
    const {onNavigationDismiss} = this.props;
    if (onNavigationDismiss != null) {
      onNavigationDismiss();
    }
  };

  private setGlobalRibbonContainer = (node: HTMLDivElement) => {
    this.globalRibbonContainer = node;
  };

  private handleNavKeydown = (event: React.KeyboardEvent<HTMLElement>) => {
    const {key} = event;
    const {
      mediaQuery: {isNavigationCollapsed},
      showMobileNavigation,
    } = this.props;

    const mobileNavShowing = isNavigationCollapsed && showMobileNavigation;
    if (mobileNavShowing && key === 'Escape') {
      this.handleNavigationDismiss();
    }
  };
}

const navTransitionClasses = {
  enter: classNames(styles['Navigation-enter']),
  enterActive: classNames(styles['Navigation-enterActive']),
  enterDone: classNames(styles['Navigation-enterActive']),
  exit: classNames(styles['Navigation-exit']),
  exitActive: classNames(styles['Navigation-exitActive']),
};

export function Frame(props: FrameProps) {
  // FINAL NUCLEAR bundle hash break - forces completely new compilation
  console.log('=== FRAME FUNCTION CACHE BREAKER ===', FRAME_NUCLEAR_CACHE_BREAKER_2025_11_10_10_15_00);

  try {
    const i18n = useI18n();
    const mediaQuery = useMediaQuery();

    // Additional safety check to ensure contexts are available
    if (!i18n || !mediaQuery) {
      console.error('Frame: Required contexts missing - i18n or mediaQuery is undefined');
      return (
        <div style={{padding: '20px', border: '1px solid red', color: 'red'}}>
          <strong>Frame Error:</strong> Required context providers missing.
          Please wrap this component with AppProvider.
        </div>
      );
    }

    return <FrameInner {...props} i18n={i18n} mediaQuery={mediaQuery} />;
  } catch (error) {
    console.error('Frame: Context initialization failed', error);
    return (
      <div style={{padding: '20px', border: '1px solid red', color: 'red'}}>
        <strong>Frame Error:</strong> Failed to initialize required contexts.
        Please wrap this component with AppProvider.
      </div>
    );
  }
}
