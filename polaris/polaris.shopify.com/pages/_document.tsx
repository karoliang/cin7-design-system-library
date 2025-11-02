import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://cdn.shopify.com/" />
        <link
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
          rel="stylesheet"
        ></link>
        {/* localStorage polyfill for sandboxed iframes */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
