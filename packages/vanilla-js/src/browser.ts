/**
 * Browser bundle entry point
 * Exposes Cin7 vanilla JS utilities as global object
 */

import * as dom from './dom';
import * as events from './events';
import * as animations from './animations';
import * as utils from './utils';

// Create global namespace
const Cin7VanillaJS = {
  dom,
  events,
  animations,
  utils,
  
  // Expose commonly used functions at top level
  $: dom.$,
  $$: dom.$$,
  on: events.on,
  ready: dom.ready,
  addClass: dom.addClass,
  removeClass: dom.removeClass,
  show: dom.show,
  hide: dom.hide,
};

// Expose to window in browser environment
if (typeof window !== 'undefined') {
  (window as any).Cin7VanillaJS = Cin7VanillaJS;
  (window as any).C7 = Cin7VanillaJS; // Short alias
}

export default Cin7VanillaJS;