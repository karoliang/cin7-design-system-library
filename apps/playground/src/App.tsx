import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Frame, Navigation, TopBar } from '@cin7/polaris-adapter';
import HomePage from './pages/HomePage';
import EditorPage from './pages/EditorPage';
import ExamplesPage from './pages/ExamplesPage';
import DocumentationPage from './pages/DocumentationPage';

function App() {
  const [mobileNavigationActive, setMobileNavigationActive] = React.useState(false);

  const toggleMobileNavigationActive = React.useCallback(
    () => setMobileNavigationActive((active) => !active),
    []
  );

  const navigationMarkup = (
    <Navigation location="/">
      <Navigation.Section
        items={[
          {
            url: '/',
            label: 'Home',
            icon: 'HomeIcon',
          },
          {
            url: '/editor',
            label: 'Try It',
            icon: 'CodeIcon',
          },
          {
            url: '/examples',
            label: 'Examples',
            icon: 'CollectionIcon',
          },
          {
            url: '/docs',
            label: 'Documentation',
            icon: 'QuestionMarkIcon',
          },
        ]}
      />
    </Navigation>
  );

  const topBarMarkup = (
    <TopBar
      showNavigationToggle
      onNavigationToggle={toggleMobileNavigationActive}
    />
  );

  return (
    <Frame
      topBar={topBarMarkup}
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/editor" element={<EditorPage />} />
        <Route path="/examples" element={<ExamplesPage />} />
        <Route path="/docs" element={<DocumentationPage />} />
      </Routes>
    </Frame>
  );
}

export default App;