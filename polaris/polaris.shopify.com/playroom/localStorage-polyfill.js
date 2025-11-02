// localStorage polyfill for sandboxed iframes
// This must be the first script to run
(function() {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.getItem('test');
  } catch (e) {
    var mockStorage = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: function(key) { return mockStorage[key] || null; },
        setItem: function(key, value) { mockStorage[key] = String(value); },
        removeItem: function(key) { delete mockStorage[key]; },
        clear: function() { for (var k in mockStorage) delete mockStorage[k]; },
        get length() { return Object.keys(mockStorage).length; },
        key: function(index) { return Object.keys(mockStorage)[index] || null; }
      },
      writable: true,
      configurable: true
    });
  }
})();
