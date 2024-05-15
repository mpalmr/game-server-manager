import React, { FC } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import GlobalErrorBoundary from './global-error-boundary';
import Layout from './components/layout';
import Views from './views';

const App: FC = function App() {
  return (
    <GlobalErrorBoundary>
      <Router>
        <Layout>
          <Views />
        </Layout>
      </Router>
    </GlobalErrorBoundary>
  );
};

export default App;
