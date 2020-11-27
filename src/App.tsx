import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './routes';
import Layout from './layouts/Layout';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
