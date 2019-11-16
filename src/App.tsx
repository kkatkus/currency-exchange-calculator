import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';

import AppRoutes from './AppRoutes';
import RootState from './RootState';
import * as themes from './shared/styles';
import Layout from './shared/components/Layout';

const App = () => {
  const [theme] = useSelector((state: RootState) => [state.settings.theme]);
  return (
    <ThemeProvider theme={themes[theme]}>
      <Layout>
        <AppRoutes />
      </Layout>
    </ThemeProvider>
  );
};

export default App;
