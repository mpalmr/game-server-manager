import React, { FC } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import GlobalErrorBoundary from './global-error-boundary';
import { ServersProvider } from './providers/servers';
import Layout from './components/layout';
import Views from './views';

const App: FC = function App() {
  return (
    <GlobalErrorBoundary>
      <Router>
        <ServersProvider>
          <Layout>
            <Views />
          </Layout>
        </ServersProvider>
      </Router>
    </GlobalErrorBoundary>
  );
};

export default App;
